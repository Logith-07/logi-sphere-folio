/* === Logith S T — Portfolio JS === */
(function(){
  const $  = (s,r=document)=>r.querySelector(s);
  const $$ = (s,r=document)=>Array.from(r.querySelectorAll(s));

  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Particles ---------- */
  function initParticles(){
    if(!window.particlesJS) return setTimeout(initParticles, 200);
    particlesJS('particles-js',{
      particles:{
        number:{value:70,density:{enable:true,value_area:900}},
        color:{value:['#00eaff','#7c3aed','#ff4ecd']},
        shape:{type:'circle'},
        opacity:{value:0.5,random:true},
        size:{value:2.4,random:true},
        line_linked:{enable:true,distance:140,color:'#00eaff',opacity:0.18,width:1},
        move:{enable:true,speed:1.4,direction:'none',out_mode:'out'}
      },
      interactivity:{
        detect_on:'window',
        events:{onhover:{enable:true,mode:'grab'},onclick:{enable:true,mode:'push'},resize:true},
        modes:{grab:{distance:160,line_linked:{opacity:.4}},push:{particles_nb:3}}
      },
      retina_detect:true
    });
  }
  initParticles();

  /* ---------- Cursor glow ---------- */
  const glow = $('#cursor-glow');
  window.addEventListener('mousemove', e=>{
    if(!glow) return;
    glow.style.left = e.clientX+'px';
    glow.style.top  = e.clientY+'px';
  });

  /* ---------- Typing effect ---------- */
  const typed = $('#typed');
  const phrases = [
    'Full Stack Developer',
    'AI Enthusiast',
    'CSE Student',
    'Creative Coder'
  ];
  let pi=0, ci=0, deleting=false;
  function type(){
    const word = phrases[pi];
    typed.textContent = word.slice(0, ci);
    if(!deleting && ci < word.length){ ci++; setTimeout(type, 75); }
    else if(deleting && ci>0){ ci--; setTimeout(type, 35); }
    else{
      deleting = !deleting;
      if(!deleting) pi = (pi+1) % phrases.length;
      setTimeout(type, deleting ? 1400 : 280);
    }
  }
  type();

  /* ---------- Mobile nav ---------- */
  const burger = $('#burger'), nav = $('#navLinks');
  burger.addEventListener('click', ()=>{
    burger.classList.toggle('open');
    nav.classList.toggle('open');
  });
  $$('#navLinks a').forEach(a=>a.addEventListener('click',()=>{
    burger.classList.remove('open');
    nav.classList.remove('open');
  }));

  /* ---------- Smooth scroll ---------- */
  $$('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const id = a.getAttribute('href');
      if(id.length>1){
        const el = document.querySelector(id);
        if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth',block:'start'}); }
      }
    });
  });

  /* ---------- Active nav highlight ---------- */
  const sections = $$('section[id]');
  const navAnchors = $$('#navLinks a');
  const onScroll = ()=>{
    const y = window.scrollY + 120;
    let current = sections[0].id;
    sections.forEach(s=>{ if(s.offsetTop <= y) current = s.id; });
    navAnchors.forEach(a=>a.classList.toggle('active', a.getAttribute('href')==='#'+current));
  };
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  },{threshold:.12});
  $$('.reveal, .glass, .t-item, .article-card, .profile-card, .skill-card, .project-card').forEach(el=>{
    el.classList.add('reveal');
    io.observe(el);
  });

  /* ---------- 3D Tilt ---------- */
  $$('.tilt').forEach(card=>{
    let rect;
    card.addEventListener('mouseenter', ()=>{ rect = card.getBoundingClientRect(); });
    card.addEventListener('mousemove', e=>{
      if(!rect) rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - .5;
      const y = (e.clientY - rect.top) / rect.height - .5;
      card.style.transform = `perspective(900px) rotateY(${x*10}deg) rotateX(${-y*10}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', ()=>{ card.style.transform=''; });
  });

  /* ---------- Articles ---------- */
  const articles = [
    {t:'Build a Modern Portfolio with Vanilla JS', c:'Web Development', r:'7 min', d:'Jun 2026', e:'🚀'},
    {t:'Mastering Async/Await in JavaScript', c:'JavaScript', r:'6 min', d:'May 2026', e:'⚡'},
    {t:'Prompt Engineering for Developers', c:'AI', r:'8 min', d:'May 2026', e:'🤖'},
    {t:'From Student to Engineer: My Roadmap', c:'Career Growth', r:'5 min', d:'Apr 2026', e:'🧭'},
    {t:'Clean Code Principles Every Coder Needs', c:'Programming', r:'9 min', d:'Apr 2026', e:'🧹'},
    {t:'Three.js Basics: Your First 3D Scene', c:'Web Development', r:'10 min', d:'Mar 2026', e:'🌐'}
  ];
  const grid = $('#articlesGrid');
  function renderArticles(list){
    grid.innerHTML = list.map(a=>`
      <article class="glass article-card tilt">
        <div class="article-img">${a.e}</div>
        <div class="article-body">
          <div class="article-cat">${a.c}</div>
          <h4>${a.t}</h4>
          <div class="article-meta"><span>${a.r} read</span><span>${a.d}</span></div>
        </div>
      </article>`).join('');
    // re-bind tilt for fresh nodes
    $$('#articlesGrid .tilt').forEach(card=>{
      card.addEventListener('mousemove', e=>{
        const r = card.getBoundingClientRect();
        const x = (e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
        card.style.transform=`perspective(900px) rotateY(${x*8}deg) rotateX(${-y*8}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave',()=>card.style.transform='');
    });
  }
  let activeCat='all', searchQ='';
  function filterArticles(){
    renderArticles(articles.filter(a=>{
      const okCat = activeCat==='all' || a.c===activeCat;
      const okQ = !searchQ || (a.t+' '+a.c).toLowerCase().includes(searchQ);
      return okCat && okQ;
    }));
  }
  $('#articleSearch').addEventListener('input', e=>{ searchQ = e.target.value.trim().toLowerCase(); filterArticles(); });
  $$('#articleFilters .chip').forEach(c=>c.addEventListener('click', ()=>{
    $$('#articleFilters .chip').forEach(x=>x.classList.remove('active'));
    c.classList.add('active');
    activeCat = c.dataset.cat;
    filterArticles();
  }));
  filterArticles();

  /* ---------- Contact form ---------- */
  const form = $('#contactForm'), msg = $('#formMsg');
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    if(!data.name || !data.email || !data.subject || !data.message){
      msg.style.color = '#ff6b8a';
      msg.textContent = 'Please fill out every field.';
      return;
    }
    if(!/^\S+@\S+\.\S+$/.test(data.email)){
      msg.style.color = '#ff6b8a';
      msg.textContent = 'Please enter a valid email.';
      return;
    }
    msg.style.color = '';
    msg.textContent = '✓ Message sent! I\'ll get back to you soon.';
    form.reset();
    setTimeout(()=>{ msg.textContent=''; }, 5000);
  });

  /* ---------- Resume download (placeholder) ---------- */
  $('#downloadResume').addEventListener('click', e=>{
    e.preventDefault();
    const text = `LOGITH S T\nFull Stack Developer | AI Enthusiast | CSE Student\n\nEducation: B.E. CSE — C. Abdul Hakeem College of Engineering and Technology\nSkills: HTML, CSS, JavaScript, Node.js, Express, MongoDB, MySQL, Git, AI Workflows\nProjects: VIP Store, Southern Spices, Cinema Companion\n`;
    const blob = new Blob([text], {type:'text/plain'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'Logith_S_T_Resume.txt';
    a.click();
    URL.revokeObjectURL(a.href);
  });

  /* ---------- Three.js floating icons ---------- */
  function initThree(){
    if(!window.THREE) return setTimeout(initThree, 200);
    const canvas = $('#three-canvas');
    if(!canvas) return;
    const renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias:true});
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, .1, 100);
    camera.position.z = 9;

    function resize(){
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      renderer.setSize(w,h,false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      camera.aspect = w/h; camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', resize); resize();

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, .5));
    const p1 = new THREE.PointLight(0x00eaff, 2, 30); p1.position.set(5,3,5); scene.add(p1);
    const p2 = new THREE.PointLight(0x7c3aed, 2, 30); p2.position.set(-5,-2,4); scene.add(p2);
    const p3 = new THREE.PointLight(0xff4ecd, 1.5, 30); p3.position.set(0,4,-3); scene.add(p3);

    const palette = [0x00eaff,0x22d3ee,0x7c3aed,0xff4ecd,0x4f8cff,0x00eaff,0x7c3aed];
    const geos = [
      new THREE.IcosahedronGeometry(.7,0),
      new THREE.TorusGeometry(.55,.18,16,40),
      new THREE.OctahedronGeometry(.65,0),
      new THREE.TetrahedronGeometry(.75,0),
      new THREE.TorusKnotGeometry(.45,.14,80,12),
      new THREE.BoxGeometry(.9,.9,.9),
      new THREE.DodecahedronGeometry(.6,0)
    ];
    const meshes = [];
    for(let i=0;i<7;i++){
      const mat = new THREE.MeshStandardMaterial({
        color: palette[i%palette.length],
        metalness:.4, roughness:.25,
        emissive: palette[i%palette.length], emissiveIntensity:.25,
        wireframe: i%2===0
      });
      const m = new THREE.Mesh(geos[i], mat);
      const a = (i/7)*Math.PI*2;
      m.position.set(Math.cos(a)*4.5, Math.sin(a*1.3)*2.2, Math.sin(a)*2 - 1);
      m.userData = { a, sp:.4+Math.random()*.6, rx:Math.random()*.02+.005, ry:Math.random()*.02+.005, base:m.position.clone() };
      scene.add(m); meshes.push(m);
    }

    // Star field
    const starGeo = new THREE.BufferGeometry();
    const starN = 400; const arr = new Float32Array(starN*3);
    for(let i=0;i<starN;i++){
      arr[i*3]   = (Math.random()-.5)*60;
      arr[i*3+1] = (Math.random()-.5)*40;
      arr[i*3+2] = (Math.random()-.5)*40 - 10;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(arr,3));
    const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({color:0x9fdcff, size:.05, transparent:true, opacity:.7}));
    scene.add(stars);

    let mouseX=0, mouseY=0;
    window.addEventListener('mousemove', e=>{
      mouseX = (e.clientX/window.innerWidth - .5);
      mouseY = (e.clientY/window.innerHeight - .5);
    });

    const clock = new THREE.Clock();
    function loop(){
      const t = clock.getElapsedTime();
      meshes.forEach((m,i)=>{
        m.rotation.x += m.userData.rx;
        m.rotation.y += m.userData.ry;
        m.position.y = m.userData.base.y + Math.sin(t*m.userData.sp + i)*0.4;
      });
      stars.rotation.y += .0006;
      camera.position.x += (mouseX*1.6 - camera.position.x)*.04;
      camera.position.y += (-mouseY*1.2 - camera.position.y)*.04;
      camera.lookAt(0,0,0);
      renderer.render(scene,camera);
      requestAnimationFrame(loop);
    }
    loop();
  }
  initThree();

  /* ---------- GSAP scroll polish ---------- */
  function initGsap(){
    if(!window.gsap || !window.ScrollTrigger) return setTimeout(initGsap, 200);
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.section-title').forEach(el=>{
      gsap.from(el,{
        opacity:0, y:30, duration:.9, ease:'power3.out',
        scrollTrigger:{trigger:el, start:'top 85%'}
      });
    });
    gsap.utils.toArray('.project-card, .skill-card, .article-card, .profile-card, .t-item').forEach((el,i)=>{
      gsap.from(el,{
        opacity:0, y:40, duration:.7, delay:(i%3)*.08, ease:'power2.out',
        scrollTrigger:{trigger:el, start:'top 90%'}
      });
    });
  }
  initGsap();
})();
