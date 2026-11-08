'use strict';
/* Motor das animações: geometria, padrões de movimento e desenho */

/* ---------- geometry ---------- */
const D2R=Math.PI/180;
const dir=a=>[Math.cos(a*D2R),Math.sin(a*D2R)];
const add=(p,v,s=1)=>[p[0]+v[0]*s,p[1]+v[1]*s];
const ang=(a,b)=>Math.atan2(b[1]-a[1],b[0]-a[0])/D2R;
function ik(p1,p2,l1,l2,s){
  let dx=p2[0]-p1[0],dy=p2[1]-p1[1],d=Math.hypot(dx,dy);
  const mx=l1+l2-.4;
  if(d>mx){dx*=mx/d;dy*=mx/d;d=mx}
  const dd=Math.max(d,Math.abs(l1-l2)+.5);
  const a=Math.atan2(dy,dx);
  const B=Math.acos(Math.max(-1,Math.min(1,(l1*l1+dd*dd-l2*l2)/(2*l1*dd))));
  const j=[p1[0]+l1*Math.cos(a+s*B),p1[1]+l1*Math.sin(a+s*B)];
  const tg=[p1[0]+dx,p1[1]+dy];
  const e=add(j,dir(ang(j,tg)),l2);
  return [j,e];
}
const f1=n=>n.toFixed(1);
const ln=(a,b,c,w)=>`<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" class="${c}" stroke-width="${w}"/>`;
const ci=(c,r,cl)=>`<circle cx="${f1(c[0])}" cy="${f1(c[1])}" r="${r}" class="${cl}"/>`;

/* ---------- equipment ---------- */
const floor=(y=203)=>({k:'floor',y});
const L=(p,w=6,c='eq')=>({k:'line',p,w,c});
const C=(c,r,cl='eqf')=>({k:'circ',c,r,cl});
function gearStatic(g){
  let s='';
  for(const x of g){
    if(x.k==='floor') s+=ln([0,x.y],[200,x.y],'fl',2);
    else if(x.k==='line') s+=`<polyline points="${x.p.map(p=>p.join(',')).join(' ')}" class="${x.c}" stroke-width="${x.w}"/>`;
    else if(x.k==='circ') s+=ci(x.c,x.r,x.cl);
  }
  return s;
}

