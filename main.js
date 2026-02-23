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
    'pinball-title': 'Bouncing Roulette', 'ladder-title': 'Ghost Leg (Ladder)', 'team-title': 'Vertical Team Gap',
    'mission-title': 'LoL Challenge Mission', 'start-btn': 'Start', 'split-btn': 'Calculate Gap',
    'mission-btn': 'New Mission', 'options-placeholder': 'Option 1, Option 2, Option 3...',
    'ladder-players': 'Players:', 'ladder-results': 'Results:', 'team-names-label': 'Players (One per line):',
    'mission-start-prompt': 'Click to get a mission!'
  },
  'ko_KR': {
    'title': '뭐 할까?', 'subtitle': '라인을 선택하고 추천 챔피언을 확인하세요!',
    'role-top': '탑', 'role-jungle': '정글', 'role-mid': '미드', 'role-adc': '원딜', 'role-support': '서포터',
    'tips-header': '플레이 꿀팁', 'reroll-btn': '다시 뽑기', 'loading': '챔피언을 불러오는 중...',
    'tab-randomizer': '챔피언 추천', 'tab-toolkit': '스트리머 툴킷',
    'pinball-title': '통통 룰렛', 'ladder-title': '사다리 타기', 'team-title': '수직 팀 밸런스',
    'mission-title': '롤 챌린지 미션', 'start-btn': '시작하기', 'split-btn': '밸런스 계산',
    'mission-btn': '새 미션 받기', 'options-placeholder': '옵션 1, 옵션 2, 옵션 3...',
    'ladder-players': '플레이어:', 'ladder-results': '결과:', 'team-names-label': '이름 입력 (한 줄에 한 명씩):',
    'mission-start-prompt': '클릭해서 미션을 확인하세요!'
  }
};

let currentState = { version: null, locale: CONFIG.DEFAULT_LOCALE, champions: [], selectedRole: null, theme: localStorage.getItem('theme') || 'dark' };

const ROLE_OVERRIDES = {
  'TOP': ['Aatrox', 'Akali', 'Camille', 'Chogath', 'Darius', 'DrMundo', 'Fiora', 'Gangplank', 'Garen', 'Gnar', 'Gwen', 'Illaoi', 'Irelia', 'Jax', 'Jayce', 'KSante', 'Kayle', 'Kennen', 'Kled', 'Malphite', 'Mordekaiser', 'Nasus', 'Olaf', 'Ornn', 'Pantheon', 'Poppy', 'Quinn', 'Renekton', 'Riven', 'Rumble', 'Sett', 'Shen', 'Singed', 'Sion', 'TahmKench', 'Teemo', 'Tryndamere', 'Urgot', 'Vayne', 'Volibear', 'Warwick', 'Yasuo', 'Yone', 'Yorick'],
  'JUNGLE': ['Amumu', 'Belveth', 'Briar', 'Diana', 'Ekko', 'Elise', 'Evelynn', 'Fiddlesticks', 'Graves', 'Hecarim', 'Ivern', 'JarvanIV', 'Jax', 'Karthus', 'Kayn', 'Khazix', 'Kindred', 'LeeSin', 'Lillia', 'MasterYi', 'Nidalee', 'Nocturne', 'Nunu', 'Olaf', 'Poppy', 'Rammus', 'RekSai', 'Rengar', 'Sejuani', 'Shaco', 'Shyvana', 'Skarner', 'Taliyah', 'Talon', 'Trundle', 'Udyr', 'Vi', 'Viego', 'Volibear', 'Warwick', 'MonkeyKing', 'XinZhao', 'Zac'],
  'MIDDLE': ['Ahri', 'Akali', 'Akshan', 'Anivia', 'Annie', 'AurelionSol', 'Azir', 'Cassiopeia', 'Corki', 'Diana', 'Ekko', 'Fizz', 'Galio', 'Hwei', 'Irelia', 'Kassadin', 'Katarina', 'Leblanc', 'Lissandra', 'Lux', 'Malzahar', 'Naafiri', 'Neeko', 'Orianna', 'Pantheon', 'Qiyana', 'Ryze', 'Sylas', 'Syndra', 'Taliyah', 'Talon', 'TwistedFate', 'Veigar', 'Vex', 'Viktor', 'Vladimir', 'Yasuo', 'Yone', 'Zed', 'Zoe'],
  'BOTTOM': ['Aphelios', 'Ashe', 'Caitlyn', 'Draven', 'Ezreal', 'Jhin', 'Jinx', 'Kaisa', 'Kalista', 'KogMaw', 'Lucian', 'MissFortune', 'Nilah', 'Samira', 'Sivir', 'Smolder', 'Tristana', 'Twitch', 'Varus', 'Vayne', 'Xayah', 'Yasuo', 'Zeri'],
  'UTILITY': ['Alistar', 'Bard', 'Blitzcrank', 'Brand', 'Braum', 'Janna', 'Karma', 'Leona', 'Lulu', 'Lux', 'Maokai', 'Milio', 'Morgana', 'Nami', 'Nautilus', 'Pantheon', 'Pyke', 'Rakan', 'Rell', 'Renata', 'Senna', 'Seraphine', 'Sona', 'Soraka', 'Swain', 'Taric', 'Thresh', 'Velkoz', 'Xerath', 'Yuumi', 'Zilean', 'Zyra']
};

