import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');
await fs.rm(dist,{recursive:true,force:true});
await fs.mkdir(dist,{recursive:true});
await fs.cp(path.join(root,'public/endpapers'),path.join(dist,'endpapers'),{recursive:true});
await fs.copyFile(path.join(root,'public/favicon.svg'),path.join(dist,'favicon.svg'));
await fs.cp(path.join(root,'public/covers'),path.join(dist,'covers'),{recursive:true});

// Fetch the published cover for the exact 2027 ISBN, only if not already stored locally.
const bestBoyCover=path.join(dist,'covers/best-boy-in-the-world.jpg');
try { await fs.access(bestBoyCover); } catch {
 const candidates=[];
 const fetchBook=async url=>{const r=await fetch(url,{signal:AbortSignal.timeout(9000),headers:{'User-Agent':'Mozilla/5.0 (compatible; Steelebird catalog)'}});if(!r.ok)throw Error(String(r.status));return r;};
 for(const url of ['https://backstory.london/products/the-best-boy-in-the-world.js','https://backstory.london/products/the-best-boy-in-the-world.json','https://bookstation.ie/products/the-best-boy-in-the-world-one-family-two-brothers-two-very-different-views-on-masculinity.js']){
  try{const response=await fetchBook(url);const raw=await response.json();const product=raw.product||raw;if(!/the best boy in the world/i.test(product.title||''))continue;for(const image of [product.featured_image,...(product.images||[])]){const value=typeof image==='string'?image:image?.src;if(value)candidates.push(new URL(value,url).href);}}catch{}
  if(candidates.length)break;
 }
 if(!candidates.length){
  for(const url of ['https://www.johnmurraypress.co.uk/titles/sean-farrell/the-best-boy-in-the-world/9781399834117/','https://www.hachette.co.uk/titles/sean-farrell/the-best-boy-in-the-world/9781399834117/','https://backstory.london/products/the-best-boy-in-the-world']){
   try{const page=await (await fetchBook(url)).text();if(!/The Best Boy in the World/i.test(page))continue;for(const tag of page.match(/<meta\b[^>]*>/gi)||[]){if(!/property=["']og:image["']/i.test(tag))continue;const m=tag.match(/content=["']([^"']+)["']/i);if(m)candidates.push(new URL(m[1].replace(/&amp;/g,'&'),url).href);}for(const m of page.matchAll(/(?:src|href)=["']([^"']*9781399834117[^"']*\.jpe?g[^"']*)["']/gi))candidates.push(new URL(m[1].replace(/&amp;/g,'&'),url).href);}catch{}
   if(candidates.length)break;
  }
 }
 candidates.push('https://cdn.waterstones.com/bookjackets/large/9781/3998/9781399834117.jpg');
 let installed=false;
 for(const url of [...new Set(candidates)]){
  try{const bytes=Buffer.from(await (await fetchBook(url)).arrayBuffer());if(bytes.length<15000||bytes.length>5000000||bytes[0]!==255||bytes[1]!==216)continue;await fs.writeFile(bestBoyCover,bytes);await fs.writeFile(path.join(dist,'covers/best-boy-in-the-world-source.txt'),bytes.toString('base64'));console.log('Best Boy cover source: '+url+' ('+bytes.length+' bytes)');installed=true;break;}catch{}
 }
 if(!installed)throw Error('No valid JPEG cover for The Best Boy in the World');
}

const darkCover=await fs.readFile(path.join(dist,'covers/dark-liquid-skies.webp'));
if(darkCover.toString('ascii',0,4)!=='RIFF'||darkCover.toString('ascii',8,12)!=='WEBP'||(darkCover.readUInt16LE(26)&0x3fff)!==360||(darkCover.readUInt16LE(28)&0x3fff)!==549)throw Error('Dark Liquid Skies cover missing or incorrect dimensions');
await fs.mkdir(path.join(dist,'steelebird'),{recursive:true});
for(const asset of ['steelebird.css','components.css','steelebird.js','forms.js','catalog-components.css','catalog-components.js']) await fs.copyFile(path.join(root,'steelebird',asset),path.join(dist,'steelebird',asset));
for(const route of ['','about','submissions','contact','pattern-review','bigfiles']){
 const from=path.join(root,'steelebird',route,'index.html');
 const out=path.join(dist,route,'index.html');
 await fs.mkdir(path.dirname(out),{recursive:true});
 await fs.copyFile(from,out);
}
const agentFrom=path.join(root,'steelebird/partners/michele-mortimer-7p4q/index.html');
const agentOut=path.join(dist,'partners/michele-mortimer-7p4q/index.html');
await fs.mkdir(path.dirname(agentOut),{recursive:true});
await fs.copyFile(agentFrom,agentOut);
const donaldFrom=path.join(root,'steelebird/partners/donald-winchester-wl7p4q/index.html');
const donaldOut=path.join(dist,'partners/donald-winchester-wl7p4q/index.html');
await fs.mkdir(path.dirname(donaldOut),{recursive:true});
await fs.copyFile(donaldFrom,donaldOut);
const janineFrom=path.join(root,'steelebird/partners/janine-jensen-ch7p4q/index.html');
const janineOut=path.join(dist,'partners/janine-jensen-ch7p4q/index.html');
await fs.mkdir(path.dirname(janineOut),{recursive:true});
await fs.copyFile(janineFrom,janineOut);
// Fail the build if a catalog page references an asset that was not published.
const janineHtml=await fs.readFile(janineOut,'utf8');
for(const match of janineHtml.matchAll(/(?:href|src)="(\/steelebird\/catalog-components\.(?:css|js))(?:\?[^"]*)?"/g)){
 const output=path.join(dist,match[1].slice(1));
 if(!(await fs.stat(output)).isFile())throw Error('Missing catalog component: '+output);
}
for(const asset of ['catalog-components.css','catalog-components.js']){
 if(!janineHtml.includes('/steelebird/'+asset))throw Error('Catalog component link missing: '+asset);
}
const asset=await fs.stat(path.join(dist,'endpapers/collection/03-ebony-marble.webp'));
if(asset.size<10000)throw Error('Endpaper asset is missing');
console.log('Steelebird standalone preview built');