/* ---------- movement patterns ---------- */
const BENCH=[floor(),L([[22,150],[152,150]],7,'pad'),L([[38,153],[38,203]],4),L([[136,153],[136,203]],4)];
const STAND={hip:[110,114],t:-90,foot:[108,198],kb:1,eb:-1};
const P={
 curl:{rig:'side',tool:'db',hl:['ua','fa'],gear:[floor()],base:STAND,keys:[{hand:[107,117]},{hand:[78,90]},{hand:[96,60]}]},
 pushdown:{rig:'side',tool:'grip',hl:['ua','fa'],gear:[floor(),C([44,8],5),{k:'cable',from:[44,8]}],base:{hip:[112,114],t:-100,foot:[106,198],kb:1,eb:-1},keys:[{hand:[77,70]},{hand:[70,90]},{hand:[98,118]}]},
 overhead:{rig:'side',tool:'db',hl:['ua','fa'],gear:[floor(),L([[96,157],[144,157]],7,'pad'),L([[104,160],[104,203]],4),L([[138,160],[138,203]],4)],base:{hip:[112,150],t:-90,foot:[80,198],kb:1,eb:-1},keys:[{hand:[126,82]},{hand:[134,58]},{hand:[107,31]}]},
 row:{rig:'side',tool:'bar',hl:['ua','torso'],gear:[floor()],base:{hip:[132,114],t:-150,foot:[124,198],kb:1,eb:-1},keys:[{hand:[81,146]},{hand:[92,128]},{hand:[108,106]}]},
 seatrow:{rig:'side',tool:'grip',hl:['ua','torso'],gear:[floor(),L([[100,178],[150,178]],7,'pad'),L([[110,181],[110,203]],4),L([[140,181],[140,203]],4),L([[40,160],[40,194]],5),C([40,150],4),{k:'cable',from:[40,150]}],base:{hip:[124,168],t:-92,foot:[46,176],kb:1,eb:-1},keys:[{hand:[62,122]},{hand:[82,126]},{hand:[106,140]}]},
 straightarm:{rig:'side',tool:'grip',hl:['ua','torso'],gear:[floor(),C([30,4],5),{k:'cable',from:[30,4]}],base:{hip:[118,114],t:-108,foot:[110,198],kb:1,eb:-1},keys:[{hand:[66,8]},{hand:[40,64]},{hand:[96,119]}]},
 inclinecurl:{rig:'side',tool:'db',hl:['ua','fa'],gear:[floor(),L([[131,163],[165,99]],7,'pad'),L([[96,163],[134,163]],7,'pad'),L([[110,166],[110,203]],4),L([[160,112],[160,203]],4)],base:{hip:[124,156],t:-62,foot:[66,198],kb:1,eb:-1},keys:[{hand:[150,166]},{hand:[120,138]},{hand:[135,111]}]},
 scott:{rig:'side',tool:'ez',hl:['ua','fa'],gear:[floor(),L([[104,130],[112,203]],4),L([[122,99],[101,127]],8,'pad'),L([[112,157],[146,157]],7,'pad'),L([[136,160],[136,203]],4)],base:{hip:[126,150],t:-100,foot:[100,198],kb:1,eb:-1},keys:[{hand:[76,140]},{hand:[68,119]},{hand:[87,91]}]},
 pressflat:{rig:'side',tool:'bar',hl:['torso','ua'],gear:BENCH,base:{hip:[118,144],t:180,foot:[152,198],kb:-1,eb:1,fa:0},keys:[{hand:[64,128]},{hand:[62,108]},{hand:[60,84]}]},
 skull:{rig:'side',tool:'ez',hl:['ua','fa'],gear:BENCH,base:{hip:[118,144],t:180,foot:[152,198],kb:-1,eb:1,fa:0},keys:[{hand:[29,129]},{hand:[28,97]},{hand:[50,83]}]},
 pressincline:{rig:'side',tool:'bar',hl:['torso','ua'],gear:[floor(),L([[124,156],[66,107]],7,'pad'),L([[108,160],[150,160]],7,'pad'),L([[98,148],[98,203]],4),L([[140,163],[140,203]],4)],base:{hip:[128,150],t:-140,foot:[156,198],kb:-1,eb:1,fa:0},keys:[{hand:[93,105]},{hand:[89,78]},{hand:[86,52]}]},
 pressdecline:{rig:'side',tool:'bar',hl:['torso','ua'],gear:[floor(),L([[116,143],[38,164]],7,'pad'),L([[52,166],[52,203]],4),L([[118,146],[118,203]],4),C([156,173],5,'padf')],base:{hip:[112,136],t:165,foot:[150,168],kb:-1,eb:1,fa:-20},keys:[{hand:[56,140]},{hand:[57,115]},{hand:[58,90]}]},
 dip:{rig:'side',tool:null,hl:['torso','fa'],gear:[floor(),L([[66,126],[132,126]],5),L([[76,128],[76,203]],4)],base:{eb:-1,kb:1,footRel:[30,52]},keys:[{hip:[105,120],t:-95,hand:[100,124]},{hip:[124,146],t:-110,hand:[100,124]}]},
 squat:{rig:'side',tool:'bar',barR:14,hl:['th','sn'],gear:[floor()],base:{foot:[104,198],kb:1,eb:1,handRel:[9,-3]},keys:[{hip:[112,114],t:-92},{hip:[122,140],t:-110},{hip:[132,162],t:-128}]},
 legpress:{rig:'side',tool:'plat',hl:['th','sn'],gear:[floor(),L([[36,80],[100,144]],3),L([[140,178],[186,124]],7,'pad'),L([[110,180],[146,180]],7,'pad'),L([[128,183],[128,203]],4),L([[70,114],[70,203]],3)],base:{hip:[140,170],t:-50,kb:1,eb:1,handRel:[-8,40]},keys:[{foot:[110,140]},{foot:[82,112]}]},
 extension:{rig:'side',tool:'pad',padSide:1,hl:['th'],gear:[floor(),L([[88,157],[140,157]],7,'pad'),L([[139,152],[137,100]],7,'pad'),L([[116,160],[116,203]],4)],base:{hip:[130,150],t:-92,kb:1,eb:1,handRel:[6,52]},keys:[{foot:[86,192]},{foot:[56,180]},{foot:[44,152]}]},
 stiff:{rig:'side',tool:'bar',hl:['th'],gear:[floor()],base:{foot:[106,198],kb:1,eb:1,handRel:[-1,60]},keys:[{hip:[110,114],t:-90},{hip:[128,118],t:-168}]},
 legcurl:{rig:'side',tool:'pad',padSide:-1,hl:['th'],gear:[floor(),L([[14,157],[160,157]],7,'pad'),L([[30,160],[30,203]],4),L([[146,160],[146,203]],4)],base:{hip:[100,150],t:180,kb:1,eb:1,handRel:[-12,14]},keys:[{foot:[184,153]},{foot:[172,121]},{foot:[136,110]}]},
 hipthrust:{rig:'side',tool:'bar',barR:13,hl:['th'],gear:[floor(),L([[30,150],[66,150]],7,'pad'),L([[38,153],[38,203]],4),L([[58,153],[58,203]],4)],base:{foot:[142,198],kb:-1,eb:1,handHip:[-2,-9],fa:0},keys:[{hip:[108,190],t:-142},{hip:[114,152],t:-180}]},
 lunge:{rig:'side',tool:'db',hl:['th'],gear:[floor()],base:{t:-90,kb:1,eb:-1,handRel:[0,60],foot:[70,198],foot2:[150,196],kb2:1,fa2:155},keys:[{hip:[110,116]},{hip:[110,156]}]},
 calf:{rig:'side',tool:'db',hl:['sn'],gear:[floor(),L([[80,202],[116,202]],5,'pad')],base:{t:-90,kb:1,eb:-1,handRel:[0,60]},keys:[{hip:[110,112],foot:[108,196],fa:185},{hip:[110,102],foot:[108,186],fa:140}]},
 hyper:{rig:'side',tool:null,hl:['torso'],gear:[floor(),L([[116,142],[150,203]],4),C([112,136],7,'padf'),L([[178,194],[178,203]],4),C([178,189],5,'padf')],base:{hip:[118,128],foot:[172,196],kb:1,eb:1,handT:[-14,6]},keys:[{t:-245},{t:-128}]},
 crunch:{rig:'side',tool:null,hl:['torso'],gear:[floor(187)],base:{hip:[122,180],foot:[160,182],kb:-1,eb:1,handT:[10,6],fa:0},keys:[{t:180},{t:210}]},
 legraise:{rig:'side',tool:null,hl:['th','torso'],gear:[floor(187)],base:{hip:[110,180],t:180,kb:-1,eb:1,handRel:[30,4]},keys:[{foot:[194,181],fa:-90},{foot:[170,120],fa:-45},{foot:[112,96],fa:0}]},
 frontraise:{rig:'side',tool:'db',hl:['ua'],gear:[floor()],base:STAND,keys:[{handRel:[-2,61]},{handRel:[-43,43]},{handRel:[-61,-2]}]},
 /* front view */
 lateral:{rig:'front',tool:'dbF',hl:['ua'],gear:[floor()],base:{hip:[100,114],footR:[112,198],kb:-1,eb:1},keys:[{handR:[121,117]},{handR:[158,98]},{handR:[176,58]}]},
 press:{rig:'front',tool:'dbF',hl:['ua'],gear:[floor(),L([[100,150],[100,72]],22,'pad'),L([[66,147],[134,147]],7,'pad'),L([[72,150],[72,203]],4),L([[128,150],[128,203]],4)],base:{hip:[100,140],footR:[126,198],kb:-1,eb:1},keys:[{handR:[144,71]},{handR:[138,46]},{handR:[124,22]}]},
 fly:{rig:'front',view:'vista de cima',tool:'dbF',hl:['torso'],gear:[L([[100,66],[100,176]],34,'pad')],base:{hip:[100,152],footR:[114,212],kb:-1,eb:1},keys:[{handR:[176,100]},{handR:[160,52]},{handR:[106,36]}]},
 revfly:{rig:'front',view:'vista de cima',tool:'gripF',hl:['ua'],gear:[L([[100,66],[100,176]],34,'pad')],base:{hip:[100,152],footR:[114,212],kb:-1,eb:1},keys:[{handR:[106,36]},{handR:[160,52]},{handR:[176,100]}]},
 crossdown:{rig:'front',tool:'gripF',hl:['torso'],gear:[floor(),C([194,6],4),C([6,6],4),{k:'cableF',aR:[194,6],aL:[6,6]}],base:{hip:[100,114],footR:[116,198],kb:-1,eb:-1},keys:[{handR:[166,20]},{handR:[162,100]},{handR:[102,116]}]},
 crossup:{rig:'front',tool:'gripF',hl:['torso'],gear:[floor(),C([194,200],4),C([6,200],4),{k:'cableF',aR:[194,200],aL:[6,200]}],base:{hip:[100,114],footR:[116,198],kb:-1,eb:1},keys:[{handR:[152,108]},{handR:[170,52]},{handR:[106,2]}]},
 pulldown:{rig:'front',tool:'barF',hl:['ua','torso'],gear:[floor(),C([100,4],4),{k:'cableC',a:[100,4]},L([[64,159],[136,159]],7,'pad'),L([[100,162],[100,203]],4)],base:{hip:[100,152],footR:[124,200],kb:-1,eb:1},keys:[{handR:[150,42]},{handR:[146,86]}]},
 chinup:{rig:'front',tool:'gripF',hl:['ua','torso'],gear:[L([[30,20],[170,20]],4)],base:{handR:[138,20],eb:1,kb:-1,footRel:[6,62]},keys:[{hip:[100,136]},{hip:[100,104]}]},
 shrug:{rig:'front',tool:'dbF',hl:['torso'],gear:[floor()],base:{hip:[100,114],footR:[112,198],kb:-1,eb:1,handRel:[3,61]},keys:[{sy:0},{sy:10}]},
 woodchop:{rig:'front',tool:'gripF',hl:['torso'],gear:[floor(),C([194,6],4),{k:'cableC',a:[194,6]}],base:{footR:[124,198],footL:[76,198],kb:-1,eb:-1,ebL:1},keys:[{hip:[104,114],lean:12,handR:[150,28],handL:[150,28]},{hip:[98,114],lean:-5,handR:[110,80],handL:[110,80]},{hip:[92,114],lean:-22,handR:[74,114],handL:[74,114]}]},
 bulgarian:{rig:'side',tool:'db',hl:['th'],gear:[floor(),L([[140,166],[192,166]],7,'pad'),L([[148,169],[148,203]],4),L([[184,169],[184,203]],4)],base:{t:-90,kb:1,eb:-1,handRel:[0,60],foot:[72,198],foot2:[156,160],kb2:1,fa2:10},keys:[{hip:[106,112]},{hip:[108,148]}]},
 adduct:{rig:'front',tool:null,hl:['th'],gear:[floor(),L([[100,150],[100,74]],22,'pad'),L([[60,147],[140,147]],7,'pad'),L([[70,150],[70,203]],4),L([[130,150],[130,203]],4)],base:{hip:[100,140],kb:-1,eb:1,handRel:[10,56]},keys:[{footR:[152,186]},{footR:[113,196]}]},
 abduct:{rig:'front',tool:null,hl:['th'],gear:[floor(),L([[100,150],[100,74]],22,'pad'),L([[60,147],[140,147]],7,'pad'),L([[70,150],[70,203]],4),L([[130,150],[130,203]],4)],base:{hip:[100,140],kb:-1,eb:1,handRel:[10,56]},keys:[{footR:[113,196]},{footR:[152,186]}]},
 calfseat:{rig:'side',tool:'kneepad',hl:['sn'],gear:[floor(),L([[100,157],[150,157]],7,'pad'),L([[125,160],[125,203]],4),L([[64,197],[92,197]],5,'pad')],base:{hip:[130,150],t:-92,kb:1,eb:1,handRel:[-38,46]},keys:[{foot:[86,192],fa:185},{foot:[86,183],fa:140}]},
 seatcurl:{rig:'side',tool:'pad',padSide:-1,hl:['th'],gear:[floor(),L([[88,157],[140,157]],7,'pad'),L([[139,152],[137,100]],7,'pad'),L([[116,160],[116,203]],4),L([[80,142],[110,142]],6,'pad')],base:{hip:[130,150],t:-92,kb:1,eb:1,handRel:[6,52]},keys:[{foot:[44,152]},{foot:[56,180]},{foot:[86,192]},{foot:[100,190]}]},
 plank:{rig:'side',tool:null,hl:['torso'],gear:[floor()],base:{foot:[197,192],fa:100,kb:1,eb:-1,hand:[28,201]},keys:[{hip:[110,178],t:190},{hip:[110,172],t:184}]},
 sideplank:{rig:'side',view:'vista frontal',tool:null,hl:['torso'],gear:[floor()],base:{foot:[197,194],fa:100,kb:1,eb:-1,hand:[26,201]},keys:[{hip:[110,192],t:201},{hip:[110,176],t:188}]},
 mountain:{rig:'side',tool:null,hl:['torso','th'],gear:[floor()],base:{hip:[112,150],t:190,hand:[55,201],foot:[186,194],fa:100,kb:1,eb:1,kb2:1,fa2:100},keys:[{foot2:[184,194]},{foot2:[104,194]}]},
 deadbug:{rig:'side',tool:null,hl:['torso'],gear:[floor(192)],base:{hip:[124,182],t:180,foot:[166,138],fa:-60,kb:-1,eb:1,foot2:[166,138],fa2:-60,kb2:-1,hand2:[66,122]},keys:[{hand:[64,122]},{hand:[12,178],foot2:[200,174]}]},
 pallof:{rig:'side',tool:'grip',hl:['torso'],gear:[floor(),C([10,64],4),{k:'cable',from:[10,64]}],base:{hip:[112,116],t:-90,foot:[104,198],kb:1,eb:-1},keys:[{hand:[92,70]},{hand:[52,62]}]},
 carry:{rig:'side',tool:'db',hl:['torso','fa'],gear:[floor()],base:{hip:[110,114],t:-90,kb:1,eb:-1,handRel:[0,60],kb2:1},keys:[{foot:[90,198],foot2:[130,198]},{foot:[130,198],foot2:[90,198]}]},
 goblet:{rig:'side',tool:'db',hl:['th','sn'],gear:[floor()],base:{foot:[104,198],kb:1,eb:-1,handRel:[-14,14]},keys:[{hip:[112,114],t:-92},{hip:[122,140],t:-110},{hip:[132,162],t:-128}]},
 swing:{rig:'side',tool:'db',hl:['th','torso'],gear:[floor()],base:{foot:[106,198],kb:1,eb:1},keys:[{hip:[128,122],t:-150,hand:[114,152]},{hip:[110,114],t:-90,hand:[52,64]}]},
 stepup:{rig:'side',tool:'db',hl:['th'],gear:[floor(),L([[54,203],[54,172],[104,172],[104,203]],4)],base:{t:-90,kb:1,eb:-1,handRel:[0,60],kb2:1},keys:[{hip:[112,130],foot:[78,170],foot2:[140,198]},{hip:[86,90],foot:[80,170],foot2:[98,150]}]}
};
for(const k in P){P[k]._k=P[k].keys.map(x=>Object.assign({},P[k].base,x))}

