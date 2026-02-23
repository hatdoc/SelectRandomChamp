const CONFIG = {
  DEFAULT_LOCALE: 'en_US',
  LOCALES: { 'en': 'en_US', 'ko': 'ko_KR' },
  DATA_DRAGON_BASE: 'https://ddragon.leagueoflegends.com/cdn'
};

const TRANSLATIONS = {
  'en_US': {
    'title': 'What Champ to Play?', 'subtitle': 'Select your role and find your champion!',
    'role-top': 'Top', 'role-jungle': 'Jungle', 'role-mid': 'Mid', 'role-adc': 'ADC', 'role-support': 'Support',
    'tips-header': 'Pro Tips', 'reroll-btn': 'Roll Again', 'loading': 'Summoning champion...',
    'tab-randomizer': 'Randomizer', 'tab-toolkit': 'Streamer Tools',
    'pinball-title': 'Hextech Roulette', 'ladder-title': 'Ghost Leg (Ladder)', 'team-title': 'Team Gap Splitter',
    'mission-title': 'LoL Challenge Mission', 'start-btn': 'Start', 'split-btn': 'Split Teams',
    'mission-btn': 'New Mission', 'options-placeholder': 'Option 1, Option 2, Option 3...',
    'ladder-players': 'Players:', 'ladder-results': 'Results:', 'team-names-label': 'Players (One per line):',
    'mission-start-prompt': 'Click to get a mission!'
  },
  'ko_KR': {
    'title': '뭐 할까?', 'subtitle': '라인을 선택하고 추천 챔피언을 확인하세요!',
    'role-top': '탑', 'role-jungle': '정글', 'role-mid': '미드', 'role-adc': '원딜', 'role-support': '서포터',
    'tips-header': '플레이 꿀팁', 'reroll-btn': '다시 뽑기', 'loading': '챔피언을 불러오는 중...',
    'tab-randomizer': '챔피언 추천', 'tab-toolkit': '스트리머 툴킷',
    'pinball-title': '마법공학 룰렛', 'ladder-title': '사다리 타기', 'team-title': '팀 밸런스 나누기',
    'mission-title': '롤 챌린지 미션', 'start-btn': '시작하기', 'split-btn': '팀 나누기',
    'mission-btn': '새 미션 받기', 'options-placeholder': '옵션 1, 옵션 2, 옵션 3...',
    'ladder-players': '플레이어:', 'ladder-results': '결과:', 'team-names-label': '이름 입력 (한 줄에 한 명씩):',
    'mission-start-prompt': '클릭해서 미션을 확인하세요!'
  }
};

let currentState = { version: null, locale: CONFIG.DEFAULT_LOCALE, champions: [], selectedRole: null, theme: localStorage.getItem('theme') || 'dark' };

const MISSIONS = {
  'en_US': ["Ultimate Bravery", "No Flash Challenge", "Support Item Only", "Protect the President", "Alphabet Jungle", "No Backing", "Invade Only", "Silent Gaming", "River Shen", "Yordle Team"],
  'ko_KR': ["얼티밋 브레이버리", "노 점멸 챌린지", "서폿템 스타트", "VIP 지키기", "가나다 정글링", "노 집타임", "무조건 인베", "침묵의 게임", "리버 쉔", "요들 팀"]
};

const LOL_COLORS = ['#c89b3c', '#1e2328', '#00cfbc', '#091428', '#a09b8c', '#5b5a56'];

async function init() {
  setLocale(); applyTheme(); updateUIText();
  try {
    showLoading(true);
    await fetchLatestVersion();
    await fetchChampions();
    setupEventListeners();
    initRoulette();
    initLadder();
    initTeamSplitter();
    initMissionGenerator();
    initFocusMode();
  } catch (e) { console.error(e); }
  finally { showLoading(false); }
}

