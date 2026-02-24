const CONFIG = {
  DEFAULT_LOCALE: 'en_US',
  LOCALES: { 'en': 'en_US', 'ko': 'ko_KR' },
  DATA_DRAGON_BASE: 'https://ddragon.leagueoflegends.com/cdn'
};

const TRANSLATIONS = {
  'en_US': {
    'toolkit-title': 'STREAMER TOOLKIT', 'tab-randomizer': 'Randomizer', 'tab-toolkit': 'Tools', 'tab-mission': 'Missions', 'tab-balance': 'Balance Game',
    'pinball-title': '텐션업 핀볼', 'ladder-title': 'Ghost Leg', 'team-title': '팀짜기',
    'start-btn': 'Start', 'split-btn': 'Analyze', 'reroll-btn': 'Roll Again', 'options-placeholder': 'A, B, C, D...',
    'fortune-title': 'Today\'s Fortune', 'fortune-btn': 'Check Fortune'
  },
  'ko_KR': {
    'toolkit-title': '스트리머 툴킷', 'tab-randomizer': '챔피언 추천', 'tab-toolkit': '도구 모음', 'tab-mission': '미션 생성기', 'tab-balance': '롤 밸런스 게임',
    'pinball-title': '텐션업 핀볼', 'ladder-title': '사다리 타기', 'team-title': '팀짜기 (밸런스)',
    'start-btn': '시작하기', 'split-btn': '밸런스 계산', 'reroll-btn': '다시 뽑기', 'options-placeholder': '옵션들을 입력하세요 (쉼표 구분)',
    'fortune-title': '오늘의 운세', 'fortune-btn': '운세 확인'
  }
};

const MISSION_DATA = {
  'actions': {
    'ko_KR': ["게임 승리", "솔로킬 1회 이상", "오브젝트(용/바론) 스틸", "적 팀보다 높은 딜량", "노데스로 경기 종료", "퍼스트 블러드 따내기", "제어 와드 5개 이상 설치", "상대 라이너와 CS 30개 차이", "전체 데스 3회 이하 유지", "적 넥서스 내가 부수기", "펜타킬/쿼드라킬 달성"],
    'en_US': ["Win the game", "At least 1 Solokill", "Objective (Dragon/Baron) Steal", "Highest Damage in match", "Zero Death Game", "Get First Blood", "Place 5+ Control Wards", "30+ CS Gap with opponent", "Under 3 Deaths total", "Finish Nexus yourself", "Achieve Penta/Quadrakill"]
  },
  'targets': {
    'ko_KR': ["영어 한 마디도 안 하기", "영어만 사용하기 (교포 방송)", "죽을 때마다 애교/벌칙 수행", "20분 안에 게임 끝내기", "성공 시 시청자에게 치킨", "한 손으로만 게임하기", "성공 시 노래 한 곡 완창", "실패 시 다음 판 서포터", "성공 시 룰렛 10번 돌리기", "반말로 방송하기", "존댓말로만 채팅치기"],
    'en_US': ["No English Challenge", "English Only Challenge", "Penalty on every death", "Finish game before 20m", "Giveaway on success", "One-hand play challenge", "Sing a song on success", "If failed, play Supp next", "Spin roulette 10x on success", "Talk in a funny accent", "Blindfolded for 1 min"]
  }
};

