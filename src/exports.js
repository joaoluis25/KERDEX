/** Zero-dependency XLSX/PPTX/CSV creation for hypothetical simulations. */
(function(){'use strict';
const enc=new TextEncoder();
function escapeXml(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));}
function crc32(b){let crc=0xFFFFFFFF;for(const x of b){crc^=x;for(let i=0;i<8;i++)crc=(crc>>>1)^((crc&1)?0xEDB88320:0)}return (crc^0xFFFFFFFF)>>>0;}
function zip(entries){
 const chunks=[],centrals=[];let pos=0;
 function b16(view,idx,val){view.setUint16(idx,val,true)}function b32(view,idx,val){view.setUint32(idx,val>>>0,true)}
 for(const [name,text] of Object.entries(entries)){
  const filename=enc.encode(name),data=typeof text==='string'?enc.encode(text):text,crc=crc32(data);
  const head=new Uint8Array(30+filename.length),v=new DataView(head.buffer);b32(v,0,0x04034b50);b16(v,4,20);b16(v,6,0x0800);b16(v,8,0);b32(v,14,crc);b32(v,18,data.length);b32(v,22,data.length);b16(v,26,filename.length);head.set(filename,30);
  chunks.push(head,data);
  const c=new Uint8Array(46+filename.length),z=new DataView(c.buffer);b32(z,0,0x02014b50);b16(z,4,20);b16(z,6,20);b16(z,8,0x0800);b32(z,16,crc);b32(z,20,data.length);b32(z,24,data.length);b16(z,28,filename.length);b32(z,42,pos);c.set(filename,46);centrals.push(c);pos+=head.length+data.length;
 }
 const centerSize=centrals.reduce((n,b)=>n+b.length,0),end=new Uint8Array(22),v=new DataView(end.buffer);b32(v,0,0x06054b50);b16(v,8,centrals.length);b16(v,10,centrals.length);b32(v,12,centerSize);b32(v,16,pos);
 return new Blob([...chunks,...centrals,end],{type:'application/zip'});
}
function save(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2500)}
function cleanCsv(v){const s=String(v??'');const safe=/^[=+@\-\t\r]/.test(s)?"'"+s:s;return '"'+safe.replaceAll('"','""')+'"'}
function csv(rows){return '\ufeff'+rows.map(row=>row.map(cleanCsv).join(',')).join('\r\n')+'\r\n'}
function t(key,locale){return KX.tr(key,{locale:locale||KX.state.locale})}
function summaryRows(result,locale){const p=result.input,b=result.base;return [
 ['KERDEX',t('simReport',locale),'Beta 3.0'],
 [t('simCurrency',locale),p.currency],
 [t('simMode',locale),t('simMode'+(p.mode==='growth'?'Growth':p.mode==='goal'?'Goal':'Debt'),locale)],
 [t('simPrincipal',locale),p.principal],
 [t('simDeposit',locale),p.monthly],
 [t('simAnnual',locale),p.annual],
 [t('simInflation',locale),p.inflation],
 [t('simFee',locale),p.fee],
 [t('simTax',locale),p.tax],
 [t('simMonths',locale),p.months],
 [t('simFx',locale),p.rateFx],
 [t('simEnding',locale),p.mode==='debt'?b.final.totalPaid:b.final.net],
 [t('simReal',locale),p.mode==='debt'?b.final.balance:b.final.real],
 [t('simUserRates',locale),t('simCopyAssumption',locale)],
 [t('simInfo',locale),t('simInfo',locale)]];
}
function projectionRows(r,locale){return [
 [t('simMonth',locale),t('simEnding',locale),t('simInvested',locale),t('simReal',locale),t('simGain',locale),t('simTaxValue',locale),t('simFeesValue',locale)],
 ...r.base.rows.map(d=>r.input.mode==='debt'?[d.month,d.balance,d.principalPaid,d.totalInterest,d.interest,d.payment,d.totalPaid]:[d.month,d.net,d.invested,d.real,d.gains,d.tax,d.fees])
 ]}
