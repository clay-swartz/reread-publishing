import {handleUpload} from '@vercel/blob/client';
const backend='https://uymwsivcgtapckzjoywk.supabase.co/functions/v1/steelebird-largefile-intake';
async function intake(body){
  const res=await fetch(backend,{method:'POST',headers:{'Content-Type':'application/json','Origin':'https://steelebird.com'},body:JSON.stringify(body)});
  const data=await res.json();
  if(!res.ok||!data.ok)throw Error(data.error||'File intake unavailable');
  return data;
}
export default async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
  try{
    const response=await handleUpload({
      request:req,body:req.body,
      onBeforeGenerateToken:async (pathname,clientPayload)=>{
        const p=JSON.parse(clientPayload||'{}');
        const record=await intake({action:'verify',id:p.id,secret:p.secret});
        if(!pathname.startsWith('bigfiles/'+record.id+'/'))throw Error('Invalid upload path');
        return {addRandomSuffix:false,maximumSizeInBytes:2*1024*1024*1024,
          tokenPayload:JSON.stringify({id:record.id,secret:p.secret,filename:record.filename})};
      },
      onUploadCompleted:async ({blob,tokenPayload})=>{
        const p=JSON.parse(tokenPayload||'{}');
        if(!blob.pathname.startsWith('bigfiles/'+p.id+'/'))throw Error('Invalid uploaded object');
        await intake({action:'complete-blob',id:p.id,secret:p.secret,path:blob.pathname,access:crypto.randomUUID()+crypto.randomUUID()});
      }
    });
    return res.status(200).json(response);
  }catch(e){console.error('Large upload callback',e);return res.status(400).json({error:e.message||'Upload could not be authorized'});}
}