const BALANCE_SCENARIOS = {
  'ko_KR': [
    ["평생 올스킨 계정", "평생 모든 챔피언 숙련도 7렙"],
    ["팀원 4명이 전부 트롤", "상대 5명이 전부 헬퍼"],
    ["라인전 0/10/0 하고 게임 이기기", "라인전 10/0/0 하고 게임 지기"],
    ["평생 티모만 하기", "평생 유미만 하기"],
    ["점멸 없는 롤", "와드 없는 롤"],
    ["실력은 브론즈인데 티어는 챌린저", "실력은 챌린저인데 티어는 브론즈"],
    ["한 판 할 때마다 10만원 받기", "롤 월드 챔피언십 우승하기"],
    ["내 펜타킬이 상대 서포터한테 뺏기기", "상대 펜타킬을 내가 뺏기 (전체 채팅으로 욕먹음)"],
    ["야스오 장인 되기", "티모 장인 되기"],
    ["D점멸", "F점멸"],
    ["10연승 하고 바로 10연패 하기", "평생 승패승패 반복하기"],
    ["우리팀 정글이 갱 안 오기", "우리팀 서폿이 CS 뺏어먹기"],
    ["리 신 음파 다 맞추기", "블리츠크랭크 그랩 다 맞추기"],
    ["모든 스킨 다 있기 (사용 불가)", "기본 스킨만 있기 (전부 사용 가능)"],
    ["평생 1픽으로만 게임하기", "평생 5픽으로만 게임하기"],
    ["적 팀에 티모 5명", "우리 팀에 유미 4명 (내가 원딜)"],
    ["채팅 금지 1년", "탈주 패널티 100판"],
    ["이길 때마다 10만원 잃기", "질 때마다 5만원 받기 (랭크 점수는 하락)"]
  ],
  'en_US': [
    ["All Skins Unlocked", "All Champions Mastery 7"],
    ["4 Troll Teammates", "5 Scripting Opponents"],
    ["Win with 0/10/0", "Lose with 10/0/0"],
    ["Play only Teemo", "Play only Yuumi"],
    ["No Flash LoL", "No Wards LoL"],
    ["Bronze Skill, Challenger Tier", "Challenger Skill, Bronze Tier"],
    ["Get $100 per game", "Win Worlds once"],
    ["Stolen Pentakill", "Steal enemy Pentakill"],
    ["Flash on D", "Flash on F"]
  ]
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
    "Great fortune! You will find money in an old jacket.",
    "Your next Hextech chest will contain a Mythic skin!",
    "Success is coming. Just keep doing what you're doing."
  ],
  'ko_KR': [
    "오늘의 행운: 게임에서 지겠지만 실력 탓은 아닙니다. 팀운입니다.",
    "오늘의 주의: 키보드 샷건 조심하세요. 수리비가 더 많이 나옵니다.",
    "운세: 당신의 뒤에 누군가 있습니다. 아, 거울이군요.",
    "오늘의 아이템: 핑크 와드. 근데 당신은 안 사겠죠.",
    "행운: 오늘 랭크 게임을 안 돌리면 티어 점수를 유지할 수 있습니다.",
    "주의: 마우스 클릭이 평소보다 0.1초 늦어질 운명입니다. 핑 탓 하세요.",
    "운세: 최악. 하지만 내일은 더 안 좋을 수도 있습니다.",
    "역시 이상호",
    "초대박 운세: 오늘 당신이 하는 모든 일이 성공할 것입니다. 숨만 쉬어도 이득!",
    "조언: 오늘 게임 중 누군가 당신을 욕한다면 '역시 이상호'라고 대답하세요.",
    "행운: 오늘 첫 판을 이기면 연승 가도를 달릴 수 있습니다.",
    "주의: 오늘 당신의 서포터는 CS를 당신보다 더 잘 먹을 예정입니다.",
    "길조: 길 가다 5만원권을 줍게 될지도 모릅니다. 땅만 보고 걸으세요.",
    "운세: 오늘 팀에 트롤이 없을 확률이 99%입니다. 남은 1%는 당신일 수도?",
    "행운: 오늘 당신의 드립이 시청자들에게 폭발적인 반응을 얻을 것입니다.",
    "예감: 상자를 까면 당신이 원하는 스킨이 나올 것입니다.",
    "당신의 매력: 오늘따라 아주 잘생겨/예뻐 보입니다. 캠을 켜세요!",
    "도망가세요. 지금 당장."
  ]
};

let currentState = { 
  version: null, locale: CONFIG.DEFAULT_LOCALE, champions: [], selectedRole: null, 
  theme: localStorage.getItem('theme') || 'dark', currentSkins: [], skinIndex: 0, currentChampId: null 
};

