// Lead capture - DEMO MODE. Nothing is sent anywhere; payload is logged + stored in localStorage.
(function(){
const C=window.PARADE_CONFIG||{};const KEY="bigrock_parade_leads";
const html=`<div class="scrim" data-close></div>
<div class="sheet" role="dialog" aria-modal="true" aria-labelledby="lead-h">
<div class="grab"></div><button class="x" data-close aria-label="Close">&times;</button>
<div id="lead-form-wrap"><div class="eyebrow">Save this room</div>
<h3 id="lead-h">Get these selections on your phone</h3>
<p class="sub">I'll send you this room's selections from the Big Rock Parade home at Lot 52. &mdash; Jacob</p>
<form id="lead" novalidate>
<label for="fn">First name</label><input type="text" id="fn" autocomplete="given-name" required>
<div class="row2"><div><label for="mb">Mobile</label><input type="tel" id="mb" autocomplete="tel" inputmode="tel"></div>
<div><label for="em">Email</label><input type="email" id="em" autocomplete="email"></div></div>
<label for="in">I'm interested in</label><select id="in"><option>Buy this home</option><option>Build with Big Rock</option><option>Find something similar</option><option selected>Just browsing</option></select>
<div class="consent"><input type="checkbox" id="cs"><label for="cs" style="all:unset">By checking this box, I agree that Jacob Morley / Red Rock Real Estate may text and email me about this home and similar properties at the number and email provided, including by automated means. Msg &amp; data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent is not required to buy any property or service.</label></div>
<div class="err" id="err"></div>
<button class="btn solid" type="submit">Send me this room</button>
<button type="button" class="later" data-close>Not now, keep browsing</button></form></div>
<div id="lead-thanks" hidden style="text-align:center;padding:20px 0 10px"><div class="eyebrow">Thank you</div><h3>You're all set</h3><p class="sub">Demo mode: nothing was sent. In the live version, Jacob would follow up with this room's selections.</p><button class="btn" data-close>Keep browsing</button></div></div>`;
const root=document.createElement("div");root.id="lead-root";root.innerHTML=html;document.body.appendChild(root);
let shown=false;
window.openLead=function(reason){root.classList.add("open");shown=true;root.dataset.reason=reason||"";};
window.leadShownOnce=()=>shown;
root.addEventListener("click",e=>{if(e.target.hasAttribute("data-close"))root.classList.remove("open")});
document.addEventListener("keydown",e=>{if(e.key==="Escape")root.classList.remove("open")});
root.querySelector("#lead").addEventListener("submit",e=>{e.preventDefault();
 const v=id=>root.querySelector("#"+id).value.trim();const err=root.querySelector("#err");
 if(!v("fn"))return err.textContent="Please add your first name.";
 if(!v("mb")&&!v("em"))return err.textContent="Add a mobile or an email so I can send it.";
 if(v("em")&&!/^\S+@\S+\.\S+$/.test(v("em")))return err.textContent="That email doesn't look right.";
 err.textContent="";
 const room=(new URLSearchParams(location.search).get("room"))||"home";
 const consent=root.querySelector("#cs").checked;
 const payload={firstName:v("fn"),phone:v("mb"),email:v("em"),interest:v("in"),
  smsEmailConsent:consent,consentText:consent?root.querySelector(".consent label").textContent.trim():null,
  room,trigger:root.dataset.reason,
  tags:["source:"+(C.TAGS||{}).source,"room:"+room,"builder:"+(C.TAGS||{}).builder,"prop:"+(C.TAGS||{}).prop],
  page:location.href,userAgent:navigator.userAgent,submittedAt:new Date().toISOString(),demo:true};
 console.log("[DEMO lead payload]",payload);
 const all=JSON.parse(localStorage.getItem(KEY)||"[]");all.push(payload);localStorage.setItem(KEY,JSON.stringify(all));
 /* GHL webhook stub - NOT ACTIVE. Enable only after Jacob approves, using the Jacob Morley Real Estate sub-account (never M&M Appraisers):
 if(!C.DEMO_MODE && C.GHL_WEBHOOK_URL){
   fetch(C.GHL_WEBHOOK_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
 } */
 root.querySelector("#lead-form-wrap").hidden=true;root.querySelector("#lead-thanks").hidden=false;});
window.renderAdmin=function(el){const all=JSON.parse(localStorage.getItem(KEY)||"[]");
 el.innerHTML=`<div class="eyebrow">Demo admin &middot; stored in this browser only</div><h2 style="margin:6px 0">${all.length} lead(s)</h2>
 <button class="btn" id="clr">Clear demo leads</button>`+all.map(p=>`<pre>${JSON.stringify(p,null,2).replace(/</g,"&lt;")}</pre>`).join("");
 el.querySelector("#clr").onclick=()=>{localStorage.removeItem(KEY);renderAdmin(el)};};
})();
