/** Local preview server; never accepts banking credentials. Only fixed official public feeds. */
'use strict';
const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const ROOT=path.resolve(__dirname,'..');
const PORT=Number(process.env.PORT||3001);
const HOST=process.env.HOST||'127.0.0.1';
const MIME={'.html':'text/html; charset=UTF-8','.css':'text/css; charset=UTF-8','.js':'text/javascript; charset=UTF-8','.png':'image/png','.jpeg':'image/jpeg','.jpg':'image/jpeg','.svg':'image/svg+xml','.json':'application/json; charset=UTF-8','.webmanifest':'application/manifest+json','.ico':'image/x-icon'};
const FEEDS=[
 {source:'European Central Bank',url:'https://www.ecb.europa.eu/rss/press.html'},
 {source:'European Central Bank · Statistics',url:'https://www.ecb.europa.eu/rss/statpress.html'},
 {source:'Federal Reserve',url:'https://www.federalreserve.gov/feeds/press_all.xml'}
];
let newsCache={at:0,items:[],fetchedAt:null};let pendingFetch=null;
const csp="default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; font-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'; manifest-src 'self'";
const HEADERS={'X-Content-Type-Options':'nosniff','Content-Security-Policy':csp,'Referrer-Policy':'no-referrer','X-Frame-Options':'DENY','Cross-Origin-Resource-Policy':'same-origin','Cache-Control':'no-store','Permissions-Policy':'camera=(), microphone=(), geolocation=(), payment=()'};
const entity=s=>String(s||'').replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,'$1').replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos);/gi,(m,k)=>{
 if(k[0]==='#'){const n=k[1]?.toLowerCase()==='x'?parseInt(k.slice(2),16):Number(k.slice(1));return Number.isSafeInteger(n)&&n>0&&n<0x10FFFF?String.fromCodePoint(n):'';}
 return {amp:'&',lt:'<',gt:'>',quot:'"',apos:"'"}[k]||m;
 }).replace(/<[^>]*>/g,'').trim();
