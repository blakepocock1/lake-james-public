import{createClient}from'https://esm.sh/@supabase/supabase-js@2.57.4';
const sb=createClient('https://xiptoqvgpmxvoqrqlrbb.supabase.co','sb_publishable_3bhZUNlWY6ArDy0T72d0Yg_6bVY_Aij');
const norm=p=>p==='/'||p==='/index.html'?'/':p.endsWith('/index.html')?p.slice(0,-10):p;
const safeUrl=v=>{if(!v)return null;try{if(v.startsWith('/'))return v;const u=new URL(v,location.origin);return ['http:','https:'].includes(u.protocol)?u.href:null}catch{return null}};
const safeColor=(v,fallback)=>/^#[0-9a-f]{6}$/i.test(v||'')?v:fallback;
const editableSelector='main h1,main h2,main h3,main h4,main p,main li,main a,footer p,footer span,footer strong';
function editableNodes(){return [...document.querySelectorAll(editableSelector)].filter(el=>!el.closest('script,style,form')&&!el.matches('[data-cms-ignore]'))}
function applyOverrides(list){if(!Array.isArray(list))return;const nodes=editableNodes();for(const o of list){const el=nodes[o.i];if(!el)continue;if(typeof o.text==='string')el.textContent=o.text;if(el.tagName==='A'&&o.href){const u=safeUrl(o.href);if(u)el.setAttribute('href',u)}if(el.tagName==='IMG'&&o.src){const u=safeUrl(o.src);if(u)el.setAttribute('src',u)}}}
try{
 const path=norm(location.pathname);
 const[g,p]=await Promise.all([sb.from('website_visual_settings').select('*').eq('id',1).single(),sb.from('website_pages').select('*').eq('path',path).maybeSingle()]);
 const s=g.data||{},x=p.data||{},accent=safeColor(s.accent_color,'#171718');
 document.documentElement.style.setProperty('--website-accent',accent);
 if(x.page_title)document.title=x.page_title;if(x.meta_description){let m=document.querySelector('meta[name="description"]');if(m)m.content=x.meta_description}
 const header=document.querySelector('header');if(header&&s.header_background)header.style.background=safeColor(s.header_background,'#0a0a0b');
 const brand=document.querySelector('.brand');const logo=safeUrl(s.logo_url);if(brand&&logo){brand.style.backgroundImage=`url("${logo}")`;brand.style.backgroundSize='contain';brand.style.backgroundRepeat='no-repeat';brand.style.backgroundPosition='left center';brand.setAttribute('aria-label','Lake James Canopies')}
 const hero=document.querySelector('.hero,.pagehero,.pageHero,.projectHero,.serviceHero,.locationHero,[data-site-hero]');
 if(hero){const image=safeUrl(x.hero_image_url);if(image){const raw=Number(s.hero_overlay),o=Math.max(0,Math.min(95,Number.isFinite(raw)?raw:72))/100;hero.style.backgroundImage=`linear-gradient(90deg,rgba(0,0,0,${Math.min(.95,o+.12)}),rgba(0,0,0,${Math.max(0,o-.25)})),url("${image}")`;hero.style.backgroundSize='cover';hero.style.backgroundPosition='center'}const eyebrow=hero.querySelector('.eyebrow,.kicker,[data-hero-eyebrow]'),h1=hero.querySelector('h1,[data-hero-headline]');let para=hero.querySelector('[data-hero-subheadline]');if(!para&&h1){let n=h1.nextElementSibling;while(n&&!para){if(n.matches?.('p'))para=n;if(n.matches?.('div,section,article'))break;n=n.nextElementSibling}}const btn=hero.querySelector('a.btn,a.button,[data-hero-cta]');if(eyebrow&&x.hero_eyebrow)eyebrow.textContent=x.hero_eyebrow;if(h1&&x.hero_headline)h1.textContent=x.hero_headline;if(para&&x.hero_subheadline)para.textContent=x.hero_subheadline;if(btn){btn.style.background=accent;btn.style.color='#fff';if(x.cta_text)btn.textContent=x.cta_text;const href=safeUrl(x.cta_href);if(href)btn.href=href}}
 applyOverrides(x.content_overrides);
}catch(e){console.warn('Site manager unavailable; using built-in page content.',e)}