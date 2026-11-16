const KEY="eidolon-relay-nexus-v1";
const seed=[
{id:"a1",kind:"need",category:"Water",quantity:5,area:"Puttur",expires:Date.now()+86400000},
{id:"b2",kind:"offer",category:"Water",quantity:10,area:"Puttur",expires:Date.now()+86400000},
{id:"c3",kind:"need",category:"Medical",quantity:2,area:"Sullia",expires:Date.now()+86400000},
{id:"d4",kind:"offer",category:"Food",quantity:20,area:"Bantwal",expires:Date.now()+86400000},
{id:"e5",kind:"need",category:"Shelter",quantity:3,area:"Mangaluru",expires:Date.now()+86400000}
];
let records;
try{const v=JSON.parse(localStorage.getItem(KEY));records=Array.isArray(v)?v:seed.slice()}catch{records=seed.slice()}
let events=[{text:"Local simulation initialized",time:new Date()}],kind="need",rotation=0,drag=false,prevX=0,hover=-1,projected=[];
const $=id=>document.getElementById(id);
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(records))}catch{}};
const active=()=>records.filter(m=>m.expires>Date.now());
const matches=()=>{const a=active();return a.filter(n=>n.kind==="need").flatMap(n=>a.filter(o=>o.kind==="offer"&&o.category===n.category&&o.area===n.area).map(o=>({need:n,offer:o,units:Math.min(n.quantity,o.quantity)})))};
function log(text){events.unshift({text,time:new Date()});events=events.slice(0,7)}
function render(){
 const a=active(),m=matches();
 $("stat-msg").textContent=String(a.length).padStart(2,"0");
 $("stat-needs").textContent=String(a.filter(x=>x.kind==="need").length).padStart(2,"0");
 $("stat-offers").textContent=String(a.filter(x=>x.kind==="offer").length).padStart(2,"0");
 $("stat-match").textContent=String(m.length).padStart(2,"0");
 $("scene-count").textContent=a.length+" NODES";
 $("events").replaceChildren();
 for(const e of events){const row=document.createElement("div");row.className="event";const sym=document.createElement("span");sym.className="event-symbol";sym.textContent="◈";const desc=document.createElement("span");desc.textContent=e.text;const time=document.createElement("span");time.className="event-time";time.textContent=e.time.toLocaleTimeString();row.append(sym,desc,time);$("events").append(row)}
 $("match-list").replaceChildren();
 if(!m.length){const empty=document.createElement("p");empty.className="empty";empty.textContent="No compatible offers found yet. Publish matching needs and offers in the same area."; $("match-list").append(empty)}
 for(const item of m){const row=document.createElement("div");row.className="match-row";const box=document.createElement("div");const name=document.createElement("b");name.textContent=item.need.category+" · "+item.need.area;const sub=document.createElement("small");sub.textContent="Need "+item.need.quantity+" / Offer "+item.offer.quantity;box.append(name,sub);const badge=document.createElement("span");badge.textContent=item.units+" UNITS";row.append(box,badge);$("match-list").append(row)}
}
document.querySelectorAll(".choice").forEach(b=>b.addEventListener("click",()=>{kind=b.dataset.kind;document.querySelectorAll(".choice").forEach(x=>x.classList.toggle("selected",x===b))}));
$("message-form").addEventListener("submit",e=>{e.preventDefault();const quantity=Number($("quantity").value);if(!Number.isSafeInteger(quantity)||quantity<1||quantity>10000)return;const msg={id:crypto.randomUUID(),kind,category:$("category").value,quantity,area:$("area").value,expires:Date.now()+86400000};records.push(msg);save();log(kind.toUpperCase()+" · "+msg.category+" · "+quantity+" · "+msg.area);render();$("selected-node").textContent="New "+kind+" stored locally · "+msg.category});
$("sync").addEventListener("click",()=>{const before=records.length;const unique=new Map(records.map(m=>[m.id,m]));records=[...unique.values()].filter(m=>m.expires>Date.now());save();const count=matches().length;log("Simulated sync completed · "+count+" compatible matches");$("sync-result").textContent="SIMULATED SYNC · "+(before-records.length)+" EXPIRED/DUPLICATE REMOVED · "+count+" MATCHES";render()});
$("reset").addEventListener("click",()=>{records=seed.map(x=>({...x,expires:Date.now()+86400000}));save();log("Scenario restored to initial state");$("sync-result").textContent="AWAITING SYNC EVENT";render()});
const labels={network:["SYSTEM / 001 — NETWORK TOPOLOGY","The network <em>is alive.</em>","A living simulation of requests, resources and resilient coordination."],requests:["SYSTEM / 002 — EMERGENCY REQUESTS","Every signal <em>matters.</em>","Create local needs and inspect them in the network field."],resources:["SYSTEM / 003 — RESOURCE REGISTRY","Help is <em>within reach.</em>","Publish available supplies and discover compatible needs."],protocol:["SYSTEM / 004 — PROTOCOL EVIDENCE","Trust through <em>evidence.</em>","A deterministic browser simulation; wireless delivery is not implemented."]};
document.querySelectorAll(".nav").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".nav").forEach(x=>x.classList.toggle("active",x===b));const [ey,h,sub]=labels[b.dataset.view];$("section-id").textContent=ey;$("page-title").innerHTML=h;$("page-sub").textContent=sub;if(b.dataset.view==="requests"||b.dataset.view==="resources"){kind=b.dataset.view==="requests"?"need":"offer";document.querySelectorAll(".choice").forEach(x=>x.classList.toggle("selected",x.dataset.kind===kind));$("category").focus()}}));
setInterval(()=>$("clock").textContent=new Date().toLocaleTimeString("en-GB"),1000);
const canvas=$("network"),ctx=canvas.getContext("2d");let width=0,height=0,dpr=1;
function resize(){const r=canvas.getBoundingClientRect();dpr=Math.min(devicePixelRatio||1,2);width=r.width;height=r.height;canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0)}
new ResizeObserver(resize).observe(canvas);
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
function frame(t){ctx.clearRect(0,0,width,height);const cx=width/2,cy=height/2,scale=Math.min(width*.39,height*.42);
 ctx.strokeStyle="#173848";ctx.lineWidth=1;
 for(let j=1;j<=4;j++){ctx.beginPath();ctx.ellipse(cx,cy,scale*j/4,scale*j/8,0,0,Math.PI*2);ctx.stroke()}
 const a=active().slice(0,28),points=[{x:0,y:0,z:0,hub:true}];
 a.forEach((m,i)=>{const theta=i*2.39996,rad=.35+.62*Math.sqrt((i+1)/(a.length+1));points.push({x:Math.cos(theta)*rad,y:Math.sin(i*1.73)*.58,z:Math.sin(theta)*rad,m})});
 const yaw=rotation+(reduce?0:t*.000075);
 projected=points.map(p=>{const xx=p.x*Math.cos(yaw)-p.z*Math.sin(yaw),zz=p.x*Math.sin(yaw)+p.z*Math.cos(yaw),pers=2.8/(2.8+zz);return {...p,sx:cx+xx*scale*pers,sy:cy+p.y*scale*pers,sz:zz,pers}});
 for(let i=1;i<projected.length;i++){const p=projected[i],hub=projected[0],match=matches().some(x=>x.need.id===p.m.id||x.offer.id===p.m.id);ctx.beginPath();ctx.moveTo(hub.sx,hub.sy);ctx.lineTo(p.sx,p.sy);ctx.strokeStyle=match?"rgba(100,236,206,.38)":"rgba(79,134,153,.18)";ctx.lineWidth=match?1.5:1;ctx.stroke()}
 projected.forEach((p,i)=>{const r=(i===0?14:7)*p.pers;const color=i===0?"#85baff":p.m.kind==="need"?"#ffc17e":"#71f3d1";const glow=ctx.createRadialGradient(p.sx,p.sy,1,p.sx,p.sy,r*4);glow.addColorStop(0,color+"88");glow.addColorStop(1,"#00000000");ctx.fillStyle=glow;ctx.beginPath();ctx.arc(p.sx,p.sy,r*4,0,Math.PI*2);ctx.fill();ctx.fillStyle=color;ctx.beginPath();ctx.arc(p.sx,p.sy,r,0,Math.PI*2);ctx.fill();ctx.strokeStyle="#e2fffa";ctx.lineWidth=1;ctx.stroke();if(i===0){ctx.font="10px monospace";ctx.fillStyle="#a8d6dd";ctx.fillText("RELAY CORE",p.sx+20,p.sy-17)}});
 if(!reduce)requestAnimationFrame(frame)}
canvas.addEventListener("pointerdown",e=>{drag=true;prevX=e.clientX;canvas.setPointerCapture(e.pointerId)});
canvas.addEventListener("pointermove",e=>{if(drag){rotation+=(e.clientX-prevX)*.008;prevX=e.clientX}});
canvas.addEventListener("pointerup",e=>{drag=false;const r=canvas.getBoundingClientRect();const x=e.clientX-r.left,y=e.clientY-r.top;const p=projected.slice(1).find(p=>Math.hypot(p.sx-x,p.sy-y)<22);if(p)$("selected-node").textContent=p.m.kind.toUpperCase()+" · "+p.m.category+" · "+p.m.quantity+" · "+p.m.area});
render();requestAnimationFrame(frame);
