/** Demo-only local state. NEVER treat this as storage for real financial information. */
window.KX = window.KX || {};
const F = KX.Finance;
const PREF_KEY='kerdex-ui-preferences-v2';
const DEMO_KEY='kerdex-fictional-demo-v2';
const CATEGORIES=['work','housing','food','transport','health','leisure','other'];
const textMax=(text,max=80)=>String(text??'').slice(0,max);
const safeInteger=(n,limit=100000000000)=>Number.isSafeInteger(n)&&n>=0&&n<=limit;
function demoSeed(){
  const today=new Date();const tx=[];let id=1;
  const types=[
    ['Salário',540000,'income','work',5],
    ['Aluguel',155000,'expense','housing',7],
    ['Supermercado',69500,'expense','food',11],
    ['Transporte',32000,'expense','transport',15],
    ['Contas e serviços',27800,'expense','other',19],
    ['Projeto extra',47000,'income','work',20],
    ['Lazer',18900,'expense','leisure',22]
  ];
  for(let offset=-5;offset<=0;offset++){
    const stamp=new Date(today.getFullYear(),today.getMonth()+offset,1);
    const multiplier=1+((offset+5)%3-1)*.055;
    for(const [name,amount,type,category,day] of types){
      if(offset===0&&day>Math.max(today.getDate(),20))continue;
      tx.push({id:id++,name,cents:Math.round(amount*multiplier),type,category,date:F.dateISO(new Date(stamp.getFullYear(),stamp.getMonth(),day))});
    }
  }
  return {transactions:tx,purchases:[{id:101,name:'Notebook para estudos',cents:460000,saved:140000,monthly:55000,priority:'high'},{id:102,name:'Novo smartphone',cents:280000,saved:72000,monthly:30000,priority:'medium'}],goals:[{id:201,name:'Reserva de emergência',cents:1500000,saved:625000,priority:'high'},{id:202,name:'Viagem especial',cents:600000,saved:248000,priority:'medium'}]};
}
function checkTransaction(x){return x&&Number.isSafeInteger(x.id)&&typeof x.name==='string'&&x.name.length<=80&&safeInteger(x.cents)&&x.cents>0&&['income','expense'].includes(x.type)&&CATEGORIES.includes(x.category)&&F.validateDate(x.date);}
function checkPurchase(x){return x&&Number.isSafeInteger(x.id)&&typeof x.name==='string'&&x.name.length<=80&&safeInteger(x.cents)&&x.cents>0&&safeInteger(x.saved)&&x.saved<=x.cents&&safeInteger(x.monthly)&&['high','medium','low'].includes(x.priority);}
function checkGoal(x){return x&&Number.isSafeInteger(x.id)&&typeof x.name==='string'&&x.name.length<=80&&safeInteger(x.cents)&&x.cents>0&&safeInteger(x.saved)&&x.saved<=x.cents&&(!x.priority||['high','medium','low'].includes(x.priority));}
function parseStoredData(){
  try{
    const data=JSON.parse(localStorage.getItem(DEMO_KEY)||'null');
    if(!data||!Array.isArray(data.transactions)||!Array.isArray(data.purchases)||!Array.isArray(data.goals))return null;
    if([data.transactions.length,data.purchases.length,data.goals.length].some(n=>n>500))return null;
    if(!data.transactions.every(checkTransaction)||!data.purchases.every(checkPurchase)||!data.goals.every(checkGoal))return null;
    return data;
  }catch{return null;}
}
function loadPrefs(){try{return JSON.parse(localStorage.getItem(PREF_KEY)||'{}')||{};}catch{return {};}}
const prefs=loadPrefs();
const persisted={
  locale:['pt-BR','en-US','es-ES'].includes(prefs.locale)?prefs.locale:'pt-BR',
  theme:['light','dark'].includes(prefs.theme)?prefs.theme:'light',
  compact:!!prefs.compact,remember:!!prefs.remember,
  widgets:{trend:prefs.widgets?.trend!==false,goals:prefs.widgets?.goals!==false,recent:prefs.widgets?.recent!==false}
};
KX.state={
  page:'home',month:F.monthKey(new Date()),...persisted,
  ...((persisted.remember?parseStoredData():null)||demoSeed()),
  financeQuery:'',financeType:'all',modal:null,menuOpen:false
};
KX.Store={
  seed:demoSeed,
  persist(){
    const s=KX.state;
    try{
      localStorage.setItem(PREF_KEY,JSON.stringify({locale:s.locale,theme:s.theme,compact:s.compact,remember:s.remember,widgets:s.widgets}));
      if(s.remember)localStorage.setItem(DEMO_KEY,JSON.stringify({transactions:s.transactions,purchases:s.purchases,goals:s.goals}));
      else localStorage.removeItem(DEMO_KEY);
      KX.Features?.persist?.();
    }catch(e){console.warn('Local demo storage unavailable.',e);}
  },
  reset(){Object.assign(KX.state,demoSeed());this.persist();},
  add(kind,item){const key={transaction:'transactions',purchase:'purchases',goal:'goals'}[kind];if(!key)throw Error('Invalid demo collection');KX.state[key].push({...item,id:Date.now()+Math.floor(Math.random()*100000)});this.persist();},
  update(kind,id,item){const key={transaction:'transactions',purchase:'purchases',goal:'goals'}[kind];if(!key)throw Error('Invalid demo collection');const position=KX.state[key].findIndex(x=>x.id===id);if(position<0)return;KX.state[key][position]={...item,id};this.persist();},
  remove(kind,id){const key={transaction:'transactions',purchase:'purchases',goal:'goals'}[kind];if(!key)return;KX.state[key]=KX.state[key].filter(x=>x.id!==id);this.persist();}
};