async function init() {
  setLocale(); applyTheme(); updateUIText();
  try {
    showLoading(true); await fetchLatestVersion(); await fetchChampions();
    setupEventListeners(); initPinball(); initLadder(); initTeamSplitter(); initFocusMode(); initFortuneTool(); initMissionRoulette(); initBalanceGame();
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

async function fetchLatestVersion() { try { const res = await fetch('https://ddragon.leagueoflegends.com/api/versions.json'); const v = await res.json(); currentState.version = v[0]; } catch(e) { currentState.version = "14.4.1"; } }
async function fetchChampions() { try { const res = await fetch(`${CONFIG.DATA_DRAGON_BASE}/${currentState.version}/data/${currentState.locale}/champion.json`); const data = await res.json(); currentState.champions = Object.values(data.data); } catch(e) { console.error(e); } }

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

function initFocusMode() { document.querySelector('.focused-overlay').addEventListener('click', closeResult); }

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
    for (let r = 0; r < rows; r++) { const offset = (r % 2) * (spacingX / 2); for (let c = 0; c < 15; c++) { const x = c * spacingX + offset, y = 80 + r * spacingY; if (r > 2 && r < rows - 2 && c % 4 === 0 && Math.random() > 0.5) spinners.push({ x, y, angle: 0, speed: 0.05 + Math.random() * 0.05, length: 40 }); else pins.push({ x, y }); } }
  }

  startBtn.addEventListener('click', () => {
    if (isRunning) return;
    const opts = (input.value || "A,B,C,D").split(',').map(o => o.trim()).filter(o => o);
    if (!opts.length) return;
    focusTool('pinball-tool'); setup(); isRunning = true; balls = [];
    const tempBalls = []; opts.forEach((opt, i) => { for(let j=0; j<30; j++) tempBalls.push({ label: opt, color: `hsl(${(i * 360 / opts.length)}, 70%, 60%)` }); });
    for (let i = tempBalls.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [tempBalls[i], tempBalls[j]] = [tempBalls[j], tempBalls[i]]; }
    balls = tempBalls.map((b, i) => ({ x: canvas.width / 2 + (Math.random() - 0.5) * 80, y: -20 - (i * 15), r: 8, label: b.label, color: b.color, vx: (Math.random() - 0.5) * 3, vy: 1, finished: false }));

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.fillStyle = '#c89b3c'; pins.forEach(p => { ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, Math.PI * 2); ctx.fill(); }); ctx.strokeStyle = '#00cfbc'; ctx.lineWidth = 3; spinners.forEach(s => { s.angle += s.speed; const x1 = s.x + Math.cos(s.angle) * 20, y1 = s.y + Math.sin(s.angle) * 20; const x2 = s.x - Math.cos(s.angle) * 20, y2 = s.y - Math.sin(s.angle) * 20; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); });
      let active = 0;
      balls.forEach(b => {
        if (b.finished) return; active++; b.vy += gravity; b.x += b.vx; b.y += b.vy;
        pins.forEach(p => { const dx = b.x - p.x, dy = b.y - p.y, dist = Math.sqrt(dx*dx + dy*dy); if (dist < b.r + 2) { const angle = Math.atan2(dy, dx), speed = Math.sqrt(b.vx*b.vx + b.vy*b.vy); b.vx = Math.cos(angle) * speed * bounciness + (Math.random()-0.5); b.vy = Math.sin(angle) * speed * bounciness; b.y += b.vy; } });
        spinners.forEach(s => { const x1 = s.x + Math.cos(s.angle) * 20, y1 = s.y + Math.sin(s.angle) * 20, x2 = s.x - Math.cos(s.angle) * 20, y2 = s.y - Math.sin(s.angle) * 20, l2 = 40 * 40, t = Math.max(0, Math.min(1, ((b.x - x1) * (x2 - x1) + (b.y - y1) * (y2 - y1)) / l2)), closestX = x1 + t * (x2 - x1), closestY = y1 + t * (y2 - y1), dx = b.x - closestX, dy = b.y - closestY, dist = Math.sqrt(dx * dx + dy * dy); if (dist < b.r + 2) { const nx = dx / dist, ny = dy / dist, dot = b.vx * nx + b.vy * ny; b.vx = (b.vx - 2 * dot * nx) * bounciness + (Math.random() - 0.5) * 4; b.vy = (b.vy - 2 * dot * ny) * bounciness - 2; b.x = closestX + nx * (b.r + 3); b.y = closestY + ny * (b.r + 3); } });
        if (b.x < b.r || b.x > canvas.width - b.r) { b.vx *= -0.7; b.x = b.x < b.r ? b.r : canvas.width - b.r; }
        if (b.y > canvas.height - 10) { b.finished = true; b.finishTime = Date.now(); }
        ctx.fillStyle = b.color; ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = "#fff"; ctx.font = "bold 9px Spiegel"; ctx.textAlign = "center"; ctx.fillText(b.label.substring(0, 3), b.x, b.y + 3);
      });
      if (active > 0) requestAnimationFrame(loop); else { isRunning = false; const last = balls.reduce((p, c) => p.finishTime > c.finishTime ? p : c); showBigResult("THE FINAL WINNER", last.label); }
    }
    loop();
  });
  window.addEventListener('resize', setup); setTimeout(setup, 500);
}

