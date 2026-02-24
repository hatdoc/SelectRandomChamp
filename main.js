const CONFIG = {
  DEFAULT_LOCALE: 'en_US',
  LOCALES: { 'en': 'en_US', 'ko': 'ko_KR' },
  DATA_DRAGON_BASE: 'https://ddragon.leagueoflegends.com/cdn'
};

const TRANSLATIONS = {
  'en_US': {
    'toolkit-title': 'STREAMER TOOLKIT', 'tab-randomizer': 'Randomizer', 'tab-toolkit': 'Tools', 'tab-mission': 'Missions',
    'pinball-title': '텐션업 핀볼', 'ladder-title': 'Ghost Leg', 'team-title': '팀짜기',
    'start-btn': 'Start', 'split-btn': 'Analyze', 'reroll-btn': 'Roll Again', 'options-placeholder': 'A, B, C, D...',
    'fortune-title': 'Today\'s Fortune', 'fortune-btn': 'Check Fortune'
  },
  'ko_KR': {
    'toolkit-title': '스트리머 툴킷', 'tab-randomizer': '챔피언 추천', 'tab-toolkit': '도구 모음', 'tab-mission': '미션 생성기',
    'pinball-title': '텐션업 핀볼', 'ladder-title': '사다리 타기', 'team-title': '팀짜기 (밸런스)',
    'start-btn': '시작하기', 'split-btn': '밸런스 계산', 'reroll-btn': '다시 뽑기', 'options-placeholder': '옵션들을 입력하세요 (쉼표 구분)',
    'fortune-title': '오늘의 운세', 'fortune-btn': '운세 확인'
  }
};

const MISSION_DATA = {
  'actions': {
    'ko_KR': ["게임 승리", "솔로킬 1회 이상", "오브젝트(용/바론) 스틸", "적 팀보다 높은 딜량", "노데스로 경기 종료", "퍼스트 블러드 따내기", "제어 와드 5개 이상 설치", "상대 라이너와 CS 30개 차이", "전체 데스 3회 이하 유지"],
    'en_US': ["Win the game", "At least 1 Solokill", "Objective (Dragon/Baron) Steal", "Highest Damage in match", "Zero Death Game", "Get First Blood", "Place 5+ Control Wards", "30+ CS Gap with opponent", "Under 3 Deaths total"]
  },
  'targets': {
    'ko_KR': ["영어 한 마디도 안 하기", "영어만 사용하기 (교포 방송)", "죽을 때마다 애교/벌칙 수행", "20분 안에 게임 끝내기", "성공 시 시청자에게 치킨", "한 손으로만 게임하기", "성공 시 노래 한 곡 완창", "실패 시 다음 판 서포터", "성공 시 룰렛 10번 돌리기"],
    'en_US': ["No English Challenge", "English Only Challenge", "Penalty on every death", "Finish game before 20m", "Giveaway on success", "One-hand play challenge", "Sing a song on success", "If failed, play Supp next", "Spin roulette 10x on success"]
  }
};

