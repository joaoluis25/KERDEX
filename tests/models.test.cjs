const {test}=require('node:test');const assert=require('node:assert/strict');
const {calculate}=require('../src/simulation.js');const {validate,totals,seed}=require('../src/invest.js');
const {parseRSS}=require('../tools/server.cjs');
const base={mode:'growth',principal:10000,monthly:300,months:120,target:100000,annual:8,inflation:4,fee:.7,tax:15,currency:'BRL',rateFx:1,extra:0,schedule:'price'};
test('simulation has 121 monthly rows and 3 ordered scenarios',()=>{const r=calculate(base);assert.equal(r.base.rows.length,121);assert.ok(r.bear.final.net<r.base.final.net);assert.ok(r.base.final.net<r.bull.final.net)});
test('no negative or impossible inputs accepted',()=>{for(const patch of [{annual:-100},{monthly:-1},{months:481},{rateFx:0},{principal:1e13}])assert.throws(()=>calculate({...base,...patch}))});
test('zero interest with deposits matches nominal accounting',()=>{const r=calculate({...base,annual:0,fee:0,tax:0,inflation:0,months:12});assert.equal(r.base.final.balance,13600);assert.equal(r.base.final.invested,13600)});
test('debt zero rate, 12 months, fully repaid',()=>{const r=calculate({...base,mode:'debt',annual:0,principal:1200,months:12});assert.equal(r.base.final.balance,0);assert.equal(r.base.final.totalPaid,1200)});
test('SAC loan and extra repayment accelerate payoff',()=>{const p={...base,mode:'debt',principal:12000,months:24,annual:12,schedule:'sac'};assert.ok(calculate({...p,extra:200}).base.monthsReached<calculate({...p,extra:0}).base.monthsReached)});
test('portfolio total matches manual positions',()=>{const r=totals(seed());assert.equal(r.assets,5);assert.ok(r.value>0);assert.ok(r.allocation.length>=3)});
test('invalid portfolio records excluded from totals',()=>{assert.equal(validate({ticker:'<script>',quantity:12}),false);assert.equal(totals([{ticker:'BAD',fx:0}]).assets,0)});
test('rss parses only allowed official HTTPS links',()=>{const xml='<rss><channel><item><title><![CDATA[Central bank decisions &amp; markets]]></title><link>https://www.ecb.europa.eu/press/html/news.en.html</link><pubDate>Tue, 27 Oct 2026 14:00:00 GMT</pubDate></item><item><title>Malicious</title><link>https://evil.example/test</link></item></channel></rss>';const x=parseRSS(xml,{source:'ECB'});assert.equal(x.length,1);assert.match(x[0].title,/markets/)});
test('historical FX is distinguished from current FX in unrealized return',()=>{
 const a={...seed()[2],quantity:2,avgCost:100,price:100,fx:5,purchaseFx:4};
 const summary=totals([a]);
 assert.equal(summary.cost,800);assert.equal(summary.value,1000);assert.equal(summary.profit,200);
});
test('invalid historical FX rejected',()=>{assert.equal(validate({...seed()[2],purchaseFx:0}),false)});