function initLadder() {
  const canvas = document.getElementById('ladder-canvas'); if (!canvas) return;
  const ctx = canvas.getContext('2d'), startBtn = document.getElementById('ladder-start'), skipBtn = document.getElementById('ladder-skip'), pIn = document.getElementById('ladder-players-input'), rIn = document.getElementById('ladder-results-input');
  let isRunning = false, isSkipped = false;
  function drawInitial() { canvas.width = canvas.parentElement.clientWidth; canvas.height = 400; ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.strokeStyle = '#c89b3c'; ctx.lineWidth = 2; const spacing = canvas.width / 3; for(let i=1; i<=2; i++) { const x = spacing * i; ctx.beginPath(); ctx.moveTo(x, 50); ctx.lineTo(x, 350); ctx.stroke(); ctx.fillStyle = '#f0e6d2'; ctx.font = 'bold 14px Spiegel'; ctx.textAlign = 'center'; ctx.fillText("Player " + i, x, 40); ctx.fillText("Result " + i, x, 370); } }
  startBtn.addEventListener('click', () => {
    if (isRunning) return; const players = (pIn.value || "A,B,C,D,E").split(',').map(s => s.trim()).filter(s => s), results = (rIn.value || "1,2,3,4,5").split(',').map(s => s.trim()).filter(s => s), count = Math.min(players.length, results.length); if (count < 2) return;
    focusTool('ladder-tool'); isRunning = true; isSkipped = false; skipBtn.classList.remove('hidden'); const spacing = canvas.width / (count + 1), lines = []; for (let i = 0; i < count - 1; i++) { for (let j = 0; j < 15; j++) lines.push({ from: i, to: i + 1, y: 70 + Math.random() * 270 }); }
    const sortedLines = [...lines].sort((a,b) => a.y - b.y); let pathIdx = 0;
    function finish() { isRunning = false; skipBtn.classList.add('hidden'); const summary = players.map((p, i) => { let cx = i; sortedLines.forEach(l => { if (l.from === cx) cx = l.to; else if (l.to === cx) cx = l.from; }); return `${p}: ${results[cx]}`; }).join('\n'); showBigResult("LADDER RESULTS", summary); }
    function revealPath() {
      if (isSkipped) { drawAllPaths(); return; }
      ctx.clearRect(0, 0, canvas.width, canvas.height); drawStatic(players, results, count, spacing, lines, pathIdx);
      let currX = pathIdx, currY = 60, pathPoints = [{x: spacing * (currX + 1), y: currY}]; sortedLines.forEach(l => { if (l.from === currX) { pathPoints.push({x: spacing*(currX+1), y: l.y}); currX = l.to; pathPoints.push({x: spacing*(currX+1), y: l.y}); } else if (l.to === currX) { pathPoints.push({x: spacing*(currX+1), y: l.y}); currX = l.from; pathPoints.push({x: spacing*(currX+1), y: l.y}); } }); pathPoints.push({x: spacing * (currX + 1), y: 350});
      let pointIdx = 0;
      function animateMarker() { if (isSkipped) return drawAllPaths(); if (pointIdx < pathPoints.length - 1) { const start = pathPoints[pointIdx], end = pathPoints[pointIdx+1]; let progress = 0; function drawMove() { if (isSkipped) return drawAllPaths(); ctx.clearRect(0, 0, canvas.width, canvas.height); drawStatic(players, results, count, spacing, lines, pathIdx); ctx.strokeStyle = `hsl(${pathIdx * 360 / count}, 80%, 50%)`; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(pathPoints[0].x, pathPoints[0].y); for(let i=0; i<=pointIdx; i++) ctx.lineTo(pathPoints[i].x, pathPoints[i].y); const midX = start.x + (end.x - start.x) * progress, midY = start.y + (end.y - start.y) * progress; ctx.lineTo(midX, midY); ctx.stroke(); ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(midX, midY, 6, 0, Math.PI*2); ctx.fill(); progress += 0.06; if (progress < 1) requestAnimationFrame(drawMove); else { pointIdx++; animateMarker(); } } drawMove(); } else { if (pathIdx < count - 1) { pathIdx++; setTimeout(revealPath, 1200); } else finish(); } }
      animateMarker();
    }
    function drawStatic(players, results, count, spacing, lines, currentRevealIdx) { ctx.strokeStyle = '#c89b3c'; ctx.lineWidth = 2; for (let i = 0; i < count; i++) { const x = spacing * (i + 1); ctx.beginPath(); ctx.moveTo(x, 60); ctx.lineTo(x, 350); ctx.stroke(); ctx.fillStyle = '#f0e6d2'; ctx.font = 'bold 14px Spiegel'; ctx.textAlign = 'center'; ctx.fillText(players[i], x, 50); ctx.fillText(results[i], x, 370); } lines.forEach(l => { ctx.beginPath(); ctx.moveTo(spacing*(l.from+1), l.y); ctx.lineTo(spacing*(l.to+1), l.y); ctx.stroke(); }); for(let p = 0; p < currentRevealIdx; p++) { let cx = p; ctx.strokeStyle = `hsl(${p * 360 / count}, 80%, 50%)`; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(spacing*(cx+1), 60); sortedLines.forEach(l => { if (l.from === cx) { ctx.lineTo(spacing*(cx+1), l.y); cx = l.to; ctx.lineTo(spacing*(cx+1), l.y); } else if (l.to === cx) { ctx.lineTo(spacing*(cx+1), l.y); cx = l.from; ctx.lineTo(spacing*(cx+1), l.y); } }); ctx.lineTo(spacing*(cx+1), 350); ctx.stroke(); } }
    function drawAllPaths() { ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.strokeStyle = '#c89b3c'; ctx.lineWidth = 2; for (let i = 0; i < count; i++) { const x = spacing * (i + 1); ctx.beginPath(); ctx.moveTo(x, 60); ctx.lineTo(x, 350); ctx.stroke(); ctx.fillStyle = '#f0e6d2'; ctx.font = 'bold 14px Spiegel'; ctx.textAlign = 'center'; ctx.fillText(players[i], x, 50); ctx.fillText(results[i], x, 370); } lines.forEach(l => { ctx.beginPath(); ctx.moveTo(spacing*(l.from+1), l.y); ctx.lineTo(spacing*(l.to+1), l.y); ctx.stroke(); }); for(let p = 0; p < count; p++) { let cx = p; ctx.strokeStyle = `hsl(${p * 360 / count}, 80%, 50%)`; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(spacing*(cx+1), 60); sortedLines.forEach(l => { if (l.from === cx) { ctx.lineTo(spacing*(cx+1), l.y); cx = l.to; ctx.lineTo(spacing*(cx+1), l.y); } else if (l.to === cx) { ctx.lineTo(spacing*(cx+1), l.y); cx = l.from; ctx.lineTo(spacing*(cx+1), l.y); } }); ctx.lineTo(spacing*(cx+1), 350); ctx.stroke(); } finish(); }
    revealPath();
  });
  skipBtn.addEventListener('click', () => isSkipped = true); window.addEventListener('resize', drawInitial); setTimeout(drawInitial, 500);
}

