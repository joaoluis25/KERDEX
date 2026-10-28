/** New KERDEX 3.0 modules. DOM-based controls; HTML-escape all user input. */
(function(){
'use strict';
const U=KX.UI,F=KX.Finance, I=KX.Invest,Sim=KX.Simulation,s=KX.state;
const t=k=>U.t(k),e=x=>U.escape(x),ico=(n,v=18)=>U.icon(n,v);
const currency=(number,c='BRL')=>new Intl.NumberFormat(s.locale,{style:'currency',currency:c,maximumFractionDigits:c==='JPY'?0:2}).format(Number(number)||0);
const percent=n=>`${new Intl.NumberFormat(s.locale,{maximumFractionDigits:1,minimumFractionDigits:1}).format(n)}%`;
const format=n=>new Intl.NumberFormat(s.locale,{maximumFractionDigits:4}).format(Number(n)||0);
const LOCAL_KEY='kerdex3-demo-financial-mock';
const NEWS_TOPICS=['policy','global','energy','technology','brazil','currency','invest'];
let newsLoading=false,newsItems=[],newsLoadedAt=null,newsError=false,newsFilter='all',newsTopics=['policy','technology','brazil'],investQuery='';
let simParams={mode:'growth',principal:10000,monthly:600,target:100000,months:120,annual:8,inflation:4,fee:.8,tax:15,currency:'BRL',rateFx:1,extra:0,schedule:'price'};
let simResult=Sim.calculate(simParams);
function load(){
 if(!s.remember)return;
 try{const data=JSON.parse(localStorage.getItem(LOCAL_KEY)||'null');
  if(data&&Array.isArray(data.portfolio)&&data.portfolio.length<=150&&data.portfolio.every(I.validate))s.portfolio=data.portfolio;
  if(data&&Array.isArray(data.newsTopics)&&data.newsTopics.every(x=>NEWS_TOPICS.includes(x)))newsTopics=data.newsTopics;
 }catch{}
}
s.portfolio=I.seed();load();
function save(){try{if(s.remember)localStorage.setItem(LOCAL_KEY,JSON.stringify({portfolio:s.portfolio,newsTopics}));else localStorage.removeItem(LOCAL_KEY)}catch{}}
const card=(body,cls='')=>U.card(body,cls);
const button=(label,attr,cls='button-secondary',icon='')=>`<button type="button" class="button ${cls}" ${attr}>${icon?ico(icon):''}<span>${e(label)}</span></button>`;
function investments(){
 const data=I.totals(s.portfolio);
 const metric=(label,value,small='')=>`<div class="card invest-stat"><span>${e(label)}</span><strong>${value}</strong>${small?`<small>${e(small)}</small>`:''}</div>`;
 const chunks=s.portfolio.filter(x=>`${x.ticker} ${x.name}`.toLowerCase().includes(investQuery.toLowerCase()));
 const allocations=data.allocation.map(d=>`<div class="allocate-row"><span>${e(t('asset'+d.type))}</span><div class="allocate-track"><span data-progress="${Math.min(100,d.pct).toFixed(2)}"></span></div><b>${percent(d.pct)}</b></div>`).join('');
 const rows=chunks.map(a=>{
   const cost=a.quantity*a.avgCost*(a.purchaseFx??a.fx);const worth=a.quantity*a.price*a.fx;const delta=worth-cost;
   return `<tr><td class="asset-primary"><div class="ticker-name"><strong>${e(a.ticker)}</strong><span>${e(a.name)}</span></div></td><td data-label="${e(t('investType'))}">${e(t('asset'+a.type))}</td><td data-label="${e(t('investQty'))}">${format(a.quantity)}</td><td data-label="${e(t('investPrice'))}">${currency(a.price,a.currency)}</td><td data-label="${e(t('investValue'))}">${currency(worth)}</td><td data-label="${e(t('investPerformance'))}" class="${delta>=0?'positive':'negative'}">${delta>=0?'+':''}${currency(delta)}</td><td class="position-actions"><button type="button" class="icon-button" data-inv-edit="${a.id}" title="${e(t('edit'))}" aria-label="${e(t('edit'))}: ${e(a.ticker)}">${ico('edit',17)}</button><button type="button" class="icon-button" data-inv-delete="${a.id}" title="${e(t('delete'))}" aria-label="${e(t('delete'))}: ${e(a.ticker)}">${ico('trash',17)}</button></td></tr>`;
 }).join('');
 return `<div class="feature-page investments-page">${U.head('KERDEX / '+t('navInvestments'),t('investmentsTitle'),t('investmentsSubtitle'),`${button(t('investExport'),'data-inv-export','button-secondary','arrow')}${button(t('investAdd'),'data-inv-add','button-primary','plus')}`)}
 <div class="signal-box signal-warn">${ico('info')}<span>${e(t('investWarning'))}</span></div>
 <div class="invest-metrics">${metric(t('investValue'),currency(data.value))}${metric(t('investCost'),currency(data.cost))}${metric(t('investProfit'),currency(data.profit),percent(data.profitPct))}${metric(t('investIncome'),currency(data.income))}</div>
 <div class="invest-analysis-grid"><section class="card"><div class="section-head"><h2>${e(t('investAlloc'))}</h2><span class="mini-tag">${e(t('investExamples'))}</span></div><div class="allocations">${allocations||U.empty(t('emptyGeneric'))}</div></section><section class="card"><div class="section-head"><h2>${e(t('investInsights'))}</h2>${ico('chart',19)}</div><div class="insight-row"><div class="insight-icon">${ico('layers')}</div><div><strong>${e(t('investDiversify'))}</strong><p>${e(t('investDiversifyText'))}</p></div></div><div class="insight-kpi"><span>${e(t('investConcentration'))}</span><strong>${data.largest[0]?e(data.largest[0].ticker):'—'} · ${percent(data.concentration)}</strong></div><p class="muted-small">${e(t('investNoRecommendation'))}</p>${button(t('investViewNews'),'data-page="news"','button-secondary','book')}</section></div>
 <section class="card"><div class="section-head"><h2>${e(t('investPositions'))} · ${s.portfolio.length}</h2><span class="mini-tag">${e(t('investSource'))}</span></div><label class="invest-search"><span class="sr-only">${e(t('search'))}</span>${ico('filter')}<input type="search" maxlength="80" id="invest-search" placeholder="${e(t('searchPlaceholder'))}" value="${e(investQuery)}"></label><div class="table-scroller"><table class="k-table"><thead><tr>${['investAsset','investType','investQty','investPrice','investValue','investPerformance'].map(k=>`<th>${e(t(k))}</th>`).join('')}<th><span class="sr-only">${e(t('edit'))}</span></th></tr></thead><tbody>${rows||`<tr><td colspan="7">${e(t('emptyGeneric'))}</td></tr>`}</tbody></table></div><p class="table-note">${e(t('investNoQuotes'))}</p></section></div>`;
}
const sources=[['European Central Bank','https://www.ecb.europa.eu/press/html/index.en.html'],['Federal Reserve','https://www.federalreserve.gov/newsevents/pressreleases.htm'],['IMF','https://www.imf.org/en/News']];
const normalized=x=>String(x||'').toLocaleLowerCase('en-US');
function tagsOf(article){
 const v=normalized(article.title);const tags=[];
 if(/fed|ecb|bank|rate|interest|inflation|monetary|central/.test(v))tags.push('policy');
 if(/oil|energy|gas|opec|climate|crude/.test(v))tags.push('energy');
 if(/technology|tech|artificial|ai|semiconductor|digital/.test(v))tags.push('technology');
 if(/brazil|brasil|selic|real|latam/.test(v))tags.push('brazil');
 if(/currency|dollar|euro|foreign exchange|fx/.test(v))tags.push('currency');
 if(/geopolitic|war|global|trade|tariff|sanction|conflict/.test(v))tags.push('global');
 if(/stock|equity|asset|investment|bond|finance|market/.test(v))tags.push('invest');
 return tags.length?tags:['global'];
}
function relevance(a){
 const tags=tagsOf(a);const value=normalized(a.title);
 let rating=tags.filter(z=>newsTopics.includes(z)).length*3;
 for(const inv of s.portfolio){if(inv.ticker.length>2&&value.includes(normalized(inv.ticker)))rating+=5;}
 return rating;
}
function news(){
 const visible=[...newsItems].sort((a,b)=>relevance(b)-relevance(a)).filter(x=>newsFilter==='all'||tagsOf(x).includes(newsFilter));
 const status=newsLoading?t('loading'):(newsItems.length?t('newsLive'):t('newsOffline'));
 return `<div class="feature-page news-page">${U.head('KERDEX / '+t('navNews'),t('newsTitle'),t('newsSubtitle'),button(t('newsRefresh'),'data-news-refresh','button-primary','arrow'))}
 <section class="news-masthead"><div><span class="news-eyebrow">KERDEX / INTELLIGENCE DIGEST</span><h2>${e(t('newsTitle'))}</h2><p>${e(t('newsSubtitle'))}</p></div><div class="news-orbit" aria-hidden="true">${ico('globe',53)}</div></section>
 <div class="news-layout"><section class="card news-main"><div class="section-head"><h2>${e(t('newsForYou'))}</h2><span class="news-connection ${newsItems.length?'live':'offline'}">${newsItems.length?'●':'○'} ${e(status)}</span></div><div class="news-filters"><button type="button" data-news-filter="all" class="filter-chip ${newsFilter==='all'?'active':''}">${e(t('newsAll'))}</button>${NEWS_TOPICS.map(k=>`<button type="button" data-news-filter="${k}" class="filter-chip ${newsFilter===k?'active':''}">${e(t('news'+k[0].toUpperCase()+k.slice(1)))}</button>`).join('')}</div>
 <div class="news-articles">${visible.length?visible.slice(0,24).map(x=>`<article class="news-article"><div class="news-article-head"><span>${e(x.source)}</span><time datetime="${e(x.published||'')}">${x.published?e(new Date(x.published).toLocaleDateString(s.locale)):'—'}</time></div><h3>${e(x.title)}</h3><p class="muted-small">${e(t('newsOriginal'))}</p><div class="news-article-foot"><div>${tagsOf(x).slice(0,3).map(tag=>`<span class="mini-tag">${e(t('news'+tag[0].toUpperCase()+tag.slice(1)))}</span>`).join('')}</div><a rel="noopener noreferrer" target="_blank" href="${e(x.url)}">${e(t('newsRead'))} ${ico('arrow',15)}</a></div></article>`).join(''):`<div class="empty-news">${ico('globe',30)}<h3>${e(t('newsNoArticles'))}</h3><p>${e(t('newsNewsError'))}</p>${sources.map(([label,url])=>`<a target="_blank" rel="noopener noreferrer" href="${url}">${e(label)} ${ico('arrow',15)}</a>`).join('')}</div>`}</div></section>
 <aside class="news-side"><section class="card"><h2>${e(t('newsTopics'))}</h2><p class="muted-small">${e(t('newsPersonalization'))}</p><div class="news-topics">${NEWS_TOPICS.map(k=>`<label class="news-topic"><input type="checkbox" data-news-topic="${k}" ${newsTopics.includes(k)?'checked':''}><span>${e(t('news'+k[0].toUpperCase()+k.slice(1)))}</span></label>`).join('')}</div></section><section class="card"><h2>${e(t('newsImportant'))}</h2><p>${e(t('newsText'))}</p><p class="muted-small">${e(t('newsAlert'))}</p></section><section class="card"><h2>${e(t('newsStatus'))}</h2><p>${e(status)}</p>${newsLoadedAt?`<p class="muted-small">${e(t('newsTime'))}: ${e(new Date(newsLoadedAt).toLocaleString(s.locale))}</p>`:''}</section></aside></div></div>`;
}
function modelInput(k,label,val,type='number',more=''){
 return `<label class="sim-input"><span>${e(t(label))}</span><input name="${k}" type="${type}" ${type==='number'?'step="any" inputmode="decimal"':''} value="${e(val)}" ${more}></label>`;
}
function simForm(){
 const p=simParams;
 return `<form id="advanced-sim" class="sim-form-grid"><label class="sim-input"><span>${e(t('simMode'))}</span><select name="mode" id="sim-mode"><option value="growth" ${p.mode==='growth'?'selected':''}>${e(t('simModeGrowth'))}</option><option value="goal" ${p.mode==='goal'?'selected':''}>${e(t('simModeGoal'))}</option><option value="debt" ${p.mode==='debt'?'selected':''}>${e(t('simModeDebt'))}</option></select></label>
 <label class="sim-input"><span>${e(t('simCurrency'))}</span><select name="currency">${I.CCY.map(c=>`<option value="${c}" ${p.currency===c?'selected':''}>${c}</option>`).join('')}</select></label>
 ${modelInput('principal','simPrincipal',p.principal)}${modelInput('monthly','simDeposit',p.monthly)}${modelInput('months','simMonths',p.months,'min="1" max="480"')}${modelInput('annual','simAnnual',p.annual)}
 ${p.mode==='debt'?`${modelInput('extra','simExtra',p.extra)}<label class="sim-input"><span>${e(t('simSchedule'))}</span><select name="schedule"><option value="price" ${p.schedule==='price'?'selected':''}>${e(t('simMethodPrice'))}</option><option value="sac" ${p.schedule==='sac'?'selected':''}>${e(t('simMethodSac'))}</option></select></label>`:
 `${modelInput('target','simGoal',p.target)}${modelInput('inflation','simInflation',p.inflation)}${modelInput('fee','simFee',p.fee)}${modelInput('tax','simTax',p.tax)}`}
 ${p.currency!=='BRL'?modelInput('rateFx','simFx',p.rateFx):'<input type="hidden" name="rateFx" value="1">'}
 <button type="submit" class="button button-primary sim-run">${ico('calculator')} ${e(t('simCalculate'))}</button></form>`;
}
function sparkline(rows,debt){
 const selected=rows.filter((x,i)=>i===0||i===rows.length-1||i%Math.max(1,Math.floor(rows.length/55))===0);
 const max=Math.max(1,...selected.map(x=>debt?x.balance:x.net));
 const points=selected.map((x,i)=>`${20+(i/Math.max(1,selected.length-1))*720},${205-(debt?x.balance:x.net)/max*160}`).join(' ');
 const grid=[0,1,2,3].map(i=>`<line x1="20" y1="${45+i*52}" x2="740" y2="${45+i*52}" stroke="currentColor" opacity=".12"/>`).join('');
 return `<svg class="sim-chart-svg" viewBox="0 0 760 244" aria-label="${e(t('simChart'))}" role="img" preserveAspectRatio="xMidYMid meet">${grid}<polyline points="${points}" stroke="#39B982" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}
function resultView(){
 if(!simResult)return '';
 const {input,base,bear,bull}=simResult;
 const debt=input.mode==='debt';
 const last=base.final;
 const mainValue=debt?last.totalPaid:last.net;
 const scenarios=debt?[]:[{name:t('simConservative'),result:bear},{name:t('simBase'),result:base},{name:t('simOptimistic'),result:bull}];
 return `<section class="sim-result-area"><div class="section-head"><h2>${e(t('simResultTitle'))}</h2><span class="mini-tag">${e(t('simUserRates'))}</span></div>
 <div class="sim-summary-grid"><div class="sim-kpi main"><span>${e(t(debt?'simDebtPaid':'simEnding'))}</span><strong>${currency(mainValue,input.currency)}</strong><small>${e(t('simInfo'))}</small></div><div class="sim-kpi"><span>${e(t(debt?'simDebtInterest':'simReal'))}</span><strong>${currency(debt?last.totalInterest:last.real,input.currency)}</strong></div><div class="sim-kpi"><span>${e(t(debt?'simOutstanding':'simInvested'))}</span><strong>${currency(debt?last.balance:last.invested,input.currency)}</strong></div><div class="sim-kpi"><span>${e(t('simDuration'))}</span><strong>${debt?base.monthsReached:base.monthsReached??'—'} ${e(t('monthUnit'))}</strong></div></div>
 ${!debt?`<div class="scenario-cards">${scenarios.map((x,i)=>`<div class="scenario-card ${i===1?'featured':''}"><span>${e(x.name)}</span><strong>${currency(x.result.final.net,input.currency)}</strong><small>${percent(x.result.annual)} / ${e(t('simAnnual'))}</small></div>`).join('')}</div>`:''}
 <div class="sim-analysis-layout"><div class="card"><h2>${e(t('simChart'))}</h2>${sparkline(base.rows,debt)}</div><div class="card"><h2>${e(t('simAssumptions'))}</h2><dl class="assumption-list">${[['simCurrency',input.currency],['simMonths',input.months],['simAnnual',percent(input.annual)],...(!debt?[['simInflation',percent(input.inflation)],['simFee',percent(input.fee)],['simTax',percent(input.tax)]]:[])].map(([k,v])=>`<div><dt>${e(t(k))}</dt><dd>${e(v)}</dd></div>`).join('')}</dl>${input.currency!=='BRL'?`<div class="sim-converted"><span>${e(t('simFxValue'))}</span><strong>${currency(mainValue*input.rateFx,'BRL')}</strong><p>${e(t('simCurrencyWarn'))}</p></div>`:''}</div></div>
 <div class="card sim-report-card"><div class="section-head"><h2>${e(t('simReport'))}</h2></div><div class="report-actions">${button(t('simExportCsv'),'data-sim-export="csv"')}${button(t('simExportXlsx'),'data-sim-export="xlsx"')}${button(t('simExportPptx'),'data-sim-export="pptx"')}${button(t('simPrint'),'data-sim-export="print"')}</div><p>${e(t('simCopyAssumption'))}</p></div>
 <div class="card sim-table-card"><h2>${e(t('simTable'))}</h2><div class="table-scroller"><table class="k-table"><thead><tr><th>${e(t('simMonth'))}</th><th>${e(t(debt?'simOutstanding':'simEnding'))}</th><th>${e(t(debt?'simPayment':'simInvested'))}</th><th>${e(t(debt?'simDebtInterest':'simReal'))}</th></tr></thead><tbody>${base.rows.filter((row,i)=>i===0||i===base.rows.length-1||i%Math.max(1,Math.round(base.rows.length/12))===0).map(r=>`<tr><td>${r.month}</td><td>${currency(debt?r.balance:r.net,input.currency)}</td><td>${currency(debt?r.payment:r.invested,input.currency)}</td><td>${currency(debt?r.totalInterest:r.real,input.currency)}</td></tr>`).join('')}</tbody></table></div></div><div class="signal-box">${ico('info')} ${e(t('simInfo'))}</div></section>`;
}
function simulator(){
 return `<div class="feature-page advanced-simulator">${U.head('KERDEX / '+t('navSimulator'),t('simAdvancedTitle'),t('simAdvancedSubtitle'))}
 <section class="card"><div class="section-head"><h2>${e(t('simAssumptions'))}</h2>${ico('calculator')}</div>${simForm()}<div class="sim-fx-bar">${simParams.currency!=='BRL'?button(t('simFxFetch'),'data-fx-fetch','button-secondary','globe'):''}<span class="muted-small">${e(t('simFxDaily'))}</span></div><div id="advanced-sim-error" role="alert" class="sim-error" hidden></div></section>${resultView()}</div>`;
}
function closeDialog(){document.getElementById('asset-dialog')?.close()}
function showAsset(id){
 let d=document.getElementById('asset-dialog');if(!d){d=document.createElement('dialog');d.id='asset-dialog';d.className='entry-dialog asset-dialog';document.body.appendChild(d);d.addEventListener('click',ev=>{if(ev.target.closest('[data-asset-close]'))closeDialog()});d.addEventListener('submit',saveAsset)}
 const item=s.portfolio.find(x=>x.id===id)||{id:0,ticker:'',name:'',type:'stock',currency:'BRL',quantity:1,avgCost:0,price:0,fx:1,purchaseFx:1,dividends:0};
 const field=(key,label,val)=>`<label class="modal-field"><span>${e(t(label))}</span><input name="${key}" required type="number" min="0" max="10000000000" step="any" value="${e(val)}"></label>`;
 d.innerHTML=`<div class="dialog-header"><div><div class="eyebrow">KERDEX / ${e(t('navInvestments'))}</div><h2 id="asset-dialog-label">${e(t(id?'investEdit':'investAdd'))}</h2></div><button type="button" class="dialog-close" data-asset-close>${ico('close')}</button></div><form id="asset-form" data-id="${item.id}"><div class="modal-grid"><label class="modal-field"><span>${e(t('investSymbol'))}</span><input name="ticker" maxlength="22" required pattern="[A-Za-z0-9.\\-^: ]{1,22}" value="${e(item.ticker)}"></label><label class="modal-field"><span>${e(t('name'))}</span><input name="name" maxlength="110" required value="${e(item.name)}"></label><label class="modal-field"><span>${e(t('investType'))}</span><select name="type">${I.TYPE.map(x=>`<option value="${x}" ${x===item.type?'selected':''}>${e(t('asset'+x))}</option>`).join('')}</select></label><label class="modal-field"><span>${e(t('investCurrency'))}</span><select name="currency">${I.CCY.map(x=>`<option value="${x}" ${x===item.currency?'selected':''}>${x}</option>`).join('')}</select></label>${field('quantity','investQty',item.quantity)}${field('avgCost','investAvg',item.avgCost)}${field('price','investPrice',item.price)}${field('fx','investFx',item.fx)}${field('purchaseFx','investPurchaseFx',item.purchaseFx??item.fx)}${field('dividends','investDiv',item.dividends)}</div><p class="muted-small">${e(t('investWarning'))}</p><div id="asset-error" class="sim-error" role="alert"></div><div class="modal-actions"><button class="button button-secondary" type="button" data-asset-close>${e(t('cancel'))}</button><button class="button button-primary" type="submit">${e(t('investSave'))}</button></div></form>`;
 d.setAttribute('aria-labelledby','asset-dialog-label');d.showModal();
}
function saveAsset(ev){if(ev.target.id!=='asset-form')return;ev.preventDefault();const f=new FormData(ev.target),oldId=Number(ev.target.dataset.id);const data={id:oldId||Date.now(),name:String(f.get('name')).trim(),ticker:String(f.get('ticker')).trim().toUpperCase(),type:String(f.get('type')),currency:String(f.get('currency'))};
 for(const k of ['quantity','avgCost','price','fx','purchaseFx','dividends'])data[k]=Number(f.get(k));
 if(!I.validate(data)){document.getElementById('asset-error').textContent=t('simError');return;}
 if(oldId){const i=s.portfolio.findIndex(x=>x.id===oldId);if(i<0)return;s.portfolio[i]=data;}else s.portfolio.push(data);
 save();closeDialog();KX.Features.renderApp();KX.Features.toast(t('portfolioSaved'));
}
function afterRender(page){
 if(page==='news'&&!newsItems.length&&!newsLoading&&!newsError)fetchNews();
 if(page==='investments'){const input=document.getElementById('invest-search');if(input&&investQuery)input.setSelectionRange(investQuery.length,investQuery.length);}
}
async function fetchNews(){newsLoading=true;try{const response=await fetch('/api/news',{headers:{'Accept':'application/json'},cache:'no-store',signal:AbortSignal.timeout(12000)});
 if(!response.ok||!(response.headers.get('content-type')||'').includes('application/json'))throw Error('news source unavailable');
 const data=await response.json();if(!Array.isArray(data.items))throw Error('invalid news data');
 newsItems=data.items.filter(x=>x&&typeof x.title==='string'&&typeof x.source==='string'&&typeof x.url==='string'&&/^https:\/\//.test(x.url)).slice(0,70);
 newsLoadedAt=data.fetchedAt||Date.now();newsError=!newsItems.length;
 }catch(err){newsError=true;newsItems=[];newsLoadedAt=null;console.info('KERDEX News: no licensed feed available in this runtime',String(err).slice(0,100));}
 finally{newsLoading=false;if(s.page==='news')KX.Features.renderApp();}
}
async function fetchFx(){
 const input=document.querySelector('#advanced-sim select[name="currency"]');const base=input?.value;
 if(!base||base==='BRL')return;
 const out=document.querySelector('#advanced-sim-error');
 try{
   const res=await fetch('/api/fx?base='+encodeURIComponent(base),{headers:{Accept:'application/json'},signal:AbortSignal.timeout(7000)});
   if(!res.ok||!(res.headers.get('content-type')||'').includes('application/json'))throw Error('unavailable');
   const body=await res.json();if(body.base!==base||body.quote!=='BRL'||!Number.isFinite(body.rate)||body.rate<=0)throw Error('invalid');
   const field=document.querySelector('#advanced-sim [name="rateFx"]');if(field){field.value=String(body.rate);simParams.rateFx=body.rate;}
   if(out){out.hidden=false;out.style.color='var(--positive)';out.textContent=t('simFxLoaded')+': '+body.rate+' BRL · '+(body.date||'')+' · '+body.source;}
 }catch{
   if(out){out.hidden=false;out.style.color='var(--negative)';out.textContent=t('simFxUnavailable');}
 }
}
function handleClick(ev){
 const a=ev.target.closest('[data-inv-add]');if(a){showAsset(null);return true;}
 const ed=ev.target.closest('[data-inv-edit]');if(ed){showAsset(Number(ed.dataset.invEdit));return true;}
 const del=ev.target.closest('[data-inv-delete]');if(del){if(confirm(t('confirmDelete'))){s.portfolio=s.portfolio.filter(x=>x.id!==Number(del.dataset.invDelete));save();KX.Features.renderApp();KX.Features.toast(t('portfolioRemoved'))}return true;}
 if(ev.target.closest('[data-fx-fetch]')){fetchFx();return true;}
 if(ev.target.closest('[data-inv-export]')){KX.Exports.portfolio(s.portfolio,s.locale);return true;}
 if(ev.target.closest('[data-news-refresh]')){newsError=false;newsItems=[];fetchNews();KX.Features.renderApp();return true;}
 const filter=ev.target.closest('[data-news-filter]');if(filter){newsFilter=filter.dataset.newsFilter;KX.Features.renderApp();return true;}
 const xp=ev.target.closest('[data-sim-export]');if(xp){KX.Exports.report(xp.dataset.simExport,simResult,s.locale);KX.Features.toast(t('downloadReady'));return true;}
 return false;
}
function handleChange(ev){
 if(ev.target.id==='sim-mode'){simParams.mode=ev.target.value;simResult=null;KX.Features.renderApp();return true;}
 if(ev.target.matches('[data-news-topic]')){const k=ev.target.dataset.newsTopic;newsTopics=ev.target.checked?[...new Set([...newsTopics,k])]:newsTopics.filter(x=>x!==k);save();KX.Features.renderApp();KX.Features.toast(t('newsTopicsSaved'));return true;}
 return false;
}
function handleSubmit(ev){
 if(ev.target.id!=='advanced-sim')return false;
 ev.preventDefault();const f=new FormData(ev.target);
 try{
  const v={...simParams};for(const k of ['principal','monthly','target','months','annual','inflation','fee','tax','rateFx','extra'])if(f.has(k))v[k]=Number(f.get(k));
  v.currency=String(f.get('currency'));v.mode=String(f.get('mode'));v.schedule=String(f.get('schedule')||v.schedule);if(v.currency==='BRL')v.rateFx=1;
  simResult=Sim.calculate(v);simParams=v;KX.Features.renderApp();
 }catch(err){const output=document.getElementById('advanced-sim-error');if(output){output.hidden=false;output.textContent=t('simError');}console.info('Simulation validation:',err.message);}
 return true;
}
function handleInput(ev){if(ev.target.id==='invest-search'){
 investQuery=ev.target.value;const parent=document.querySelector('.investments-page');
 // Re-render on demand (name search) while preserving keyboard focus/caret.
 if(parent){const caret=ev.target.selectionStart;KX.Features.renderApp();const input=document.getElementById('invest-search');input?.focus();input?.setSelectionRange(caret,caret);}
 }}
document.getElementById('app').addEventListener('input',handleInput);
KX.Features={investments,news,simulator,afterRender,handleClick,handleChange,handleSubmit,renderApp:()=>{},toast:()=>{},persist:save};
})();