const FORTUNES = {
  'en_US': [
    "You will lose your next game, but it's not your fault. It's the jungler.",
    "Fortune: Beware of the keyboard. Repair costs are rising.",
    "A legendary skin is in your future... but for a champion you don't play.",
    "Warning: Someone is behind you. Oh, it's just a mirror.",
    "Item of the day: Control Ward. But you probably won't buy it.",
    "You will carry the game, but your team will still find a way to lose.",
    "Luck: 100%. Skill: 0%. You'll fit right in on Reddit.",
    "Run away. Right now.",
    "Your future is bright. Unlike your teammate's brain.",
    "Fortune: You will hit every skillshot... in your dreams.",
    "A surprise is waiting for you at home. It's probably bills.",
    "You will find money on the street today. Specifically, a 10-won coin.",
    "Today is your lucky day! For someone else, not you.",
    "You will meet the love of your life today. They will be NPCs.",
    "Fortune: You will be hungry again in 3 hours.",
    "Expect a phone call. It's a scammer, but at least someone wants to talk to you.",
    "Your hard work will pay off... eventually. Maybe in the next life.",
    "You will wake up tomorrow feeling like you need more sleep.",
    "Someone is thinking about you. It's your bank, reminding you of your balance.",
    "You are talented, intelligent, and wise. Wrong app, sorry.",
    "Today's advice: If you can't convince them, confuse them.",
    "Great fortune! You will find a forgotten 10-dollar bill in your old jacket.",
    "Your next Hextech chest will contain a Mythic skin!",
    "Today, everyone you meet will be exceptionally kind to you.",
    "Success is coming. Just keep doing what you're doing.",
    "You are the main character today. Enjoy the spotlight!"
  ],
  'ko_KR': [
    "오늘의 행운: 게임에서 지겠지만 실력 탓은 아닙니다. 팀운입니다.",
    "오늘의 주의: 키보드 샷건 조심하세요. 수리비가 더 많이 나옵니다.",
    "운세: 당신의 뒤에 누군가 있습니다. 아, 거울이군요.",
    "오늘의 아이템: 핑크 와드. 근데 당신은 안 사겠죠.",
    "행운: 오늘 랭크 게임을 안 돌리면 티어 점수를 유지할 수 있습니다.",
    "주의: 마우스 클릭이 평소보다 0.1초 늦어질 운명입니다. 핑 탓 하세요.",
    "운세: 최악. 하지만 내일은 더 안 좋을 수도 있습니다.",
    "당신의 미래: 오늘 밤 야식이 아주 맛있을 예정입니다. 0칼로리는 아닙니다.",
    "오늘의 행운의 아이템: 남이 쓰다 버린 껌.",
    "오늘의 운세: 0데스 실화입니까? 네, 우물에서 안 나가셨군요.",
    "주의: 오늘 당신의 서포터는 CS를 당신보다 더 잘 먹을 예정입니다.",
    "행운: 적 팀에 당신보다 못하는 사람이 딱 한 명 있습니다. 물론 찾기 힘들 겁니다.",
    "운세: 오늘 연패 탈출의 기회가 보입니다. 아, 방금 사라졌네요. 까비.",
    "팁: 오늘 게임이 계속 안 풀린다면 모니터를 끄고 잠을 자는 것이 인생에 이득입니다.",
    "역시 이상호",
    "오늘의 운세: 대길(大吉)! 하지만 당신의 지갑은 대흉(大凶).",
    "행운의 메시지: 당신은 혼자가 아닙니다. 당신의 빚이 늘 곁에 있으니까요.",
    "오늘의 날씨: 맑음. 하지만 당신의 앞날은 흐림.",
    "운세: 모르는 번호로 전화가 오면 받지 마세요. 인생의 진리를 깨닫게 될 겁니다 (광고임).",
    "당신의 운명: 오늘 편의점에 가면 사고 싶은 물건이 딱 하나 부족할 겁니다.",
    "주의: 오늘 당신이 본 첫 번째 고양이는 당신을 무시할 겁니다. 평소랑 같네요.",
    "오늘의 행운: 길에서 500원을 줍게 됩니다. 하지만 600원짜리 물건을 사고 싶어질 겁니다.",
    "당신이 오늘 가장 많이 할 말: '아... 진짜...'",
    "행운의 색: 투명색. 아무것도 안 보인다면 정상입니다.",
    "오늘의 조언: 숨을 쉬세요. 안 쉬면 죽습니다.",
    "로또를 사보세요. 누군가는 당첨되겠죠. 당신은 아님.",
    "오늘의 패션: 이불. 밖은 위험합니다.",
    "당신의 미래: 아주 밝습니다. 너무 밝아서 눈이 부셔 아무것도 안 보일 정도입니다.",
    "오늘의 깨달음: 돈으로 행복을 살 순 없지만, 자전거 위에서 우는 것보단 페라리 안에서 우는 게 낫습니다.",
    "운세: 오늘 당신의 드립은 아무도 웃기지 못할 예정입니다.",
    "초대박 운세: 오늘 당신이 하는 모든 일이 성공할 것입니다. 숨만 쉬어도 이득!",
    "기쁜 소식: 오랫동안 기다려온 연락이 오늘 드디어 옵니다.",
    "행운의 예감: 오늘 산 복권이 5등은 당첨될 것 같습니다.",
    "당신의 매력: 오늘따라 당신의 미소가 아주 치명적입니다. 거울을 보세요.",
    "보너스: 오늘 야식을 먹어도 몸무게가 변하지 않는 마법 같은 일이 일어납니다.",
    "도망가세요. 지금 당장.",
    "운세: 오늘 팀에 트롤이 없을 확률이 99%입니다. 남은 1%는 당신일 수도?",
    "행운: 오늘 첫 판을 이기면 연승 가도를 달릴 수 있습니다. 지면? 그냥 자야죠.",
    "조언: 오늘 게임 중 누군가 당신을 욕한다면 '역시 이상호'라고 대답하세요. 분위기가 묘해질 겁니다."
  ]
};