const ct='<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
function excelCell(value,cell){const ref=cell;if(typeof value==='number'&&Number.isFinite(value))return `<c r="${ref}"><v>${value}</v></c>`;return `<c r="${ref}" t="inlineStr"><is><t xml:space="preserve">${escapeXml(value)}</t></is></c>`;}
function col(n){let s='';n++;while(n){const x=(n-1)%26;s=String.fromCharCode(65+x)+s;n=Math.floor((n-1)/26)}return s;}
function sheetXml(rows){return `${ct}<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetViews><sheetView workbookViewId="0"/></sheetViews><sheetFormatPr defaultRowHeight="17"/><sheetData>${rows.map((row,i)=>`<row r="${i+1}">${row.map((v,j)=>excelCell(v,col(j)+(i+1))).join('')}</row>`).join('')}</sheetData></worksheet>`;}
function xlsx(result,locale){const entries={
 '[Content_Types].xml':`${ct}<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/></Types>`,
 '_rels/.rels':`${ct}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`,
 'xl/workbook.xml':`${ct}<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Summary" sheetId="1" r:id="rId1"/><sheet name="Projection" sheetId="2" r:id="rId2"/></sheets></workbook>`,
 'xl/_rels/workbook.xml.rels':`${ct}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/></Relationships>`,
 'xl/worksheets/sheet1.xml':sheetXml(summaryRows(result,locale)),
 'xl/worksheets/sheet2.xml':sheetXml(projectionRows(result,locale))
 };save(zip(entries),'KERDEX_simulation.xlsx')}
