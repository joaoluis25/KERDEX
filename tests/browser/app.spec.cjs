const {test,expect}=require('@playwright/test');
const AxeBuilder=require('@axe-core/playwright').default;
test('transaction CRUD, safe text and monthly totals',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/#finance');
 await page.locator('[data-action="create-transaction"]').click();let d=page.locator('dialog');await expect(d).toBeVisible();
 await d.locator('[name=name]').fill('<img src=x onerror=alert(1)>');await d.locator('[name=amount]').fill('0.10');await d.locator('[name=date]').fill('2026-10-24');await d.locator('button[type=submit]').click();
 const row=page.locator('.transaction-row').filter({hasText:'<img src=x onerror=alert(1)>'});await expect(row).toBeVisible();await expect(row.locator('img')).toHaveCount(0);
 await row.locator('[data-edit]').click();await d.locator('[name=amount]').fill('0.20');await d.locator('button[type=submit]').click();await expect(row).toContainText('0,20');
 page.once('dialog',d=>d.accept());await row.locator('[data-delete]').click();await expect(row).toHaveCount(0);expect(errors).toEqual([]);
});
test('goals allow excess; purchases reject unsafe URLs and handle zero monthly',async({page})=>{
 await page.goto('/#goals');await page.locator('[data-action="create-goal"]').click();const d=page.locator('dialog');await d.locator('[name=name]').fill('Meta teste');await d.locator('[name=amount]').fill('100');await d.locator('[name=saved]').fill('120');await d.locator('button[type=submit]').click();await expect(page.locator('.item-card').filter({hasText:'Meta teste'})).toContainText('120,00');
 await page.goto('/#purchases');await page.locator('[data-action="create-purchase"]').click();await d.locator('[name=name]').fill('Produto teste');await d.locator('[name=amount]').fill('100');await d.locator('[name=monthly]').fill('0');await d.locator('[name=url]').fill('https://localhost/item');await d.locator('button[type=submit]').click();await expect(page.locator('#modal-error')).not.toBeEmpty();await d.locator('[name=url]').fill('https://example.com/item');await d.locator('button[type=submit]').click();await expect(page.locator('.purchase-card').filter({hasText:'Produto teste'})).toContainText('Defina');
});
test('preferences persist with consent and revoke data',async({page})=>{
 await page.goto('/#settings');await page.locator('[data-setting=remember]').check();await page.locator('[data-theme=dark]').click();await page.reload();await expect(page.locator('html')).toHaveAttribute('data-theme','dark');expect(await page.evaluate(()=>localStorage.getItem('kerdex-fictional-demo-v2'))).toBeTruthy();await page.locator('[data-setting=remember]').uncheck();expect(await page.evaluate(()=>localStorage.getItem('kerdex-fictional-demo-v2'))).toBeNull();
 await page.locator('#locale-preference').selectOption('en-US');await expect(page.locator('h1')).toHaveText('KERDEX, your way.');await page.locator('#locale-preference').selectOption('es-ES');await expect(page.locator('h1')).toHaveText('KERDEX a tu manera.');
});
test('keyboard dialog, navigation history and installment calculation',async({page})=>{
 await page.goto('/#finance');await page.locator('[data-action="create-transaction"]').click();await page.keyboard.press('Escape');await expect(page.locator('dialog')).not.toBeVisible();await expect(page.locator('[data-action="create-transaction"]')).toBeFocused();
 await page.locator('.side-nav [data-page=simulator]').click();await page.locator('#compare-form button').click();await expect(page.locator('#compare-result')).toContainText('1.100,00');await page.goBack();await expect(page.locator('h1')).toHaveText('Suas finanças, sem complicação.');
});
test('responsive routes and screenshots',async({page})=>{
 for(const width of [320,360,375,390,414,480,600,768,820,1024,1280,1440,1920,2560]){
 await page.setViewportSize({width,height:900});for(const route of ['home','overview','finance','purchases','goals','simulator','news','settings']){await page.goto('/#'+route);await expect(page.locator('h1')).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${route}@${width}`).toBe(true)}
 if([390,820,1440].includes(width)){await page.goto('/#overview');await page.screenshot({path:`docs/screenshots/overview-${width}.png`,fullPage:true})}
 }
});
test('axe critical and serious accessibility findings',async({page})=>{
 for(const route of ['home','overview','finance','purchases','goals','simulator','news','settings']){await page.goto('/#'+route);const r=await new AxeBuilder({page}).analyze();expect(r.violations.filter(x=>['critical','serious'].includes(x.impact)).map(x=>({id:x.id,description:x.description,nodes:x.nodes.map(n=>n.target)}))).toEqual([])}
});
test('mobile CRUD, simulator and theme',async({page})=>{
 await page.setViewportSize({width:320,height:640});await page.goto('/#finance');await page.locator('[data-action=create-transaction]').click();const d=page.locator('dialog');await d.locator('[name=name]').fill('Mobile');await d.locator('[name=amount]').fill('1.25');await d.locator('button[type=submit]').click();const row=page.locator('.transaction-row').filter({hasText:'Mobile'});await expect(row).toBeVisible();await row.locator('[data-edit]').click();await d.locator('[name=amount]').fill('2.50');await d.locator('button[type=submit]').click();await expect(row).toContainText('2,50');page.once('dialog',d=>d.accept());await row.locator('[data-delete]').click();await expect(row).toHaveCount(0);
 await page.goto('/#goals');await page.locator('[data-action=create-goal]').click();await d.locator('[name=name]').fill('Meta móvel');await d.locator('[name=amount]').fill('50');await d.locator('button[type=submit]').click();await expect(page.locator('.item-card').filter({hasText:'Meta móvel'})).toBeVisible();
 await page.goto('/#simulator');await page.locator('#calculator-form [name=monthly]').fill('0');await page.locator('#calculator-form button').click();await expect(page.locator('#calculator-result')).toContainText('Não é possível');await page.goto('/#settings');await page.locator('[data-theme=dark]').click();await expect(page.locator('html')).toHaveAttribute('data-theme','dark');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('storage failure is explicit and retention is disabled',async({page})=>{
 await page.addInitScript(()=>{Storage.prototype.setItem=function(){throw new DOMException('blocked','QuotaExceededError')}});await page.goto('/#settings');await page.locator('[data-setting=remember]').click();await expect(page.locator('#toast')).toContainText('Armazenamento indisponível');await expect(page.locator('[data-setting=remember]')).not.toBeChecked();
});