let currentState = { 
  version: null, 
  locale: CONFIG.DEFAULT_LOCALE, 
  champions: [], 
  selectedRole: null, 
  theme: localStorage.getItem('theme') || 'dark',
  currentSkins: [],
  skinIndex: 0,
  currentChampId: null
};

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
    setupEventListeners(); initPinball(); initLadder(); initTeamSplitter(); initFocusMode(); initFortuneTool(); initMissionRoulette();
  } catch (e) { console.error(e); }
  finally { showLoading(false); }
}

function setLocale() { const lang = navigator.language.split('-')[0]; currentState.locale = CONFIG.LOCALES[lang] || CONFIG.DEFAULT_LOCALE; document.documentElement.lang = lang; }
function updateUIText() {
  document.querySelectorAll('[data-i18n]').forEach(el => { const key = el.getAttribute('data-i18n'); if (TRANSLATIONS[currentState.locale][key]) el.textContent = TRANSLATIONS[currentState.locale][key]; });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { const key = el.getAttribute('data-i18n-placeholder'); if (TRANSLATIONS[currentState.locale][key]) el.placeholder = TRANSLATIONS[currentState.locale][key]; });
}
function applyTheme() { 
  document.documentElement.setAttribute('data-theme', currentState.theme); 
  const btn = document.getElementById('theme-toggle'); 
  if (btn) btn.checked = currentState.theme === 'light'; 
}
function toggleTheme() { currentState.theme = currentState.theme === 'dark' ? 'light' : 'dark'; localStorage.setItem('theme', currentState.theme); applyTheme(); }

async function fetchLatestVersion() { 
  try {
    const res = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
    const v = await res.json();
    currentState.version = v[0];
  } catch(e) { currentState.version = "14.4.1"; }
}
async function fetchChampions() { 
  try {
    const res = await fetch(`${CONFIG.DATA_DRAGON_BASE}/${currentState.version}/data/${currentState.locale}/champion.json`);
    const data = await res.json();
    currentState.champions = Object.values(data.data);
  } catch(e) { console.error(e); }
}

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
  document.addEventListener('click', e => { 
    if (e.target.id === 'reroll-btn' && currentState.selectedRole) pickRandomChampion(currentState.selectedRole);
    if (e.target.classList.contains('prev')) changeSkin(-1);
    if (e.target.classList.contains('next')) changeSkin(1);
  });
}

