const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage();
const out=await p.evaluate(()=>{
 function icon(size,mask,round){const c=document.createElement('canvas');c.width=c.height=size;const g=c.getContext('2d');const s=size;
  g.fillStyle='#15181c';
  if(round){const r=s*0.22;g.beginPath();g.moveTo(r,0);g.arcTo(s,0,s,s,r);g.arcTo(s,s,0,s,r);g.arcTo(0,s,0,0,r);g.arcTo(0,0,s,0,r);g.fill()}else g.fillRect(0,0,s,s);
  const cx=s/2,cy=s/2,R=s*(mask?0.30:0.36);
  // bar
  g.fillStyle='#8b949e';g.fillRect(cx-R*1.35,cy-R*0.07,R*2.7,R*0.14);
  // plate
  g.fillStyle='#cf3a2c';g.beginPath();g.arc(cx,cy,R,0,7);g.fill();
  g.strokeStyle='rgba(0,0,0,.22)';g.lineWidth=R*0.07;g.beginPath();g.arc(cx,cy,R*0.80,0,7);g.stroke();
  g.fillStyle='#e9ecef';g.beginPath();g.arc(cx,cy,R*0.24,0,7);g.fill();
  g.fillStyle='#15181c';g.beginPath();g.arc(cx,cy,R*0.13,0,7);g.fill();
  return c.toDataURL('image/png').split(',')[1]}
 return {i192:icon(192,false,true),i512:icon(512,false,true),m512:icon(512,true,false),a180:icon(180,false,false)}});
fs.writeFileSync('src/icons/icon-192.png',Buffer.from(out.i192,'base64'));fs.writeFileSync('src/icons/icon-512.png',Buffer.from(out.i512,'base64'));
fs.writeFileSync('src/icons/icon-maskable-512.png',Buffer.from(out.m512,'base64'));fs.writeFileSync('src/icons/apple-touch-icon.png',Buffer.from(out.a180,'base64'));
await b.close()})();
