(async function(){
const C=window.PARADE_CONFIG||{},$=s=>document.getElementById(s),Q=new URLSearchParams(location.search);
if(Q.get("admin")==="1"){$("app").hidden=true;const a=$("admin");a.hidden=false;renderAdmin(a);return;}
let data=window.SELECTIONS;try{const r=await fetch("data/selections.json");if(r.ok)data=await r.json()}catch(e){}
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const credits=$("credits").innerHTML,J=C.JACOB_SITE||"https://jacobmorleyrealestate.com";
const textIn=`<p class="textin">Or text <b>${esc(C.TEXT_KEYWORD||"PARADE")}</b> to <b>${esc(C.TEXT_NUMBER)}</b> <span class="tag">placeholder number</span></p>`;
const pages=[];
pages.push({id:"cover",label:"Cover",html:`<div class="pg cover"><div class="cover-img"></div><div class="cover-txt">
 <p class="eyebrow">Parade Home · Peach Springs Estates</p><h1>Where Red Rock<br>Meets <em>Refinement</em></h1>
 <p class="addr">Lot 52 · Peach Springs Estates Phase 2 · Hurricane, Utah</p>
 <dl class="facts"><div><dt>3,621</dt><dd>Living sq ft</dd></div><div><dt>5</dt><dd>Bedrooms on plan</dd></div><div><dt>RV + 2</dt><dd>Car garage</dd></div></dl>
 <p class="hint">Swipe or tap the edge to turn the page <span>&rarr;</span></p></div></div>`});
data.rooms.forEach((r,ri)=>pages.push({id:r.id,label:r.title,html:`<div class="pg room"><div class="scroll">
 <div class="room-head"><p class="eyebrow">${String(ri+1).padStart(2,"0")} · ${esc(r.eyebrow)}</p><h2>${esc(r.title)}</h2>
 ${r.sample?`<p class="sample-banner"><span class="tag solid">Sample</span> Placeholder selections. Final selections coming soon.</p>`:`<p class="real-banner">Selections as shown on the Lot 52 rendering (Option 2: Soft White &amp; Sand).</p>`}</div>
 ${r.id==="exterior"?`<div class="room-photo" style="background-image:url(assets/lot52-hero.jpg)"></div>`:""}
 <ul class="grid">${r.spreads.map(s=>`<li class="item">
   <div class="ph ${s.photo?"":"slot"}" ${s.photo?`style="background-image:url(${s.photo})"`:""}>${s.photo?"":"<span>Photo<br>coming soon</span>"}${s.sample?'<i class="tag solid">Sample</i>':""}</div>
   <div class="meta"><p class="cat">${esc(s.category)}</p><h3>${esc(s.name)}</h3><p class="brand">${esc(s.brand)}</p></div></li>`).join("")}</ul>
 <div class="room-cta"><button class="btn solid" onclick="openLead('save')">Save my selections</button><button class="btn" onclick="openLead('text')">Text me this room</button></div>
 </div></div>`}));
pages.push({id:"next",label:"What's Next",html:`<div class="pg back"><div class="scroll"><p class="eyebrow">What's next</p><h2>If you like what you see, here's what's next.</h2>
 <ol class="next">
 <li><h3>Take this home with you</h3><p>Save any room and I'll send the selections to your phone.</p><button class="link" onclick="openLead('next-selections')">Save my selections &rarr;</button></li>
 <li><h3>Homes Big Rock has built</h3><p>Big Rock builds across price ranges. See their past custom homes.</p><a class="link" href="${esc(C.GALLERY_URL)}" target="_blank" rel="noopener">View the gallery &rarr;</a></li>
 <li><h3>Lots available today</h3><p>On- and off-market lots. Ask me for the current list.</p><button class="link" onclick="openLead('next-lots')">Get the lot list &rarr;</button></li>
 <li><h3>New-construction financing</h3><p>Options with as little as 10% down. <em>Details from the lender; subject to credit approval.</em></p><button class="link" onclick="openLead('next-financing')">Ask about financing &rarr;</button></li>
 <li><h3>Design-lovers contest</h3><p>Send us your Pinterest board. Prize TBD; official rules posted before launch.</p><span class="tag">Coming soon</span></li>
 <li class="soft"><h3>Not quite the right fit?</h3><p>I'll help you find something similar anywhere in Southern Utah.</p><a class="link" href="${J}" target="_blank" rel="noopener">Find something similar &rarr;</a></li>
 </ol></div></div>`});
pages.push({id:"contact",label:"Contact",html:`<div class="pg back dark"><div class="scroll center"><img class="clogo" src="assets/newlogowhite-trim.png" alt="Big Rock Homes">
 <p class="tagline">Where Red Rock Meets Refinement</p><h2>Let's talk about Lot 52, or your own build.</h2>
 <p class="lede">I'm Jacob Morley with Red Rock Real Estate. Whether it's this home, a build with Big Rock, or just getting to know Southern Utah, I'm happy to help.</p>
 <div class="room-cta"><button class="btn solid" onclick="openLead('contact')">Send me the details</button><a class="btn ghost" href="${J}" target="_blank" rel="noopener">Find something similar</a></div>
 ${textIn}${credits}</div></div>`});
const book=$("book"),N=pages.length;
book.innerHTML=pages.map((p,i)=>`<section class="leaf" data-id="${p.id}" style="z-index:${N-i}"><div class="face front">${p.html}</div><div class="face backside"><img src="assets/newlogoblack-trim.png" alt=""></div></section>`).join("");
const leaves=[...book.children];
$("index").innerHTML=pages.map((p,i)=>`<button data-i="${i}">${esc(p.label)}</button>`).join("");
$("dots").innerHTML=pages.map((p,i)=>`<button data-i="${i}" aria-label="${esc(p.label)}"></button>`).join("");
let cur=0,turned=false;
function set(n,anim=true){n=Math.max(0,Math.min(N-1,n));const fwd=n>cur;
 leaves.forEach((l,i)=>{const t=i<n;clearTimeout(l._g);
  if(!anim){l.classList.toggle("turned",t);l.classList.toggle("gone",t);l.style.zIndex=t?i+1:N-i;return}
  if(!t)l.classList.remove("gone");
  if(t!==l.classList.contains("turned")){l.classList.toggle("turned",t);l.style.zIndex=N+5}
  l._g=setTimeout(()=>{l.style.zIndex=t?i+1:N-i;if(t)l.classList.add("gone")},1000)});
 if(anim&&fwd&&!turned){turned=true;setTimeout(()=>{if(!leadShownOnce())openLead("first-turn")},1400)}
 cur=n;const id=pages[n].id;
 const u=new URL(location.href);if(data.rooms.some(r=>r.id===id))u.searchParams.set("room",id);else u.searchParams.delete("room");history.replaceState(null,"",u);
 [...$("index").children].forEach((b,i)=>b.classList.toggle("on",i===n));[...$("dots").children].forEach((b,i)=>b.classList.toggle("on",i===n));
 $("pgno").textContent=`${String(n+1).padStart(2,"0")} / ${String(N).padStart(2,"0")} · ${pages[n].label}`;
 $("prev").disabled=n===0;$("next").disabled=n===N-1;
 $("index").querySelector(".on")?.scrollIntoView({inline:"center",block:"nearest",behavior:anim?"smooth":"auto"});}
window.flipTo=set;
const start=Math.max(0,pages.findIndex(p=>p.id===Q.get("room")));
set(start,false);
$("next").onclick=()=>set(cur+1);$("prev").onclick=()=>set(cur-1);
$("index").onclick=$("dots").onclick=e=>{const i=e.target.dataset.i;if(i!=null)set(+i)};
let sx=0,sy=0;book.addEventListener("touchstart",e=>{sx=e.touches[0].clientX;sy=e.touches[0].clientY},{passive:true});
book.addEventListener("touchend",e=>{const dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.3)set(dx<0?cur+1:cur-1)});
document.addEventListener("keydown",e=>{if(document.getElementById("lead-root").classList.contains("open"))return;if(e.key==="ArrowRight")set(cur+1);if(e.key==="ArrowLeft")set(cur-1)});
})();