function showBigResult(title, text) {
  const el = document.getElementById('big-result-overlay');
  document.getElementById('result-title').textContent = title;
  document.getElementById('result-text').innerText = text;
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

function initPinball() {
  const canvas = document.getElementById('pinball-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d'), startBtn = document.getElementById('pinball-start'), input = document.getElementById('pinball-input');
  let balls = [], pins = [], spinners = [], isRunning = false;
  const gravity = 0.1, friction = 0.998, bounciness = 0.75;

  function setup() {
    pins = []; spinners = [];
    canvas.width = canvas.parentElement.clientWidth; canvas.height = canvas.parentElement.clientHeight || 450;
    const rows = 12, spacingX = canvas.width / 14, spacingY = 25;
    for (let r = 0; r < rows; r++) {
      const offset = (r % 2) * (spacingX / 2);
      for (let c = 0; c < 15; c++) {
        const x = c * spacingX + offset, y = 80 + r * spacingY;
        if (r > 2 && r < rows - 2 && c % 4 === 0 && Math.random() > 0.5) spinners.push({ x, y, angle: 0, speed: 0.05 + Math.random() * 0.05, length: 40 });
        else pins.push({ x, y });
      }
    }
  }

  startBtn.addEventListener('click', () => {
    if (isRunning) return;
    const opts = (input.value || "A,B,C,D").split(',').map(o => o.trim()).filter(o => o);
    if (!opts.length) return;
    focusTool('pinball-tool'); setup(); isRunning = true;
    balls = [];
    
    const tempBalls = [];
    opts.forEach((opt, i) => {
      for(let j=0; j<30; j++) {
        tempBalls.push({ label: opt, color: `hsl(${(i * 360 / opts.length)}, 70%, 60%)` });
      }
    });
    
    for (let i = tempBalls.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tempBalls[i], tempBalls[j]] = [tempBalls[j], tempBalls[i]];
    }

    balls = tempBalls.map((b, i) => ({
      x: canvas.width / 2 + (Math.random() - 0.5) * 80, 
      y: -20 - (i * 15), 
      r: 8, label: b.label, color: b.color,
      vx: (Math.random() - 0.5) * 3, vy: 1, finished: false
    }));

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#c89b3c'; pins.forEach(p => { ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, Math.PI * 2); ctx.fill(); });
      ctx.strokeStyle = '#00cfbc'; ctx.lineWidth = 3;
      spinners.forEach(s => {
        s.angle += s.speed;
        const x1 = s.x + Math.cos(s.angle) * 20, y1 = s.y + Math.sin(s.angle) * 20;
        const x2 = s.x - Math.cos(s.angle) * 20, y2 = s.y - Math.sin(s.angle) * 20;
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      });

      let active = 0;
      balls.forEach(b => {
        if (b.finished) return; active++;
        b.vy += gravity; b.x += b.vx; b.y += b.vy;
        
        pins.forEach(p => {
          const dx = b.x - p.x, dy = b.y - p.y, dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < b.r + 2) {
            const angle = Math.atan2(dy, dx), speed = Math.sqrt(b.vx*b.vx + b.vy*b.vy);
            b.vx = Math.cos(angle) * speed * bounciness + (Math.random()-0.5);
            b.vy = Math.sin(angle) * speed * bounciness; b.y += b.vy;
          }
        });

        spinners.forEach(s => {
          const x1 = s.x + Math.cos(s.angle) * 20, y1 = s.y + Math.sin(s.angle) * 20;
          const x2 = s.x - Math.cos(s.angle) * 20, y2 = s.y - Math.sin(s.angle) * 20;
          const l2 = 40 * 40;
          const t = Math.max(0, Math.min(1, ((b.x - x1) * (x2 - x1) + (b.y - y1) * (y2 - y1)) / l2));
          const closestX = x1 + t * (x2 - x1), closestY = y1 + t * (y2 - y1);
          const dx = b.x - closestX, dy = b.y - closestY, dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < b.r + 2) {
            const nx = dx / dist, ny = dy / dist;
            const dot = b.vx * nx + b.vy * ny;
            b.vx = (b.vx - 2 * dot * nx) * bounciness + (Math.random() - 0.5) * 4;
            b.vy = (b.vy - 2 * dot * ny) * bounciness - 2;
            b.x = closestX + nx * (b.r + 3); b.y = closestY + ny * (b.r + 3);
          }
        });

        if (b.x < b.r || b.x > canvas.width - b.r) { b.vx *= -0.7; b.x = b.x < b.r ? b.r : canvas.width - b.r; }
        if (b.y > canvas.height - 10) { b.finished = true; b.finishTime = Date.now(); }
        ctx.fillStyle = b.color; ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#fff"; ctx.font = "bold 9px Spiegel"; ctx.textAlign = "center";
        ctx.fillText(b.label.substring(0, 3), b.x, b.y + 3);
      });
      if (active > 0) requestAnimationFrame(loop);
      else { isRunning = false; const last = balls.reduce((p, c) => p.finishTime > c.finishTime ? p : c); showBigResult("THE FINAL WINNER", last.label); }
    }
    loop();
  });
  window.addEventListener('resize', setup); setTimeout(setup, 500);
}