function initTeamSplitter() {
  const list = document.getElementById('team-pair-list'), addBtn = document.getElementById('add-pair-btn');
  function createRow() {
    const row = document.createElement('div'); row.className = 'team-pair-row';
    row.innerHTML = `<input type="text" class="pair-input" placeholder="BLUE"><button class="gap-btn">=</button><input type="text" class="pair-input" placeholder="RED"><button class="swap-btn">⇄</button>`;
    row.querySelector('.gap-btn').addEventListener('click', e => { const ops = ['=', '>', '<']; const curr = ops.indexOf(e.target.textContent); e.target.textContent = ops[(curr + 1) % ops.length]; });
    row.querySelector('.swap-btn').addEventListener('click', () => { const ins = row.querySelectorAll('.pair-input'), tmp = ins[0].value; ins[0].value = ins[1].value; ins[1].value = tmp; const g = row.querySelector('.gap-btn'); if(g.textContent==='>') g.textContent='<'; else if(g.textContent==='<') g.textContent='>'; });
    list.appendChild(row);
  }
  addBtn.addEventListener('click', createRow); for(let i=0; i<5; i++) createRow();
}

function initFortuneTool() {
  const startBtn = document.getElementById('fortune-start'), display = document.getElementById('fortune-text'); if (!startBtn) return;
  startBtn.addEventListener('click', () => { const list = FORTUNES[currentState.locale] || FORTUNES['en_US'], f = list[Math.floor(Math.random() * list.length)]; display.style.opacity = 0; setTimeout(() => { display.textContent = f; display.style.opacity = 1; showBigResult(TRANSLATIONS[currentState.locale]['fortune-title'], f); }, 200); });
}

