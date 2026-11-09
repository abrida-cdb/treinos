'use strict';
/* ============================================================
   Treinos — app de academia (PWA)
   Dados ficam no aparelho (localStorage). Backup em Excel/JSON.
   ============================================================ */
const APP_VERSION = '1.0.2';
const KEY = 'treinos-app-v1', DKEY = 'treinos-app-rascunhos';

/* ---------- constantes ---------- */
const PLATES = [
  {c:'var(--red)',fig:'#ff5d4a'},{c:'var(--blue)',fig:'#5594ff'},{c:'var(--yellow)',fig:'#ffcb33',light:true},
  {c:'var(--green)',fig:'#40d37c'},{c:'var(--white)',fig:'#ffffff',light:true},{c:'var(--black)',fig:'#c5cbd2'}
];
const WEEKDAYS = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
const REPS_ONLY = ['crunch','legraise','hyper','plank','sideplank','deadbug','mountain','carry'];
const PAT_LABELS = {
  pressflat:'Supino reto',pressincline:'Supino inclinado',pressdecline:'Supino declinado',fly:'Crucifixo',crossdown:'Crossover (polia alta)',crossup:'Crossover (polia baixa)',dip:'Paralelas',
  pulldown:'Puxada frontal',chinup:'Barra fixa / graviton',row:'Remada curvada',seatrow:'Remada sentada',straightarm:'Pulldown braços estendidos',revfly:'Crucifixo inverso',shrug:'Encolhimento',
  press:'Desenvolvimento',lateral:'Elevação lateral',frontraise:'Elevação frontal',
  curl:'Rosca em pé',inclinecurl:'Rosca no banco inclinado',scott:'Rosca Scott',pushdown:'Tríceps na polia',overhead:'Tríceps acima da cabeça',skull:'Tríceps testa',
  squat:'Agachamento com barra',goblet:'Agachamento goblet / sumô',legpress:'Leg press',bulgarian:'Agachamento búlgaro',lunge:'Afundo',stepup:'Step-up',extension:'Cadeira extensora',
  stiff:'Stiff / terra romeno',legcurl:'Mesa flexora',seatcurl:'Cadeira flexora',hipthrust:'Elevação pélvica',swing:'Swing com kettlebell',adduct:'Cadeira adutora',abduct:'Cadeira abdutora',
  calf:'Panturrilha em pé',calfseat:'Panturrilha sentado',
  plank:'Prancha',sideplank:'Prancha lateral',deadbug:'Dead bug',mountain:'Escalador',crunch:'Abdominal',legraise:'Elevação de pernas',pallof:'Pallof press',woodchop:'Lenhador',carry:'Caminhada do fazendeiro',hyper:'Hiperextensão'
};
const PAT_GROUPS = [
  ['Peito',['pressflat','pressincline','pressdecline','fly','crossdown','crossup','dip']],
  ['Costas',['pulldown','chinup','row','seatrow','straightarm','revfly','shrug']],
  ['Ombros',['press','lateral','frontraise']],
  ['Braços',['curl','inclinecurl','scott','pushdown','overhead','skull']],
  ['Pernas e glúteos',['squat','goblet','legpress','bulgarian','lunge','stepup','extension','stiff','legcurl','seatcurl','hipthrust','swing','adduct','abduct','calf','calfseat']],
  ['Core',['plank','sideplank','deadbug','mountain','crunch','legraise','pallof','woodchop','carry','hyper']]
];
const TOOLS = [['','Padrão da animação'],['db','Halteres'],['bar','Barra'],['ez','Barra W'],['grip','Pegador / cabo'],['none','Sem equipamento']];
const FIELD_CATALOG = [
  {k:'peso',l:'Peso',u:'kg',ph:'80,0'},{k:'gordura',l:'Gordura',u:'%',ph:'20,0'},{k:'cintura',l:'Cintura',u:'cm',ph:'85'},
  {k:'peito',l:'Peito',u:'cm',ph:'100'},{k:'quadril',l:'Quadril',u:'cm',ph:'98'},{k:'braco',l:'Braço',u:'cm',ph:'35'},{k:'coxa',l:'Coxa',u:'cm',ph:'58'}
];

/* ---------- utilidades ---------- */
const $ = s => document.querySelector(s);
const esc = t => String(t == null ? '' : t).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid = () => Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);
function today(){const d=new Date();return new Date(d.getTime()-d.getTimezoneOffset()*6e4).toISOString().slice(0,10)}
function fmtDate(v){const p=String(v||'').split('-');return p.length===3?p[2]+'/'+p[1]+'/'+p[0].slice(2):String(v||'')}
function fmtFull(v){const p=String(v||'').split('-');return p.length===3?p[2]+'/'+p[1]+'/'+p[0]:String(v||'')}
const numBR = v => {const t=String(v==null?'':v).trim().replace(',','.');if(t==='')return null;const n=parseFloat(t);return isFinite(n)?n:null};
const fmtN = (n,d=1) => n==null?'–':Number(n).toLocaleString('pt-BR',{minimumFractionDigits:0,maximumFractionDigits:d});
const sgn = n => (n>0?'+':n<0?'−':'±')+fmtN(Math.abs(n));
const yt = q => 'https://www.youtube.com/results?search_query='+encodeURIComponent(q+' execução correta');
const plateOf = i => PLATES[((i%PLATES.length)+PLATES.length)%PLATES.length];
const shortWd = w => w ? w.slice(0,3) : '';
const clamp = (n,a,b) => Math.max(a,Math.min(b,n));

let toastTimer = null;
function toast(msg, actLabel, actFn, ms){
  const t = $('#toast'); t.innerHTML = '';
  const s = document.createElement('span'); s.textContent = msg; t.appendChild(s);
  if (actLabel){const b=document.createElement('button');b.type='button';b.className='btn';b.textContent=actLabel;b.onclick=()=>{t.hidden=true;actFn()};t.appendChild(b)}
  t.hidden = false; clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>{t.hidden=true}, ms || (actLabel?12000:3500));
}
/* confirmação em dois toques, sem diálogos do navegador */
function armed(el, label){
  if (el.dataset.armed === '1') return true;
  const old = el.textContent; el.dataset.armed = '1'; el.classList.add('armed'); el.textContent = label || 'Toque de novo para confirmar';
  setTimeout(()=>{ if (el.isConnected){ el.dataset.armed=''; el.classList.remove('armed'); el.textContent = old; } }, 4000);
  return false;
}