function initLadder() {
  const canvas = document.getElementById('ladder-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d'), startBtn = document.getElementById('ladder-start'), skipBtn = document.getElementById('ladder-skip');
  const pIn = document.getElementById('ladder-players-input'), rIn = document.getElementById('ladder-results-input');

  let isRunning = false, isSkipped = false;

  function drawInitial() {
    canvas.width = canvas.parentElement.clientWidth; canvas.height = 400;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#c89b3c'; ctx.lineWidth = 2;
    const spacing = canvas.width / 3;
    for(let i=1; i<=2; i++) {
      const x = spacing * i; ctx.beginPath(); ctx.moveTo(x, 50); ctx.lineTo(x, 350); ctx.stroke();
      ctx.fillStyle = '#f0e6d2'; ctx.font = 'bold 14px Spiegel'; ctx.textAlign = 'center';
      ctx.fillText("Player " + i, x, 40); ctx.fillText("Result " + i, x, 370);
    }
  }

  startBtn.addEventListener('click', () => {
    if (isRunning) return;
    const players = (pIn.value || "A,B,C,D,E").split(',').map(s => s.trim()).filter(s => s);
    const results = (rIn.value || "1,2,3,4,5").split(',').map(s => s.trim()).filter(s => s);
    const count = Math.min(players.length, results.length); if (count < 2) return;
    
    focusTool('ladder-tool'); isRunning = true; isSkipped = false;
    skipBtn.classList.remove('hidden');
    
    const spacing = canvas.width / (count + 1), lines = [];
    for (let i = 0; i < count - 1; i++) { for (let j = 0; j < 15; j++) lines.push({ from: i, to: i + 1, y: 70 + Math.random() * 270 }); }
    const sortedLines = [...lines].sort((a,b) => a.y - b.y);
    
    let pathIdx = 0;
    function finish() { 
      isRunning = false; skipBtn.classList.add('hidden'); 
      const summary = players.map((p, i) => {
        let cx = i;
        sortedLines.forEach(l => {
          if (l.from === cx) cx = l.to;
          else if (l.to === cx) cx = l.from;
        });
        return `${p}: ${results[cx]}`;
      }).join('\n');
      showBigResult("LADDER RESULTS", summary); 
    }

    function revealPath() {
      if (isSkipped) { drawAllPaths(); return; }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawStatic(players, results, count, spacing, lines, pathIdx);
      let currX = pathIdx, currY = 60;
      let pathPoints = [{x: spacing * (currX + 1), y: currY}];
      sortedLines.forEach(l => {
        if (l.from === currX) { pathPoints.push({x: spacing*(currX+1), y: l.y}); currX = l.to; pathPoints.push({x: spacing*(currX+1), y: l.y}); }
        else if (l.to === currX) { pathPoints.push({x: spacing*(currX+1), y: l.y}); currX = l.from; pathPoints.push({x: spacing*(currX+1), y: l.y}); }
      });
      pathPoints.push({x: spacing * (currX + 1), y: 350});
      let pointIdx = 0;
      function animateMarker() {
        if (isSkipped) return drawAllPaths();
        if (pointIdx < pathPoints.length - 1) {
          const start = pathPoints[pointIdx], end = pathPoints[pointIdx+1];
          let progress = 0;
          function drawMove() {
            if (isSkipped) return drawAllPaths();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawStatic(players, results, count, spacing, lines, pathIdx);
            ctx.strokeStyle = `hsl(${pathIdx * 360 / count}, 80%, 50%)`; ctx.lineWidth = 5;
            ctx.beginPath(); ctx.moveTo(pathPoints[0].x, pathPoints[0].y);
            for(let i=0; i<=pointIdx; i++) ctx.lineTo(pathPoints[i].x, pathPoints[i].y);
            const midX = start.x + (end.x - start.x) * progress, midY = start.y + (end.y - start.y) * progress;
            ctx.lineTo(midX, midY); ctx.stroke();
            ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(midX, midY, 6, 0, Math.PI*2); ctx.fill();
            progress += 0.06; if (progress < 1) requestAnimationFrame(drawMove); else { pointIdx++; animateMarker(); }
          }
          drawMove();
        } else {
          if (pathIdx < count - 1) { pathIdx++; setTimeout(revealPath, 1200); }
          else finish();
        }
      }
      animateMarker();
    }

    function drawStatic(players, results, count, spacing, lines, currentRevealIdx) {
      ctx.strokeStyle = '#c89b3c'; ctx.lineWidth = 2;
      for (let i = 0; i < count; i++) {
        const x = spacing * (i + 1); ctx.beginPath(); ctx.moveTo(x, 60); ctx.lineTo(x, 350); ctx.stroke();
        ctx.fillStyle = '#f0e6d2'; ctx.font = 'bold 14px Spiegel'; ctx.textAlign = 'center';
        ctx.fillText(players[i], x, 50); ctx.fillText(results[i], x, 370);
      }
      lines.forEach(l => { ctx.beginPath(); ctx.moveTo(spacing*(l.from+1), l.y); ctx.lineTo(spacing*(l.to+1), l.y); ctx.stroke(); });
      for(let p = 0; p < currentRevealIdx; p++) {
        let cx = p; ctx.strokeStyle = `hsl(${p * 360 / count}, 80%, 50%)`; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(spacing*(cx+1), 60);
        sortedLines.forEach(l => {
          if (l.from === cx) { ctx.lineTo(spacing*(cx+1), l.y); cx = l.to; ctx.lineTo(spacing*(cx+1), l.y); }
          else if (l.to === cx) { ctx.lineTo(spacing*(cx+1), l.y); cx = l.from; ctx.lineTo(spacing*(cx+1), l.y); }
        });
        ctx.lineTo(spacing*(cx+1), 350); ctx.stroke();
      }
    }

    function drawAllPaths() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.strokeStyle = '#c89b3c'; ctx.lineWidth = 2;
      for (let i = 0; i < count; i++) {
        const x = spacing * (i + 1); ctx.beginPath(); ctx.moveTo(x, 60); ctx.lineTo(x, 350); ctx.stroke();
        ctx.fillStyle = '#f0e6d2'; ctx.font = 'bold 14px Spiegel'; ctx.textAlign = 'center';
        ctx.fillText(players[i], x, 50); ctx.fillText(results[i], x, 370);
      }
      lines.forEach(l => { ctx.beginPath(); ctx.moveTo(spacing*(l.from+1), l.y); ctx.lineTo(spacing*(l.to+1), l.y); ctx.stroke(); });
      for(let p = 0; p < count; p++) {
        let cx = p; ctx.strokeStyle = `hsl(${p * 360 / count}, 80%, 50%)`; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(spacing*(cx+1), 60);
        sortedLines.forEach(l => {
          if (l.from === cx) { ctx.lineTo(spacing*(cx+1), l.y); cx = l.to; ctx.lineTo(spacing*(cx+1), l.y); }
          else if (l.to === cx) { ctx.lineTo(spacing*(cx+1), l.y); cx = l.from; ctx.lineTo(spacing*(cx+1), l.y); }
        });
        ctx.lineTo(spacing*(cx+1), 350); ctx.stroke();
      }
      finish();
    }
    revealPath();
  });
  skipBtn.addEventListener('click', () => isSkipped = true);
  window.addEventListener('resize', drawInitial); setTimeout(drawInitial, 500);
}

