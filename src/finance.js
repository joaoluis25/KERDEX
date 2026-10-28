/** Financial calculation functions. Monetary values are integer centavos (BRL). */
window.KX = window.KX || {};
KX.Finance = Object.freeze({
  parseCents(value) {
    // HTML type=number submits ASCII decimals regardless of visual locale.
    const text = String(value ?? '').trim().replace(',', '.');
    if (!/^(?:\d{1,10})(?:\.\d{1,2})?$/.test(text)) return null;
    const [whole, fractional=''] = text.split('.');
    const cents = Number(whole)*100 + Number((fractional+'00').slice(0,2));
    return Number.isSafeInteger(cents) && cents >= 0 && cents <= 100000000000 ? cents : null;
  },
  inputAmount(cents) { return (cents / 100).toFixed(2); },
  money(cents, locale='pt-BR') {
    return new Intl.NumberFormat(locale, {style:'currency',currency:'BRL',minimumFractionDigits:2,maximumFractionDigits:2}).format(cents/100);
  },
  dateISO(date) { return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`; },
  monthKey(date) { return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}`; },
  monthShift(month, offset) {
    const [year,number]=month.split('-').map(Number);
    return this.monthKey(new Date(year, number-1+offset,1));
  },
  monthLabel(month,locale='pt-BR',short=false){
    const [y,m] = month.split('-').map(Number);
    return new Intl.DateTimeFormat(locale,{month:short?'short':'long',year:short?undefined:'numeric',timeZone:'UTC'}).format(new Date(Date.UTC(y,m-1,1)));
  },
  dateLabel(iso,locale='pt-BR') {
    if(!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return '—';
    const [y,m,d]=iso.split('-').map(Number);
    return new Intl.DateTimeFormat(locale,{day:'2-digit',month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(Date.UTC(y,m-1,d)));
  },
  totals(transactions,month){
    const sums={income:0,expense:0,net:0};
    for(const row of transactions){if(row.date.slice(0,7)!==month)continue;sums[row.type]+=row.cents;}
    sums.net=sums.income-sums.expense;return sums;
  },
  history(transactions,month,n=6){
    return Array.from({length:n},(_,i)=>{const key=this.monthShift(month,i-n+1);return {key,...this.totals(transactions,key)};});
  },
  progress(saved,target){return target>0?Math.min(100,Math.round(saved/target*100)):0;},
  monthsToGoal(saved,target,monthly){return saved>=target?0:monthly>0?Math.ceil((target-saved)/monthly):null;},
  projectedLabel(saved,target,monthly,locale='pt-BR'){
    const months=this.monthsToGoal(saved,target,monthly);
    if(months===null)return null;
    const now=new Date();
    const d=new Date(now.getFullYear(),now.getMonth()+months,1);
    return new Intl.DateTimeFormat(locale,{month:'short',year:'numeric'}).format(d);
  },
  categoryTotals(transactions,month){
    const map=new Map();
    for(const row of transactions){if(row.type!=='expense'||row.date.slice(0,7)!==month)continue;map.set(row.category,(map.get(row.category)||0)+row.cents);}
    return [...map].map(([category,cents])=>({category,cents})).sort((a,b)=>b.cents-a.cents);
  },
  validateDate(s){if(!/^\d{4}-\d{2}-\d{2}$/.test(s))return false;const [y,m,d]=s.split('-').map(Number);const x=new Date(Date.UTC(y,m-1,d));return x.getUTCFullYear()===y&&x.getUTCMonth()===m-1&&x.getUTCDate()===d;}
});
