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
    'ladder-placeholder': 'Names on top, results on bottom (comma separated)',
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
    'ladder-players': 'Players (Comma separated):',
    'ladder-results': 'Results (Comma separated):',
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
    'ladder-placeholder': '사람 이름들 / 결과들 (쉼표로 구분)',
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
    'ladder-players': '플레이어 (쉼표로 구분):',
    'ladder-results': '결과 (쉼표로 구분):',
    'team-names-label': '이름 입력 (한 줄에 한 명씩):'
  }
};

// State management
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

/**
 * Initialize the application
 */
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
    showLoading(false);
  } catch (error) {
    console.error('Failed to initialize app:', error);
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

  // Tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });

  // Roles
  document.querySelectorAll('.role-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      pickRandomChampion(btn.getAttribute('data-role'));
    });
  });

  // Reroll button - ensure it works even if dynamically shown
  document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'reroll-btn') {
      if (currentState.selectedRole) pickRandomChampion(currentState.selectedRole);
    }
  });
}

// Improved Pinball
function initPinball() {
  const canvas = document.getElementById('pinball-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const startBtn = document.getElementById('pinball-start');
  const input = document.getElementById('pinball-input');
  const modeSelect = document.getElementById('pinball-mode-select');
  const ballCountInput = document.getElementById('pinball-ball-count');
  
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      ballCountInput.value = btn.dataset.count;
    });
  });

  let animationId;
  let balls = [];
  let pins = [];
  let buckets = [];
  let isRunning = false;
  let finishedBalls = [];

  function setupBoard() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 300;
    pins = [];
    const rows = 9;
    const spacingX = canvas.width / 11;
    const spacingY = 25;
    
    for (let r = 0; r < rows; r++) {
      const offset = (r % 2) * (spacingX / 2);
      for (let c = 0; c < 12; c++) {
        pins.push({ x: c * spacingX + offset, y: 40 + r * spacingY });
      }
    }
  }

  function start(options) {
    if (isRunning) return;
    isRunning = true;
    setupBoard();
    finishedBalls = [];
    
    const opts = options.split(',').map(o => o.trim()).filter(o => o);
    if (opts.length === 0) { isRunning = false; return; }

    buckets = opts.map((opt, i) => ({
      text: opt,
      x: (i * canvas.width) / opts.length,
      width: canvas.width / opts.length
    }));

    const count = parseInt(ballCountInput.value) || 1;
    balls = [];
    for (let i = 0; i < count; i++) {
      balls.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 40,
        y: -10 - (i * 10), // Staggered entry
        vx: (Math.random() - 0.5) * 4,
        vy: 2 + Math.random() * 2,
        radius: 6,
        finished: false,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`
      });
    }

    animate();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw Pins
    ctx.fillStyle = currentState.theme === 'dark' ? '#c89b3c' : '#888';
    pins.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw Buckets
    buckets.forEach((b, i) => {
      ctx.strokeStyle = '#c89b3c';
      ctx.strokeRect(b.x, canvas.height - 40, b.width, 40);
      ctx.fillStyle = currentState.theme === 'dark' ? '#f0e6d2' : '#333';
      ctx.font = '12px Spiegel';
      ctx.textAlign = 'center';
      ctx.fillText(b.text.substring(0, 10), b.x + b.width / 2, canvas.height - 15);
    });

    let allFinished = true;
    const mode = modeSelect.value;

    balls.forEach(ball => {
      if (ball.finished) return;
      allFinished = false;

      // Update Physics
      ball.vy += 0.35; // Faster Gravity
      ball.x += ball.vx;
      ball.y += ball.vy;

      // Collisions with Pins
      pins.forEach(p => {
        const dx = ball.x - p.x;
        const dy = ball.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < ball.radius + 3) {
          const angle = Math.atan2(dy, dx);
          const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy) * 0.85;
          ball.vx = Math.cos(angle) * speed + (Math.random() - 0.5) * 2;
          ball.vy = Math.sin(angle) * speed;
        }
      });

      // Walls
      if (ball.x < ball.radius || ball.x > canvas.width - ball.radius) {
        ball.vx *= -0.8;
        ball.x = ball.x < ball.radius ? ball.radius : canvas.width - ball.radius;
      }

      // Draw Ball
      ctx.fillStyle = ball.color;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fill();

      // Check Finish
      if (ball.y > canvas.height - 20) {
        ball.finished = true;
        const winnerBucket = buckets.find(b => ball.x >= b.x && ball.x <= b.x + b.width);
        finishedBalls.push({ ball, bucket: winnerBucket });
      }
    });

    if (!allFinished) {
      animationId = requestAnimationFrame(animate);
    } else {
      isRunning = false;
      let finalResult;
      if (mode === 'first') {
        finalResult = finishedBalls[0]?.bucket?.text;
      } else {
        finalResult = finishedBalls[finishedBalls.length - 1]?.bucket?.text;
      }
      if (finalResult) alert('Result: ' + finalResult);
    }
  }

  startBtn.addEventListener('click', () => start(input.value || "1, 2, 3, 4, 5"));
  window.addEventListener('resize', setupBoard);
  setupBoard();
}

function initLadder() {
  const canvas = document.getElementById('ladder-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const startBtn = document.getElementById('ladder-start');
  const playersInput = document.getElementById('ladder-players-input');
  const resultsInput = document.getElementById('ladder-results-input');

  function run() {
    const players = (playersInput.value || "A, B, C, D").split(',').map(s => s.trim()).filter(s => s);
    const results = (resultsInput.value || "1, 2, 3, 4").split(',').map(s => s.trim()).filter(s => s);
    
    const count = Math.min(players.length, results.length);
    if (count < 2) return alert("Enter at least 2 players and results.");

    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 300;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const spacing = canvas.width / (count + 1);
    
    // Draw Vertical Lines
    for (let i = 0; i < count; i++) {
      const x = spacing * (i + 1);
      ctx.strokeStyle = '#c89b3c';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, 40);
      ctx.lineTo(x, 260);
      ctx.stroke();

      ctx.fillStyle = currentState.theme === 'dark' ? '#f0e6d2' : '#333';
      ctx.font = 'bold 14px Spiegel';
      ctx.textAlign = 'center';
      ctx.fillText(players[i], x, 30);
      ctx.fillText(results[i], x, 285);
    }

    // Draw Random Horizontal Bars
    ctx.lineWidth = 2;
    for (let i = 0; i < count - 1; i++) {
      const x1 = spacing * (i + 1);
      const x2 = spacing * (i + 2);
      for (let j = 0; j < 3; j++) {
        const y = 60 + Math.random() * 180;
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.stroke();
      }
    }
  }

  startBtn.addEventListener('click', run);
}

function initTeamSplitter() {
  const startBtn = document.getElementById('team-start');
  const input = document.getElementById('team-input');
  const countInput = document.getElementById('team-count');
  const resultArea = document.getElementById('team-results');

  if (!startBtn) return;

  startBtn.addEventListener('click', () => {
    const names = input.value.split('\n').map(n => n.trim()).filter(n => n);
    if (names.length === 0) return;

    const teamCount = parseInt(countInput.value);
    const shuffled = names.sort(() => Math.random() - 0.5);
    const teams = Array.from({ length: teamCount }, () => []);

    shuffled.forEach((name, i) => {
      teams[i % teamCount].push(name);
    });

    resultArea.innerHTML = '';
    teams.forEach((team, i) => {
      const box = document.createElement('div');
      box.className = 'team-box';
      box.innerHTML = `<h3>Team ${i + 1}</h3><ul>${team.map(n => `<li>${n}</li>`).join('')}</ul>`;
      resultArea.appendChild(box);
    });
  });
}

function initMissionGenerator() {
  const btn = document.getElementById('mission-start');
  const display = document.getElementById('mission-display');
  const text = document.getElementById('mission-text');
  const icon = document.querySelector('.mission-icon');

  if (!btn) return;

  btn.addEventListener('click', () => {
    display.classList.remove('active');
    void display.offsetWidth; // Trigger reflow
    display.classList.add('active');
    
    const missions = MISSIONS[currentState.locale] || MISSIONS['en_US'];
    const randomMission = missions[Math.floor(Math.random() * missions.length)];
    
    text.textContent = randomMission;
    icon.textContent = "!";
  });
}

function initBracketGenerator() {
  const btn = document.getElementById('bracket-start');
  const input = document.getElementById('bracket-input');
  const display = document.getElementById('bracket-display');

  if (!btn) return;

  btn.addEventListener('click', () => {
    const names = input.value.split('\n').map(n => n.trim()).filter(n => n);
    if (names.length !== 4 && names.length !== 8) {
      alert("Please enter exactly 4 or 8 names for a balanced bracket.");
      return;
    }

    const shuffled = names.sort(() => Math.random() - 0.5);
    let html = '';
    
    // Round 1
    html += '<div class="bracket-round">';
    for (let i = 0; i < shuffled.length; i += 2) {
      html += `
        <div class="matchup">
          <span class="player-name">${shuffled[i]}</span>
          <span class="player-name">${shuffled[i+1]}</span>
        </div>`;
    }
    html += '</div>';

    // Round 2 (Semi/Final)
    html += '<div class="bracket-round">';
    const nextRoundCount = shuffled.length / 2;
    for (let i = 0; i < nextRoundCount; i += 2) {
      html += `
        <div class="matchup">
          <span class="player-name">Winner ${i+1}</span>
          <span class="player-name">Winner ${i+2}</span>
        </div>`;
    }
    html += '</div>';

    // Final if 8 players
    if (shuffled.length === 8) {
      html += '<div class="bracket-round"><div class="matchup"><span class="player-name">Champion</span></div></div>';
    }

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
  currentState.selectedRole = role;
  showLoading(true);
  let filtered = currentState.champions.filter(c => ROLE_OVERRIDES[role]?.includes(c.id));
  if (filtered.length === 0) filtered = currentState.champions;
  const randomChamp = filtered[Math.floor(Math.random() * filtered.length)];
  await displayChampion(randomChamp.id);
}

async function displayChampion(championId) {
  try {
    const url = `${CONFIG.DATA_DRAGON_BASE}/${currentState.version}/data/${currentState.locale}/champion/${championId}.json`;
    const response = await fetch(url);
    const data = await response.json();
    const champion = data.data[championId];

    document.getElementById('champ-name').textContent = champion.name;
    document.getElementById('champ-title').textContent = champion.title;
    // Fix splash URL: Data Dragon splash images are in /cdn/img/champion/splash/
    document.getElementById('champ-splash').src = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championId}_0.jpg`;

    const tipsList = document.getElementById('champ-tips-list');
    tipsList.innerHTML = '';
    const tips = champion.allytips.length > 0 ? champion.allytips : [champion.blurb];
    tips.slice(0, 3).forEach(tip => {
      const li = document.createElement('li');
      li.textContent = tip;
      tipsList.appendChild(li);
    });

    document.getElementById('result-area').classList.remove('hidden');
    document.getElementById('result-area').scrollIntoView({ behavior: 'smooth' });
    showLoading(false);
  } catch (error) {
    console.error("Error displaying champion:", error);
    showLoading(false);
  }
}

function showLoading(isLoading) {
  const loadingEl = document.getElementById('loading');
  if (loadingEl) {
    if (isLoading) loadingEl.classList.remove('hidden');
    else loadingEl.classList.add('hidden');
  }
}

init();
