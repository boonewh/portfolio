import assert from 'node:assert/strict';
import fs from 'node:fs';
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {chromium,devices} from 'playwright';

const root=fileURLToPath(new URL('../',import.meta.url));
const output=fileURLToPath(new URL('../test-results/',import.meta.url));
fs.mkdirSync(output,{recursive:true});
const stage=process.env.CHECK_STAGE||'after',base=process.env.SITE_CHECK_BASE_URL||'http://127.0.0.1:3433';
const slugs=fs.readdirSync(root+'content/blog').filter(f=>f.endsWith('.mdx')).map(f=>f.slice(0,-4));
const paths=['/','/blog',...slugs.map(s=>'/blog/'+s),'/projects/cabc-email-router','/projects/nudge','/projects/osg','/projects/pathsix-crm'];
let server;
async function main(){
 if(!process.env.SITE_CHECK_BASE_URL){server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','-H','127.0.0.1','-p','3433'],{cwd:root,env:{...process.env,TZ:'UTC',NEXT_TELEMETRY_DISABLED:'1'},windowsHide:true,stdio:'ignore'});let ready=false;for(let i=0;i<80;i++){if(server.exitCode!==null)throw Error('App exited');try{if((await fetch(base,{signal:AbortSignal.timeout(1000)})).ok){ready=true;break;}}catch{}await new Promise(r=>setTimeout(r,250));}assert(ready);}
 const snapshots=[],images=new Set();
 try{
  for(const path of paths){const r=await fetch(base+path,{signal:AbortSignal.timeout(30000)});assert.equal(r.status,200,path);const html=await r.text();const title=html.match(/<title>(.*?)<\/title>/)?.[1];assert(title);assert(html.includes('<h1'));
   const canonical=html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];const description=html.match(/<meta name="description" content="([^"]+)"/)?.[1];assert(description);if(path.startsWith('/blog'))assert(canonical?.includes('www.willboone.dev'+path));
   const headings=[...html.matchAll(/<h1\b[^>]*>(.*?)<\/h1>/gs)].map(m=>m[1].replace(/<[^>]*>/g,''));
   if(path.startsWith('/blog/'))assert(html.includes('prose-blog'));
   for(const m of html.matchAll(/<img\b[^>]*src="([^"]+)"/g)){const url=new URL(m[1].replaceAll('&amp;','&'),base);if(url.origin===base)images.add(url.pathname+url.search);}
   snapshots.push({path,title,description,canonical,headings});
  }
  for(const path of images){const r=await fetch(base+path,{signal:AbortSignal.timeout(30000)});assert.equal(r.status,200,path);assert.match(r.headers.get('content-type'),/^image\//);assert((await r.arrayBuffer()).byteLength>100);}
  for(const path of ['/icon.svg','/favicon.ico','/og-image.svg'])assert.equal((await fetch(base+path)).status,200,path);
  const sitemap=await fetch(base+'/sitemap.xml');assert.equal(sitemap.status,200);const xml=await sitemap.text();for(const slug of slugs)assert(xml.includes('/blog/'+slug));
  const robots=await fetch(base+'/robots.txt');assert.equal(robots.status,200);assert((await robots.text()).includes('www.willboone.dev/sitemap.xml'));
  for(const path of ['/blog/no-such-published-post','/upgrade-check-missing']){const r=await fetch(base+path);assert.equal(r.status,404,path);assert((await r.text()).includes('noindex'));}
  const browser=await chromium.launch({headless:true});const ui=[],assets=new Map();
  try{for(const [name,options] of [['desktop',{viewport:{width:1440,height:1000},timezoneId:'UTC'}],['mobile',{...devices['iPhone 13'],timezoneId:'America/Chicago'}]]){
   const context=await browser.newContext({...options,serviceWorkers:'block'});const errors=[],failed=[],unexpected=[];
   await context.route('**/*',async route=>{const url=new URL(route.request().url());if(url.origin===base)return route.continue();
    if(url.hostname==='cdn.jsdelivr.net'&&url.pathname.startsWith('/gh/devicons/devicon@')){if(!assets.has(url.href))assets.set(url.href,(async()=>{const r=await fetch(url.href,{signal:AbortSignal.timeout(30000)});assert(r.ok);return{body:Buffer.from(await r.arrayBuffer()),contentType:r.headers.get('content-type')||'application/octet-stream'};})());return route.fulfill({status:200,...await assets.get(url.href),headers:{'Access-Control-Allow-Origin':'*'}});}
    unexpected.push(url.origin);return route.abort();
   });
   const page=await context.newPage();page.setDefaultTimeout(15000);page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(new URL(r.url()).origin===base&&r.status()>=400)failed.push(r.url());});
   assert.equal((await page.goto(base,{waitUntil:'networkidle'})).status(),200);await page.locator('h1').first().waitFor();await page.evaluate(()=>document.fonts.ready);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
   const open=page.getByRole('button',{name:'Open menu',exact:true});if(name==='mobile')await open.click();await page.getByRole('link',{name:'Blog',exact:true}).filter({visible:true}).click();await page.waitForURL(base+'/blog');await page.waitForLoadState('networkidle');
   const publicationDates=await page.locator('time').allTextContents();if(ui.length)assert.deepEqual(publicationDates,ui[0].publicationDates,'Publication dates do not shift between UTC and Central time');
   await page.locator('a[href="/blog/'+slugs[0]+'"]').first().click();await page.waitForURL(base+'/blog/'+slugs[0]);await page.locator('.prose-blog h2').first().waitFor();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
   await page.goto(base+'/projects/cabc-email-router',{waitUntil:'networkidle'});await page.locator('h1').first().waitFor();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
   await page.goto(base+'/#contact',{waitUntil:'networkidle'});await page.locator('#contact').waitFor();assert.equal(await page.locator('#contact a[href="mailto:will@pathsixsolutions.com"]').count(),1);
   await page.waitForFunction(()=>{const link=document.querySelector('#contact a[href^="mailto:"]');return link&&Number(getComputedStyle(link).opacity)>0.99;},undefined,{timeout:10000});
   await page.screenshot({path:output+stage+'-'+name+'.png',fullPage:false});assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);assert.deepEqual(unexpected,[]);ui.push({name,timezone:options.timezoneId,publicationDates,homeBlogArticleCaseNavigation:true,noOverflow:true,noPageErrors:true,noFailedAssets:true,mailtoPreserved:true});await context.close();
  }}finally{await browser.close();}
  if(process.env.BASELINE_CHECKS_PATH){const before=JSON.parse(fs.readFileSync(process.env.BASELINE_CHECKS_PATH));assert.deepEqual(JSON.parse(JSON.stringify(snapshots)),before.pages,'Titles/headings/descriptions/canonicals retained');}
  const result={stage,base,pages:snapshots,images:[...images],slugs,ui,sitemapRobotsIcons404:true,externalRequests:'declared Devicon styles/fonts read-only',messagesSent:0};fs.writeFileSync(output+stage+'-checks.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({stage,pages:paths.length,images:images.size,blogPosts:slugs.length,ui:ui.length,messagesSent:0}));
 }finally{server?.kill();}
}
main().catch(e=>{server?.kill();console.error(e);process.exitCode=1;});
