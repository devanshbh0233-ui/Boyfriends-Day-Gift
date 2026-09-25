const screens=document.querySelectorAll('[data-screen]');
const dotsWrap=document.getElementById('dots');
screens.forEach((_,i)=>{const d=document.createElement('i');dotsWrap.appendChild(d);});
let cur=0;
function render(){
  screens.forEach((s,i)=>s.classList.toggle('active',i===cur));
  [...dotsWrap.children].forEach((d,i)=>d.classList.toggle('on',i===cur));
  document.getElementById('nextBtn').style.display = cur===screens.length-1 ? 'none':'flex';
}
function goTo(i){cur=i;render();}
function next(){if(cur<screens.length-1){cur++;render();}}

function bouquetTap(el){
  if(!el.classList.contains('filled')){
    activeSlot=el; document.getElementById('fileInput').click();
    return;
  }
  document.querySelectorAll('.bouquet').forEach(b=>b.classList.remove('opened'));
  el.classList.add('opened');
  document.getElementById('bouquetMsg').classList.add('show');
}

// photo persistence
let activeSlot=null;
function pickPhoto(el){activeSlot=el; document.getElementById('fileInput').click();}
document.getElementById('fileInput').addEventListener('change',e=>{
  const f=e.target.files[0]; if(!f||!activeSlot) return;
  const reader=new FileReader();
  reader.onload=ev=>{
    activeSlot.style.backgroundImage=`url(${ev.target.result})`;
    activeSlot.classList.add('filled'); activeSlot.innerHTML='';
    try{localStorage.setItem('bfd_'+activeSlot.dataset.key, ev.target.result);}catch(err){}
  };
  reader.readAsDataURL(f);
});

// audio
function pickAudio(){document.getElementById('audioInput').click();}
document.getElementById('audioInput').addEventListener('change',e=>{
  const f=e.target.files[0]; if(!f) return;
  const url=URL.createObjectURL(f);
  document.getElementById('audio').src=url;
  document.getElementById('songCover').textContent=f.name;
});
function toggleAudio(){
  const a=document.getElementById('audio'); if(!a.src)return;
  const eq=document.getElementById('eq'); const btn=document.getElementById('playBtn');
  if(a.paused){a.play();eq.classList.add('playing');btn.textContent='❚❚';}
  else{a.pause();eq.classList.remove('playing');btn.textContent='▶';}
}

// restore saved photos & text
window.addEventListener('load',()=>{
  document.querySelectorAll('.photo-slot').forEach(el=>{
    try{
      const v=localStorage.getItem('bfd_'+el.dataset.key);
      if(v){el.style.backgroundImage=`url(${v})`; el.classList.add('filled'); el.innerHTML='';}
    }catch(err){}
  });
  document.querySelectorAll('[contenteditable]').forEach(el=>{
    try{
      const v=localStorage.getItem('bfd_'+el.dataset.key);
      if(v) el.innerHTML=v;
    }catch(err){}
    el.addEventListener('blur',()=>{ try{localStorage.setItem('bfd_'+el.dataset.key, el.innerHTML);}catch(err){} });
  });
  render();
});
