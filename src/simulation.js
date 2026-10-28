/** KERDEX Sim Lab — deterministic, inspectable educational models; not investment advice. */
(function(global){
'use strict';
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
const amount=v=>Number.isFinite(Number(v))?Number(v):NaN;
const annualToMonthly=p=>Math.pow(1+p/100,1/12)-1;
const maxHorizon=480;
function validate(p){
 const input={...p};
 const allowed=['BRL','USD','EUR','GBP','JPY','CAD','CHF','AUD'];
 if(!allowed.includes(input.currency))throw Error('Currency not supported');
 if(!['growth','goal','debt'].includes(input.mode))throw Error('Invalid mode');
 for(const key of ['principal','monthly','target','annual','inflation','fee','tax','rateFx','extra']){
   input[key]=amount(input[key]??0);
   if(!Number.isFinite(input[key]))throw Error('Invalid number: '+key);
 }
 input.months=Number(input.months);
 if(!Number.isInteger(input.months)||input.months<1||input.months>maxHorizon)throw Error('Invalid horizon');
 if(input.principal<0||input.monthly<0||input.target<0||input.extra<0||input.principal>1e10||input.monthly>1e9||input.target>1e10)throw Error('Invalid monetary amount');
 if(input.annual<=-100||input.annual>100||input.inflation<=-100||input.inflation>100||input.fee<0||input.fee>30||input.tax<0||input.tax>50)throw Error('Invalid percentage');
 if(input.rateFx<=0||input.rateFx>1e6)throw Error('Invalid foreign exchange rate');
 return input;
}
function investmentRows(p,rateOverride){
 const annual=rateOverride??p.annual;
 const monthlyRate=annualToMonthly(annual)-annualToMonthly(p.fee);
 const infMonth=annualToMonthly(p.inflation);
 let balance=p.principal,invested=p.principal,monthsReached=null,totalFees=0;
 const rows=[{month:0,balance:round(balance),invested:round(invested),real:round(balance),gains:0,tax:0,net:round(balance),fees:0}];
 for(let m=1;m<=p.months;m++){
   const fee=Math.max(0,balance*annualToMonthly(p.fee));totalFees+=fee;
   balance=Math.max(0,balance*(1+monthlyRate)+p.monthly);invested+=p.monthly;
   const gains=Math.max(0,balance-invested),tax=gains*p.tax/100;
   const net=balance-tax;
   const real=net/Math.pow(1+infMonth,m);
   const row={month:m,balance:round(balance),invested:round(invested),real:round(real),gains:round(gains),tax:round(tax),net:round(net),fees:round(totalFees)};
   rows.push(row);
   if(monthsReached===null && p.target>0 && net>=p.target)monthsReached=m;
 }
 return {rows,monthsReached,final:rows.at(-1),annual,mode:p.mode};
}
function debtRows(p){
 const rate=Math.pow(1+p.annual/100,1/12)-1;
 let balance=p.principal,totalInterest=0,totalPaid=0;
 const fixed=p.principal*(rate===0?1/p.months:rate/(1-Math.pow(1+rate,-p.months)));
 const rows=[{month:0,balance:round(balance),interest:0,principalPaid:0,payment:0,totalInterest:0,totalPaid:0}];
 for(let m=1;m<=p.months && balance>0.005;m++){
   const interest=balance*rate;
   let principalPaid=p.schedule==='sac'?p.principal/p.months:fixed-interest;
   principalPaid=clamp(principalPaid+p.extra,0,balance);
   const payment=principalPaid+interest;
   balance=Math.max(0,balance-principalPaid);
   totalInterest+=interest;totalPaid+=payment;
   rows.push({month:m,balance:round(balance),interest:round(interest),principalPaid:round(principalPaid),payment:round(payment),totalInterest:round(totalInterest),totalPaid:round(totalPaid)});
 }
 return {rows,final:rows.at(-1),monthsReached:rows.length-1,mode:'debt',annual:p.annual};
}
const round=n=>Math.round((n+Number.EPSILON)*100)/100;
function calculate(raw){
 const p=validate(raw);
 if(p.mode==='debt')return {input:p,base:debtRows(p),bear:null,bull:null};
 const base=investmentRows(p),bear=investmentRows(p,clamp(p.annual-5,-95,100)),bull=investmentRows(p,clamp(p.annual+5,-95,100));
 return {input:p,base,bear,bull};
}
global.KX=global.KX||{};
global.KX.Simulation=Object.freeze({calculate,annualToMonthly,round,validate});
if(typeof module!=='undefined')module.exports={calculate,annualToMonthly,round,validate};
})(typeof window!=='undefined'?window:globalThis);
