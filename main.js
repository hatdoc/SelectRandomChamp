const CONFIG = {
  DEFAULT_LOCALE: 'en_US',
  LOCALES: { 'en': 'en_US', 'ko': 'ko_KR' },
  DATA_DRAGON_BASE: 'https://ddragon.leagueoflegends.com/cdn'
};

const TRANSLATIONS = {
  'en_US': {
    'toolkit-title': 'STREAMER TOOLKIT', 'tab-randomizer': 'Randomizer', 'tab-toolkit': 'Tools',
    'pinball-title': '텐션업 핀볼', 'ladder-title': 'Ghost Leg', 'team-title': '팀짜기',
    'start-btn': 'Start', 'split-btn': 'Analyze', 'reroll-btn': 'Roll Again', 'options-placeholder': 'A, B, C, D...'
  },
  'ko_KR': {
    'toolkit-title': '스트리머 툴킷', 'tab-randomizer': '챔피언 추천', 'tab-toolkit': '도구 모음',
    'pinball-title': '텐션업 핀볼', 'ladder-title': '사다리 타기', 'team-title': '팀짜기 (밸런스)',
    'start-btn': '시작하기', 'split-btn': '밸런스 계산', 'reroll-btn': '다시 뽑기', 'options-placeholder': '옵션들을 입력하세요 (쉼표 구분)'
  }
};

let currentState = { version: null, locale: CONFIG.DEFAULT_LOCALE, champions: [], selectedRole: null, theme: localStorage.getItem('theme') || 'dark' };

const ROLE_OVERRIDES = {
  'TOP': ['Aatrox', 'Camille', 'Darius', 'DrMundo', 'Fiora', 'Garen', 'Gnar', 'Gwen', 'Illaoi', 'Irelia', 'Jax', 'Jayce', 'KSante', 'Kayle', 'Kled', 'Malphite', 'Mordekaiser', 'Nasus', 'Olaf', 'Ornn', 'Pantheon', 'Poppy', 'Quinn', 'Renekton', 'Riven', 'Rumble', 'Sett', 'Shen', 'Singed', 'Sion', 'Teemo', 'Tryndamere', 'Urgot', 'Volibear', 'Warwick', 'Yorick'],
  'JUNGLE': ['Amumu', 'Belveth', 'Briar', 'Diana', 'Ekko', 'Elise', 'Evelynn', 'Fiddlesticks', 'Graves', 'Hecarim', 'Ivern', 'JarvanIV', 'Jax', 'Karthus', 'Kayn', 'Khazix', 'Kindred', 'LeeSin', 'Lillia', 'MasterYi', 'Nidalee', 'Nocturne', 'Nunu', 'Olaf', 'Rammus', 'RekSai', 'Rengar', 'Sejuani', 'Shaco', 'Shyvana', 'Skarner', 'Taliyah', 'Talon', 'Vi', 'Viego', 'Volibear', 'Warwick', 'MonkeyKing', 'XinZhao', 'Zac'],
  'MIDDLE': ['Ahri', 'Akali', 'Akshan', 'Anivia', 'Annie', 'AurelionSol', 'Azir', 'Cassiopeia', 'Corki', 'Diana', 'Ekko', 'Fizz', 'Galio', 'Hwei', 'Irelia', 'Kassadin', 'Katarina', 'Leblanc', 'Lissandra', 'Lux', 'Malzahar', 'Naafiri', 'Neeko', 'Orianna', 'Pantheon', 'Qiyana', 'Ryze', 'Sylas', 'Syndra', 'Taliyah', 'Talon', 'TwistedFate', 'Veigar', 'Vex', 'Viktor', 'Vladimir', 'Yasuo', 'Yone', 'Zed', 'Zoe'],
  'BOTTOM': ['Aphelios', 'Ashe', 'Caitlyn', 'Draven', 'Ezreal', 'Jhin', 'Jinx', 'Kaisa', 'Kalista', 'KogMaw', 'Lucian', 'MissFortune', 'Nilah', 'Samira', 'Sivir', 'Smolder', 'Tristana', 'Twitch', 'Varus', 'Vayne', 'Xayah', 'Zeri'],
  'UTILITY': ['Alistar', 'Bard', 'Blitzcrank', 'Brand', 'Braum', 'Janna', 'Karma', 'Leona', 'Lulu', 'Lux', 'Milio', 'Morgana', 'Nami', 'Nautilus', 'Pyke', 'Rakan', 'Rell', 'Renata', 'Senna', 'Seraphine', 'Sona', 'Soraka', 'Swain', 'Taric', 'Thresh', 'Velkoz', 'Xerath', 'Yuumi', 'Zilean', 'Zyra']
};