/* ---------- dados ---------- */
let S;
function parseSr(sr){const m=String(sr||'').match(/^\s*(\d+)\s*[×x]\s*(.+)$/i);return m?{sets:+m[1],reps:m[2].trim()}:{sets:3,reps:String(sr||'10')}}
function normEx(e){
  const base = (e.sets==null && e.sr!=null) ? parseSr(e.sr) : {sets:e.sets, reps:e.reps};
  const pat = PAT_LABELS[e.pat] ? e.pat : '';
  return {
    id: e.id || uid(), n: String(e.n || e.nome || 'Exercício').slice(0,120), part: String(e.part || e.musculo || '').slice(0,120),
    sets: clamp(parseInt(base.sets,10)||3,1,10), reps: String(base.reps==null?'10':base.reps).slice(0,40), rest: String(e.rest||e.descanso||'').slice(0,30),
    pat, tool: e.tool===undefined||e.tool===''?'':(e.tool===null||e.tool==='none'?'none':(['db','bar','ez','grip'].includes(e.tool)?e.tool:'')),
    log: e.log==='livre'||e.log==='kg' ? e.log : (REPS_ONLY.includes(pat)?'livre':'kg'),
    cues: (Array.isArray(e.cues)?e.cues:String(e.cues||'').split('\n')).map(c=>String(c).trim()).filter(Boolean).slice(0,8),
    video: /^https:\/\//.test(e.video||'') ? e.video : ''
  };
}
function normDay(d,i){
  const c = d.cardio && (d.cardio.t||d.cardio.d) ? {t:String(d.cardio.t||''),d:String(d.cardio.d||'')} : null;
  return {id:d.label?(d.id||uid()):uid(), label:String(d.label||d.id||String.fromCharCode(65+i)).slice(0,3), wd: WEEKDAYS.includes(d.wd)?d.wd:'',
    title:String(d.title||'Treino '+(i+1)).slice(0,80), focus:String(d.focus||'').slice(0,400), cardio:c, ex:(d.ex||[]).map(normEx)};
}
function normPlan(pl){ return {name:String(pl.name||'Treino').slice(0,80), days:(pl.days||[]).slice(0,14).map(normDay)}; }
function newProfile(name, plan, fields){ return {id:uid(), name, plan, fields:fields||['peso','gordura'], sessions:[], measures:[]}; }
function seedState(){
  const a = newProfile('André', normPlan(SEED_PLANS.masc), ['peso','gordura']);
  const b = newProfile('Andressa', normPlan(SEED_PLANS.fem), ['peso','gordura','peito','cintura']);
  return {v:1, active:a.id, profiles:[a,b], ui:{view:'treino', day:{}, anim:!matchMedia('(prefers-reduced-motion: reduce)').matches}};
}
function load(){
  try{ const raw = localStorage.getItem(KEY); if (raw){ S = JSON.parse(raw); if (S && Array.isArray(S.profiles) && S.profiles.length){ S.ui = Object.assign({view:'treino',day:{},anim:true}, S.ui||{}); migrate(); return; } } }catch(e){}
  S = seedState(); save();
}
/* ajustes únicos em dados já gravados no aparelho */
function migrate(){
  S.mig = S.mig || {};
  if (!S.mig.andressa){ const q = S.profiles.find(p=>p.name==='Feminino'); if (q) q.name = 'Andressa'; S.mig.andressa = true; save(); }
}
function save(){
  try{ localStorage.setItem(KEY, JSON.stringify(S)); return true; }
  catch(e){ toast('Não foi possível salvar: o armazenamento do aparelho está cheio ou bloqueado. Faça um backup em “Backup”.'); return false; }
}
const prof = () => S.profiles.find(p=>p.id===S.active) || S.profiles[0];
function drafts(){ try{ return JSON.parse(localStorage.getItem(DKEY)||'{}')||{}; }catch(e){ return {}; } }
function setDrafts(o){ try{ localStorage.setItem(DKEY, JSON.stringify(o)); }catch(e){} }
const sortDesc = arr => arr.slice().sort((a,b)=>a.date<b.date?1:a.date>b.date?-1:String(b.savedAt||'').localeCompare(String(a.savedAt||'')));

/* ---------- animações ---------- */
let live = [], clock = 0, last = performance.now(), deferredInstall = null;
const DUR = 2700;
function tileHTML(ex, label){
  const p = P[ex.pat];
  if (!p) return `<div class="tile"><span class="noanim">${esc((ex.n||'?').slice(0,2))}</span><span class="view-l">sem animação</span></div>`;
  const view = p.view || (p.rig==='front' ? 'vista frontal' : 'vista lateral');
  return `<div class="tile"><svg class="fig" viewBox="0 0 200 220" role="img" aria-label="Animação: ${esc(label||ex.n)}" data-pat="${ex.pat}" data-tool="${esc(ex.tool)}"></svg><span class="view-l">${view}</span></div>`;
}
function toolOf(ex, p){ if (ex.tool==='none') return null; if (ex.tool) return ex.tool; return p.tool; }
function collectLive(){
  live = [...document.querySelectorAll('svg.fig[data-pat]')].map((el,i)=>{const p=P[el.dataset.pat];return {el,p,tool:toolOf({tool:el.dataset.tool},p),off:(i%6)*0.17}}).filter(x=>x.p);
  frame(true);
}
function frame(force){
  const now = performance.now(); if (S.ui.anim) clock += now - last; last = now;
  if (!S.ui.anim && !force) return;
  for (const x of live){
    if (!x.el.isConnected) continue;
    const ph = ((clock/DUR)+x.off)%1;
    const s = (!S.ui.anim && clock===0) ? 0.5 : 0.5-0.5*Math.cos(2*Math.PI*ph);
    x.el.innerHTML = draw(x.p, poseAt(x.p,s), x.tool);
  }
}
function loop(){ if (!document.hidden) frame(false); requestAnimationFrame(loop); }

/* ---------- navegação ---------- */
function go(view, opts){
  S.ui.view = view; if (view !== 'plano' || !(opts&&opts.keepEdit)) S.ui.edit = (opts&&opts.edit) || null;
  save(); render(); window.scrollTo(0,0);
}
function render(){
  const sel = $('#prof-sel');
  sel.innerHTML = S.profiles.map(p=>`<option value="${p.id}"${p.id===S.active?' selected':''}>${esc(p.name)}</option>`).join('');
  document.querySelectorAll('[data-nav]').forEach(b=>b.setAttribute('aria-current', b.dataset.nav===S.ui.view?'page':'false'));
  const v = $('#view');
  const fn = {treino:vTreino, medidas:vMedidas, historico:vHistorico, plano:vPlano, mais:vMais}[S.ui.view] || vTreino;
  v.innerHTML = fn();
  if (S.ui.view==='treino') restoreDraft();
  if (S.ui.view==='mais') showPersist();
  collectLive();
}