function initMissionRoulette() {
  const startBtn = document.getElementById('mission-start'); if (!startBtn) return;
  function populateStrip(stripId, items, isInitial = false) {
    const strip = document.querySelector(`#${stripId} .roulette-strip`); strip.innerHTML = '';
    if (isInitial) { const div = document.createElement('div'); div.className = 'roulette-item'; div.textContent = '???'; strip.appendChild(div); strip.style.transform = 'translateY(0)'; return; }
    const repeated = [...items, ...items, ...items, ...items, ...items, ...items, ...items]; repeated.forEach(item => { const div = document.createElement('div'); div.className = 'roulette-item'; div.textContent = item; strip.appendChild(div); });
  }
  const resetWheels = () => { populateStrip('roulette-champ', [], true); populateStrip('roulette-action', [], true); populateStrip('roulette-target', [], true); };
  resetWheels();
  startBtn.addEventListener('click', async () => {
    if (startBtn.disabled) return; startBtn.disabled = true; resetWheels();
    const spin = (stripId, items) => new Promise(res => { 
      populateStrip(stripId, items); const s = document.querySelector(`#${stripId} .roulette-strip`), cnt = items.length, target = Math.floor(Math.random() * cnt) + (cnt * 3);
      s.style.transition = 'none'; s.style.transform = 'translateY(0)';
      setTimeout(() => { s.style.transition = 'transform 3s cubic-bezier(0.1, 0, 0.1, 1)'; s.style.transform = `translateY(-${target * 120}px)`; setTimeout(res, 3100); }, 50);
    });
    await spin('roulette-champ', currentState.champions.map(c => c.name));
    await spin('roulette-action', MISSION_DATA.actions[currentState.locale] || MISSION_DATA.actions['en_US']);
    await spin('roulette-target', MISSION_DATA.targets[currentState.locale] || MISSION_DATA.targets['en_US']);
    startBtn.disabled = false;
  });
}