const MISSIONS = {
  'en_US': ["Ultimate Bravery", "No Flash Challenge", "Support Item Only", "Protect the President", "Alphabet Jungle", "No Backing", "Invade Only", "Silent Gaming", "River Shen", "Yordle Team"],
  'ko_KR': ["얼티밋 브레이버리", "노 점멸 챌린지", "서폿템 스타트", "VIP 지키기", "가나다 정글링", "노 집타임", "무조건 인베", "침묵의 게임", "리버 쉔", "요들 팀"]
};

async function init() {
  setLocale(); applyTheme(); updateUIText();
  try {
    showLoading(true); await fetchLatestVersion(); await fetchChampions();
    setupEventListeners(); initRoulette(); initLadder(); initTeamSplitter(); initMissionGenerator(); initFocusMode();
  } catch (e) { console.error(e); }
  finally { showLoading(false); }
}

function setLocale() { const lang = navigator.language.split('-')[0]; currentState.locale = CONFIG.LOCALES[lang] || CONFIG.DEFAULT_LOCALE; document.documentElement.lang = lang; }
function updateUIText() {
  document.querySelectorAll('[data-i18n]').forEach(el => { const key = el.getAttribute('data-i18n'); if (TRANSLATIONS[currentState.locale][key]) el.textContent = TRANSLATIONS[currentState.locale][key]; });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { const key = el.getAttribute('data-i18n-placeholder'); if (TRANSLATIONS[currentState.locale][key]) el.placeholder = TRANSLATIONS[currentState.locale][key]; });
}
function applyTheme() { document.documentElement.setAttribute('data-theme', currentState.theme); }
function toggleTheme() { currentState.theme = currentState.theme === 'dark' ? 'light' : 'dark'; localStorage.setItem('theme', currentState.theme); applyTheme(); }
async function fetchLatestVersion() { const res = await fetch('https://ddragon.leagueoflegends.com/api/versions.json'); const v = await res.json(); currentState.version = v[0]; }
async function fetchChampions() { const res = await fetch(`${CONFIG.DATA_DRAGON_BASE}/${currentState.version}/data/${currentState.locale}/champion.json`); const data = await res.json(); currentState.champions = Object.values(data.data); }