/* ---------- TREINO ---------- */
function curDay(p){
  const days = p.plan.days; if (!days.length) return null;
  const want = S.ui.day[p.id];
  return days.find(d=>d.id===want) || days.find(d=>d.wd===WEEKDAYS[new Date().getDay()]) || days[0];
}
function lastText(p, d, ex, code){
  for (const s of sortDesc(p.sessions)){
    const e = (s.entries||[]).find(x => x.exId===ex.id || (!x.exId && x.code===code && s.dayLabel===d.label));
    if (e){ const l=(e.loads||[]).map(x=>x||'–').join(' · '); return `Última vez (${esc(fmtDate(s.date))}${e.done&&e.done!==ex.n?', '+esc(e.done):''}): ${esc(l)}`; }
  }
  return 'Ainda sem registro.';
}
function vTreino(){
  const p = prof(), days = p.plan.days;
  if (!days.length) return `<h1 class="view-h">${esc(p.plan.name)}</h1><p class="empty">Este perfil ainda não tem dias de treino. Toque em “Editar” para criar o primeiro dia, ou importe um treino em “Backup”.</p>`;
  const d = curDay(p), di = days.indexOf(d), pl = plateOf(di);
  const week = `<ul class="week" role="tablist" aria-label="Dias de treino" style="--n:${Math.max(days.length,5)}">${days.map((x,i)=>{const q=plateOf(i);
    return `<li role="presentation"><button type="button" class="day-btn" role="tab" aria-selected="${x.id===d.id}" data-act="pickDay" data-id="${x.id}"><span class="wd">${esc(shortWd(x.wd)||'Dia')}</span><span class="plate${q.light?' light':''}" style="--pc:${q.c}">${esc(x.label)}</span></button></li>`}).join('')}</ul>`;
  const exs = d.ex.map((ex,i)=>{
    const code = d.label+(i+1), n = ex.sets, livre = ex.log==='livre';
    return `<li>
      ${tileHTML(ex)}
      <div class="ex-body">
        <div class="ex-top"><span class="num">${esc(code)}</span><h3>${esc(ex.n)}</h3></div>
        ${ex.part?`<span class="part">${esc(ex.part)}</span>`:''}
        <div class="rx"><span>${n} × ${esc(ex.reps)} <small>séries × reps</small></span>${ex.rest?`<span>${esc(ex.rest)} <small>descanso</small></span>`:''}</div>
        <div class="log" data-ex="${ex.id}" data-code="${esc(code)}">
          <label class="fld"><span>Exercício feito (se trocou)</span><input id="lg-${ex.id}-x" type="text" autocomplete="off" placeholder="${esc(ex.n)}"></label>
          <div class="fld"><span>Carga por série ${livre?'(kg, s, m ou reps)':'(kg)'}</span>
            <div class="loads" style="--n:${Math.min(n,4)}">${Array.from({length:n},(_,k)=>`<label class="fld"><span>S${k+1}</span><input id="lg-${ex.id}-${k}" type="text" inputmode="${livre?'text':'decimal'}" autocomplete="off" placeholder="${livre?'—':'kg'}"></label>`).join('')}</div>
          </div>
          <p class="last">${lastText(p,d,ex,code)}</p>
        </div>
        ${ex.cues.length?`<ul class="cues">${ex.cues.map(c=>`<li>${esc(c)}</li>`).join('')}</ul>`:''}
        <a class="vid" href="${esc(ex.video||yt(ex.n))}" target="_blank" rel="noopener">Ver vídeo de execução ↗</a>
      </div></li>`;}).join('');
  const hist = sortDesc(p.sessions.filter(s=>s.dayId===d.id || (!s.dayId && s.dayLabel===d.label))).slice(0,5);
  return `<div style="--acc:${pl.c};--acc-ui:${pl.light?'var(--fg)':pl.c};--acc-fig:${pl.fig}">
    ${deferredInstall?`<div class="pending" style="margin-bottom:16px"><b>Instale o app neste celular</b><span class="small muted">Ele fica na tela inicial, abre em tela cheia e funciona sem internet.</span><div class="row"><button type="button" class="btn primary" data-act="install">Instalar app</button></div></div>`:''}
    <h1 class="view-h">${esc(p.plan.name)}</h1>
    ${week}
    <div class="day-head">
      <div class="eyebrow"><b>Dia ${esc(d.label)}</b>${d.wd?' · '+esc(d.wd):''} · ${d.ex.length} exercício${d.ex.length===1?'':'s'}</div>
      <h2 class="day-title">${esc(d.title)}</h2>
      ${d.focus?`<p class="focus">${esc(d.focus)}</p>`:''}
      <button type="button" class="btn small anim-toggle" data-act="anim">${S.ui.anim?'❚❚ Pausar animações':'▶ Reproduzir animações'}</button>
    </div>
    ${d.ex.length?`<ol class="ex">${exs}</ol>`:`<p class="empty">Este dia ainda não tem exercícios. Adicione em “Editar”.</p>`}
    ${d.cardio?`<div class="cardio"><span class="eyebrow">Condicionamento · após a musculação</span><h3>${esc(d.cardio.t)}</h3>${d.cardio.d?`<p>${esc(d.cardio.d)}</p>`:''}</div>`:''}
    <section class="savebar" aria-label="Salvar treino">
      <h2>Registro do treino</h2>
      <div class="row">
        <label class="fld"><span>Data</span><input id="sv-date" type="date" value="${today()}"></label>
        <button type="button" class="btn primary" data-act="saveSession">Salvar treino de hoje</button>
      </div>
      <p class="status" id="sv-status" role="status"></p>
      ${hist.length?`<div><h3 class="eyebrow" style="margin:6px 0 2px">Últimos treinos ${esc(d.label)}</h3>${hist.map(s=>histItem(s)).join('')}</div>`:`<p class="empty">Nenhum treino salvo neste dia ainda. Anote as cargas durante o treino e toque em “Salvar treino de hoje”.</p>`}
    </section></div>`;
}
function histItem(s, showDay){
  const n = Math.max(1, ...(s.entries||[]).map(e=>(e.loads||[]).length));
  return `<details class="hist"><summary><span>${esc(fmtDate(s.date))}</span>${showDay?`<span class="code">${esc(s.dayLabel||'?')}</span><span>${esc(s.dayTitle||'')}</span>`:''}<span class="muted">${s.entries.length} exercício${s.entries.length===1?'':'s'}</span></summary>
    <div class="tbl"><table><thead><tr><th>Cód.</th><th>Exercício</th>${Array.from({length:n},(_,k)=>`<th class="n">S${k+1}</th>`).join('')}</tr></thead>
    <tbody>${s.entries.map(e=>`<tr><td>${esc(e.code)}</td><td>${esc(e.done||e.planned)}</td>${Array.from({length:n},(_,k)=>`<td class="n">${esc((e.loads||[])[k]||'–')}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
    <button type="button" class="btn small danger" data-act="delSession" data-id="${esc(s.id)}" style="margin-top:10px">Excluir este registro</button></details>`;
}
function draftKey(){const p=prof(),d=curDay(p);return d?p.id+':'+d.id:null}
function saveDraft(){const k=draftKey();if(!k)return;const o=drafts(),v={};document.querySelectorAll('.log input,#sv-date').forEach(el=>{if(el.value)v[el.id]=el.value});if(Object.keys(v).length)o[k]=v;else delete o[k];setDrafts(o)}
function restoreDraft(){const k=draftKey();if(!k)return;const v=drafts()[k]||{};for(const id in v){const el=document.getElementById(id);if(el)el.value=v[id]}}
function saveSession(){
  const p = prof(), d = curDay(p), st = $('#sv-status');
  const date = $('#sv-date').value || today(), entries = [];
  document.querySelectorAll('.log').forEach(box=>{
    const ex = d.ex.find(x=>x.id===box.dataset.ex); if (!ex) return;
    const done = $('#lg-'+ex.id+'-x').value.trim();
    const loads = Array.from({length:ex.sets},(_,k)=>{const el=document.getElementById('lg-'+ex.id+'-'+k);return el?el.value.trim():''});
    while (loads.length && loads[loads.length-1]==='') loads.pop();
    if (done || loads.length) entries.push({exId:ex.id, code:box.dataset.code, planned:ex.n, done:done||ex.n, loads});
  });
  if (!entries.length){ st.textContent = 'Anote pelo menos uma carga antes de salvar.'; return; }
  const id = 's-'+date+'-'+d.id;
  p.sessions = p.sessions.filter(s=>s.id!==id).concat([{id, dayId:d.id, dayLabel:d.label, dayTitle:d.title, date, savedAt:new Date().toISOString(), entries}]);
  if (!save()) return;
  const o = drafts(); delete o[draftKey()]; setDrafts(o);
  askPersist();
  render(); toast(`Treino ${d.label} de ${fmtDate(date)} salvo.`);
}

/* ---------- MEDIDAS ---------- */
const fieldsOf = p => p.fields.map(k=>FIELD_CATALOG.find(f=>f.k===k)).filter(Boolean);
function vMedidas(){
  const p = prof(), F = fieldsOf(p), ms = sortDesc(p.measures);
  const sum = F.map(x=>{const vals=ms.filter(m=>m[x.k]!=null);if(!vals.length)return '';
    const cur=vals[0],first=vals[vals.length-1],prev=vals[1],du=x.u==='%'?'p.p.':x.u;
    return `<div class="mchip"><span class="ml">${x.l}</span><span class="mv">${fmtN(cur[x.k])} ${x.u}</span><span class="md">${vals.length>1?`${sgn(cur[x.k]-first[x.k])} ${du} desde ${esc(fmtDate(first.date))}`:'Primeiro registro'}${prev?` · ${sgn(cur[x.k]-prev[x.k])} desde o anterior`:''}</span></div>`}).join('');
  return `<h1 class="view-h">Medidas</h1>
    <p class="lead">Registre a cada 1 ou 2 semanas, sempre nas mesmas condições: de manhã, em jejum, depois de ir ao banheiro. Para o percentual de gordura, use sempre o mesmo aparelho. O que importa é a tendência, não a variação de um dia.</p>
    ${sum?`<div class="msum" style="margin-top:14px">${sum}</div>`:''}
    <section class="card"><h2>Nova medição</h2>
      <form class="mform" data-form="measure" novalidate>
        <label class="fld"><span>Data</span><input id="m-date" type="date" value="${today()}"></label>
        ${F.map(x=>`<label class="fld"><span>${x.l} (${x.u})</span><input id="m-${x.k}" type="text" inputmode="decimal" autocomplete="off" placeholder="${x.ph}"></label>`).join('')}
        <button class="btn primary" type="submit">Salvar medidas</button>
      </form>
      <p class="status" id="m-status" role="status"></p>
      ${F.some(f=>f.k==='peito'||f.k==='cintura')?`<p class="hint">Peito: fita na altura dos mamilos, sem apertar. Cintura: na altura do umbigo, abdômen relaxado, ao fim de uma expiração normal.</p>`:''}
    </section>
    <section class="card"><h2>Histórico de medidas</h2>
      ${ms.length?`<div class="tbl"><table><thead><tr><th>Data</th>${F.map(x=>`<th class="n">${x.l} (${x.u})</th>`).join('')}<th></th></tr></thead><tbody>${ms.map(m=>`<tr><td>${esc(fmtDate(m.date))}</td>${F.map(x=>`<td class="n">${fmtN(m[x.k])}</td>`).join('')}<td><button type="button" class="btn small" data-act="delMeasure" data-id="${esc(m.id)}">Excluir</button></td></tr>`).join('')}</tbody></table></div>`:'<p class="empty">Nenhuma medida salva ainda.</p>'}
    </section>
    <section class="card"><h2>O que medir</h2>
      <p class="hint">Escolha as medidas deste perfil. Desligar uma medida só a esconde; os valores já salvos continuam guardados.</p>
      <div class="chips">${FIELD_CATALOG.map(f=>`<button type="button" class="chip" aria-pressed="${p.fields.includes(f.k)}" data-act="toggleField" data-k="${f.k}">${f.l}</button>`).join('')}</div>
    </section>`;
}
function saveMeasure(){
  const p = prof(), st = $('#m-status'), date = $('#m-date').value || today();
  const m = {id:'m-'+date, date, savedAt:new Date().toISOString()}; let any=false; const bad=[];
  for (const x of fieldsOf(p)){ const raw=$('#m-'+x.k).value; const v=numBR(raw); if (raw.trim()&&v==null) bad.push(x.l); if (v!=null){ m[x.k]=v; any=true; } }
  if (bad.length){ st.textContent = `Confira ${bad.join(' e ')}: use só números, como 72,5.`; return; }
  if (!any){ st.textContent = 'Preencha pelo menos uma medida antes de salvar.'; return; }
  const old = p.measures.find(x=>x.id===m.id); if (old) for (const k in old) if (m[k]===undefined) m[k]=old[k];
  p.measures = p.measures.filter(x=>x.id!==m.id).concat([m]);
  if (save()){ askPersist(); render(); toast(`Medidas de ${fmtDate(date)} salvas.`); }
}

/* ---------- HISTÓRICO ---------- */
function vHistorico(){
  const p = prof(), f = S.ui.histFilter || 'todos';
  const labels = [...new Set(p.sessions.map(s=>s.dayLabel).filter(Boolean))].sort();
  const list = sortDesc(p.sessions.filter(s=>f==='todos'||s.dayLabel===f));
  return `<h1 class="view-h">Histórico</h1>
    <p class="lead">${p.sessions.length} treino${p.sessions.length===1?'':'s'} salvo${p.sessions.length===1?'':'s'} no perfil ${esc(p.name)}.</p>
    ${labels.length?`<div class="chips" style="margin-top:12px">${['todos',...labels].map(l=>`<button type="button" class="chip" aria-pressed="${l===f}" data-act="histFilter" data-f="${esc(l)}">${l==='todos'?'Todos':'Dia '+esc(l)}</button>`).join('')}</div>`:''}
    <div style="margin-top:12px">${list.length?list.map(s=>histItem(s,true)).join(''):'<p class="empty">Nenhum treino salvo ainda.</p>'}</div>`;
}

/* ---------- EDITOR ---------- */
function vPlano(){
  const p = prof(), e = S.ui.edit;
  if (e && e.day){ const d = p.plan.days.find(x=>x.id===e.day); if (d) return e.ex ? vExEditor(p,d,e.ex) : vDayEditor(p,d); }
  const days = p.plan.days;
  return `<h1 class="view-h">Editar treino</h1>
    <p class="lead">Perfil ${esc(p.name)}. As mudanças são salvas na hora. O histórico de cargas é mantido mesmo se você trocar ou excluir exercícios.</p>
    <section class="card"><h2>Nome do treino</h2>
      <label class="fld"><span>Nome</span><input type="text" value="${esc(p.plan.name)}" data-bind="plan.name" maxlength="80"></label>
    </section>
    <section class="card"><h2>Dias</h2>
      ${days.length?`<ul class="list">${days.map((d,i)=>{const q=plateOf(i);return `<li>
        <span class="plate sm${q.light?' light':''}" style="--pc:${q.c}">${esc(d.label)}</span>
        <div class="li-main"><b>${esc(d.title)}</b><span>${d.wd?esc(d.wd)+' · ':''}${d.ex.length} exercício${d.ex.length===1?'':'s'}</span></div>
        <div class="li-act">
          <button type="button" class="icon-btn" data-act="moveDay" data-id="${d.id}" data-dir="-1" aria-label="Subir ${esc(d.title)}"${i===0?' disabled':''}>↑</button>
          <button type="button" class="icon-btn" data-act="moveDay" data-id="${d.id}" data-dir="1" aria-label="Descer ${esc(d.title)}"${i===days.length-1?' disabled':''}>↓</button>
          <button type="button" class="btn small" data-act="editDay" data-id="${d.id}">Editar</button>
        </div></li>`}).join('')}</ul>`:'<p class="empty">Nenhum dia criado ainda.</p>'}
      <div class="row"><button type="button" class="btn primary" data-act="addDay">Adicionar dia</button></div>
    </section>
    <section class="card"><h2>Treino pronto em arquivo</h2>
      <p class="hint">Para trocar o treino inteiro por um novo (por exemplo, um que o Claude gerou), use “Importar treino” na aba Backup.</p>
      <div class="row"><button type="button" class="btn" data-nav="mais">Ir para Backup</button></div>
    </section>`;
}
function vDayEditor(p, d){
  const i = p.plan.days.indexOf(d), q = plateOf(i);
  return `<button type="button" class="back" data-act="editBack">← Todos os dias</button>
    <div class="row" style="align-items:center"><span class="plate sm${q.light?' light':''}" style="--pc:${q.c}">${esc(d.label)}</span><h1 class="view-h" style="margin:0">${esc(d.title)}</h1></div>
    <section class="card"><h2>Dados do dia</h2>
      <div class="grid3">
        <label class="fld"><span>Letra</span><input type="text" maxlength="3" value="${esc(d.label)}" data-bind="day.label"></label>
        <label class="fld"><span>Dia da semana</span><select data-bind="day.wd"><option value="">Livre</option>${WEEKDAYS.slice(1).concat(WEEKDAYS[0]).map(w=>`<option${w===d.wd?' selected':''}>${w}</option>`).join('')}</select></label>
      </div>
      <label class="fld"><span>Título</span><input type="text" maxlength="80" value="${esc(d.title)}" data-bind="day.title"></label>
      <label class="fld"><span>Foco do dia (opcional)</span><textarea maxlength="400" data-bind="day.focus">${esc(d.focus)}</textarea></label>
      <div class="grid2">
        <label class="fld"><span>Cardio (opcional)</span><input type="text" maxlength="80" placeholder="20 min de cardio em zona 2" value="${esc(d.cardio?d.cardio.t:'')}" data-bind="day.cardioT"></label>
        <label class="fld"><span>Detalhe do cardio</span><input type="text" maxlength="200" placeholder="Bicicleta ou esteira inclinada" value="${esc(d.cardio?d.cardio.d:'')}" data-bind="day.cardioD"></label>
      </div>
    </section>
    <section class="card"><h2>Exercícios</h2>
      ${d.ex.length?`<ul class="list">${d.ex.map((ex,k)=>`<li>
        <span class="code">${esc(d.label+(k+1))}</span>
        <div class="li-main"><b>${esc(ex.n)}</b><span>${ex.sets} × ${esc(ex.reps)}${ex.rest?' · '+esc(ex.rest):''}</span></div>
        <div class="li-act">
          <button type="button" class="icon-btn" data-act="moveEx" data-id="${ex.id}" data-dir="-1" aria-label="Subir ${esc(ex.n)}"${k===0?' disabled':''}>↑</button>
          <button type="button" class="icon-btn" data-act="moveEx" data-id="${ex.id}" data-dir="1" aria-label="Descer ${esc(ex.n)}"${k===d.ex.length-1?' disabled':''}>↓</button>
          <button type="button" class="btn small" data-act="editEx" data-id="${ex.id}">Editar</button>
        </div></li>`).join('')}</ul>`:'<p class="empty">Nenhum exercício ainda.</p>'}
      <div class="row"><button type="button" class="btn primary" data-act="addEx">Adicionar exercício</button></div>
    </section>
    <section class="card"><h2>Excluir dia</h2>
      <p class="hint">Os treinos já salvos deste dia continuam no histórico.</p>
      <div class="row"><button type="button" class="btn danger" data-act="delDay">Excluir o dia ${esc(d.label)}</button></div>
    </section>`;
}
function vExEditor(p, d, exId){
  const isNew = exId==='new';
  const ex = isNew ? {id:'new',n:'',part:'',sets:3,reps:'10–12',rest:'60 s',pat:'',tool:'',log:'kg',cues:[],video:''} : d.ex.find(x=>x.id===exId);
  if (!ex) return vDayEditor(p,d);
  const opts = PAT_GROUPS.map(([g,ks])=>`<optgroup label="${g}">${ks.map(k=>`<option value="${k}"${k===ex.pat?' selected':''}>${PAT_LABELS[k]}</option>`).join('')}</optgroup>`).join('');
  return `<button type="button" class="back" data-act="editBackDay">← ${esc(d.title)}</button>
    <h1 class="view-h">${isNew?'Novo exercício':'Editar exercício'}</h1>
    <form data-form="exercise" data-ex="${isNew?'new':ex.id}" novalidate style="display:grid;gap:14px;margin-top:10px">
      <div class="preview"><div id="ex-prev">${tileHTML(ex)}</div>
        <div style="display:grid;gap:12px;min-width:0">
          <label class="fld"><span>Animação</span><select id="f-pat" name="pat"><option value="">Sem animação</option>${opts}</select></label>
          <label class="fld"><span>Equipamento na animação</span><select id="f-tool" name="tool">${TOOLS.map(([v,l])=>`<option value="${v}"${v===ex.tool?' selected':''}>${l}</option>`).join('')}</select></label>
        </div></div>
      <label class="fld"><span>Nome do exercício</span><input name="n" type="text" maxlength="120" required value="${esc(ex.n)}" placeholder="Ex.: Supino inclinado com halteres"></label>
      <label class="fld"><span>Músculo / foco</span><input name="part" type="text" maxlength="120" value="${esc(ex.part)}" placeholder="Ex.: Peito superior"></label>
      <div class="grid3">
        <label class="fld"><span>Séries</span><input name="sets" type="number" min="1" max="10" inputmode="numeric" value="${ex.sets}"></label>
        <label class="fld"><span>Repetições</span><input name="reps" type="text" maxlength="40" value="${esc(ex.reps)}" placeholder="10–12"></label>
        <label class="fld"><span>Descanso</span><input name="rest" type="text" maxlength="30" value="${esc(ex.rest)}" placeholder="60 s"></label>
      </div>
      <label class="fld"><span>Registro</span><select name="log"><option value="kg"${ex.log==='kg'?' selected':''}>Carga em kg</option><option value="livre"${ex.log==='livre'?' selected':''}>Livre (tempo, distância ou repetições)</option></select></label>
      <label class="fld"><span>Dicas de execução (uma por linha)</span><textarea name="cues" maxlength="800">${esc(ex.cues.join('\n'))}</textarea></label>
      <label class="fld"><span>Link de vídeo (opcional)</span><input name="video" type="url" value="${esc(ex.video)}" placeholder="Em branco: busca no YouTube pelo nome"></label>
      <p class="status" id="ex-status" role="status"></p>
      <div class="row"><button type="submit" class="btn primary">${isNew?'Adicionar exercício':'Salvar exercício'}</button><button type="button" class="btn" data-act="editBackDay">Cancelar</button>
      ${isNew?'':'<button type="button" class="btn danger" data-act="delEx">Excluir exercício</button>'}</div>
    </form>`;
}
function saveExercise(form){
  const p = prof(), d = p.plan.days.find(x=>x.id===S.ui.edit.day); if (!d) return;
  const f = new FormData(form), st = $('#ex-status');
  const n = String(f.get('n')||'').trim(); const sets = parseInt(f.get('sets'),10);
  if (!n){ st.textContent = 'Dê um nome ao exercício.'; form.querySelector('[name=n]').focus(); return; }
  if (!(sets>=1 && sets<=10)){ st.textContent = 'Séries deve ser um número de 1 a 10.'; return; }
  const video = String(f.get('video')||'').trim();
  if (video && !/^https:\/\//.test(video)){ st.textContent = 'O link de vídeo precisa começar com https://'; return; }
  const data = normEx({n, part:f.get('part'), sets, reps:String(f.get('reps')||'').trim()||'10', rest:f.get('rest'), pat:f.get('pat'), tool:f.get('tool'), log:f.get('log'), cues:f.get('cues'), video});
  if (form.dataset.ex==='new') d.ex.push(data); else { const i=d.ex.findIndex(x=>x.id===form.dataset.ex); data.id=d.ex[i].id; d.ex[i]=data; }
  save(); S.ui.edit = {day:d.id}; render(); window.scrollTo(0,0); toast(form.dataset.ex==='new'?'Exercício adicionado.':'Exercício salvo.');
}
function bind(el){
  const p = prof(), key = el.dataset.bind, val = el.value;
  if (key==='plan.name'){ p.plan.name = val.trim()||'Treino'; }
  else if (key==='profile.name'){ const q=S.profiles.find(x=>x.id===el.dataset.pid); if (q) q.name = val.trim()||'Perfil'; }
  else if (key.startsWith('day.')){
    const d = p.plan.days.find(x=>x.id===S.ui.edit.day); if (!d) return;
    const f = key.slice(4);
    if (f==='label') d.label = val.trim().slice(0,3) || d.label;
    else if (f==='cardioT'||f==='cardioD'){ const c=d.cardio||{t:'',d:''}; c[f==='cardioT'?'t':'d']=val.trim(); d.cardio=(c.t||c.d)?c:null; }
    else d[f] = f==='title' ? (val.trim()||d.title) : val.trim();
  }
  save(); $('#prof-sel').innerHTML = S.profiles.map(q=>`<option value="${q.id}"${q.id===S.active?' selected':''}>${esc(q.name)}</option>`).join('');
}

/* ---------- BACKUP / PERFIS ---------- */
let pendingImport = null;
const canShare = () => { try{ return !!(navigator.canShare && navigator.canShare({files:[new File(['x'],'x.txt',{type:'text/plain'})]})); }catch(e){ return false; } };
function fileRow(what, label){
  return `<div class="row"><button type="button" class="btn" data-act="export" data-what="${what}" data-how="download">Baixar ${label}</button>${canShare()?`<button type="button" class="btn" data-act="export" data-what="${what}" data-how="share">Enviar…</button>`:''}</div>`;
}
function vMais(){
  const p = prof();
  const pend = pendingImport ? (pendingImport.kind==='plan'
    ? `<div class="pending"><b>Treino “${esc(pendingImport.plan.name)}” pronto para importar</b><span class="small muted">${pendingImport.plan.days.length} dias, ${pendingImport.plan.days.reduce((a,d)=>a+d.ex.length,0)} exercícios.</span>
       <div class="row"><button type="button" class="btn primary" data-act="applyPlan" data-mode="replace">Substituir o treino de ${esc(p.name)}</button><button type="button" class="btn" data-act="applyPlan" data-mode="new">Criar perfil novo</button><button type="button" class="btn" data-act="cancelImport">Cancelar</button></div>
       <p class="hint">Substituir mantém o histórico de cargas e as medidas do perfil.</p></div>`
    : `<div class="pending"><b>Backup completo de ${esc(fmtDate(String(pendingImport.at||'').slice(0,10)))}</b><span class="small muted">${pendingImport.data.profiles.length} perfil(is). Restaurar substitui todos os dados deste aparelho.</span>
       <div class="row"><button type="button" class="btn danger" data-act="applyBackup">Restaurar backup</button><button type="button" class="btn" data-act="cancelImport">Cancelar</button></div></div>`) : '';
  return `<h1 class="view-h">Backup e perfis</h1>
    <p class="lead">Os dados ficam só neste aparelho. Exporte um backup toda semana e guarde no Google Drive, no e-mail ou no WhatsApp.</p>
    ${pend}
    <section class="card"><h2>Registros e medidas (Excel)</h2>
      <p class="hint">Planilha com os treinos salvos e as medidas do perfil ${esc(p.name)}. Também aceita as planilhas exportadas das páginas de treino anteriores.</p>
      ${fileRow('xlsx','planilha')}
      <div class="row"><label class="btn" for="imp-xlsx" tabindex="0" role="button">Importar planilha</label><input id="imp-xlsx" type="file" accept=".xlsx,.xls,.csv" hidden></div>
    </section>
    <section class="card"><h2>Treino (arquivo)</h2>
      <p class="hint">Use para receber um treino novo pronto ou levar o treino para outro aparelho. O arquivo tem só o plano, sem cargas.</p>
      ${fileRow('plan','treino')}
      <div class="row"><label class="btn" for="imp-plan" tabindex="0" role="button">Importar treino</label><input id="imp-plan" type="file" accept=".json,application/json" hidden></div>
    </section>
    <section class="card"><h2>Backup completo</h2>
      <p class="hint">Todos os perfis, treinos, cargas e medidas em um arquivo. Serve para trocar de celular.</p>
      ${fileRow('backup','backup')}
      <div class="row"><label class="btn" for="imp-backup" tabindex="0" role="button">Restaurar backup</label><input id="imp-backup" type="file" accept=".json,application/json" hidden></div>
    </section>
    <section class="card"><h2>Perfis</h2>
      <ul class="list">${S.profiles.map(q=>`<li>
        <div class="li-main"><label class="fld"><span>${q.id===S.active?'Perfil em uso':'Nome do perfil'}</span><input type="text" maxlength="40" value="${esc(q.name)}" data-bind="profile.name" data-pid="${q.id}"></label><span>${esc(q.plan.name)} · ${q.sessions.length} treinos salvos</span></div>
        <div class="li-act">${q.id===S.active?'':`<button type="button" class="btn small" data-act="useProfile" data-id="${q.id}">Usar</button>`}${S.profiles.length>1?`<button type="button" class="btn small danger" data-act="delProfile" data-id="${q.id}">Excluir</button>`:''}</div></li>`).join('')}</ul>
      <div class="grid2">
        <label class="fld"><span>Nome do novo perfil</span><input id="np-name" type="text" maxlength="40" placeholder="Ex.: Maria"></label>
        <label class="fld"><span>Começar com</span><select id="np-tpl"><option value="masc">Treino ABCDE (ganho de massa)</option><option value="fem">Força e Core (glúteos)</option><option value="copy">Cópia do treino de ${esc(p.name)}</option><option value="empty">Treino vazio</option></select></label>
      </div>
      <div class="row"><button type="button" class="btn primary" data-act="addProfile">Adicionar perfil</button></div>
    </section>
    <section class="card"><h2>App</h2>
      ${deferredInstall?'<div class="row"><button type="button" class="btn primary" data-act="install">Instalar app</button></div>':`<p class="hint">${window.matchMedia('(display-mode: standalone)').matches?'O app está instalado.':'Para instalar no Android: no Chrome, abra o menu ⋮ e toque em “Instalar app” ou “Adicionar à tela inicial”.'}</p>`}
      <p class="hint" id="persist-info">Verificando armazenamento…</p>
      <p class="hint">Versão ${APP_VERSION}.</p>
    </section>`;
}
let XLSXp = null;
function loadXLSX(){
  if (window.XLSX) return Promise.resolve(window.XLSX);
  if (!XLSXp) XLSXp = new Promise((res,rej)=>{const s=document.createElement('script');s.src=window.XLSX_SRC||'vendor/xlsx.full.min.js';s.onload=()=>window.XLSX?res(window.XLSX):rej(new Error('xlsx'));s.onerror=()=>{XLSXp=null;rej(new Error('xlsx'))};document.head.appendChild(s)});
  return XLSXp;
}
const slug = s => String(s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'perfil';
async function buildExport(what){
  const p = prof();
  if (what==='plan'){
    const plan = {type:'treinos-plano', version:1, name:p.plan.name, days:p.plan.days.map(d=>({label:d.label,wd:d.wd,title:d.title,focus:d.focus,cardio:d.cardio,ex:d.ex.map(e=>({n:e.n,part:e.part,sets:e.sets,reps:e.reps,rest:e.rest,pat:e.pat,tool:e.tool,log:e.log,cues:e.cues,video:e.video}))}))};
    return {blob:new Blob([JSON.stringify(plan,null,1)],{type:'application/json'}), name:`treino-${slug(p.plan.name)}.json`};
  }
  if (what==='backup'){
    return {blob:new Blob([JSON.stringify({type:'treinos-backup',version:1,at:new Date().toISOString(),data:{active:S.active,profiles:S.profiles}})],{type:'application/json'}), name:`treinos-backup-${today()}.json`};
  }
  const X = await loadXLSX(); const ss = sortDesc(p.sessions).reverse(), ms = sortDesc(p.measures).reverse();
  const n = Math.max(3, ...ss.map(s=>Math.max(0,...s.entries.map(e=>(e.loads||[]).length))));
  const toNum = v => {const t=String(v==null?'':v).trim();return /^\d+([.,]\d+)?$/.test(t)?parseFloat(t.replace(',','.')):t};
  const rows = [['Data','Dia','Treino','Código','Exercício previsto','Exercício feito',...Array.from({length:n},(_,k)=>'Série '+(k+1))]];
  for (const s of ss) for (const e of s.entries) rows.push([fmtFull(s.date), s.dayLabel||'', s.dayTitle||'', e.code, e.planned||'', e.done||'', ...Array.from({length:n},(_,k)=>toNum((e.loads||[])[k]||''))]);
  const wb = X.utils.book_new(); const ws = X.utils.aoa_to_sheet(rows);
  ws['!cols'] = [{wch:11},{wch:5},{wch:30},{wch:8},{wch:34},{wch:34},...Array.from({length:n},()=>({wch:9}))];
  if (ss.length) ws['!autofilter'] = {ref:ws['!ref']};
  X.utils.book_append_sheet(wb, ws, 'Registros');
  const used = FIELD_CATALOG.filter(f=>p.fields.includes(f.k)||ms.some(m=>m[f.k]!=null));
  const ws2 = X.utils.aoa_to_sheet([['Data',...used.map(f=>`${f.l} (${f.u})`)], ...ms.map(m=>[fmtFull(m.date), ...used.map(f=>m[f.k]==null?'':m[f.k])])]);
  ws2['!cols'] = [{wch:11},...used.map(()=>({wch:14}))];
  X.utils.book_append_sheet(wb, ws2, 'Medidas');
  const out = X.write(wb, {bookType:'xlsx', type:'array'});
  return {blob:new Blob([out],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}), name:`treinos-${slug(p.name)}-${today()}.xlsx`};
}
async function doExport(what, how){
  try{
    const {blob, name} = await buildExport(what);
    if (how==='share'){
      try{ await navigator.share({files:[new File([blob],name,{type:blob.type})], title:name}); return; }
      catch(e){ if (e && e.name==='AbortError') return; toast('Não foi possível enviar; o arquivo será baixado.'); }
    }
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click();
    setTimeout(()=>{URL.revokeObjectURL(a.href); a.remove();}, 5000);
    toast(`Arquivo “${name}” gerado.`);
  }catch(e){ toast('Não foi possível gerar o arquivo agora.'); }
}
function parseDateCell(v,X){
  if (typeof v==='number'){ const d=X.SSF.parse_date_code(v); if (d&&d.y) return `${d.y}-${String(d.m).padStart(2,'0')}-${String(d.d).padStart(2,'0')}`; }
  const t=String(v||'').trim(); let m=t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (m) return `${m[3]}-${m[2].padStart(2,'0')}-${m[1].padStart(2,'0')}`;
  m=t.match(/^(\d{4})-(\d{2})-(\d{2})/); return m?`${m[1]}-${m[2]}-${m[3]}`:null;
}
async function importXlsx(file){
  const p = prof();
  try{
    const X = await loadXLSX(); const wb = X.read(await file.arrayBuffer(), {type:'array'});
    let ns=0, nm=0;
    const ws = wb.Sheets['Registros'] || wb.Sheets[wb.SheetNames[0]];
    if (ws){
      const rows = X.utils.sheet_to_json(ws,{header:1,raw:true,defval:''});
      const head = (rows[0]||[]).map(h=>String(h).trim().toLowerCase());
      const iD=head.indexOf('data'), iDia=head.indexOf('dia'), iT=head.indexOf('treino'), iC=head.indexOf('código'), iP=head.indexOf('exercício previsto'), iF=head.indexOf('exercício feito');
      const iL = head.map((h,k)=>/^(série|ciclo)\s*\d+$/.test(h)?k:-1).filter(k=>k>=0);
      if (iD>=0 && iDia>=0 && iC>=0 && iL.length){
        const map = new Map();
        for (const r of rows.slice(1)){
          const date=parseDateCell(r[iD],X), lab=String(r[iDia]||'').trim().toUpperCase(), code=String(r[iC]||'').trim();
          if (!date || !lab || !code) continue;
          const day = p.plan.days.find(d=>d.label.toUpperCase()===lab);
          const key = 's-'+date+'-'+(day?day.id:lab);
          if (!map.has(key)) map.set(key,{id:key, dayId:day?day.id:null, dayLabel:day?day.label:lab, dayTitle:day?day.title:String(r[iT]||''), date, savedAt:new Date().toISOString(), entries:[]});
          const m = code.match(/^([A-Za-z]{1,3})(\d+)$/); let exId=null;
          if (day && m && m[1].toUpperCase()===day.label.toUpperCase()){ const ex=day.ex[+m[2]-1]; if (ex) exId=ex.id; }
          const planned=iP>=0?String(r[iP]||'').trim():'', done=iF>=0?String(r[iF]||'').trim():'';
          const loads = iL.map(k=>{const v=r[k];return v===''||v==null?'':typeof v==='number'?String(v).replace('.',','):String(v).trim()});
          while (loads.length && loads[loads.length-1]==='') loads.pop();
          map.get(key).entries.push({exId, code, planned:planned||done, done:done||planned, loads});
        }
        const list=[...map.values()], ids=new Set(list.map(x=>x.id));
        p.sessions = p.sessions.filter(s=>!ids.has(s.id)).concat(list); ns=list.length;
      }
    }
    const wm = wb.Sheets['Medidas'];
    if (wm){
      const rows = X.utils.sheet_to_json(wm,{header:1,raw:true,defval:''});
      const head = (rows[0]||[]).map(h=>String(h).trim().toLowerCase());
      const iD = head.indexOf('data');
      if (iD>=0){
        const idx = FIELD_CATALOG.map(f=>head.findIndex(h=>h.startsWith(f.l.toLowerCase())));
        const list=[];
        for (const r of rows.slice(1)){ const date=parseDateCell(r[iD],X); if (!date) continue;
          const m={id:'m-'+date,date,savedAt:new Date().toISOString()}; let any=false;
          FIELD_CATALOG.forEach((f,k)=>{ if (idx[k]<0) return; const v=typeof r[idx[k]]==='number'?r[idx[k]]:numBR(r[idx[k]]); if (v!=null){ m[f.k]=v; any=true; if (!p.fields.includes(f.k)) p.fields.push(f.k); } });
          if (any) list.push(m); }
        const ids=new Set(list.map(x=>x.id)); p.measures = p.measures.filter(x=>!ids.has(x.id)).concat(list); nm=list.length;
      }
    }
    if (!ns && !nm){ toast('Nenhum treino ou medida encontrado. Use uma planilha exportada pelo app ou pelas páginas de treino.'); return; }
    if (save()) { render(); toast(`Importados para ${p.name}: ${ns} treino${ns===1?'':'s'} e ${nm} medida${nm===1?'':'s'}.`, null, null, 6000); }
  }catch(e){ toast('Não foi possível ler a planilha. Confira se é um arquivo .xlsx exportado pelo app.'); }
}
async function importJson(file, kind){
  try{
    const obj = JSON.parse(await file.text());
    if (kind==='plan'){
      const src = obj.type==='treinos-plano' || obj.days ? obj : (obj.plan || null);
      if (!src || !Array.isArray(src.days) || !src.days.length) throw new Error('fmt');
      pendingImport = {kind:'plan', plan:normPlan(src)};
    } else {
      if (obj.type!=='treinos-backup' || !obj.data || !Array.isArray(obj.data.profiles) || !obj.data.profiles.length) throw new Error('fmt');
      pendingImport = {kind:'backup', at:obj.at, data:obj.data};
    }
    render(); window.scrollTo(0,0);
  }catch(e){ toast(kind==='plan'?'Arquivo de treino não reconhecido.':'Arquivo de backup não reconhecido.'); }
}
async function showPersist(){
  const el = $('#persist-info'); if (!el) return;
  let ok = null; try{ ok = navigator.storage && navigator.storage.persisted ? await navigator.storage.persisted() : null; }catch(e){}
  el.textContent = ok ? 'Armazenamento permanente ativado: o Android não apaga os dados para liberar espaço.' : 'Armazenamento comum: em caso de pouco espaço o Android pode limpar dados de apps da web. Mantenha o backup em dia.';
}
let persistAsked = false;
function askPersist(){ if (persistAsked) return; persistAsked = true; try{ navigator.storage && navigator.storage.persist && navigator.storage.persist(); }catch(e){} }

/* ---------- ações ---------- */
const ACT = {
  pickDay(el){ S.ui.day[prof().id] = el.dataset.id; save(); render(); },
  anim(){ S.ui.anim = !S.ui.anim; last = performance.now(); save(); const b=document.querySelector('[data-act=anim]'); if (b) b.textContent = S.ui.anim?'❚❚ Pausar animações':'▶ Reproduzir animações'; frame(true); },
  saveSession,
  delSession(el){ if (!armed(el,'Toque de novo para excluir')) return; const p=prof(); p.sessions=p.sessions.filter(s=>s.id!==el.dataset.id); save(); render(); toast('Registro excluído.'); },
  delMeasure(el){ if (!armed(el,'Confirmar')) return; const p=prof(); p.measures=p.measures.filter(m=>m.id!==el.dataset.id); save(); render(); },
  toggleField(el){ const p=prof(), k=el.dataset.k; p.fields = p.fields.includes(k) ? p.fields.filter(x=>x!==k) : FIELD_CATALOG.map(f=>f.k).filter(x=>x===k||p.fields.includes(x)); save(); render(); },
  histFilter(el){ S.ui.histFilter = el.dataset.f; render(); },
  editDay(el){ S.ui.edit = {day:el.dataset.id}; render(); window.scrollTo(0,0); },
  editBack(){ S.ui.edit = null; render(); window.scrollTo(0,0); },
  editBackDay(){ S.ui.edit = {day:S.ui.edit.day}; render(); window.scrollTo(0,0); },
  addDay(){ const p=prof(), used=new Set(p.plan.days.map(d=>d.label)); let L='A'; for (let i=0;i<26;i++){ L=String.fromCharCode(65+i); if (!used.has(L)) break; }
    const d = {id:uid(), label:L, wd:'', title:'Treino '+L, focus:'', cardio:null, ex:[]}; p.plan.days.push(d); save(); S.ui.edit={day:d.id}; render(); window.scrollTo(0,0); },
  moveDay(el){ const a=prof().plan.days, i=a.findIndex(d=>d.id===el.dataset.id), j=i+(+el.dataset.dir); if (j<0||j>=a.length) return; [a[i],a[j]]=[a[j],a[i]]; save(); render(); },
  delDay(el){ if (!armed(el,'Toque de novo para excluir o dia')) return; const p=prof(); p.plan.days=p.plan.days.filter(d=>d.id!==S.ui.edit.day); S.ui.edit=null; save(); render(); toast('Dia excluído.'); },
  addEx(){ S.ui.edit = {day:S.ui.edit.day, ex:'new'}; render(); window.scrollTo(0,0); },
  editEx(el){ S.ui.edit = {day:S.ui.edit.day, ex:el.dataset.id}; render(); window.scrollTo(0,0); },
  moveEx(el){ const d=prof().plan.days.find(x=>x.id===S.ui.edit.day); const a=d.ex, i=a.findIndex(e=>e.id===el.dataset.id), j=i+(+el.dataset.dir); if (j<0||j>=a.length) return; [a[i],a[j]]=[a[j],a[i]]; save(); render(); },
  delEx(el){ if (!armed(el,'Toque de novo para excluir')) return; const d=prof().plan.days.find(x=>x.id===S.ui.edit.day); d.ex=d.ex.filter(e=>e.id!==S.ui.edit.ex); S.ui.edit={day:d.id}; save(); render(); toast('Exercício excluído.'); },
  export(el){ doExport(el.dataset.what, el.dataset.how); },
  applyPlan(el){ if (!pendingImport) return; const plan=pendingImport.plan;
    if (el.dataset.mode==='new'){ const q=newProfile(plan.name.slice(0,40), plan, ['peso','gordura']); S.profiles.push(q); S.active=q.id; }
    else { prof().plan = plan; S.ui.day[prof().id]=null; }
    pendingImport=null; save(); go('treino'); toast('Treino importado.'); },
  applyBackup(el){ if (!pendingImport || !armed(el,'Toque de novo: substitui tudo')) return; const d=pendingImport.data;
    S.profiles = d.profiles.map(q=>({id:q.id||uid(), name:String(q.name||'Perfil'), plan:normPlan(q.plan||{days:[]}), fields:Array.isArray(q.fields)?q.fields:['peso','gordura'], sessions:Array.isArray(q.sessions)?q.sessions:[], measures:Array.isArray(q.measures)?q.measures:[]}));
    S.active = S.profiles.some(q=>q.id===d.active) ? d.active : S.profiles[0].id; S.ui.day = {};
    pendingImport=null; save(); go('treino'); toast('Backup restaurado.'); },
  cancelImport(){ pendingImport=null; render(); },
  useProfile(el){ S.active = el.dataset.id; save(); render(); toast(`Perfil ${prof().name} em uso.`); },
  delProfile(el){ if (!armed(el,'Toque de novo: apaga o perfil e os registros')) return; S.profiles=S.profiles.filter(q=>q.id!==el.dataset.id); if (!S.profiles.some(q=>q.id===S.active)) S.active=S.profiles[0].id; save(); render(); toast('Perfil excluído.'); },
  addProfile(){ const name=($('#np-name').value||'').trim(); if (!name){ toast('Digite o nome do novo perfil.'); $('#np-name').focus(); return; }
    const t=$('#np-tpl').value; let plan;
    if (t==='masc') plan=normPlan(SEED_PLANS.masc); else if (t==='fem') plan=normPlan(SEED_PLANS.fem);
    else if (t==='copy'){ const src=JSON.parse(JSON.stringify(prof().plan)); plan=normPlan({name:src.name, days:src.days.map(d=>Object.assign(d,{id:null,ex:d.ex.map(e=>Object.assign(e,{id:null}))}))}); }
    else plan={name:'Treino de '+name, days:[]};
    const q=newProfile(name.slice(0,40), plan, t==='fem'?['peso','gordura','peito','cintura']:['peso','gordura']); S.profiles.push(q); S.active=q.id; save(); render(); toast(`Perfil ${q.name} criado e em uso.`); },
  async install(){ if (!deferredInstall) return; deferredInstall.prompt(); try{ await deferredInstall.userChoice; }catch(e){} deferredInstall=null; render(); }
};

/* ---------- eventos ---------- */
document.addEventListener('click', ev=>{
  const n = ev.target.closest('[data-nav]'); if (n){ go(n.dataset.nav); return; }
  const a = ev.target.closest('[data-act]'); if (a && ACT[a.dataset.act]){ ev.preventDefault(); ACT[a.dataset.act](a, ev); }
});
document.addEventListener('keydown', ev=>{ const l=ev.target.closest('label.btn[for]'); if (l && (ev.key==='Enter'||ev.key===' ')){ ev.preventDefault(); document.getElementById(l.htmlFor).click(); } });
document.addEventListener('input', ev=>{ if (ev.target.closest('.log') || ev.target.id==='sv-date') saveDraft(); });
document.addEventListener('change', ev=>{
  const t = ev.target;
  if (t.id==='prof-sel'){ S.active=t.value; S.ui.edit=null; save(); render(); return; }
  if (t.dataset.bind){ bind(t); return; }
  if (t.id==='f-pat' || t.id==='f-tool'){ $('#ex-prev').innerHTML = tileHTML({pat:$('#f-pat').value, tool:$('#f-tool').value, n:'?'}, PAT_LABELS[$('#f-pat').value]); collectLive(); return; }
  if (t.type==='file' && t.files && t.files[0]){
    const f = t.files[0]; t.value = '';
    if (t.id==='imp-xlsx') importXlsx(f); else if (t.id==='imp-plan') importJson(f,'plan'); else if (t.id==='imp-backup') importJson(f,'backup');
  }
});
document.addEventListener('submit', ev=>{
  const f = ev.target.closest('[data-form]'); if (!f) return; ev.preventDefault();
  if (f.dataset.form==='measure') saveMeasure(); else if (f.dataset.form==='exercise') saveExercise(f);
});
window.addEventListener('beforeinstallprompt', e=>{ e.preventDefault(); deferredInstall = e; if (S.ui.view==='mais'||S.ui.view==='treino') render(); });
window.addEventListener('appinstalled', ()=>{ deferredInstall = null; render(); toast('App instalado. Abra pelo ícone Treinos na tela inicial.'); });

/* ---------- service worker ---------- */
if ('serviceWorker' in navigator && (location.protocol==='https:' || location.hostname==='localhost') && !window.NO_SW){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('sw.js').then(reg=>{
      reg.addEventListener('updatefound', ()=>{ const w=reg.installing; if (!w) return;
        w.addEventListener('statechange', ()=>{ if (w.state==='installed' && navigator.serviceWorker.controller) toast('Nova versão do app disponível.', 'Atualizar', ()=>w.postMessage('skip')); }); });
    }).catch(()=>{});
    let reloaded=false; navigator.serviceWorker.addEventListener('controllerchange', ()=>{ if (!reloaded){ reloaded=true; location.reload(); } });
  });
}

/* ---------- início ---------- */
load();
render();
requestAnimationFrame(loop);
