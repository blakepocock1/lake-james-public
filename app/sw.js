const CACHE='ljc-command-v1';
const CORE=['/app/','/app/manifest.webmanifest','/app/icon.svg','/style.css'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET')return;
  const u=new URL(r.url);
  if(u.origin!==location.origin)return;
  if(u.pathname.startsWith('/rest/')||u.pathname.startsWith('/auth/')||u.pathname.startsWith('/storage/'))return;
  e.respondWith(fetch(r).then(resp=>{const copy=resp.clone();caches.open(CACHE).then(c=>c.put(r,copy));return resp;}).catch(()=>caches.match(r).then(x=>x||caches.match('/app/'))));
});
