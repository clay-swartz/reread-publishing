import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');
await fs.rm(dist,{recursive:true,force:true});
await fs.mkdir(dist,{recursive:true});
await fs.cp(path.join(root,'public/endpapers'),path.join(dist,'endpapers'),{recursive:true});
await fs.copyFile(path.join(root,'public/favicon.svg'),path.join(dist,'favicon.svg'));
await fs.mkdir(path.join(dist,'steelebird'),{recursive:true});
for(const asset of ['steelebird.css','components.css','steelebird.js','forms.js']) await fs.copyFile(path.join(root,'steelebird',asset),path.join(dist,'steelebird',asset));
for(const route of ['','submissions','contact','pattern-review']){
 const from=path.join(root,'steelebird',route,'index.html');
 const out=path.join(dist,route,'index.html');
 await fs.mkdir(path.dirname(out),{recursive:true});
 await fs.copyFile(from,out);
}
const asset=await fs.stat(path.join(dist,'endpapers/collection/03-ebony-marble.webp'));
if(asset.size<10000)throw Error('Endpaper asset is missing');
console.log('Steelebird standalone preview built');