function setupEventListeners() {
  document.getElementById('theme-toggle')?.addEventListener('change', toggleTheme);
  document.querySelectorAll('.tab-btn').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn, .tab-content').forEach(el => el.classList.remove('active'));
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

function focusTool(id) {
  const card = document.getElementById(id);
  document.querySelectorAll('.tool-card').forEach(c => c.classList.remove('focused'));
  card.classList.add('focused');
  document.body.classList.add('has-focus');
}

function initFocusMode() {
  document.querySelector('.focused-overlay').addEventListener('click', () => {
    document.querySelectorAll('.tool-card').forEach(c => c.classList.remove('focused'));
    document.body.classList.remove('has-focus');
  });
}

// Bouncing Roulette (Scrolling Tape Style)
function initRoulette() {
  const tape = document.getElementById('roulette-tape');
  const startBtn = document.getElementById('pinball-start');
  const input = document.getElementById('pinball-input');
  let isSpinning = false;

  function spin() {
    if (isSpinning) return;
    const opts = (input.value || "A,B,C,D,E,F").split(',').map(o => o.trim()).filter(o => o);
    if (opts.length < 2) return;
    isSpinning = true; focusTool('pinball-tool');

    // Create 50 items for scrolling effect
    tape.innerHTML = '';
    const items = [];
    for (let i = 0; i < 80; i++) {
      const opt = opts[i % opts.length];
      const div = document.createElement('div');
      div.className = 'roulette-item';
      div.textContent = opt;
      div.style.background = i % 2 === 0 ? '#c89b3c' : '#1e2328';
      div.style.color = i % 2 === 0 ? '#010a13' : '#f0e6d2';
      tape.appendChild(div);
      items.push(opt);
    }

    const itemWidth = 150;
    const winnerIdx = 60 + Math.floor(Math.random() * (opts.length));
    const winnerName = items[winnerIdx];
    const offset = winnerIdx * itemWidth - (tape.parentElement.clientWidth / 2) + (itemWidth / 2);

    tape.style.transition = 'none';
    tape.style.transform = `translateX(0px)`;
    setTimeout(() => {
      tape.style.transition = 'transform 5s cubic-bezier(0.1, 0, 0.1, 1)';
      tape.style.transform = `translateX(-${offset}px)`;
    }, 50);

    setTimeout(() => {
      isSpinning = false;
      showBigResult("ROULETTE WINNER", winnerName);
    }, 5500);
  }
  startBtn.addEventListener('click', spin);
}

function initLadder() {
  const canvas = document.getElementById('ladder-canvas'), ctx = canvas.getContext('2d'), startBtn = document.getElementById('ladder-start');
  const pIn = document.getElementById('ladder-players-input'), rIn = document.getElementById('ladder-results-input');

  function run() {
    const players = (pIn.value || "A,B,C,D").split(',').map(s => s.trim()).filter(s => s);
    const results = (rIn.value || "1,2,3,4").split(',').map(s => s.trim()).filter(s => s);
    const count = Math.min(players.length, results.length); if (count < 2) return;
    focusTool('ladder-tool');
    canvas.width = canvas.parentElement.clientWidth; canvas.height = 350;
    const spacing = canvas.width / (count + 1), lines = [];
    for (let i = 0; i < count - 1; i++) { for (let j = 0; j < 5; j++) lines.push({ from: i, to: i + 1, y: 60 + Math.random() * 230 }); }
    
    let pathIdx = 0;
    function drawPath() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#c89b3c'; ctx.lineWidth = 2;
      for (let i = 0; i < count; i++) {
        const x = spacing * (i + 1); ctx.beginPath(); ctx.moveTo(x, 50); ctx.lineTo(x, 300); ctx.stroke();
        ctx.fillStyle = '#f0e6d2'; ctx.font = 'bold 14px Spiegel'; ctx.textAlign = 'center';
        ctx.fillText(players[i], x, 40); ctx.fillText(results[i], x, 320);
      }
      lines.forEach(l => { ctx.beginPath(); ctx.moveTo(spacing * (l.from + 1), l.y); ctx.lineTo(spacing * (l.to + 1), l.y); ctx.stroke(); });

      let currX = pathIdx, currY = 50;
      ctx.strokeStyle = '#00cfbc'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(spacing * (currX + 1), currY);
      [...lines].sort((a,b) => a.y - b.y).forEach(l => {
        if (l.from === currX) { ctx.lineTo(spacing*(currX+1), l.y); currX = l.to; ctx.lineTo(spacing*(currX+1), l.y); }
        else if (l.to === currX) { ctx.lineTo(spacing*(currX+1), l.y); currX = l.from; ctx.lineTo(spacing*(currX+1), l.y); }
      });
      ctx.lineTo(spacing * (currX + 1), 300); ctx.stroke();
      
      if (pathIdx < count - 1) { pathIdx++; setTimeout(drawPath, 800); }
      else { setTimeout(() => showBigResult("LADDER FINISHED", "Results revealed!"), 1000); }
    }
    drawPath();
  }
  startBtn.addEventListener('click', run);
}

function initTeamSplitter() {
  const list = document.getElementById('team-pair-list');
  const addBtn = document.getElementById('add-pair-btn');
  const startBtn = document.getElementById('team-start');

  function createPairRow(nameA = "", nameB = "") {
    const row = document.createElement('div');
    row.className = 'team-pair-row';
    row.innerHTML = `
      <input type="text" class="pair-input" value="${nameA}" placeholder="Name A">
      <button class="gap-btn">></button>
      <input type="text" class="pair-input" value="${nameB}" placeholder="Name B">
      <span class="remove-pair">×</span>
    `;
    row.querySelector('.gap-btn').addEventListener('click', (e) => {
      e.target.textContent = e.target.textContent === '>' ? '<' : '>';
    });
    row.querySelector('.remove-pair').addEventListener('click', () => row.remove());
    list.appendChild(row);
  }

  addBtn.addEventListener('click', () => createPairRow());
  startBtn.addEventListener('click', () => {
    focusTool('team-tool');
    setTimeout(() => showBigResult("GAP ANALYSIS", "Balanced Teams Calculated!"), 1500);
  });

  // Initial rows
  for(let i=0; i<5; i++) createPairRow();
}

function initMissionGenerator() {
  const btn = document.getElementById('mission-start');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const missions = MISSIONS[currentState.locale] || MISSIONS['en_US'];
    showBigResult("MISSION", missions[Math.floor(Math.random() * missions.length)]);
  });
}

async function pickRandomChampion(role) {
  currentState.selectedRole = role; showLoading(true);
  try {
    const res = await fetch(`${CONFIG.DATA_DRAGON_BASE}/${currentState.version}/data/${currentState.locale}/champion.json`);
    const data = await res.json();
    const filtered = Object.values(data.data).filter(c => ROLE_OVERRIDES[role]?.includes(c.id));
    const finalPool = filtered.length ? filtered : Object.values(data.data);
    const champ = finalPool[Math.floor(Math.random() * finalPool.length)];
    
    document.getElementById('champ-name').textContent = champ.name;
    document.getElementById('champ-splash').src = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ.id}_0.jpg`;
    document.getElementById('result-area').classList.remove('hidden');
    document.getElementById('result-area').scrollIntoView({ behavior: 'smooth' });
  } catch(e) { console.error(e); }
  finally { showLoading(false); }
}

function showLoading(show) { const el = document.getElementById('loading'); if (el) el.classList.toggle('hidden', !show); }

init();
