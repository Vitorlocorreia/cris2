import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const appRoot=path.join(root,'dist');
const port=Number(process.env.PORT||4187);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.ico':'image/x-icon'};
const server=http.createServer(async(req,res)=>{
 try{
  const url=new URL(req.url,'http://localhost');
  let directory,relative;
  if(url.pathname==='/'||url.pathname==='/apresentacao.html'){directory=root;relative='apresentacao.html'}
  else if(url.pathname.startsWith('/app/')){directory=appRoot;relative=decodeURIComponent(url.pathname.slice(5))}

  else{res.writeHead(404);res.end('Página não encontrada.');return}
  let target=path.resolve(directory,relative||'index.html');
  if(target!==directory&&!target.startsWith(directory+path.sep)){res.writeHead(403);res.end();return}
  if((await fs.stat(target)).isDirectory())target=path.join(target,'index.html');
  const data=await fs.readFile(target);
  res.writeHead(200,{'Content-Type':types[path.extname(target)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(data);
 }catch{res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Arquivo não encontrado.')}
});
server.on('error',err=>{console.error(err.code==='EADDRINUSE'?'A porta '+port+' já está em uso.':err.message);process.exitCode=1});
server.listen(port,'127.0.0.1',()=>console.log('CRIS · apresentação local: http://localhost:'+port+'/\nApp sem moldura: http://localhost:'+port+'/app/'));