function lerpObj(a,b,u){
  const o={};
  for(const k in a){const va=a[k],vb=b[k];
    if(typeof va==='number'&&typeof vb==='number')o[k]=va+(vb-va)*u;
    else if(Array.isArray(va)&&Array.isArray(vb))o[k]=va.map((x,j)=>x+(vb[j]-x)*u);
    else o[k]=(u<.5||vb===undefined)?va:vb;}
  for(const k in b)if(!(k in o))o[k]=b[k];
  return o;
}
function poseAt(pat,s){const ks=pat._k,n=ks.length,f=s*(n-1),i=Math.min(Math.floor(f),n-2);return lerpObj(ks[i],ks[i+1],f-i)}

function handTool(tool,h,pat){
  if(tool==='bar')return ci(h,pat.barR||12,'pl')+ci(h,3,'hub');
  if(tool==='db')return ci(h,6.5,'pl');
  if(tool==='ez')return ci(h,7.5,'pl')+ci(h,2,'hub');
  if(tool==='grip')return ci(h,3.5,'eqf');
  return '';
}

function drawSide(pat,k,tool){
  const hl=pat.hl||[],c=(n,b)=>hl.includes(n)?'hl':b,c2=n=>hl.includes(n)?'hl2':'b2';
  const t=k.t,hip=k.hip,sh=add(hip,dir(t),58),head=add(hip,dir(t),75);
  const hand=k.hand?k.hand:k.handRel?[sh[0]+k.handRel[0],sh[1]+k.handRel[1]]:k.handHip?[hip[0]+k.handHip[0],hip[1]+k.handHip[1]]:k.handT?add(add(sh,dir(t),k.handT[0]),dir(t-90),k.handT[1]):add(sh,[0,1],60);
  const foot=k.foot?k.foot:[hip[0]+k.footRel[0],hip[1]+k.footRel[1]];
  const [el,ha]=ik(sh,hand,32,30,k.eb||1);
  const [kn,an]=ik(hip,foot,44,42,k.kb||1);
  const shinA=ang(kn,an),toe=add(an,dir(k.fa!=null?k.fa:shinA+90),12);
  const O=[4,-3],off=p=>[p[0]+O[0],p[1]+O[1]];
  let s=gearStatic(pat.gear);
  // back leg
  if(k.foot2){const [bk,ba]=ik(hip,k.foot2,44,42,k.kb2||1);const bt=add(ba,dir(k.fa2!=null?k.fa2:ang(bk,ba)+90),12);
    s+=ln(hip,bk,c2('th'),6)+ln(bk,ba,c2('sn'),5)+ln(ba,bt,'b2',4);}
  else s+=ln(off(hip),off(kn),c2('th'),6)+ln(off(kn),off(an),c2('sn'),5)+ln(off(an),off(toe),'b2',4);
  // back arm
  if(k.hand2){const [be,bh]=ik(sh,k.hand2,32,30,k.eb||1);s+=ln(sh,be,c2('ua'),5)+ln(be,bh,c2('fa'),4);}
  else s+=ln(off(sh),off(el),c2('ua'),5)+ln(off(el),off(ha),c2('fa'),4);
  s+=ln(hip,sh,c('torso','b'),10)+ci(head,10,'hd');
  s+=ln(hip,kn,c('th','b'),7)+ln(kn,an,c('sn','b'),6)+ln(an,toe,'b',5);
  if(tool==='pad'){const sd=pat.padSide||1;s+=ci(add(add(an,dir(shinA+90*sd),6),dir(shinA),-5),5,'padf');}
  if(tool==='kneepad')s+=ci([kn[0],kn[1]-9],5.5,'padf');
  if(tool==='plat'){const cpt=add(an,dir(-135),5);s+=ln(add(cpt,dir(-45),-17),add(cpt,dir(-45),17),'eq',5);}
  for(const g of pat.gear)if(g.k==='cable')s+=ln(g.from,ha,'cab',1.5);
  s+=handTool(tool,ha,pat);
  s+=ln(sh,el,c('ua','b'),6)+ln(el,ha,c('fa','b'),5);
  return s;
}