function initBalanceGame() {
  const nextBtn = document.getElementById('balance-next'), optA = document.getElementById('balance-option-a'), optB = document.getElementById('balance-option-b');
  if (!nextBtn) return;
  const select = (e) => { document.querySelectorAll('.balance-card').forEach(c => c.classList.remove('selected')); e.currentTarget.classList.add('selected'); };
  optA.addEventListener('click', select); optB.addEventListener('click', select);
  const pick = () => {
    document.querySelectorAll('.balance-card').forEach(c => c.classList.remove('selected'));
    const scenarios = BALANCE_SCENARIOS[currentState.locale] || BALANCE_SCENARIOS['en_US'], s = scenarios[Math.floor(Math.random() * scenarios.length)];
    optA.querySelector('.option-text').textContent = s[0]; optB.querySelector('.option-text').textContent = s[1];
  };
  nextBtn.addEventListener('click', pick); pick();
}

async function pickRandomChampion(role) {
  currentState.selectedRole = role; showLoading(true);
  try {
    const res = await fetch(`${CONFIG.DATA_DRAGON_BASE}/${currentState.version}/data/${currentState.locale}/champion.json`), data = await res.json(), filtered = Object.values(data.data).filter(c => ROLE_OVERRIDES[role]?.includes(c.id));
    const champBase = (filtered.length ? filtered : Object.values(data.data))[Math.floor(Math.random() * (filtered.length || 1))];
    const fullRes = await fetch(`${CONFIG.DATA_DRAGON_BASE}/${currentState.version}/data/${currentState.locale}/champion/${champBase.id}.json`), fullData = await fullRes.json(), champ = fullData.data[champBase.id];
    const nameEl = document.getElementById('champ-name'); let rolls = 0; const interval = setInterval(() => { nameEl.textContent = currentState.champions[Math.floor(Math.random() * currentState.champions.length)].name; rolls++; if(rolls > 20) { clearInterval(interval); finalize(); } }, 150);
    const finalize = () => {
      currentState.currentSkins = champ.skins; currentState.skinIndex = 0; currentState.currentChampId = champ.id; updateSkinDisplay(champ.id); nameEl.textContent = champ.name;
      const voice = new Audio(`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-choose-vo/${champ.key}.ogg`); voice.volume = 0.5; voice.play().catch(() => {});
      document.getElementById('opgg-link').href = `https://www.op.gg/champions/${champ.id.toLowerCase()}/build`; document.getElementById('lolps-link').href = `https://lol.ps/champion/${champ.key}`;
      document.getElementById('result-area').classList.remove('hidden'); document.getElementById('result-area').scrollIntoView({ behavior: 'smooth' });
    };
  } finally { showLoading(false); }
}

function updateSkinDisplay(champId) { const skin = currentState.currentSkins[currentState.skinIndex], splash = document.getElementById('champ-splash'), name = document.getElementById('skin-name'); splash.style.opacity = 0; setTimeout(() => { splash.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champId}_${skin.num}.jpg`; name.textContent = skin.name === 'default' ? document.getElementById('champ-name').textContent : skin.name; splash.style.opacity = 1; }, 200); }
function changeSkin(dir) { if (!currentState.currentSkins.length) return; currentState.skinIndex = (currentState.skinIndex + dir + currentState.currentSkins.length) % currentState.currentSkins.length; updateSkinDisplay(currentState.currentChampId); }
function showLoading(show) { document.getElementById('loading')?.classList.toggle('hidden', !show); }
init();