function setLocale() { const lang = navigator.language.split('-')[0]; currentState.locale = CONFIG.LOCALES[lang] || CONFIG.DEFAULT_LOCALE; document.documentElement.lang = lang; }
function updateUIText() {
  document.querySelectorAll('[data-i18n]').forEach(el => { const key = el.getAttribute('data-i18n'); if (TRANSLATIONS[currentState.locale][key]) el.textContent = TRANSLATIONS[currentState.locale][key]; });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { const key = el.getAttribute('data-i18n-placeholder'); if (TRANSLATIONS[currentState.locale][key]) el.placeholder = TRANSLATIONS[currentState.locale][key]; });
}
function applyTheme() { document.documentElement.setAttribute('data-theme', currentState.theme); const btn = document.getElementById('theme-toggle'); if (btn) btn.checked = currentState.theme === 'light'; }
function toggleTheme() { currentState.theme = currentState.theme === 'dark' ? 'light' : 'dark'; localStorage.setItem('theme', currentState.theme); applyTheme(); }
async function fetchLatestVersion() { 
  try { const res = await fetch('https://ddragon.leagueoflegends.com/api/versions.json'); const v = await res.json(); currentState.version = v[0]; }
  catch(e) { currentState.version = "14.4.1"; }
}
async function fetchChampions() { 
  try { const res = await fetch(`${CONFIG.DATA_DRAGON_BASE}/${currentState.version}/data/${currentState.locale}/champion.json`); const data = await res.json(); currentState.champions = Object.values(data.data); }
  catch(e) { console.error(e); }
}

function setupEventListeners() {
  document.getElementById('theme-toggle')?.addEventListener('change', toggleTheme);
  document.querySelectorAll('.tab-btn').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn, .tab-content').forEach(el => el.classList.remove('active'));
    btn.classList.add('active'); document.getElementById(btn.dataset.tab).classList.add('active');
    setTimeout(() => window.dispatchEvent(new Event('resize')), 50);
  }));
  document.querySelectorAll('.role-btn').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active'); pickRandomChampion(btn.getAttribute('data-role'));
  }));
  document.addEventListener('click', e => { if (e.target.id === 'reroll-btn' && currentState.selectedRole) pickRandomChampion(currentState.selectedRole); });
}

function showBigResult(title, text) {
  const el = document.getElementById('big-result-overlay');
  document.getElementById('result-title').textContent = title;
  document.getElementById('result-text').textContent = text;
  el.classList.remove('hidden');
}
window.closeResult = () => document.getElementById('big-result-overlay').classList.add('hidden');

function focusTool(id) {
  const card = document.getElementById(id);
  document.querySelectorAll('.tool-card').forEach(c => c.classList.remove('focused'));
  card.classList.add('focused');
  document.body.classList.add('has-focus');
  setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
}

function initFocusMode() {
  document.querySelector('.focused-overlay').addEventListener('click', () => {
    document.querySelectorAll('.tool-card').forEach(c => c.classList.remove('focused'));
    document.body.classList.remove('has-focus');
    setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
  });
}

