/**
 * KERDEX Beta 2.0 — accessible interaction layer, no external services.
 * This is an interface prototype, NOT a production financial application.
 */
(function(){
'use strict';
const s=KX.state,F=KX.Finance,U=KX.UI,S=KX.Store;
const root=document.getElementById('app');
const dialog=document.getElementById('entry-dialog');
const dialogContent=document.getElementById('dialog-content');
const toastNode=document.getElementById('toast');let toastTimer;
const t=k=>U.t(k),money=x=>U.money(x),e=x=>U.escape(x),icon=(n,z)=>U.icon(n,z);
const NAV=[['overview','grid','navOverview'],['finance','wallet','navFinance'],['purchases','bag','navPurchases'],['goals','target','navGoals'],['investments','chart','navInvestments'],['news','book','navNews'],['simulator','calculator','navSimulator'],['settings','settings','navSettings']];
const logo=(compact=false)=>`<span class="wordmark ${compact?'wordmark-compact':''}"><img src="assets/brand/kerdex-symbol-from-board.png" width="38" height="43" alt=""><span>KERDEX</span></span>`;
const labelFor=key=>t(key).replace(/<[^>]*>/g,'');
function metric(label,cents,kind='neutral',sub=''){
  return U.card(`<div class="metric-label">${e(label)}</div><div class="metric-value ${kind}">${money(cents)}</div>${sub?`<div class="metric-caption">${e(sub)}</div>`:''}`,'metric-card');
}
function monthSelector(){
  const opts=Array.from({length:13},(_,i)=>F.monthShift(F.monthKey(new Date()),-i));
  if(!opts.includes(s.month))opts.push(s.month);
  return `<label class="period-control">${icon('calendar',16)}<span class="sr-only">${e(t('period'))}</span><select id="month-select" aria-label="${e(t('period'))}">${opts.map(key=>`<option value="${key}" ${key===s.month?'selected':''}>${e(F.monthLabel(key,s.locale))}</option>`).join('')}</select>${icon('chevron',14)}</label>`;
}
function topBar(){
  return `<header class="topbar"><button class="mobile-brand" type="button" data-page="home" aria-label="KERDEX home">${logo(true)}</button><div class="topbar-context"><span class="topbar-indicator"></span><span>${e(t('demoShort'))}</span><span class="topbar-slash">/</span><strong>${e(t((NAV.find(x=>x[0]===s.page)||['home',0,'navHome'])[2]))}</strong></div><div class="topbar-right"><div class="demo-pill">${icon('shield',15)}<span>${e(t('securityTag'))}</span></div><label class="lang-select" aria-label="${e(t('language'))}">${icon('globe',16)}<select id="lang-top" aria-label="${e(t('language'))}"><option value="pt-BR" ${s.locale==='pt-BR'?'selected':''}>PT</option><option value="en-US" ${s.locale==='en-US'?'selected':''}>EN</option><option value="es-ES" ${s.locale==='es-ES'?'selected':''}>ES</option></select>${icon('chevron',13)}</label></div></header>`;
}
function sidebar(){
  return `<aside class="sidebar"><button type="button" data-page="home" class="sidebar-logo" aria-label="KERDEX — ${e(t('navHome'))}">${logo()}</button><div class="side-label">${e(t('workspace'))} <span>${e(t('beta'))}</span></div><nav class="side-nav" aria-label="${e(t('navHome'))}">${NAV.map(([p,ic,k])=>`<button class="side-item ${s.page===p?'selected':''}" ${s.page===p?'aria-current="page"':''} data-page="${p}">${icon(ic,20)}<span>${e(t(k))}</span>${s.page===p?`<span class="active-marker"></span>`:''}</button>`).join('')}</nav><div class="sidebar-spacer"></div><div class="sidebar-card"><div class="sidebar-card-icon">${icon('sparkle',20)}</div><div class="side-mini-title">${e(t('tagline'))}</div><p>${e(t('sideMicro'))}</p><div class="side-mini-line"></div><span>${e(t('beta'))} · ${e(t('demoShort'))}</span></div><div class="sidebar-bottom"><img src="assets/icons/icon-48.png" alt="" width="28" height="28"><div><strong>KERDEX</strong><small>${e(t('company'))}</small></div></div></aside>`;
}
function bottomBar(){
  const basic=[['overview','grid','navOverview'],['finance','wallet','navFinance'],['purchases','bag','navPurchases'],['goals','target','navGoals']];
  return `<nav class="bottom-nav" aria-label="${e(t('navHome'))}">${basic.map(([p,ic,k])=>`<button data-page="${p}" type="button" class="bottom-item ${s.page===p?'selected':''}" ${s.page===p?'aria-current="page"':''}>${icon(ic,20)}<span>${e(t(k))}</span></button>`).join('')}<button type="button" data-action="mobile-more" aria-expanded="${s.menuOpen?'true':'false'}" class="bottom-item ${['home','investments','news','simulator','settings'].includes(s.page)?'selected':''}">${icon('menu',20)}<span>${e(t('navMore'))}</span></button></nav>${s.menuOpen?`<div class="mobile-more-menu"><button type="button" data-page="home">${icon('home',18)}${e(t('navHome'))}</button><button type="button" data-page="investments">${icon('chart',18)}${e(t('navInvestments'))}</button><button type="button" data-page="news">${icon('book',18)}${e(t('navNews'))}</button><button type="button" data-page="simulator">${icon('calculator',18)}${e(t('navSimulator'))}</button><button type="button" data-page="settings">${icon('settings',18)}${e(t('navSettings'))}</button></div>`:''}`;
}
function transactionRow(row,canEdit=false){
  const sign=row.type==='income'?'+':'−';
  const img=row.type==='income'?'trending':'wallet';
  return `<div class="transaction-row"><div class="transaction-icon ${row.type}">${icon(img,19)}</div><div class="transaction-info"><strong>${e(KX.localizeDemoName(row.name,s.locale))}</strong><span>${e(t(row.category))} <span aria-hidden="true">·</span> ${e(F.dateLabel(row.date,s.locale))}</span></div><div class="transaction-end"><strong class="${row.type==='income'?'positive':'negative'}">${sign} ${money(row.cents)}</strong>${canEdit?`<div class="row-actions"><button type="button" data-edit="transaction:${row.id}" aria-label="${e(t('edit'))}: ${e(KX.localizeDemoName(row.name,s.locale))}" title="${e(t('edit'))}">${icon('edit',16)}</button><button type="button" data-delete="transaction:${row.id}" aria-label="${e(t('delete'))}: ${e(KX.localizeDemoName(row.name,s.locale))}" title="${e(t('delete'))}">${icon('trash',16)}</button></div>`:''}</div></div>`;
}
function goalCard(g){
  const p=F.progress(g.saved,g.cents);
  return `<article class="card item-card"><div class="item-top"><div class="item-icon goal-icon">${icon('target',20)}</div><div class="item-actions"><span class="priority priority-${g.priority||'medium'}">${e(t('priority'+(g.priority||'medium')[0].toUpperCase()+(g.priority||'medium').slice(1)))}</span><button type="button" data-edit="goal:${g.id}" aria-label="${e(t('edit'))}: ${e(KX.localizeDemoName(g.name,s.locale))}">${icon('edit',17)}</button><button type="button" data-delete="goal:${g.id}" aria-label="${e(t('delete'))}: ${e(KX.localizeDemoName(g.name,s.locale))}">${icon('trash',17)}</button></div></div><h3>${e(KX.localizeDemoName(g.name,s.locale))}</h3><div class="goal-money"><strong>${money(g.saved)}</strong><span>/ ${money(g.cents)}</span></div>${U.progress(g.saved,g.cents,true)}<div class="progress-caption"><span>${e(t('progress'))}</span><strong>${p}% ${p===100?`· ${e(t('completed'))}`:''}</strong></div></article>`;
}
function purchaseCard(p){
  const remaining=Math.max(0,p.cents-p.saved),months=F.monthsToGoal(p.saved,p.cents,p.monthly),date=F.projectedLabel(p.saved,p.cents,p.monthly,s.locale);
  const monthlyCash=F.totals(s.transactions,s.month).net;
  let impact=monthlyCash>0?`${Math.round(p.monthly/monthlyCash*100)}%`:t('noPositiveBudget');
  return `<article class="card purchase-card"><div class="item-top"><div class="item-icon bag-icon">${icon('bag',20)}</div><div class="item-actions"><span class="priority priority-${p.priority}">${e(t('priority'+p.priority[0].toUpperCase()+p.priority.slice(1)))}</span><button type="button" data-edit="purchase:${p.id}" aria-label="${e(t('edit'))}: ${e(KX.localizeDemoName(p.name,s.locale))}">${icon('edit',16)}</button><button type="button" data-delete="purchase:${p.id}" aria-label="${e(t('delete'))}: ${e(KX.localizeDemoName(p.name,s.locale))}">${icon('trash',16)}</button></div></div><h3>${e(KX.localizeDemoName(p.name,s.locale))}</h3><div class="purchase-price">${money(p.cents)}</div>${U.progress(p.saved,p.cents)}<div class="purchase-divider"></div><div class="purchase-facts"><span>${e(t('remaining'))}</span><strong>${money(remaining)}</strong><span>${e(t('monthlyContribution'))}</span><strong>${money(p.monthly)}</strong><span>${e(t('deadline'))}</span><strong>${date?e(date):e(t('notPossible'))}</strong></div><div class="purchase-estimate">${icon('info',15)}<span>${e(t('budgetImpact'))}: <strong>${e(impact)}</strong></span></div></article>`;
}
function trendChart(){
  const history=F.history(s.transactions,s.month,6),max=Math.max(1,...history.flatMap(m=>[m.income,m.expense]));
  const content=history.map(d=>`<div class="chart-group" title="${e(F.monthLabel(d.key,s.locale))}"><div class="chart-bars"><div class="chart-bar bar-income" data-height="${(d.income/max*100).toFixed(2)}"></div><div class="chart-bar bar-expense" data-height="${(d.expense/max*100).toFixed(2)}"></div></div><small>${e(F.monthLabel(d.key,s.locale,true))}</small></div>`).join('');
  return U.card(`${U.sectionHead(t('monthlyTrend'),U.badge(t('demoShort')))}<div class="chart-area" role="img" aria-label="${e(t('chartAlt'))}">${content}</div><div class="chart-legend"><span><i class="legend-dot income-dot"></i>${e(t('income'))}</span><span><i class="legend-dot expense-dot"></i>${e(t('expenses'))}</span></div><div class="sr-only chart-data-accessible"><table><caption>${e(t('chartAlt'))}</caption><thead><tr><th>${e(t('period'))}</th><th>${e(t('income'))}</th><th>${e(t('expenses'))}</th></tr></thead><tbody>${history.map(x=>`<tr><th>${e(F.monthLabel(x.key,s.locale))}</th><td>${money(x.income)}</td><td>${money(x.expense)}</td></tr>`).join('')}</tbody></table></div>`,'chart-card');
}
function progressOverview(){
  return U.card(`${U.sectionHead(t('goalsPreview'),U.link(t('viewAll'),'goals'))}${s.goals.slice(0,3).map(g=>`<div class="compact-goal"><div class="compact-line"><span>${e(KX.localizeDemoName(g.name,s.locale))}</span><strong>${F.progress(g.saved,g.cents)}%</strong></div>${U.progress(g.saved,g.cents,true)}<small>${money(g.saved)} / ${money(g.cents)}</small></div>`).join('')||U.empty(t('emptyGoals'))}`,'goals-card');
}
function recentTransactions(){
  const rows=s.transactions.filter(x=>x.date.startsWith(s.month)).sort((a,b)=>b.date.localeCompare(a.date)).slice(0,4);
  return U.card(`${U.sectionHead(t('recent'),U.link(t('viewAll'),'finance'))}<div class="transaction-list">${rows.map(x=>transactionRow(x)).join('')||U.empty(t('emptyTransactions'))}</div>`,'recent-card');
}
function cashflowTeaser(){
  const m=F.totals(s.transactions,s.month),max=Math.max(m.income,m.expense,1);
  return U.card(`${U.sectionHead(t('cashflow'))}<div class="cashflow-bars"><div class="cashflow-line"><div class="cashflow-label"><span>${e(t('income'))}</span><strong>${money(m.income)}</strong></div><div class="cashflow-track"><span class="cashflow-fill positive-bg" data-progress="${(m.income/max*100).toFixed(2)}"></span></div></div><div class="cashflow-line"><div class="cashflow-label"><span>${e(t('expenses'))}</span><strong>${money(m.expense)}</strong></div><div class="cashflow-track"><span class="cashflow-fill lime-bg" data-progress="${(m.expense/max*100).toFixed(2)}"></span></div></div><div class="result-band"><span>${e(t('netFlow'))}</span><strong class="${m.net>=0?'positive':'negative'}">${money(m.net)}</strong></div></div>`,'cashflow-card');
}
function overview(){
  const m=F.totals(s.transactions,s.month);const actions=U.button(t('addTransaction'),'create-transaction','primary','plus');
  const cards=`<div class="metric-grid">${metric(t('income'),m.income,'positive',F.monthLabel(s.month,s.locale))}${metric(t('expenses'),m.expense,'neutral',F.monthLabel(s.month,s.locale))}${metric(t('netFlow'),m.net,m.net>=0?'positive':'negative',t('netFlowInfo'))}</div>`;
  return `${U.head('KERDEX / '+t('navOverview'),t('overviewGreeting'),t('overviewSubtitle'),`${monthSelector()}${actions}`)}<div class="welcome-strip"><div class="welcome-orbit">${icon('sparkle',17)}<span>${e(t('tagline'))}</span></div><div>${e(t('demoWarning'))}</div></div>${cards}<div class="dashboard-main">${s.widgets.trend?trendChart():cashflowTeaser()}${s.widgets.goals?progressOverview():cashflowTeaser()}</div><div class="dashboard-lower">${s.widgets.recent?recentTransactions():cashflowTeaser()}${U.card(`${U.sectionHead(t('quickActions'))}<p class="quick-copy">${e(t('actionTip'))}</p><div class="quick-button-grid"><button data-action="create-transaction">${icon('wallet',20)}<span>${e(t('addTransaction'))}</span>${icon('arrow',17)}</button><button data-action="create-purchase">${icon('bag',20)}<span>${e(t('addPurchase'))}</span>${icon('arrow',17)}</button><button data-action="create-goal">${icon('target',20)}<span>${e(t('addGoal'))}</span>${icon('arrow',17)}</button><button data-page="simulator">${icon('calculator',20)}<span>${e(t('navSimulator'))}</span>${icon('arrow',17)}</button></div>`,'quick-card')}</div>`;
}
function home(){
  const totals=F.totals(s.transactions,F.monthKey(new Date()));
  return `<div class="home-container"><section class="hero-section"><div class="hero-orbit orbit-one"></div><div class="hero-orbit orbit-two"></div><div class="hero-content"><div class="hero-eyebrow"><i></i>${e(t('homeEyebrow'))}</div><h1>${e(t('heroLine1'))}<br><em>${e(t('heroLine2'))}</em></h1><p>${e(t('heroCopy'))}</p><div class="hero-actions">${U.button(t('explore'),'go-overview','lime','arrow')}<button class="button button-outline-light" data-scroll="features" type="button">${e(t('learnMore'))}</button></div><div class="hero-proof">${icon('shield',18)} <span>${e(t('demoWarning'))}</span></div></div><div class="hero-visual"><div class="visual-glow"></div><div class="hero-preview"><div class="hero-preview-head"><img src="assets/icons/icon-48.png" alt="" width="34" height="34"><span>KERDEX <small>${e(t('workspace'))}</small></span><span class="preview-dots">•••</span></div><div class="preview-overline">${e(t('heroCard'))}</div><div class="preview-amount">${money(totals.net)}</div><div class="preview-label">${e(t('heroBudget'))} · ${e(t('previewBadge'))}</div><div class="preview-bars">${[38,55,47,69,61,84,78,94,72,95,83,105].map((n,i)=>`<span class="${i>8?'bright':''}" data-height="${n}"></span>`).join('')}</div><div class="preview-divider"></div><div class="preview-goal"><div class="goal-icon">${icon('target',21)}</div><div><span>${e(t('heroGoal'))}</span><strong>${e(KX.localizeDemoName(s.goals[0]?.name||t('navGoals'),s.locale))}</strong></div><b>${F.progress(s.goals[0]?.saved||0,s.goals[0]?.cents||1)}%</b></div>${U.progress(s.goals[0]?.saved||0,s.goals[0]?.cents||1,true)}</div></div></section>
    <section id="features" class="home-section features-section"><div class="home-eyebrow">${e(t('featuresEyebrow'))}</div><div class="home-section-head"><h2>${e(t('featuresTitle'))}</h2><div class="section-small-rule"></div></div><div class="features-grid">${[['wallet','featureFinance','featureFinanceDesc','finance'],['bag','featureShopping','featureShoppingDesc','purchases'],['target','featureGoals','featureGoalsDesc','goals'],['calculator','featureTools','featureToolsDesc','simulator'],['chart','featureInvest','featureInvestDesc','investments'],['book','featureNews','featureNewsDesc','news']].map(([i,title,desc,p])=>`<button type="button" data-page="${p}" class="feature-card"><div class="feature-icon">${icon(i,24)}</div><h3>${e(t(title))}</h3><p>${e(t(desc))}</p><span>${icon('arrow',19)}</span></button>`).join('')}</div></section>
    <section class="home-section product-section"><div class="product-copy"><div class="home-eyebrow">${e(t('previewEyebrow'))}</div><h2>${e(t('previewTitle'))}</h2><p>${e(t('previewCopy'))}</p>${U.button(t('explore'),'go-overview','primary','arrow')}<div class="product-foot">${icon('shield',17)} ${e(t('securityTag'))}</div></div><div class="product-card"><div class="product-card-top">${logo(true)}<span>${e(t('previewBadge'))}</span></div><div class="product-card-row"><span>${e(t('income'))}</span><strong>${money(totals.income)}</strong></div><div class="product-card-row"><span>${e(t('expenses'))}</span><strong>${money(totals.expense)}</strong></div><div class="product-card-main"><small>${e(t('netFlow'))}</small><strong>${money(totals.net)}</strong></div><div class="product-card-chart">${[24,53,38,60,49,72,58,92,66,96].map(n=>`<span data-height="${n}"></span>`).join('')}</div></div></section>
    <section class="brand-art-section brand-art-localized"><div class="brand-art-inner"><img loading="lazy" src="assets/brand/kerdex-symbol-from-board.png" alt="" width="86" height="96"><div class="brand-art-copy"><div class="eyebrow">KERDEX</div><h2>${e(t('bannerTitle'))}</h2><p>${e(t('bannerCopy'))}</p></div></div><span aria-hidden="true" class="brand-art-glow"></span></section>
    <section class="home-section roadmap-section"><div class="home-eyebrow">${e(t('roadmapEyebrow'))}</div><h2>${e(t('roadmapTitle'))}</h2><p>${e(t('roadmapCopy'))}</p><div class="roadmap-grid">${[['chart','roadmapMarketData'],['sparkle','roadmapAI'],['book','roadmapAcademy'],['trending','roadmapTrade']].map(([i,key])=>`<div class="roadmap-item">${icon(i,20)}<span>${e(t(key))}</span>${U.badge(t('planned'))}</div>`).join('')}</div></section></div>`;
}
function finance(){
  const m=F.totals(s.transactions,s.month);
  const list=s.transactions.filter(x=>x.date.startsWith(s.month)).filter(x=>s.financeType==='all'||x.type===s.financeType).filter(x=>`${x.name} ${t(x.category)}`.toLocaleLowerCase(s.locale).includes(s.financeQuery.toLocaleLowerCase(s.locale))).sort((a,b)=>b.date.localeCompare(a.date)||b.id-a.id);
  const c=F.categoryTotals(s.transactions,s.month),total=c.reduce((acc,x)=>acc+x.cents,0);
  return `${U.head('KERDEX / '+t('navFinance'),t('financeTitle'),t('financeSubtitle'),`${monthSelector()}${U.button(t('addTransaction'),'create-transaction','primary','plus')}`)}<div class="metric-grid">${metric(t('income'),m.income,'positive')}${metric(t('expenses'),m.expense,'neutral')}${metric(t('netFlow'),m.net,m.net>=0?'positive':'negative',t('netFlowInfo'))}</div><div class="finance-layout">${U.card(`${U.sectionHead(t('transactions'),U.badge(String(list.length)))}<div class="filter-row"><label class="search-wrap">${icon('filter',17)}<span class="sr-only">${e(t('search'))}</span><input id="finance-search" type="search" value="${e(s.financeQuery)}" placeholder="${e(t('searchPlaceholder'))}" maxlength="80"></label><label class="filter-select"><span class="sr-only">${e(t('filterType'))}</span><select id="finance-type"><option value="all" ${s.financeType==='all'?'selected':''}>${e(t('allTypes'))}</option><option value="expense" ${s.financeType==='expense'?'selected':''}>${e(t('expense'))}</option><option value="income" ${s.financeType==='income'?'selected':''}>${e(t('incomeSingular'))}</option></select>${icon('chevron',15)}</label></div><div id="finance-results" class="transaction-list">${list.length?list.map(x=>transactionRow(x,true)).join(''):U.empty(t('emptyGeneric'))}</div>`,'finance-list')}${U.card(`${U.sectionHead(t('topExpenses'))}<div class="category-list">${c.length?c.slice(0,5).map(x=>`<div class="category-row"><div class="category-top"><span>${e(t(x.category))}</span><strong>${money(x.cents)}</strong></div><div class="category-track"><span data-progress="${(x.cents/Math.max(total,1)*100).toFixed(2)}"></span></div></div>`).join(''):U.empty(t('emptyTransactions'))}</div>`,'category-card')}</div>`;
}
function purchases(){
  const all=s.purchases,tc=all.reduce((a,x)=>a+x.cents,0),saved=all.reduce((a,x)=>a+x.saved,0);
  return `${U.head('KERDEX / '+t('navPurchases'),t('purchaseTitle'),t('purchaseSubtitle'),U.button(t('addPurchase'),'create-purchase','primary','plus'))}<div class="metric-grid"><section class="card metric-card"><div class="metric-label">${e(t('wishCount'))}</div><div class="metric-value">${all.length}</div></section>${metric(t('totalPlanned'),tc)}${metric(t('reservedTotal'),saved,'positive')}</div><div class="items-grid">${all.length?all.map(purchaseCard).join(''):U.empty(t('emptyPurchases'),U.button(t('addPurchase'),'create-purchase','secondary','plus'))}</div>`;
}
function goals(){return `${U.head('KERDEX / '+t('navGoals'),t('goalsTitle'),t('goalsSubtitle'),U.button(t('addGoal'),'create-goal','primary','plus'))}<div class="goals-intro"><div class="intro-icon">${icon('target',24)}</div><div><strong>${s.goals.length} ${e(t('goalCount')).toLocaleLowerCase(s.locale)}</strong><p>${e(t('sideMicro'))}</p></div></div><div class="items-grid">${s.goals.length?s.goals.map(goalCard).join(''):U.empty(t('emptyGoals'),U.button(t('addGoal'),'create-goal','secondary','plus'))}</div>`;}
function simulator(){
  return `${U.head('KERDEX / '+t('navSimulator'),t('simTitle'),t('simSubtitle'))}<div class="simulation-layout">${U.card(`<div class="section-head"><h2>${e(t('simResult'))}</h2>${U.badge(t('demoShort'))}</div><form id="calculator-form" class="calculator-form"><label>${e(t('simTarget'))}<input name="target" type="number" required min="0.01" max="1000000000" step="0.01" inputmode="decimal" value="7500.00"></label><label>${e(t('simSaved'))}<input name="saved" type="number" required min="0" max="1000000000" step="0.01" inputmode="decimal" value="1500.00"></label><label>${e(t('simMonthly'))}<input name="monthly" type="number" required min="0" max="1000000000" step="0.01" inputmode="decimal" value="500.00"></label><button type="submit" class="button button-primary">${icon('calculator',17)} ${e(t('calc'))}</button></form>`,'calculator-card')}<div id="calculator-result" class="calculator-result" aria-live="polite">${buildSimulation(750000,150000,50000)}</div></div>`;
}
function buildSimulation(target,saved,monthly){
  const remaining=Math.max(0,target-saved),months=F.monthsToGoal(saved,target,monthly),date=F.projectedLabel(saved,target,monthly,s.locale);
  return `<div class="sim-result-head">${icon('sparkle',21)}<span>${e(t('simResult'))}</span></div><div class="sim-primary">${months===null?'—':months===0?'0':months}<span>${e(t('monthUnit'))}</span></div><p>${months===null?e(t('simNever')):months===0?e(t('simToday')):`${e(t('simUntil'))}: <strong>${e(date)}</strong>`}</p><div class="sim-mini"><span>${e(t('simCost'))}</span><strong>${money(remaining)}</strong></div>${U.progress(saved,target)}<div class="sim-notice">${icon('info',18)}<span>${e(t('simNoInterest'))}</span></div>`;
}
function toggleSetting(key,label,checked){return `<label class="toggle-line"><span>${e(label)}</span><input type="checkbox" data-setting="${key}" role="switch" ${checked?'checked':''}><span class="switch" aria-hidden="true"></span></label>`;}
function settings(){
  return `${U.head('KERDEX / '+t('navSettings'),t('settingsTitle'),t('settingsSubtitle'))}<div class="settings-grid">${U.card(`${U.sectionHead(t('appearance'))}<label class="settings-label" for="locale-preference">${e(t('language'))}</label><select class="settings-select" id="locale-preference"><option value="pt-BR" ${s.locale==='pt-BR'?'selected':''}>Português (Brasil)</option><option value="en-US" ${s.locale==='en-US'?'selected':''}>English (US)</option><option value="es-ES" ${s.locale==='es-ES'?'selected':''}>Español</option></select><div class="settings-label">${e(t('theme'))}</div><div class="theme-choice" role="group" aria-label="${e(t('chooseTheme'))}"><button type="button" data-theme="light" aria-pressed="${s.theme==='light'}" class="theme-option ${s.theme==='light'?'active':''}">${icon('sun',18)}${e(t('themeLight'))}</button><button type="button" data-theme="dark" aria-pressed="${s.theme==='dark'}" class="theme-option ${s.theme==='dark'?'active':''}">${icon('moon',18)}${e(t('themeDark'))}</button></div>${toggleSetting('compact',t('compact'),s.compact)}`,'settings-card')}${U.card(`${U.sectionHead(t('dashboardWidgets'))}${toggleSetting('trend',t('showTrend'),s.widgets.trend)}${toggleSetting('goals',t('showGoals'),s.widgets.goals)}${toggleSetting('recent',t('showRecent'),s.widgets.recent)}<p class="settings-note">${e(t('actionTip'))}</p>`,'settings-card')}${U.card(`${U.sectionHead(t('privacy'))}<div class="security-callout">${icon('shield',22)}<div><strong>${e(t('securityTag'))}</strong><p>${e(t('privacyInfo'))}</p></div></div><p class="settings-note">${e(t('privacyInfo2'))}</p><div class="settings-label">${e(t('currencyLabel'))}</div><div class="readonly-setting">${e(t('currencyFixed'))}</div><p class="settings-note">${e(t('currencyInfo'))}</p>`,'settings-card')}${U.card(`${U.sectionHead(t('localDemo'))}${toggleSetting('remember',t('localDemo'),s.remember)}<p class="settings-note">${e(t('localDemoInfo'))}</p>${U.badge(s.remember?t('localDemoOn'):t('localDemoOff'),'neutral')}<div class="reset-area">${U.button(t('resetDemo'),'reset-demo','danger','trash')}</div>`,'settings-card')}</div>`;
}
function footer(){return `<footer class="app-footer"><div class="footer-wordmark"><img src="assets/icons/icon-32.png" width="24" height="24" alt=""><strong>KERDEX</strong><span>© ${new Date().getFullYear()}</span></div><div>${e(t('footerText'))}</div></footer>`;}
function render(){
  document.documentElement.lang=s.locale;
  document.documentElement.dataset.theme=s.theme;
  document.documentElement.classList.toggle('compact-ui',s.compact);
  document.title=`KERDEX — ${t((NAV.find(x=>x[0]===s.page)||['home',0,'navHome'])[2])}`;
  const content=({home,overview,finance,purchases,goals,simulator:KX.Features.simulator,investments:KX.Features.investments,news:KX.Features.news,settings}[s.page]||home)();
  root.innerHTML=`<div class="app-shell">${sidebar()}<div class="main-column">${topBar()}<main id="main-content" tabindex="-1" class="main-content ${s.page==='home'?'home-main':''}">${content}${footer()}</main></div></div>${bottomBar()}`;
  applyFillLevels();KX.Features.afterRender(s.page);
}
function applyFillLevels(){
  // Setting CSS properties from bounded numeric data does not require unsafe inline HTML.
  root.querySelectorAll('[data-progress]').forEach(el=>{el.style.width=`${Math.max(0,Math.min(100,Number(el.dataset.progress)||0))}%`;});
  root.querySelectorAll('[data-height]').forEach(el=>{el.style.height=`${Math.max(2,Math.min(100,Number(el.dataset.height)||0))}%`;});
}
KX.Features.renderApp=render;KX.Features.toast=announce;
function announce(message){toastNode.textContent=message;toastNode.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toastNode.classList.remove('visible'),3400);}
function navigate(page){
  if(!['home','overview','finance','purchases','goals','investments','news','simulator','settings'].includes(page))return;
  s.page=page;s.menuOpen=false;
  if(location.hash!==`#${page}`)history.pushState(null,'',`#${page}`);
  render();scrollTo({top:0,behavior:'instant'});
}
function openForm(kind,id=null){
  const collection={transaction:'transactions',purchase:'purchases',goal:'goals'}[kind];
  if(!collection)return;
  const item=id===null?null:s[collection].find(x=>x.id===id);
  if(id!==null&&!item)return;
  const heading=t((item?'edit':'new')+kind[0].toUpperCase()+kind.slice(1));
  const field=(key,label,value,extra='')=>`<label class="modal-field"><span>${e(label)}</span><input name="${key}" ${extra} value="${e(value)}"></label>`;
  const num=(key,label,value,required=true)=>field(key,label,F.inputAmount(value),`type="number" min="${required?'.01':'0'}" max="1000000000" step="0.01" inputmode="decimal" required`);
  let fields=field('name',t('name'),item?.name||'',`type="text" required maxlength="80" autocomplete="off"`);
  fields+=num('amount',kind==='purchase'?t('price'):kind==='goal'?t('target'):t('amount'),item?.cents||0);
  if(kind==='transaction'){
    fields+=`<label class="modal-field"><span>${e(t('type'))}</span><select name="type"><option value="expense" ${item?.type!=='income'?'selected':''}>${e(t('expense'))}</option><option value="income" ${item?.type==='income'?'selected':''}>${e(t('incomeSingular'))}</option></select></label>`;
    fields+=`<label class="modal-field"><span>${e(t('category'))}</span><select name="category">${['work','housing','food','transport','health','leisure','other'].map(k=>`<option value="${k}" ${item?.category===(k)?'selected':''}>${e(t(k))}</option>`).join('')}</select></label>`;
    fields+=field('date',t('date'),item?.date||F.dateISO(new Date()),'type="date" required');
  } else {
    fields+=num('saved',t('saved'),item?.saved||0,false);
    if(kind==='purchase'){
      fields+=num('monthly',t('monthlyContribution'),item?.monthly??30000,false);
      fields+=`<label class="modal-field"><span>${e(t('purchasePriority'))}</span><select name="priority">${['high','medium','low'].map(k=>`<option value="${k}" ${item?.priority===k?'selected':''}>${e(t('priority'+k[0].toUpperCase()+k.slice(1)))}</option>`).join('')}</select></label>`;
    }
    if(kind==='goal')fields+=`<label class="modal-field"><span>${e(t('purchasePriority'))}</span><select name="priority">${['high','medium','low'].map(k=>`<option value="${k}" ${(item?.priority||'medium')===k?'selected':''}>${e(t('priority'+k[0].toUpperCase()+k.slice(1)))}</option>`).join('')}</select></label>`;
  }
  dialogContent.innerHTML=`<div class="dialog-header"><div><div class="eyebrow">KERDEX · ${e(t('demoShort'))}</div><h2 id="dialog-heading">${e(heading)}</h2></div><button class="dialog-close" type="button" data-dialog-close aria-label="${e(t('close'))}">${icon('close',20)}</button></div><form id="entry-form" data-kind="${kind}" data-id="${item?.id??''}"><div class="modal-grid">${fields}</div><div id="modal-error" class="form-error" role="alert"></div><div class="modal-actions"><button class="button button-secondary" type="button" data-dialog-close>${e(t('cancel'))}</button><button class="button button-primary" type="submit">${icon('check',17)}${e(t('save'))}</button></div></form><p class="modal-footnote">${icon('shield',15)} ${e(t('demoWarning'))}</p>`;
  dialog.showModal();
}
function validateAndSave(form){
  const kind=form.dataset.kind,id=form.dataset.id?Number(form.dataset.id):null;
  const data=new FormData(form),name=String(data.get('name')||'').trim();
  const amount=F.parseCents(data.get('amount'));
  const saved=F.parseCents(data.get('saved')??'0');
  const monthly=F.parseCents(data.get('monthly')??'0');
  let error=null;
  if(!name||name.length>80)error=t('errorName');
  else if(amount===null||amount<=0)error=t('errorAmount');
  else if(saved===null||saved>amount)error=t('errorSaved');
  else if(monthly===null)error=t('errorMonthly');
  const item={name,cents:amount};
  if(kind==='transaction'){
    item.type=String(data.get('type'));
    item.category=String(data.get('category'));
    item.date=String(data.get('date'));
    if(!['income','expense'].includes(item.type)||!['work','housing','food','transport','health','leisure','other'].includes(item.category)||!F.validateDate(item.date))error=t('errorInvalid');
    if(!error)s.month=item.date.slice(0,7);
  }else if(kind==='purchase'){
    item.saved=saved;item.monthly=monthly;item.priority=String(data.get('priority'));
    if(!['high','medium','low'].includes(item.priority))error=t('errorInvalid');
  }else if(kind==='goal'){item.saved=saved;item.priority=String(data.get('priority')||'medium');if(!['high','medium','low'].includes(item.priority))error=t('errorInvalid');}
  else error=t('errorInvalid');
  if(error){document.getElementById('modal-error').textContent=error;return;}
  if(id===null)S.add(kind,item);else S.update(kind,id,item);
  dialog.close();render();announce(t('savedSuccessfully'));
}
root.addEventListener('click',ev=>{
  const page=ev.target.closest('[data-page]');if(page){navigate(page.dataset.page);return;}
  const scroll=ev.target.closest('[data-scroll]');if(scroll){document.getElementById(scroll.dataset.scroll)?.scrollIntoView({behavior:'smooth',block:'start'});return;}
  if(KX.Features.handleClick(ev))return;
  const action=ev.target.closest('[data-action]');
  if(action){const a=action.dataset.action;
    if(a.startsWith('create-'))openForm(a.slice(7));
    else if(a==='go-overview')navigate('overview');
    else if(a==='mobile-more'){s.menuOpen=!s.menuOpen;render();}
    else if(a==='reset-demo'&&confirm(t('resetConfirm'))){S.reset();s.month=F.monthKey(new Date());render();announce(t('resetToast'));}
    return;
  }
  const edit=ev.target.closest('[data-edit]');if(edit){const [kind,id]=edit.dataset.edit.split(':');openForm(kind,Number(id));return;}
  const del=ev.target.closest('[data-delete]');if(del){const [kind,id]=del.dataset.delete.split(':');if(confirm(t('confirmDelete'))){S.remove(kind,Number(id));render();announce(t('deletedSuccessfully'));}return;}
  const theme=ev.target.closest('[data-theme]');if(theme){s.theme=theme.dataset.theme;S.persist();render();}
});
root.addEventListener('change',ev=>{if(KX.Features.handleChange(ev))return;
  if(ev.target.id==='lang-top'||ev.target.id==='locale-preference'){s.locale=ev.target.value;S.persist();render();announce(t('toastLanguage'));}
  if(ev.target.id==='month-select'){s.month=ev.target.value;render();}
  if(ev.target.id==='finance-type'){s.financeType=ev.target.value;render();}
  if(ev.target.matches('[data-setting]')){
    const key=ev.target.dataset.setting;
    if(key==='remember')s.remember=ev.target.checked;
    else if(key==='compact')s.compact=ev.target.checked;
    else if(['trend','goals','recent'].includes(key))s.widgets[key]=ev.target.checked;
    S.persist();render();
  }
});
root.addEventListener('input',ev=>{
  if(ev.target.id==='finance-search'){
    const cursor=ev.target.selectionStart;
    s.financeQuery=ev.target.value;
    const parent=ev.target.closest('.finance-list');
    if(!parent)return;
    const matches=s.transactions.filter(x=>x.date.startsWith(s.month)).filter(x=>s.financeType==='all'||x.type===s.financeType).filter(x=>`${x.name} ${t(x.category)}`.toLocaleLowerCase(s.locale).includes(s.financeQuery.toLocaleLowerCase(s.locale))).sort((a,b)=>b.date.localeCompare(a.date));
    parent.querySelector('#finance-results').innerHTML=matches.length?matches.map(x=>transactionRow(x,true)).join(''):U.empty(t('emptyGeneric'));
    ev.target.setSelectionRange(cursor,cursor);
  }
});
root.addEventListener('submit',ev=>{if(KX.Features.handleSubmit(ev))return;
  if(ev.target.id==='calculator-form'){
    ev.preventDefault();
    const d=new FormData(ev.target),target=F.parseCents(d.get('target')),saved=F.parseCents(d.get('saved')),monthly=F.parseCents(d.get('monthly'));
    const el=document.getElementById('calculator-result');
    if([target,saved,monthly].some(v=>v===null)||target<=0||saved>target){el.textContent=t('errorInvalid');return;}
    el.innerHTML=buildSimulation(target,saved,monthly);applyFillLevels();
  }
});
dialog.addEventListener('click',ev=>{if(ev.target.closest('[data-dialog-close]'))dialog.close();});
dialog.addEventListener('submit',ev=>{if(ev.target.id==='entry-form'){ev.preventDefault();validateAndSave(ev.target);}});
window.addEventListener('popstate',()=>{const hash=location.hash.slice(1);s.page=['home','overview','finance','purchases','goals','investments','news','simulator','settings'].includes(hash)?hash:'home';render();});
window.addEventListener('hashchange',()=>{const hash=location.hash.slice(1);if(['home','overview','finance','purchases','goals','investments','news','simulator','settings'].includes(hash)&&s.page!==hash){s.page=hash;render();}});
const initial=location.hash.slice(1);if(['home','overview','finance','purchases','goals','investments','news','simulator','settings'].includes(initial))s.page=initial;
render();
})();