function initTeamSplitter() {
  const list = document.getElementById('team-pair-list'), addBtn = document.getElementById('add-pair-btn');
  function createRow() {
    const row = document.createElement('div'); row.className = 'team-pair-row';
    row.innerHTML = `
      <input type="text" class="pair-input" placeholder="BLUE">
      <button class="gap-btn">=</button>
      <input type="text" class="pair-input" placeholder="RED">
      <button class="swap-btn" title="Swap Names">⇄</button>
    `;
    
    row.querySelector('.gap-btn').addEventListener('click', e => {
      const ops = ['=', '>', '<']; 
      const curr = ops.indexOf(e.target.textContent); 
      e.target.textContent = ops[(curr + 1) % ops.length];
    });

    row.querySelector('.swap-btn').addEventListener('click', () => {
      const inputs = row.querySelectorAll('.pair-input');
      const temp = inputs[0].value;
      inputs[0].value = inputs[1].value;
      inputs[1].value = temp;
      
      const gapBtn = row.querySelector('.gap-btn');
      if (gapBtn.textContent === '>') gapBtn.textContent = '<';
      else if (gapBtn.textContent === '<') gapBtn.textContent = '>';
    });

    list.appendChild(row);
  }
  addBtn.addEventListener('click', createRow);
  for(let i=0; i<5; i++) createRow();
}