const extract=(xml,tag)=>{const m=xml.match(new RegExp('<'+tag+'(?:\\s[^>]*)?>([\\s\\S]*?)<\\/'+tag+'>','i'));return m?entity(m[1]):''};
function parseRSS(xml,feed){
 const blocks=[...xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi)];
 return blocks.slice(0,25).map(([,content])=>{
 const title=extract(content,'title').slice(0,280),link=extract(content,'link').slice(0,1200),pubDate=extract(content,'pubDate');
 let url;try{url=new URL(link);if(url.protocol!=='https:'||!/(^|\.)(ecb\.europa\.eu|federalreserve\.gov)$/.test(url.hostname))return null}catch{return null}
 return {title,source:feed.source,url:url.toString(),published:Number.isFinite(Date.parse(pubDate))?new Date(pubDate).toISOString():null};
 }).filter(x=>x&&x.title.length>=8);
}
async function fetchFeed(feed){
 const abort=new AbortController();const timeout=setTimeout(()=>abort.abort(),6500);
 try{
  const response=await fetch(feed.url,{signal:abort.signal,redirect:'error',headers:{Accept:'application/rss+xml, application/xml, text/xml'}});
  if(!response.ok)throw Error('Upstream feed returned '+response.status);
  const size=Number(response.headers.get('content-length')||0);if(size>500000)throw Error('Feed too large');
  const reader=response.body.getReader();const parts=[];let total=0;
  while(true){const {done,value}=await reader.read();if(done)break;total+=value.length;if(total>500000){await reader.cancel();throw Error('Feed too large')}parts.push(value)}
  const body=Buffer.concat(parts).toString('utf8');return parseRSS(body,feed);
 }catch(e){console.log('[KERDEX News] public feed unavailable:',feed.source,String(e.message).slice(0,120));return []}finally{clearTimeout(timeout)}
}
/** Optional GDELT DOC 2 public metadata; caller topics are NOT sent to providers. */
async function fetchGlobalHeadlines(){
 if(process.env.KERDEX_GLOBAL_NEWS==='0')return [];
 const params=new URLSearchParams({query:'(inflation OR "central bank" OR "energy prices" OR "trade sanctions" OR "artificial intelligence") sourcelang:english',mode:'ArtList',maxrecords:'25',timespan:'3days',format:'json'});
 const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),6500);
 try{
  const res=await fetch('https://api.gdeltproject.org/api/v2/doc/doc?'+params,{signal:controller.signal,redirect:'error',headers:{Accept:'application/json'}});
  if(!res.ok||!(res.headers.get('content-type')||'').includes('json'))throw Error('global news unavailable');
  const payload=await res.text();if(payload.length>500000)throw Error('too much data');
  const data=JSON.parse(payload);if(!Array.isArray(data.articles))return [];
  return data.articles.slice(0,25).map(a=>{
    let url;try{url=new URL(a.url);if(url.protocol!=='https:')return null}catch{return null}
    const stamp=String(a.seendate||'');const iso=/^\d{8}T\d{6}Z$/.test(stamp)?`${stamp.slice(0,4)}-${stamp.slice(4,6)}-${stamp.slice(6,8)}T${stamp.slice(9,11)}:${stamp.slice(11,13)}:${stamp.slice(13,15)}Z`:null;
    const title=String(a.title||'').slice(0,280).trim();
    return title.length>8?{title,url:url.toString(),source:`${url.hostname} · GDELT`,published:iso}:null;
  }).filter(Boolean);
 }catch(e){console.info('[KERDEX News] global feed unavailable:',String(e.message).slice(0,120));return []}
 finally{clearTimeout(timeout)}
}
async function news(){
 if(Date.now()-newsCache.at<15*60*1000)return newsCache;
 if(!pendingFetch)pendingFetch=Promise.all([...FEEDS.map(fetchFeed),fetchGlobalHeadlines()] ).then(items=>{
  const unique=new Map();items.flat().forEach(x=>unique.set(x.url,x));
  const result=[...unique.values()].sort((a,b)=>String(b.published||'').localeCompare(String(a.published||''))).slice(0,65);
  newsCache={at:Date.now(),items:result,fetchedAt:result.length?new Date().toISOString():null};return newsCache;
 }).finally(()=>pendingFetch=null);
 return pendingFetch;
}
function reply(res,status,content,type){res.writeHead(status,{'Content-Type':type,...HEADERS});res.end(content)}
const server=http.createServer(async(req,res)=>{
 if(req.method!=='GET'&&req.method!=='HEAD')return reply(res,405,'Method not allowed','text/plain');
 let url;try{url=new URL(req.url,'http://localhost')}catch{return reply(res,400,'Bad request','text/plain')}
 if(url.pathname==='/api/fx'){
  const base=String(url.searchParams.get('base')||'').toUpperCase();
  const allowed=new Set(['BRL','USD','EUR','GBP','JPY','CAD','CHF','AUD']);
  if(!allowed.has(base))return reply(res,400,JSON.stringify({status:'invalid_currency'}),'application/json; charset=utf-8');
  if(base==='BRL')return reply(res,200,JSON.stringify({base:'BRL',quote:'BRL',rate:1,date:null,source:'identity'}),'application/json; charset=utf-8');
  const abort=new AbortController(),tid=setTimeout(()=>abort.abort(),5500);
  try{
   const remote=await fetch(`https://api.frankfurter.dev/v2/rate/${base}/BRL`,{signal:abort.signal,redirect:'error',headers:{Accept:'application/json'}});
   if(!remote.ok)throw Error('rate unavailable');
   const raw=await remote.json();
   if(!raw||!Number.isFinite(raw.rate)||raw.rate<=0||!/^\d{4}-\d{2}-\d{2}$/.test(raw.date))throw Error('invalid exchange rate');
   return reply(res,200,JSON.stringify({base,quote:'BRL',rate:raw.rate,date:raw.date,source:'Frankfurter — central bank reference',kind:'daily_reference_not_live'}),'application/json; charset=utf-8');
  }catch{return reply(res,503,JSON.stringify({status:'unavailable',source:'Frankfurter'}),'application/json; charset=utf-8')}
  finally{clearTimeout(tid)}
 }
 if(url.pathname==='/api/news'){
  try{const data=await news();return reply(res,200,JSON.stringify({items:data.items,fetchedAt:data.fetchedAt,status:data.items.length?'live':'unavailable',sources:[...FEEDS.map(x=>x.source),'GDELT DOC 2.0 (optional public metadata)']}),'application/json; charset=utf-8')}
  catch{return reply(res,503,JSON.stringify({items:[],status:'unavailable'}),'application/json; charset=utf-8')}
 }
 const uri=url.pathname==='/'?'/index.html':url.pathname;
 if(!/^\/(index\.html|styles\.css|site\.webmanifest|src\/[\w-]+\.js|assets\/[A-Za-z0-9_./-]+)$/.test(uri)||uri.includes('..'))return reply(res,404,'Not found','text/plain');
 const file=path.resolve(ROOT,'.'+uri);
 if(!file.startsWith(ROOT+path.sep))return reply(res,404,'Not found','text/plain');
 fs.readFile(file,(err,data)=>{if(err)return reply(res,404,'Not found','text/plain');reply(res,200,req.method==='HEAD'?'':data,MIME[path.extname(file)]||'application/octet-stream')});
});
if(require.main===module)server.listen(PORT,HOST,()=>console.log(`KERDEX Beta 3.0 running at http://${HOST}:${PORT}`));
module.exports={server,parseRSS,FEEDS};
