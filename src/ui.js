/** Shared view helpers. HTML strings always escape user-supplied values. */
window.KX = window.KX || {};
KX.UI={
  escape(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));},
  icon(name,size=20){
    const paths={
      grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
      home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M9 21v-7h6v7"/>',
      wallet:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 9h18M17 16h1"/>',
      bag:'<path d="M4 8h16l-1 13H5L4 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/>',
      target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
      calculator:'<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M8 6h8M8 10h2m4 0h2M8 14h2m4 0h2M8 18h2m4 0h2"/>',
      settings:'<path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2 2-.2-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1.1 1.5V21h-3v-.2A1.7 1.7 0 0 0 10.6 19a1.7 1.7 0 0 0-1.9.3l-.1.1-2-2 .1-.2A1.7 1.7 0 0 0 7 15.4 1.7 1.7 0 0 0 5.5 14H5v-3h.4A1.7 1.7 0 0 0 7 9.8a1.7 1.7 0 0 0-.3-1.9l-.1-.1 2-2 .2.1a1.7 1.7 0 0 0 1.8.3A1.7 1.7 0 0 0 11.7 4V3h3v1a1.7 1.7 0 0 0 1.1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 2 2-.1.2a1.7 1.7 0 0 0-.3 1.8A1.7 1.7 0 0 0 21 10.2h.1v3h-.2A1.7 1.7 0 0 0 19.4 15Z"/>',
      arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',plus:'<path d="M12 5v14M5 12h14"/>',edit:'<path d="M16 4 20 8 9 19 4 20l1-5L16 4Z"/>',trash:'<path d="M4 7h16m-11 0V4h6v3M6 7l1 14h10l1-14M10 11v6m4-6v6"/>',chevron:'<path d="m7 10 5 5 5-5"/>',check:'<path d="m5 12 4 4L19 6"/>',close:'<path d="M5 5 19 19M19 5 5 19"/>',
      trending:'<path d="m3 17 6-6 4 4 8-8"/><path d="M15 7h6v6"/>',trendDown:'<path d="m3 7 6 6 4-4 8 8"/><path d="M15 17h6v-6"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18"/>',shield:'<path d="m12 22 8-5V6l-8-4-8 4v11z"/><path d="m9 12 2 2 4-4"/>',sparkle:'<path d="m12 3 1.9 6.1L20 11l-6.1 1.9L12 19l-1.9-6.1L4 11l6.1-1.9L12 3z"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>',moon:'<path d="M21 13a9 9 0 1 1-10-10 7 7 0 0 0 10 10Z"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10h.01"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',book:'<path d="M4 5h8a4 4 0 0 1 4 4v12H8a4 4 0 0 0-4 1V5Zm16 0h-8a4 4 0 0 0-4 4v12h8a4 4 0 0 1 4 1V5Z"/>',chart:'<path d="M3 3v18h18M7 17v-5m5 5V8m5 9V5"/>',layers:'<path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"/>', lock:'<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 1 1 8 0v3"/>',filter:'<path d="M4 7h16M7 12h10m-7 5h4"/>',hand:'<path d="M4 19l3-3 4 3 5-2 4-6"/>'
    };
    return `<svg class="icon" width="${Number(size)}" height="${Number(size)}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.grid}</svg>`;
  },
  money(cents){return KX.Finance.money(cents,KX.state.locale);},
  t(key){return KX.tr(key,KX.state);},
  button(text,action,style='primary',icon=''){return `<button type="button" class="button button-${style}" data-action="${action}">${icon?this.icon(icon,17):''}<span>${this.escape(text)}</span></button>`;},
  card(content,cl=''){return `<section class="card ${cl}">${content}</section>`;},
  head(eyebrow,title,sub='',buttons=''){
    return `<div class="page-head"><div><div class="eyebrow">${this.escape(eyebrow)}</div><h1>${this.escape(title)}</h1>${sub?`<p class="page-subtitle">${this.escape(sub)}</p>`:''}</div>${buttons?`<div class="page-actions">${buttons}</div>`:''}</div>`;
  },
  progress(saved,target,hideLabel=false){const percent=KX.Finance.progress(saved,target);return `<div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percent}" aria-label="${this.escape(this.t('progress'))}"><span class="progress-fill progress-${percent===100?'complete':'active'}" data-progress="${percent}"></span></div>${hideLabel?'':`<div class="progress-caption"><span>${this.money(saved)} / ${this.money(target)}</span><strong>${percent}%</strong></div>`}`;},
  empty(text,action){return `<div class="empty-state"><div class="empty-mark">${this.icon('layers',27)}</div><p>${this.escape(text)}</p>${action||''}</div>`;},
  badge(text,kind='neutral'){return `<span class="badge badge-${kind}">${this.escape(text)}</span>`;},
  sectionHead(title,action=''){return `<div class="section-head"><h2>${this.escape(title)}</h2>${action}</div>`;},
  link(text,page){return `<button class="text-link" type="button" data-page="${page}">${this.escape(text)} ${this.icon('arrow',15)}</button>`;}
};
