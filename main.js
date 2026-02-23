const CONFIG = {
  DEFAULT_LOCALE: 'en_US',
  LOCALES: {
    'en': 'en_US',
    'ko': 'ko_KR'
  },
  DATA_DRAGON_BASE: 'https://ddragon.leagueoflegends.com/cdn'
};

const TRANSLATIONS = {
  'en_US': {
    'title': 'What Champ to Play?',
    'subtitle': 'Select your role and find your champion!',
    'role-top': 'Top',
    'role-jungle': 'Jungle',
    'role-mid': 'Mid',
    'role-adc': 'ADC',
    'role-support': 'Support',
    'tips-header': 'Pro Tips',
    'reroll-btn': 'Roll Again',
    'loading': 'Summoning champion...',
    'tab-randomizer': 'Randomizer',
    'tab-toolkit': 'Streamer Tools',
    'pinball-title': 'Pinball Randomizer',
    'ladder-title': 'Ghost Leg (Ladder)',
    'team-title': 'Team Splitter',
    'mission-title': 'LoL Challenge Mission',
    'bracket-title': 'Tournament Bracket',
    'start-btn': 'Start',
    'split-btn': 'Split Teams',
    'mission-btn': 'New Mission',
    'bracket-btn': 'Generate Bracket',
    'options-placeholder': 'Option 1, Option 2, Option 3...',
    'ladder-players': 'Players (Comma separated)',
    'ladder-results': 'Results (Comma separated)',
    'team-placeholder': 'Enter names (one per line)',
    'bracket-placeholder': 'Enter 4 or 8 names (one per line)',
    'teams-label': 'Teams:',
    'mission-start-prompt': 'Click to get a mission!',
    'about-title': 'About What Champ to Play?',
    'about-p1': 'Choosing a champion in League of Legends can be a daunting task with over 160 unique characters. Our tool helps you break the analysis paralysis.',
    'how-it-works-title': 'How It Works',
    'how-it-works-p1': 'Our algorithm uses real-time data from the Riot Games Data Dragon API to fetch the latest champion information.',
    'tips-desc-title': 'Master Your Champion',
    'tips-desc-p1': "Each recommendation comes with pro tips and strategy guides to help you understand your power spikes and combos.",
    'disclaimer': "WhatChampToPlay isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games.",
    'pinball-mode': 'Mode:',
    'pinball-mode-first': 'First Fall Wins',
    'pinball-mode-last': 'Last Fall Wins',
    'pinball-balls': 'Balls:',
    'team-names-label': 'Enter Names (One per line):'
  },
  'ko_KR': {
    'title': '뭐 할까?',
    'subtitle': '라인을 선택하고 추천 챔피언을 확인하세요!',
    'role-top': '탑',
    'role-jungle': '정글',
    'role-mid': '미드',
    'role-adc': '원딜',
    'role-support': '서포터',
    'tips-header': '플레이 꿀팁',
    'reroll-btn': '다시 뽑기',
    'loading': '챔피언을 불러오는 중...',
    'tab-randomizer': '챔피언 추천',
    'tab-toolkit': '스트리머 툴킷',
    'pinball-title': '핀볼 추첨기',
    'ladder-title': '사다리 타기',
    'team-title': '팀 나누기',
    'mission-title': '롤 챌린지 미션',
    'bracket-title': '대진표 생성기',
    'start-btn': '시작하기',
    'split-btn': '팀 나누기',
    'mission-btn': '새 미션 받기',
    'bracket-btn': '대진표 생성',
    'options-placeholder': '옵션 1, 옵션 2, 옵션 3...',
    'ladder-players': '플레이어 (쉼표로 구분)',
    'ladder-results': '결과 (쉼표로 구분)',
    'team-placeholder': '이름을 한 줄에 하나씩 입력하세요',
    'bracket-placeholder': '참가자 4명 또는 8명 입력 (한 줄에 하나씩)',
    'teams-label': '팀 개수:',
    'mission-start-prompt': '클릭해서 미션을 확인하세요!',
    'about-title': '뭐 할까? 란 무엇인가요?',
    'about-p1': '리그 오브 레전드에는 160명이 넘는 챔피언이 있어 선택이 어려울 수 있습니다. 본 서비스는 여러분의 고민을 해결해 드립니다.',
    'how-it-works-title': '어떻게 작동하나요?',
    'how-it-works-p1': '라이엇 게임즈의 Data Dragon API를 실시간으로 활용하여 챔피언의 최신 정보를 가져옵니다.',
    'tips-desc-title': '챔피언 마스터하기',
    'tips-desc-p1': "단순히 이름만 알려주는 것이 아니라, 스킬 콤보와 운영법을 한눈에 확인할 수 있는 팁을 제공합니다.",
    'disclaimer': "WhatChampToPlay는 Riot Games의 승인을 받지 않았으며 Riot Games의 견해나 의견을 반영하지 않습니다.",
    'pinball-mode': '모드:',
    'pinball-mode-first': '처음 떨어진게 당첨',
    'pinball-mode-last': '가장 나중에 떨어진게 당첨',
    'pinball-balls': '공 개수:',
    'team-names-label': '이름 입력 (한 줄에 한 명씩):'
  }
};