// High Quality Roulette (inspired by lazygyu style)
function initRoulette() {
  const canvas = document.getElementById('pinball-canvas');
  const ctx = canvas.getContext('2d');
  const startBtn = document.getElementById('pinball-start');
  const input = document.getElementById('pinball-input');
  const pointer = document.querySelector('.roulette-pointer');
  
  let rotation = 0, isSpinning = false, currentOpts = ["A", "B", "C", "D", "E", "F"];

  function draw() {
    const centerX = canvas.width / 2, centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 40;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (!currentOpts.length) return;
    const arc = (Math.PI * 2) / currentOpts.length;

    currentOpts.forEach((opt, i) => {
      const angle = rotation + i * arc;
      ctx.fillStyle = i % 2 === 0 ? '#c89b3c' : '#1e2328';
      ctx.strokeStyle = '#a09b8c'; ctx.lineWidth = 2;
      
      ctx.beginPath(); ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, angle, angle + arc);
      ctx.fill(); ctx.stroke();

      ctx.save(); ctx.translate(centerX, centerY); ctx.rotate(angle + arc / 2);
      ctx.fillStyle = i % 2 === 0 ? '#010a13' : '#f0e6d2';
      ctx.font = `bold ${Math.max(12, 24 - currentOpts.length)}px Spiegel`;
      ctx.textAlign = "right"; ctx.fillText(opt.substring(0, 15), radius - 30, 8);
      ctx.restore();
    });

    // Outer Ring
    ctx.strokeStyle = '#c89b3c'; ctx.lineWidth = 8;
    ctx.beginPath(); ctx.arc(centerX, centerY, radius + 4, 0, Math.PI * 2); ctx.stroke();
    
    // Center HUB
    ctx.fillStyle = '#010a13'; ctx.beginPath(); ctx.arc(centerX, centerY, 20, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#c89b3c'; ctx.lineWidth = 2; ctx.stroke();
  }

  function spin() {
    if (isSpinning) return;
    const opts = (input.value || "A,B,C,D,E,F").split(',').map(o => o.trim()).filter(o => o);
    if (opts.length < 2) return;
    
    currentOpts = opts; isSpinning = true; focusTool('pinball-tool');
    
    let speed = 0.5 + Math.random() * 0.4;
    const friction = 0.985;
    let lastSegment = -1;

    function animate() {
      rotation += speed; speed *= friction;
      
      // Pointer Jitter (Ticking feel)
      const arc = (Math.PI * 2) / opts.length;
      const currentSegment = Math.floor((((Math.PI * 1.5) - rotation) % (Math.PI * 2) + (Math.PI * 2)) % (Math.PI * 2) / arc);
      if (currentSegment !== lastSegment) {
        lastSegment = currentSegment;
        pointer.style.transform = 'translateX(-50%) rotate(-15deg)';
        setTimeout(() => pointer.style.transform = 'translateX(-50%) rotate(0deg)', 50);
      }

      draw();
      if (speed > 0.0015) requestAnimationFrame(animate);
      else {
        isSpinning = false;
        showBigResult("ROULETTE WINNER", opts[currentSegment]);
      }
    }
    animate();
  }

  startBtn.addEventListener('click', spin);
  window.addEventListener('resize', () => {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight || 400;
    draw();
  });
  
  setTimeout(() => { canvas.width = canvas.parentElement.clientWidth; canvas.height = 400; draw(); }, 500);
}

function initLadder() {
  const canvas = document.getElementById('ladder-canvas'), ctx = canvas.getContext('2d'), startBtn = document.getElementById('ladder-start');
  const pIn = document.getElementById('ladder-players-input'), rIn = document.getElementById('ladder-results-input');

  function run() {
    const players = (pIn.value || "A,B,C,D").split(',').map(s => s.trim()).filter(s => s);
    const results = (rIn.value || "1,2,3,4").split(',').map(s => s.trim()).filter(s => s);
    const count = Math.min(players.length, results.length); if (count < 2) return;
    
    focusTool('ladder-tool');
    canvas.width = canvas.parentElement.clientWidth; canvas.height = 400;
    const spacing = canvas.width / (count + 1), lines = [];
    for (let i = 0; i < count - 1; i++) { 
      for (let j = 0; j < 6; j++) lines.push({ from: i, to: i + 1, y: 80 + Math.random() * 240 }); 
    }
    
    let pathIdx = 0;
    function drawPath() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#c89b3c'; ctx.lineWidth = 2;
      for (let i = 0; i < count; i++) {
        const x = spacing * (i + 1); ctx.beginPath(); ctx.moveTo(x, 60); ctx.lineTo(x, 340); ctx.stroke();
        ctx.fillStyle = '#f0e6d2'; ctx.font = 'bold 14px Spiegel'; ctx.textAlign = 'center';
        ctx.fillText(players[i], x, 50); ctx.fillText(results[i], x, 360);
      }
      lines.forEach(l => { ctx.beginPath(); ctx.moveTo(spacing * (l.from + 1), l.y); ctx.lineTo(spacing * (l.to + 1), l.y); ctx.stroke(); });

      let currX = pathIdx, currY = 60;
      ctx.strokeStyle = '#00cfbc'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(spacing * (currX + 1), currY);
      [...lines].sort((a,b) => a.y - b.y).forEach(l => {
        if (l.from === currX) { ctx.lineTo(spacing*(currX+1), l.y); currX = l.to; ctx.lineTo(spacing*(currX+1), l.y); }
        else if (l.to === currX) { ctx.lineTo(spacing*(currX+1), l.y); currX = l.from; ctx.lineTo(spacing*(currX+1), l.y); }
      });
      ctx.lineTo(spacing * (currX + 1), 340); ctx.stroke();
      
      if (pathIdx < count - 1) { pathIdx++; setTimeout(drawPath, 1200); }
      else { setTimeout(() => showBigResult("LADDER FINISHED", "All results revealed!"), 1000); }
    }
    drawPath();
  }
  startBtn.addEventListener('click', run);
  window.addEventListener('resize', () => { canvas.width = canvas.parentElement.clientWidth; canvas.height = 400; });
}

