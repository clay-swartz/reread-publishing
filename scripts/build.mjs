import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');
await fs.rm(dist,{recursive:true,force:true});
await fs.mkdir(dist,{recursive:true});
await fs.cp(path.join(root,'public'),dist,{recursive:true});
for(const file of ['index.html']) await fs.copyFile(path.join(root,file),path.join(dist,file));
await fs.mkdir(path.join(dist,'src/content'),{recursive:true});
for(const file of ['hero-v2.json','cover-stream.json']) await fs.copyFile(path.join(root,'src/content',file),path.join(dist,'src/content',file));
await fs.mkdir(path.join(dist,'src/components'),{recursive:true});
for(const file of ['hero-v2.js','cover-stream.js','hero-v2.css']) await fs.copyFile(path.join(root,'src/components',file),path.join(dist,'src/components',file));
const manifest=JSON.parse(await fs.readFile(path.join(root,'src/content/cover-stream.json'),'utf8'));
await fs.mkdir(path.join(dist,'covers'),{recursive:true});
let success=0;
for(const cover of manifest){
  const url='https://commons.wikimedia.org/wiki/Special:Redirect/file/'+encodeURIComponent(cover.commonsFile)+'?width=560';
  try {
    const response=await fetch(url,{headers:{'User-Agent':'ReReadPublishing/1.0 (historical cover editorial research)'}});
    if(!response.ok)throw Error('HTTP '+response.status);
    const type=response.headers.get('content-type')||'';
    if(!type.startsWith('image/'))throw Error('Not an image: '+type);
    const data=Buffer.from(await response.arrayBuffer());
    if(data.length<1500)throw Error('Image too small');
    await fs.writeFile(path.join(dist,cover.src.slice(1)),data);
    success++;
    console.log('Cover ready:',cover.title,data.length,type);
  }catch(e){console.warn('Cover failed:',cover.title,String(e));}
}
if(success!==manifest.length)throw Error('Only '+success+' of '+manifest.length+' cover images downloaded; refusing incomplete deployment');
const first=await fs.stat(path.join(dist,'endpapers/collection/01-french-blue.webp'));
if(first.size<10000)throw Error('Endpaper missing or empty');
console.log('Hero v2 build verified:',success,'covers and endpapers available');