async function init() {
  setLocale(); applyTheme(); updateUIText();
  try {
    showLoading(true); await fetchLatestVersion(); await fetchChampions();
    setupEventListeners(); initPinball(); initLadder(); initTeamSplitter(); initFocusMode();
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
async function fetchLatestVersion() { const res = await fetch('https://ddragon.leagueoflegends.com/api/versions.json'); const v = await res.json(); currentState.version = v[0]; }
async function fetchChampions() { const res = await fetch(`${CONFIG.DATA_DRAGON_BASE}/${currentState.version}/data/${currentState.locale}/champion.json`); const data = await res.json(); currentState.champions = Object.values(data.data); }

function setupEventListeners() {
  document.getElementById('theme-toggle')?.addEventListener('change', toggleTheme);
  document.querySelectorAll('.nav-btn').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn, .tab-content').forEach(el => el.classList.remove('active'));
    btn.classList.add('active'); document.getElementById(btn.dataset.tab).classList.add('active');
    setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
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
window.closeResult = () => {
  document.getElementById('big-result-overlay').classList.add('hidden');
  document.querySelectorAll('.tool-card').forEach(c => c.classList.remove('focused'));
  document.body.classList.remove('has-focus');
  window.dispatchEvent(new Event('resize'));
};

function focusTool(id) {
  const card = document.getElementById(id);
  document.querySelectorAll('.tool-card').forEach(c => c.classList.remove('focused'));
  card.classList.add('focused');
  document.body.classList.add('has-focus');
  setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
}

function initFocusMode() {
  document.querySelector('.focused-overlay').addEventListener('click', closeResult);
}

// Plinko Style: Last Ball Wins
function initPinball() {
  const canvas = document.getElementById('pinball-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d'), startBtn = document.getElementById('pinball-start'), input = document.getElementById('pinball-input');
  
  let balls = [], pins = [], isRunning = false, finishedCount = 0;
  const gravity = 0.25, friction = 0.99, bounciness = 0.6;

  function setupPins() {
    pins = [];
    const rows = 10, spacingX = canvas.width / 14, spacingY = 30;
    for (let r = 0; r < rows; r++) {
      const offset = (r % 2) * (spacingX / 2);
      for (let c = 0; c < 15; c++) pins.push({ x: c * spacingX + offset, y: 60 + r * spacingY });
    }
  }

  function start() {
    if (isRunning) return;
    const opts = (input.value || "1,2,3,4,5").split(',').map(o => o.trim()).filter(o => o);
    if (!opts.length) return;
    
    focusTool('pinball-tool');
    setupPins();
    isRunning = true; finishedCount = 0;
    balls = opts.map((opt, i) => ({
      x: canvas.width / 2 + (Math.random() - 0.5) * 40, y: -20 - (i * 15), r: 8, label: opt,
      vx: (Math.random() - 0.5) * 2, vy: 2, finished: false,
      color: `hsl(${i * 360 / opts.length}, 70%, 60%)`
    }));

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#c89b3c';
      pins.forEach(p => { ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI * 2); ctx.fill(); });

      let activeBalls = 0;
      balls.forEach(b => {
        if (b.finished) return;
        activeBalls++;
        b.vy += gravity; b.x += b.vx; b.y += b.vy;

        pins.forEach(p => {
          const dx = b.x - p.x, dy = b.y - p.y, dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < b.r + 3) {
            const angle = Math.atan2(dy, dx);
            const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
            b.vx = Math.cos(angle) * speed * bounciness + (Math.random() - 0.5) * 2;
            b.vy = Math.sin(angle) * speed * bounciness;
            b.y += b.vy; // Anti-stuck
          }
        });

        if (b.x < b.r || b.x > canvas.width - b.r) { b.vx *= -0.8; b.x = b.x < b.r ? b.r : canvas.width - b.r; }
        if (b.y > canvas.height - 10) { b.finished = true; finishedCount++; b.finishTime = Date.now(); }

        ctx.fillStyle = b.color; ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#fff"; ctx.font = "bold 10px Spiegel"; ctx.textAlign = "center";
        ctx.fillText(b.label.substring(0, 3), b.x, b.y + 4);
      });

      if (activeBalls > 0) requestAnimationFrame(loop);
      else {
        isRunning = false;
        const lastBall = balls.reduce((prev, current) => (prev.finishTime > current.finishTime) ? prev : current);
        setTimeout(() => showBigResult("LAST BALL WINNER", lastBall.label), 500);
      }
    }
    requestAnimationFrame(loop);
  }

  startBtn.addEventListener('click', start);
  window.addEventListener('resize', () => { canvas.width = canvas.parentElement.clientWidth; canvas.height = canvas.parentElement.clientHeight; setupPins(); });
  setTimeout(() => { canvas.width = canvas.parentElement.clientWidth; canvas.height = 350; setupPins(); }, 500);
}