const xmlAttr=s=>escapeXml(s).replaceAll('\n',' ');
function slideText(text,x,y,w,h,size=2200,color='102B22',bold=false){
 return `<p:sp><p:nvSpPr><p:cNvPr id="${Math.floor(1+x+y)}" name="Text"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="${x}" y="${y}"/><a:ext cx="${w}" cy="${h}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/><a:ln><a:noFill/></a:ln></p:spPr><p:txBody><a:bodyPr wrap="square"/><a:lstStyle/><a:p><a:pPr algn="l"/><a:r><a:rPr lang="pt-BR" sz="${size}" b="${bold?'1':'0'}"><a:solidFill><a:srgbClr val="${color}"/></a:solidFill></a:rPr><a:t>${escapeXml(text)}</a:t></a:r><a:endParaRPr lang="pt-BR"/></a:p></p:txBody></p:sp>`;
}
function slide(items){const shapes=items.map(x=>slideText(...x)).join('');return `${ct}<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>${shapes}</p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sld>`;}
function pptx(result,locale){
 const p=result.input,f=result.base.final,debt=p.mode==='debt';
 const fmt=x=>Number(x).toLocaleString(locale||'pt-BR',{maximumFractionDigits:2,minimumFractionDigits:2});
 const title=(heading,body)=>[[heading,600000,420000,10800000,900000,3400,'0B3B2E',true],[body,600000,1570000,11000000,2100000,1800,'172C25'],['KERDEX  |  '+t('simInfo',locale).slice(0,95),600000,6430000,11000000,390000,1000,'597065']];
 const checkpoints=[.25,.5,.75,1].map(v=>{
   const row=result.base.rows[Math.min(result.base.rows.length-1,Math.round((result.base.rows.length-1)*v))];
   return `${t('simMonth',locale)} ${row.month}: ${fmt(debt?row.balance:row.net)} ${p.currency}`;
 }).join('     ');
 const slides=[
 title('KERDEX / '+t('simAdvancedTitle',locale),`${p.currency} • ${p.months} ${t('simMonths',locale)} • ${t('simReport',locale)}`),
 title(t('simResultTitle',locale),`${t('simEnding',locale)}: ${fmt(debt?f.totalPaid:f.net)} ${p.currency}. ${t('simReal',locale)}: ${fmt(debt?f.balance:f.real)} ${p.currency}.`),
 title(t('simAssumptions',locale),`${t('simPrincipal',locale)}: ${fmt(p.principal)} ${p.currency}; ${t('simDeposit',locale)}: ${fmt(p.monthly)}; ${t('simAnnual',locale)}: ${p.annual}%.`),
 title(t('simSensitivity',locale),`${t('simInflation',locale)}: ${p.inflation}%; ${t('simFee',locale)}: ${p.fee}%; ${t('simTax',locale)}: ${p.tax}%.`),
 title(t('simScenario',locale),debt?`${t('simDebtPaid',locale)}: ${fmt(f.totalPaid)} ${p.currency}; ${t('simDebtInterest',locale)}: ${fmt(f.totalInterest)} ${p.currency}.`:
 `${t('simConservative',locale)}: ${fmt(result.bear.final.net)}; ${t('simBase',locale)}: ${fmt(f.net)}; ${t('simOptimistic',locale)}: ${fmt(result.bull.final.net)} ${p.currency}.`),
 title(t('simTable',locale),checkpoints),
 title(t('simCurrency',locale),`${p.currency} • ${t('simFx',locale)}: ${p.rateFx} • ${t('simCurrencyWarn',locale)}`),
 title(t('simInfo',locale),t('simCopyAssumption',locale)+' '+t('simInfo',locale))
 ];
 const entries={
 '[Content_Types].xml':`${ct}<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="xml" ContentType="application/xml"/><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>${slides.map((_,i)=>`<Override PartName="/ppt/slides/slide${i+1}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>`).join('')}</Types>`,
 '_rels/.rels':`${ct}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/></Relationships>`,
 'ppt/presentation.xml':`${ct}<p:presentation xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:sldIdLst>${slides.map((_,i)=>`<p:sldId id="${256+i}" r:id="rId${i+1}"/>`).join('')}</p:sldIdLst><p:sldSz cx="12192000" cy="6858000" type="screen16x9"/><p:notesSz cx="6858000" cy="9144000"/></p:presentation>`,
 'ppt/_rels/presentation.xml.rels':`${ct}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${slides.map((_,i)=>`<Relationship Id="rId${i+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide${i+1}.xml"/>`).join('')}</Relationships>`
 };
 slides.forEach((s,i)=>entries[`ppt/slides/slide${i+1}.xml`]=slide(s));
 save(zip(entries),'KERDEX_simulation.pptx');
}
function printReport(result,locale){
 const summary=summaryRows(result,locale),rows=projectionRows(result,locale);
 const printWindow=window.open('','_blank','width=1100,height=800');if(!printWindow){alert(t('simPopupHelp',locale));return;}
 const html=`<!DOCTYPE html><html lang="${escapeXml(locale)}"><head><meta charset="utf-8"><title>KERDEX — ${escapeXml(t('simReport',locale))}</title><style>body{font:14px Arial;color:#152D24;margin:35px}header{border-bottom:4px solid #102B22;padding:20px 0}h1{font-size:30px;color:#102B22}h2{margin-top:30px;font-size:18px}table{border-collapse:collapse;width:100%;margin:18px 0}th,td{border-bottom:1px solid #ddd;padding:9px;text-align:left}th{background:#edf4ed}p{color:#52645a}@media print{button{display:none}tr{break-inside:avoid}}</style></head><body><header><h1>KERDEX / ${escapeXml(t('simReport',locale))}</h1><p>${escapeXml(t('simInfo',locale))} • ${new Date().toISOString().slice(0,10)}</p></header><h2>${escapeXml(t('simAssumptions',locale))}</h2><table>${summary.map(row=>`<tr>${row.map((x,i)=>`<${i===0?'th':'td'}>${escapeXml(x)}</${i===0?'th':'td'}>`).join('')}</tr>`).join('')}</table><h2>${escapeXml(t('simTable',locale))}</h2><table>${rows.map((row,i)=>`<tr>${row.map(x=>`<${i===0?'th':'td'}>${escapeXml(x)}</${i===0?'th':'td'}>`).join('')}</tr>`).join('')}</table><p>${escapeXml(t('simInfo',locale))}</p><button onclick="window.print()">${escapeXml(t('simPrint',locale))}</button></body></html>`;
 printWindow.document.open();printWindow.document.write(html);printWindow.document.close();printWindow.focus();
}
function report(kind,result,locale){if(!result)return;const stamp=new Date().toISOString().slice(0,10);
 if(kind==='csv')save(new Blob([csv([...summaryRows(result,locale),[],...projectionRows(result,locale)])],{type:'text/csv;charset=utf-8'}),`KERDEX_scenario_${stamp}.csv`);
 else if(kind==='xlsx')xlsx(result,locale);else if(kind==='pptx')pptx(result,locale);else if(kind==='print')printReport(result,locale);
}
function portfolio(items,locale){const rows=[['ticker','name','asset_type','currency','quantity','average_cost','manual_price','current_fx_to_brl','purchase_fx_to_brl','dividends_total'],...items.map(x=>[x.ticker,x.name,x.type,x.currency,x.quantity,x.avgCost,x.price,x.fx,x.purchaseFx??x.fx,x.dividends])];save(new Blob([csv(rows)],{type:'text/csv;charset=utf-8'}),'KERDEX_portfolio_demo.csv')}
KX.Exports=Object.freeze({report,portfolio,zip,summaryRows,projectionRows});
})();