let currentState = {
  version: null,
  locale: CONFIG.DEFAULT_LOCALE,
  champions: [],
  selectedRole: null,
  theme: localStorage.getItem('theme') || 'dark'
};

const MISSIONS = {
  'en_US': [
    "Ultimate Bravery: Use a random item build generator",
    "No Flash: Take Ghost/Ignite instead",
    "Support Item Only: Start with a support item in a carry role",
    "Protect the President: Everyone must peel for one person",
    "Alphabet Jungle: Clear camps in alphabetical order",
    "No Backing: Don't recall until you die",
    "Invade Only: Level 1 invade regardless of comp",
    "Silent Gaming: No pings or chat allowed",
    "River Shen: Play Shen, stay in river",
    "Yordle Team: Only play Yordle champions"
  ],
  'ko_KR': [
    "얼티밋 브레이버리: 랜덤 아이템 빌드 사용하기",
    "노 점멸: 유체화/점화 들고 게임하기",
    "서폿템 스타트: 라이너지만 서폿템으로 시작하기",
    "VIP 지키기: 한 명을 정해서 끝까지 지키기",
    "가나다 정글링: 정글 몹을 가나다 순으로 사냥하기",
    "노 집타임: 죽기 전까지 귀환 금지",
    "무조건 인베: 조합 상관없이 1렙 인베 가기",
    "침묵의 게임: 핑, 채팅 금지",
    "리버 쉔: 쉔 픽하고 강에서만 살기",
    "요들 팀: 요들 챔피언으로만 팀 구성하기"
  ]
};

async function init() {
  setLocale();
  applyTheme();
  updateUIText();
  
  try {
    showLoading(true);
    await fetchLatestVersion();
    await fetchChampions();
    setupEventListeners();
    initPinball();
    initLadder();
    initTeamSplitter();
    initMissionGenerator();
    initBracketGenerator();
    initFocusMode();
  } catch (error) {
    console.error('Failed to initialize app:', error);
  } finally {
    showLoading(false);
  }
}

function setLocale() {
  const browserLang = navigator.language.split('-')[0];
  currentState.locale = CONFIG.LOCALES[browserLang] || CONFIG.DEFAULT_LOCALE;
  document.documentElement.lang = browserLang;
}

function updateUIText() {
  const elements = document.querySelectorAll('[data-i18n]');
  const strings = TRANSLATIONS[currentState.locale];
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (strings[key]) el.textContent = strings[key];
  });

  const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
  placeholders.forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (strings[key]) el.placeholder = strings[key];
  });
}

function applyTheme() {
  document.documentElement.setAttribute('data-theme', currentState.theme);
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.checked = currentState.theme === 'light';
  }
}

function toggleTheme() {
  currentState.theme = currentState.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', currentState.theme);
  applyTheme();
}

async function fetchLatestVersion() {
  const response = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
  const versions = await response.json();
  currentState.version = versions[0];
}

async function fetchChampions() {
  const url = `${CONFIG.DATA_DRAGON_BASE}/${currentState.version}/data/${currentState.locale}/champion.json`;
  const response = await fetch(url);
  const data = await response.json();
  currentState.champions = Object.values(data.data);
}

function setupEventListeners() {
  document.getElementById('theme-toggle')?.addEventListener('change', toggleTheme);

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });

  document.querySelectorAll('.role-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      pickRandomChampion(btn.getAttribute('data-role'));
    });
  });

  document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'reroll-btn') {
      if (currentState.selectedRole) pickRandomChampion(currentState.selectedRole);
    }
  });
}

function initFocusMode() {
  const overlay = document.querySelector('.focused-overlay');
  document.querySelectorAll('.tool-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'BUTTON' || e.target.tagName === 'SELECT') return;
      if (card.classList.contains('focused')) return;
      
      document.querySelectorAll('.tool-card').forEach(c => c.classList.remove('focused'));
      card.classList.add('focused');
      document.body.classList.add('has-focus');
    });
  });

  overlay.addEventListener('click', () => {
    document.querySelectorAll('.tool-card').forEach(c => c.classList.remove('focused'));
    document.body.classList.remove('has-focus');
  });
}