function drawFront(pat,k,tool){
  const hl=pat.hl||[],c=(n,b)=>hl.includes(n)?'hl':b;
  const lean=k.lean||0,up=dir(-90+lean),pp=dir(lean),sy=k.sy||0,hip=k.hip;
  const sc=add(hip,up,58+sy),shR=add(sc,pp,17),shL=add(sc,pp,-17),head=add(hip,up,76);
  const hR=add(hip,pp,9),hL=add(hip,pp,-9);
  const handR=k.handR?k.handR:[shR[0]+k.handRel[0],shR[1]+k.handRel[1]];
  const handL=k.handL?k.handL:k.handRel?[shL[0]-k.handRel[0],shL[1]+k.handRel[1]]:[2*hip[0]-handR[0],handR[1]];
  const footR=k.footR?k.footR:[hip[0]+k.footRel[0],hip[1]+k.footRel[1]];
  const footL=k.footL?k.footL:[2*hip[0]-footR[0],footR[1]];
  const [eR,aR]=ik(shR,handR,32,30,k.eb||1),[eL,aL]=ik(shL,handL,32,30,k.ebL!=null?k.ebL:-(k.eb||1));
  const [kR,fR]=ik(hR,footR,44,42,k.kb||1),[kL,fL]=ik(hL,footL,44,42,-(k.kb||1));
  let s=gearStatic(pat.gear);
  s+=ln(hR,kR,c('th','b'),7)+ln(kR,fR,c('sn','b'),6)+ln(fR,[fR[0]+8,fR[1]+1],'b',5);
  s+=ln(hL,kL,c('th','b'),7)+ln(kL,fL,c('sn','b'),6)+ln(fL,[fL[0]-8,fL[1]+1],'b',5);
  s+=`<polygon points="${[shR,shL,hL,hR].map(p=>f1(p[0])+','+f1(p[1])).join(' ')}" class="${hl.includes('torso')?'tfh':'tf'}"/>`;
  s+=ln(sc,head,'b',6)+ci(head,10,'hd');
  for(const g of pat.gear){
    if(g.k==='cableF')s+=ln(g.aR,aR,'cab',1.5)+ln(g.aL,aL,'cab',1.5);
    if(g.k==='cableC')s+=ln(g.a,[(aR[0]+aL[0])/2,(aR[1]+aL[1])/2],'cab',1.5);
  }
  s+=ln(shR,eR,c('ua','b'),6)+ln(eR,aR,c('fa','b'),5)+ln(shL,eL,c('ua','b'),6)+ln(eL,aL,c('fa','b'),5);
  if(tool==='dbF'){for(const h of [aR,aL])s+=ln([h[0]-8,h[1]],[h[0]+8,h[1]],'eq',4)+ci([h[0]-8,h[1]],4.5,'eqf')+ci([h[0]+8,h[1]],4.5,'eqf');}
  if(tool==='barF'){const a=ang(aL,aR);s+=ln(add(aL,dir(a),-14),add(aR,dir(a),14),'eq',3.5);}
  if(tool==='gripF')s+=ci(aR,3.5,'eqf')+ci(aL,3.5,'eqf');
  return s;
}
function draw(pat,k,tool){return pat.rig==='front'?drawFront(pat,k,tool):drawSide(pat,k,tool)}

