const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.webmanifest':'application/manifest+json'};
http.createServer((req,res)=>{let file;try{file=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400);return res.end()}
if(file==='/')file='/index.html';
if(!/^\/(index\.html|styles\.css|site\.webmanifest|src\/[a-z0-9]+\.js|assets\/[a-zA-Z0-9_./-]+)$/.test(file)||file.includes('..')){res.writeHead(404);return res.end()}
const target=path.join(root,file);fs.readFile(target,(err,data)=>{if(err){res.writeHead(404);return res.end()}res.writeHead(200,{'Content-Type':mime[path.extname(target)]||'application/octet-stream','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','Content-Security-Policy':"frame-ancestors 'none'",'Cache-Control':'no-store'});res.end(data)})
}).listen(Number(process.env.PORT)||3000,'0.0.0.0',()=>console.log('KERDEX development server started'));