function initPinball() {
  const canvas = document.getElementById('pinball-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const startBtn = document.getElementById('pinball-start');
  const input = document.getElementById('pinball-input');
  const modeSelect = document.getElementById('pinball-mode-select');
  const ballCountInput = document.getElementById('pinball-ball-count');
  
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => { ballCountInput.value = btn.dataset.count; });
  });

  let balls = [], pins = [], buckets = [], isRunning = false, finishedBalls = [];

  function setupBoard() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 350;
    pins = [];
    const rows = 10, spacingX = canvas.width / 12, spacingY = 28;
    for (let r = 0; r < rows; r++) {
      const offset = (r % 2) * (spacingX / 2);
      for (let c = 0; c < 13; c++) pins.push({ x: c * spacingX + offset, y: 50 + r * spacingY });
    }
  }

  function start() {
    if (isRunning) return;
    setupBoard();
    const opts = (input.value || "1, 2, 3, 4, 5").split(',').map(o => o.trim()).filter(o => o);
    if (opts.length === 0) return;
    
    buckets = opts.map((opt, i) => ({ text: opt, x: (i * canvas.width) / opts.length, width: canvas.width / opts.length }));
    const count = parseInt(ballCountInput.value) || 1;
    balls = Array.from({ length: count }, (_, i) => ({
      x: canvas.width / 2 + (Math.random() - 0.5) * 60, y: -20 - (i * 12),
      vx: (Math.random() - 0.5) * 4, vy: 2, radius: 6, finished: false,
      color: `hsl(${(i * 360 / count) % 360}, 70%, 60%)`
    }));
    
    finishedBalls = [];
    isRunning = true;
    animate();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#c89b3c';
    pins.forEach(p => { ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI * 2); ctx.fill(); });
    
    buckets.forEach(b => {
      ctx.strokeStyle = '#c89b3c'; ctx.strokeRect(b.x, canvas.height - 45, b.width, 45);
      ctx.fillStyle = currentState.theme === 'dark' ? '#f0e6d2' : '#333';
      ctx.font = 'bold 12px Spiegel'; ctx.textAlign = 'center';
      ctx.fillText(b.text.substring(0, 10), b.x + b.width / 2, canvas.height - 18);
    });

    let allDone = true;
    balls.forEach(ball => {
      if (ball.finished) return;
      allDone = false;
      ball.vy += 0.3; ball.x += ball.vx; ball.y += ball.vy;
      
      pins.forEach(p => {
        const dx = ball.x - p.x, dy = ball.y - p.y, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < ball.radius + 3) {
          const angle = Math.atan2(dy, dx);
          const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy) * 0.85;
          ball.vx = Math.cos(angle) * speed + (Math.random() - 0.5) * 2.5;
          ball.vy = Math.sin(angle) * speed;
          ball.y += ball.vy; // Prevent sticking
        }
      });

      if (ball.x < ball.radius || ball.x > canvas.width - ball.radius) { ball.vx *= -0.7; ball.x = ball.x < ball.radius ? ball.radius : canvas.width - ball.radius; }
      
      ctx.fillStyle = ball.color; ctx.beginPath(); ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2); ctx.fill();
      
      if (ball.y > canvas.height - 25) {
        ball.finished = true;
        const bucket = buckets.find(b => ball.x >= b.x && ball.x <= b.x + b.width);
        finishedBalls.push({ ball, bucket });
      }
    });

    if (!allDone) requestAnimationFrame(animate);
    else {
      isRunning = false;
      const winner = modeSelect.value === 'first' ? finishedBalls[0] : finishedBalls[finishedBalls.length - 1];
      if (winner) alert('WINNER: ' + winner.bucket.text);
    }
  }

  startBtn.addEventListener('click', start);
  window.addEventListener('resize', setupBoard);
  setupBoard();
}

