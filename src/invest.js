/** Client-side educational portfolio. Prices, FX and holdings always manual or explicitly fictional. */
(function(global){
'use strict';
const TYPE=['stock','etf','reit','fii','bond','fund','crypto','commodity','cash','other'];
const CCY=['BRL','USD','EUR','GBP','JPY','CAD','CHF','AUD'];
const clamp=(x,lo,hi)=>Math.max(lo,Math.min(hi,x));
function validate(item){
 if(!item||typeof item!=='object')return false;
 if(!TYPE.includes(item.type)||!CCY.includes(item.currency)||!/^[A-Za-z0-9.\-^: ]{1,22}$/.test(item.ticker||''))return false;
 if(typeof item.name!=='string'||item.name.length<1||item.name.length>110)return false;
 if(!['quantity','avgCost','price','fx','dividends'].every(k=>Number.isFinite(item[k])&&item[k]>=0&&item[k]<=1e10))return false;
 if(item.quantity>1e8||item.fx<=0||item.fx>1e7)return false;
 if(item.purchaseFx!==undefined&&(!Number.isFinite(item.purchaseFx)||item.purchaseFx<=0||item.purchaseFx>1e7))return false;
 return true;
}
function totals(rows){
 const filtered=rows.filter(validate);
 const groups=new Map();let cost=0,value=0,income=0;
 for(const r of filtered){
   const basis=r.quantity*r.avgCost*(r.purchaseFx??r.fx);
   const market=r.quantity*r.price*r.fx;
   cost+=basis;value+=market;income+=r.dividends*r.fx;
   const k=r.type;groups.set(k,(groups.get(k)||0)+market);
 }
 const allocation=[...groups].map(([type,market])=>({type,value:market,pct:value>0?market/value*100:0})).sort((a,b)=>b.value-a.value);
 const largest=filtered.map(r=>({ticker:r.ticker,value:r.quantity*r.price*r.fx})).sort((a,b)=>b.value-a.value);
 return {cost,value,profit:value-cost,profitPct:cost?100*(value/cost-1):0,income,allocation,largest,concentration:value?100*(largest[0]?.value||0)/value:0,assets:filtered.length};
}
function seed(){
 return [
  {id:3001,type:'stock',ticker:'PETR4',name:'Empresa brasileira · exemplo',currency:'BRL',quantity:50,avgCost:34.00,price:32.40,fx:1,dividends:52},
  {id:3002,type:'etf',ticker:'IVVB11',name:'ETF de ações internacionais · exemplo',currency:'BRL',quantity:9,avgCost:310,price:334,fx:1,dividends:0},
  {id:3003,type:'stock',ticker:'AAPL',name:'Ação internacional · exemplo',currency:'USD',quantity:4,avgCost:190,price:205,fx:5.1,purchaseFx:4.8,dividends:2.6},
  {id:3004,type:'fii',ticker:'HGLG11',name:'Fundo imobiliário · exemplo',currency:'BRL',quantity:15,avgCost:155,price:148,fx:1,dividends:18},
  {id:3005,type:'bond',ticker:'TESOURO-IPCA',name:'Título público · exemplo',currency:'BRL',quantity:1,avgCost:2100,price:2240,fx:1,dividends:0}
 ];
}
const cents=n=>Math.round(n*100);
global.KX=global.KX||{};global.KX.Invest=Object.freeze({TYPE,CCY,validate,totals,seed,cents});
if(typeof module!=='undefined')module.exports={validate,totals,seed};
})(typeof window!=='undefined'?window:globalThis);