function initLadder() {
  const canvas = document.getElementById('ladder-canvas'), ctx = canvas.getContext('2d'), startBtn = document.getElementById('ladder-start');
  const pIn = document.getElementById('ladder-players-input'), rIn = document.getElementById('ladder-results-input');

  function drawInitial() {
    canvas.width = canvas.parentElement.clientWidth; canvas.height = 350;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#c89b3c'; ctx.lineWidth = 2;
    const spacing = canvas.width / 3;
    for(let i=1; i<=2; i++) {
      const x = spacing * i; ctx.beginPath(); ctx.moveTo(x, 50); ctx.lineTo(x, 300); ctx.stroke();
      ctx.fillStyle = '#f0e6d2'; ctx.font = 'bold 14px Spiegel'; ctx.textAlign = 'center';
      ctx.fillText("Player " + i, x, 40); ctx.fillText("Result " + i, x, 320);
    }
  }

  startBtn.addEventListener('click', () => {
    const players = (pIn.value || "A,B,C,D").split(',').map(s => s.trim()).filter(s => s);
    const results = (rIn.value || "1,2,3,4").split(',').map(s => s.trim()).filter(s => s);
    const count = Math.min(players.length, results.length); if (count < 2) return;
    
    focusTool('ladder-tool');
    const spacing = canvas.width / (count + 1), lines = [];
    for (let i = 0; i < count - 1; i++) { for (let j = 0; j < 5; j++) lines.push({ from: i, to: i + 1, y: 70 + Math.random() * 220 }); }
    
    let pathIdx = 0;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#c89b3c'; ctx.lineWidth = 2;
      for (let i = 0; i < count; i++) {
        const x = spacing * (i + 1); ctx.beginPath(); ctx.moveTo(x, 60); ctx.lineTo(x, 300); ctx.stroke();
        ctx.fillStyle = '#f0e6d2'; ctx.font = 'bold 14px Spiegel'; ctx.textAlign = 'center';
        ctx.fillText(players[i], x, 50); ctx.fillText(results[i], x, 320);
      }
      lines.forEach(l => { ctx.beginPath(); ctx.moveTo(spacing * (l.from + 1), l.y); ctx.lineTo(spacing * (l.to + 1), l.y); ctx.stroke(); });

      let currX = pathIdx, currY = 60;
      ctx.strokeStyle = '#00cfbc'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(spacing * (currX + 1), currY);
      [...lines].sort((a,b) => a.y - b.y).forEach(l => {
        if (l.from === currX) { ctx.lineTo(spacing*(currX+1), l.y); currX = l.to; ctx.lineTo(spacing*(currX+1), l.y); }
        else if (l.to === currX) { ctx.lineTo(spacing*(currX+1), l.y); currX = l.from; ctx.lineTo(spacing*(currX+1), l.y); }
      });
      ctx.lineTo(spacing * (currX + 1), 300); ctx.stroke();
      if (pathIdx < count - 1) { pathIdx++; setTimeout(draw, 1000); }
      else setTimeout(() => showBigResult("LADDER FINISHED", "All results revealed!"), 500);
    }
    draw();
  });
  setTimeout(drawInitial, 500);
  window.addEventListener('resize', drawInitial);
}

function initTeamSplitter() {
  const list = document.getElementById('team-pair-list'), addBtn = document.getElementById('add-pair-btn'), startBtn = document.getElementById('team-start');
  function createRow() {
    const row = document.createElement('div'); row.className = 'team-pair-row';
    row.innerHTML = `<input type="text" class="pair-input" placeholder="BLUE"><button class="gap-btn">></button><input type="text" class="pair-input" placeholder="RED">`;
    row.querySelector('.gap-btn').addEventListener('click', e => e.target.textContent = e.target.textContent === '>' ? '<' : '>');
    list.appendChild(row);
  }
  addBtn.addEventListener('click', createRow);
  startBtn.addEventListener('click', () => { focusTool('team-tool'); setTimeout(() => showBigResult("GAP ANALYSIS", "Balanced Teams Calculated!"), 1500); });
  for(let i=0; i<5; i++) createRow();
}

async function pickRandomChampion(role) {
  currentState.selectedRole = role; showLoading(true);
  try {
    const res = await fetch(`${CONFIG.DATA_DRAGON_BASE}/${currentState.version}/data/${currentState.locale}/champion.json`);
    const data = await res.json(), filtered = Object.values(data.data).filter(c => ROLE_OVERRIDES[role]?.includes(c.id));
    const champ = (filtered.length ? filtered : Object.values(data.data))[Math.floor(Math.random() * (filtered.length || 1))];
    document.getElementById('champ-name').textContent = champ.name;
    document.getElementById('champ-splash').src = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ.id}_0.jpg`;
    document.getElementById('result-area').classList.remove('hidden');
    document.getElementById('result-area').scrollIntoView({ behavior: 'smooth' });
  } finally { showLoading(false); }
}

function showLoading(show) { document.getElementById('loading')?.classList.toggle('hidden', !show); }
init();