function initLadder() {
  const canvas = document.getElementById('ladder-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const startBtn = document.getElementById('ladder-start');
  const pInput = document.getElementById('ladder-players-input'), rInput = document.getElementById('ladder-results-input');

  function run() {
    const players = (pInput.value || "A, B, C, D").split(',').map(s => s.trim()).filter(s => s);
    const results = (rInput.value || "1, 2, 3, 4").split(',').map(s => s.trim()).filter(s => s);
    const count = Math.min(players.length, results.length);
    if (count < 2) return;

    canvas.width = canvas.parentElement.clientWidth; canvas.height = 350;
    const spacing = canvas.width / (count + 1), lines = [];
    for (let i = 0; i < count - 1; i++) {
      for (let j = 0; j < 4; j++) lines.push({ from: i, to: i + 1, y: 70 + Math.random() * 200 });
    }

    let progress = 0;
    function animateLadder() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#c89b3c'; ctx.lineWidth = 2;
      for (let i = 0; i < count; i++) {
        const x = spacing * (i + 1);
        ctx.beginPath(); ctx.moveTo(x, 50); ctx.lineTo(x, 300); ctx.stroke();
        ctx.fillStyle = '#f0e6d2'; ctx.font = 'bold 14px Spiegel'; ctx.textAlign = 'center';
        ctx.fillText(players[i], x, 40); ctx.fillText(results[i], x, 320);
      }
      lines.forEach(l => {
        ctx.beginPath(); ctx.moveTo(spacing * (l.from + 1), l.y); ctx.lineTo(spacing * (l.to + 1), l.y); ctx.stroke();
      });

      progress += 0.01;
      if (progress < 1) requestAnimationFrame(animateLadder);
      else {
        // Trace paths for results
        players.forEach((_, idx) => {
          let currX = idx, currY = 50;
          ctx.strokeStyle = `hsl(${idx * 360 / count}, 70%, 60%)`; ctx.lineWidth = 4;
          ctx.beginPath(); ctx.moveTo(spacing * (currX + 1), currY);
          const sortedLines = [...lines].sort((a, b) => a.y - b.y);
          sortedLines.forEach(l => {
            if (l.from === currX) { ctx.lineTo(spacing * (currX + 1), l.y); currX = l.to; ctx.lineTo(spacing * (currX + 1), l.y); }
            else if (l.to === currX) { ctx.lineTo(spacing * (currX + 1), l.y); currX = l.from; ctx.lineTo(spacing * (currX + 1), l.y); }
          });
          ctx.lineTo(spacing * (currX + 1), 300); ctx.stroke();
        });
      }
    }
    animateLadder();
  }
  startBtn.addEventListener('click', run);
}

function initTeamSplitter() {
  const btn = document.getElementById('team-start');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const names = document.getElementById('team-input').value.split('\n').map(n => n.trim()).filter(n => n);
    const teamCount = parseInt(document.getElementById('team-count').value);
    if (names.length === 0) return;
    const teams = Array.from({ length: teamCount }, () => []), shuffled = names.sort(() => Math.random() - 0.5);
    shuffled.forEach((n, i) => teams[i % teamCount].push(n));
    const res = document.getElementById('team-results'); res.innerHTML = '';
    teams.forEach((t, i) => {
      const b = document.createElement('div'); b.className = 'team-box';
      b.innerHTML = `<h3>Team ${i + 1}</h3><ul>${t.map(n => `<li>${n}</li>`).join('')}</ul>`;
      res.appendChild(b);
    });
  });
}

function initMissionGenerator() {
  const btn = document.getElementById('mission-start');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const card = document.getElementById('mission-display'), txt = document.getElementById('mission-text');
    card.classList.remove('active'); void card.offsetWidth; card.classList.add('active');
    const missions = MISSIONS[currentState.locale] || MISSIONS['en_US'];
    txt.textContent = missions[Math.floor(Math.random() * missions.length)];
    document.querySelector('.mission-icon').textContent = "!";
  });
}

function initBracketGenerator() {
  const btn = document.getElementById('bracket-start');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const names = document.getElementById('bracket-input').value.split('\n').map(n => n.trim()).filter(n => n);
    if (names.length !== 4 && names.length !== 8) return alert("Enter 4 or 8 names.");
    const shuffled = names.sort(() => Math.random() - 0.5), display = document.getElementById('bracket-display');
    let html = '<div class="bracket-round">';
    for (let i = 0; i < shuffled.length; i += 2) html += `<div class="matchup"><span class="player-name">${shuffled[i]}</span><span class="player-name">${shuffled[i+1]}</span></div>`;
    html += '</div><div class="bracket-round">';
    for (let i = 0; i < shuffled.length / 2; i += 2) html += `<div class="matchup"><span class="player-name">Winner ${i+1}</span><span class="player-name">Winner ${i+2}</span></div>`;
    html += '</div>';
    if (shuffled.length === 8) html += '<div class="bracket-round"><div class="matchup"><span class="player-name">Champion</span></div></div>';
    display.innerHTML = html;
  });
}