function initFortuneTool() {
  const startBtn = document.getElementById('fortune-start'), display = document.getElementById('fortune-text');
  if (!startBtn) return;
  startBtn.addEventListener('click', () => {
    const list = FORTUNES[currentState.locale] || FORTUNES['en_US'];
    const fortune = list[Math.floor(Math.random() * list.length)];
    display.style.opacity = 0;
    setTimeout(() => {
      display.textContent = fortune;
      display.style.opacity = 1;
      showBigResult(TRANSLATIONS[currentState.locale]['fortune-title'], fortune);
    }, 200);
  });
}

function initMissionRoulette() {
  const startBtn = document.getElementById('mission-start');
  if (!startBtn) return;

  function populateStrip(stripId, items, isInitial = false) {
    const strip = document.querySelector(`#${stripId} .roulette-strip`);
    strip.innerHTML = '';
    if (isInitial) {
      const div = document.createElement('div');
      div.className = 'roulette-item';
      div.textContent = '???';
      strip.appendChild(div);
      strip.style.transform = 'translateY(0)';
      return;
    }
    const repeated = [...items, ...items, ...items, ...items, ...items, ...items, ...items]; 
    repeated.forEach(item => {
      const div = document.createElement('div');
      div.className = 'roulette-item';
      div.textContent = item;
      strip.appendChild(div);
    });
  }

  populateStrip('roulette-champ', [], true);
  populateStrip('roulette-action', [], true);
  populateStrip('roulette-target', [], true);

  startBtn.addEventListener('click', () => {
    if (startBtn.disabled) return;
    startBtn.disabled = true;

    const champNames = currentState.champions.map(c => c.name);
    const actions = MISSION_DATA.actions[currentState.locale] || MISSION_DATA.actions['en_US'];
    const targets = MISSION_DATA.targets[currentState.locale] || MISSION_DATA.targets['en_US'];

    populateStrip('roulette-champ', champNames);
    populateStrip('roulette-action', actions);
    populateStrip('roulette-target', targets);

    const strips = [
      document.querySelector('#roulette-champ .roulette-strip'),
      document.querySelector('#roulette-action .roulette-strip'),
      document.querySelector('#roulette-target .roulette-strip')
    ];

    const spinDuration = 4000;

    const spinWheel = (idx) => {
      return new Promise(resolve => {
        const strip = strips[idx];
        const itemsCount = strip.children.length / 7;
        const targetIdx = Math.floor(Math.random() * itemsCount) + (itemsCount * 3);
        const offset = targetIdx * 120;
        
        strip.style.transition = 'none';
        strip.style.transform = 'translateY(0)';
        
        setTimeout(() => {
          strip.style.transition = `transform ${spinDuration / 1000}s cubic-bezier(0.1, 0, 0.1, 1)`;
          strip.style.transform = `translateY(-${offset}px)`;
          setTimeout(resolve, spinDuration + 100);
        }, 50);
      });
    };

    async function runSequence() {
      await spinWheel(0);
      await spinWheel(1);
      await spinWheel(2);
      startBtn.disabled = false;
    }

    runSequence();
  });
}

