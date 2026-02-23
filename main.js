const CONFIG = {
  DEFAULT_LOCALE: 'en_US',
  LOCALES: { 'en': 'en_US', 'ko': 'ko_KR' },
  DATA_DRAGON_BASE: 'https://ddragon.leagueoflegends.com/cdn'
};

const TRANSLATIONS = {
  'en_US': {
    'toolkit-title': 'STREAMER TOOLKIT', 'tab-randomizer': 'Randomizer', 'tab-toolkit': 'Tools',
    'pinball-title': 'Ball Picker', 'ladder-title': 'Ghost Leg', 'team-title': 'Team Gap',
    'start-btn': 'Start', 'split-btn': 'Analyze', 'reroll-btn': 'Roll Again', 'options-placeholder': 'A, B, C, D...'
  },
  'ko_KR': {
    'toolkit-title': '스트리머 툴킷', 'tab-randomizer': '챔피언 추천', 'tab-toolkit': '도구 모음',
    'pinball-title': '공 뽑기 추첨', 'ladder-title': '사다리 타기', 'team-title': '팀 밸런스 측정',
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
    setupEventListeners(); initBallPicker(); initLadder(); initTeamSplitter();
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

// New Physics-based Ball Picker (inspired by bluedell)
function initBallPicker() {
  const canvas = document.getElementById('pinball-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d'), startBtn = document.getElementById('pinball-start'), input = document.getElementById('pinball-input');
  
  let balls = [], isRunning = false;
  const gravity = 0.25, friction = 0.98, wallBounciness = 0.7;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(b => {
      ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fillStyle = b.color; ctx.fill();
      ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = "#fff"; ctx.font = "bold 12px Spiegel"; ctx.textAlign = "center";
      ctx.fillText(b.label.substring(0, 5), b.x, b.y + 5);
    });
  }

  function update() {
    balls.forEach(b => {
      b.vy += gravity; b.x += b.vx; b.y += b.vy;
      if (b.x + b.r > canvas.width || b.x - b.r < 0) { b.vx *= -wallBounciness; b.x = b.x < b.r ? b.r : canvas.width - b.r; }
      if (b.y + b.r > canvas.height) { b.vy *= -wallBounciness; b.vx *= friction; b.y = canvas.height - b.r; }
      // Random jump to keep it "bouncing"
      if (Math.abs(b.vy) < 1 && b.y > canvas.height - b.r - 5) { b.vy = -Math.random() * 10 - 5; b.vx = (Math.random() - 0.5) * 10; }
    });
  }

  function pick() {
    if (isRunning) return;
    const opts = (input.value || "1,2,3,4,5,6,7,8,9,10").split(',').map(o => o.trim()).filter(o => o);
    if (!opts.length) return;
    isRunning = true;
    balls = opts.map((opt, i) => ({
      x: Math.random() * canvas.width, y: canvas.height - 20, r: 25, label: opt,
      vx: (Math.random() - 0.5) * 15, vy: -Math.random() * 15 - 10,
      color: `hsl(${i * 360 / opts.length}, 70%, 50%)`
    }));

    const startTime = Date.now();
    function loop() {
      update(); draw();
      if (Date.now() - startTime < 4000) requestAnimationFrame(loop);
      else {
        isRunning = false;
        const winner = balls[Math.floor(Math.random() * balls.length)].label;
        showBigResult("BALL PICKED", winner);
      }
    }
    loop();
  }
  startBtn.addEventListener('click', pick);
  canvas.width = canvas.parentElement.clientWidth; canvas.height = 300;
}

function initLadder() {
  const canvas = document.getElementById('ladder-canvas'), ctx = canvas.getContext('2d'), startBtn = document.getElementById('ladder-start');
  const pIn = document.getElementById('ladder-players-input'), rIn = document.getElementById('ladder-results-input');
  startBtn.addEventListener('click', () => {
    const players = (pIn.value || "A,B,C,D").split(',').map(s => s.trim()).filter(s => s);
    const results = (rIn.value || "1,2,3,4").split(',').map(s => s.trim()).filter(s => s);
    const count = Math.min(players.length, results.length); if (count < 2) return;
    canvas.width = canvas.parentElement.clientWidth; canvas.height = 300;
    const spacing = canvas.width / (count + 1), lines = [];
    for (let i = 0; i < count - 1; i++) { for (let j = 0; j < 4; j++) lines.push({ from: i, to: i + 1, y: 50 + Math.random() * 200 }); }
    ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.strokeStyle = '#c89b3c'; ctx.lineWidth = 2;
    for (let i = 0; i < count; i++) {
      const x = spacing * (i + 1); ctx.beginPath(); ctx.moveTo(x, 40); ctx.lineTo(x, 260); ctx.stroke();
      ctx.fillStyle = '#f0e6d2'; ctx.font = 'bold 12px Spiegel'; ctx.textAlign = 'center';
      ctx.fillText(players[i], x, 30); ctx.fillText(results[i], x, 280);
    }
    lines.forEach(l => { ctx.beginPath(); ctx.moveTo(spacing * (l.from + 1), l.y); ctx.lineTo(spacing * (l.to + 1), l.y); ctx.stroke(); });
    setTimeout(() => showBigResult("LADDER", "Check paths!"), 1000);
  });
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
  startBtn.addEventListener('click', () => showBigResult("TEAM GAP", "Teams Balanced!"));
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