function initTeamSplitter() {
  const btn = document.getElementById('team-start');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const names = document.getElementById('team-input').value.split('\n').map(n => n.trim()).filter(n => n);
    if (names.length < 2) return;
    focusTool('team-tool');
    const shuffled = names.sort(() => Math.random() - 0.5);
    const mid = Math.ceil(shuffled.length / 2);
    const teamA = shuffled.slice(0, mid), teamB = shuffled.slice(mid);
    const sideA = document.querySelector('.team-a'), sideB = document.querySelector('.team-b');
    sideA.innerHTML = `<h3>TEAM BLUE</h3><ul>${teamA.map(n => `<li>${n}</li>`).join('')}</ul>`;
    sideB.innerHTML = `<h3>TEAM RED</h3><ul>${teamB.map(n => `<li>${n}</li>`).join('')}</ul>`;
    const gap = document.querySelector('.gap-indicator');
    gap.innerHTML = '<div class="calculating">CALCULATING GAP...</div>';
    setTimeout(() => {
      const win = Math.random() > 0.5;
      gap.innerHTML = `<div class="gap-result">${win ? 'BLUE GAP' : 'RED GAP'}</div><div class="gap-arrow">${win ? '>>' : '<<'}</div>`;
      showBigResult("GAP DETECTED", win ? "Blue team looks stronger!" : "Red team has the advantage!");
    }, 2000);
  });
}

function initMissionGenerator() {
  const btn = document.getElementById('mission-start');
  if (!btn) return;
  btn.addEventListener('click', () => {
    focusTool('mission-tool');
    const missions = MISSIONS[currentState.locale] || MISSIONS['en_US'];
    const m = missions[Math.floor(Math.random() * missions.length)];
    setTimeout(() => showBigResult("CHALLENGE MISSION", m), 500);
  });
}

async function pickRandomChampion(role) {
  currentState.selectedRole = role; showLoading(true);
  try {
    const res = await fetch(`${CONFIG.DATA_DRAGON_BASE}/${currentState.version}/data/${currentState.locale}/champion.json`);
    const data = await res.json();
    const all = Object.values(data.data);
    const champ = all[Math.floor(Math.random() * all.length)];
    
    document.getElementById('champ-name').textContent = champ.name;
    document.getElementById('champ-splash').src = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ.id}_0.jpg`;
    document.getElementById('result-area').classList.remove('hidden');
    document.getElementById('result-area').scrollIntoView({ behavior: 'smooth' });
  } catch(e) { console.error(e); }
  finally { showLoading(false); }
}

function showLoading(show) { const el = document.getElementById('loading'); if (el) el.classList.toggle('hidden', !show); }

init();