const ROLE_OVERRIDES = {
  'TOP': ['Aatrox', 'Camille', 'Chogath', 'Darius', 'DrMundo', 'Fiora', 'Gangplank', 'Garen', 'Gnar', 'Gwen', 'Illaoi', 'Irelia', 'Jax', 'Jayce', 'KSante', 'Kayle', 'Kennen', 'Kled', 'Malphite', 'Mordekaiser', 'Nasus', 'Olaf', 'Ornn', 'Pantheon', 'Poppy', 'Quinn', 'Renekton', 'Riven', 'Rumble', 'Sett', 'Shen', 'Singed', 'Sion', 'Teemo', 'Tryndamere', 'Urgot', 'Vayne', 'Volibear', 'Warwick', 'Yorick'],
  'JUNGLE': ['Amumu', 'Belveth', 'Briar', 'Diana', 'Ekko', 'Elise', 'Evelynn', 'Fiddlesticks', 'Graves', 'Hecarim', 'Ivern', 'JarvanIV', 'Jax', 'Karthus', 'Kayn', 'Khazix', 'Kindred', 'LeeSin', 'Lillia', 'MasterYi', 'Nidalee', 'Nocturne', 'Nunu', 'Olaf', 'Rammus', 'RekSai', 'Rengar', 'Sejuani', 'Shaco', 'Shyvana', 'Skarner', 'Taliyah', 'Talon', 'Trundle', 'Udyr', 'Vi', 'Viego', 'Volibear', 'Warwick', 'MonkeyKing', 'XinZhao', 'Zac'],
  'MIDDLE': ['Ahri', 'Akali', 'Akshan', 'Anivia', 'Annie', 'AurelionSol', 'Azir', 'Cassiopeia', 'Corki', 'Diana', 'Ekko', 'Fizz', 'Galio', 'Hwei', 'Irelia', 'Kassadin', 'Katarina', 'Leblanc', 'Lissandra', 'Lux', 'Malzahar', 'Naafiri', 'Neeko', 'Orianna', 'Pantheon', 'Qiyana', 'Ryze', 'Sylas', 'Syndra', 'Taliyah', 'Talon', 'TwistedFate', 'Veigar', 'Vex', 'Viktor', 'Vladimir', 'Yasuo', 'Yone', 'Zed', 'Zoe'],
  'BOTTOM': ['Aphelios', 'Ashe', 'Caitlyn', 'Draven', 'Ezreal', 'Jhin', 'Jinx', 'Kaisa', 'Kalista', 'KogMaw', 'Lucian', 'MissFortune', 'Nilah', 'Samira', 'Sivir', 'Smolder', 'Tristana', 'Twitch', 'Varus', 'Vayne', 'Xayah', 'Zeri'],
  'UTILITY': ['Alistar', 'Bard', 'Blitzcrank', 'Brand', 'Braum', 'Karma', 'Leona', 'Lulu', 'Lux', 'Milio', 'Morgana', 'Nami', 'Nautilus', 'Pyke', 'Rakan', 'Rell', 'Renata', 'Senna', 'Seraphine', 'Sona', 'Soraka', 'Swain', 'Taric', 'Thresh', 'Xerath', 'Yuumi', 'Zilean', 'Zyra']
};

async function pickRandomChampion(role) {
  currentState.selectedRole = role; showLoading(true);
  let filtered = currentState.champions.filter(c => ROLE_OVERRIDES[role]?.includes(c.id));
  if (filtered.length === 0) filtered = currentState.champions;
  await displayChampion(filtered[Math.floor(Math.random() * filtered.length)].id);
}

async function displayChampion(id) {
  try {
    const res = await fetch(`${CONFIG.DATA_DRAGON_BASE}/${currentState.version}/data/${currentState.locale}/champion/${id}.json`), data = await res.json(), champ = data.data[id];
    document.getElementById('champ-name').textContent = champ.name; document.getElementById('champ-title').textContent = champ.title;
    document.getElementById('champ-splash').src = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg`;
    const list = document.getElementById('champ-tips-list'); list.innerHTML = '';
    (champ.allytips.length ? champ.allytips : [champ.blurb]).slice(0, 3).forEach(t => { const li = document.createElement('li'); li.textContent = t; list.appendChild(li); });
    document.getElementById('result-area').classList.remove('hidden'); document.getElementById('result-area').scrollIntoView({ behavior: 'smooth' });
  } finally { showLoading(false); }
}

function showLoading(show) { const el = document.getElementById('loading'); if (el) el.classList.toggle('hidden', !show); }

init();