async function pickRandomChampion(role) {
  currentState.selectedRole = role; showLoading(true);
  try {
    const res = await fetch(`${CONFIG.DATA_DRAGON_BASE}/${currentState.version}/data/${currentState.locale}/champion.json`);
    const data = await res.json(), filtered = Object.values(data.data).filter(c => ROLE_OVERRIDES[role]?.includes(c.id));
    const champBase = (filtered.length ? filtered : Object.values(data.data))[Math.floor(Math.random() * (filtered.length || 1))];
    
    const fullRes = await fetch(`${CONFIG.DATA_DRAGON_BASE}/${currentState.version}/data/${currentState.locale}/champion/${champBase.id}.json`);
    const fullData = await fullRes.json();
    const champ = fullData.data[champBase.id];

    currentState.currentSkins = champ.skins;
    currentState.skinIndex = 0;
    currentState.currentChampId = champ.id;
    
    updateSkinDisplay(champ.id);
    document.getElementById('champ-name').textContent = champ.name;
    
    const voiceUrl = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-choose-vo/${champ.key}.ogg`;
    const audio = new Audio(voiceUrl);
    audio.volume = 0.5;
    audio.play().catch(e => console.log("Audio play blocked"));

    const opgg = document.getElementById('opgg-link'), lolps = document.getElementById('lolps-link');
    opgg.href = `https://www.op.gg/champions/${champ.id.toLowerCase()}/build`;
    lolps.href = `https://lol.ps/champion/${champ.key}`;

    document.getElementById('result-area').classList.remove('hidden');
    document.getElementById('result-area').scrollIntoView({ behavior: 'smooth' });
  } finally { showLoading(false); }
}

function updateSkinDisplay(champId) {
  const skin = currentState.currentSkins[currentState.skinIndex];
  const splash = document.getElementById('champ-splash');
  const nameDisplay = document.getElementById('skin-name');
  
  splash.style.opacity = 0;
  setTimeout(() => {
    splash.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champId}_${skin.num}.jpg`;
    nameDisplay.textContent = skin.name === 'default' ? document.getElementById('champ-name').textContent : skin.name;
    splash.style.opacity = 1;
  }, 200);
}

function changeSkin(dir) {
  if (!currentState.currentSkins.length) return;
  currentState.skinIndex = (currentState.skinIndex + dir + currentState.currentSkins.length) % currentState.currentSkins.length;
  updateSkinDisplay(currentState.currentChampId);
}

function showLoading(show) { document.getElementById('loading')?.classList.toggle('hidden', !show); }
init();
