import {get} from '@vercel/blob';
const backend='https://uymwsivcgtapckzjoywk.supabase.co/functions/v1/steelebird-largefile-intake';
export default async function handler(req,res){
  if(req.method!=='GET')return res.status(405).end();
  const {id,access}=req.query;
  if(typeof id!=='string'||typeof access!=='string'||access.length<30)return res.status(404).end();
  try{
    const response=await fetch(backend,{method:'POST',headers:{'Content-Type':'application/json','Origin':'https://steelebird.com'},body:JSON.stringify({action:'resolve',id,access})});
    if(!response.ok)return res.status(404).end();
    const data=await response.json();
    if(!data.path?.startsWith('bigfiles/'+id+'/'))return res.status(404).end();
    const file=await get(data.path,{access:'private'});
    if(!file||file.statusCode!==200||!file.stream)return res.status(404).end();
    res.setHeader('Content-Type',file.blob.contentType||'application/octet-stream');
    res.setHeader('Content-Disposition',"attachment; filename*=UTF-8''"+encodeURIComponent(data.filename||'file'));
    res.setHeader('Cache-Control','private, no-store');
    const reader=file.stream.getReader();
    try{while(true){const {done,value}=await reader.read();if(done)break;res.write(Buffer.from(value));}res.end();}finally{reader.releaseLock();}
  }catch(e){console.error('bigfiles-download',e.message);if(!res.headersSent)res.status(500).end();else res.end();}
}