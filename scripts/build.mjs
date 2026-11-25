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
