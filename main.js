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
    'theme-toggle-light': 'Light Mode',
    'theme-toggle-dark': 'Dark Mode',
    'about-title': 'About What Champ to Play?',
    'about-p1': 'Choosing a champion in League of Legends can be a daunting task with over 160 unique characters. Our tool helps you break the analysis paralysis by suggesting a champion tailored to your preferred role.',
    'how-it-works-title': 'How It Works',
    'how-it-works-p1': 'Our algorithm uses real-time data from the Riot Games Data Dragon API to fetch the latest champion information, including their abilities, roles, and playstyles.',
    'tips-desc-title': 'Master Your Champion',
    'tips-desc-p1': "Each recommendation comes with pro tips and strategy guides. We don't just give you a name; we give you the 'Ally Tips' directly from the developers to help you understand your power spikes and combos.",
    'disclaimer': "WhatChampToPlay isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends."
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
    'theme-toggle-light': '라이트 모드',
    'theme-toggle-dark': '다크 모드',
    'about-title': '뭐 할까? 란 무엇인가요?',
    'about-p1': '리그 오브 레전드에는 160명이 넘는 챔피언이 있어 선택이 어려울 수 있습니다. 본 서비스는 여러분이 선호하는 라인에 맞는 챔피언을 무작위로 추천하여 고민을 해결해 드립니다.',
    'how-it-works-title': '어떻게 작동하나요?',
    'how-it-works-p1': '본 서비스의 알고리즘은 라이엇 게임즈의 Data Dragon API를 실시간으로 활용하여 챔피언의 최신 정보, 역할군 및 플레이 스타일을 가져옵니다.',
    'tips-desc-title': '챔피언 마스터하기',
    'tips-desc-p1': "단순히 이름만 알려주는 것이 아니라, 라이엇 개발진이 제공하는 '아군 팀 팁'을 통해 해당 챔피언의 스킬 콤보, 아이템 시너지 및 운영법을 한눈에 확인할 수 있습니다.",
    'disclaimer': "WhatChampToPlay는 Riot Games의 승인을 받지 않았으며 Riot Games 또는 League of Legends를 제작하거나 관리하는 데 공식적으로 관여한 모든 사람의 견해나 의견을 반영하지 않습니다."
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
    showLoading(false);
  } catch (error) {
    console.error('Failed to initialize app:', error);
    alert('Failed to load champion data. Please try again later.');
  }
}

/**
 * Detect and set locale based on browser settings
 */
function setLocale() {
  const browserLang = navigator.language.split('-')[0];
  currentState.locale = CONFIG.LOCALES[browserLang] || CONFIG.DEFAULT_LOCALE;
  document.documentElement.lang = browserLang;
}

/**
 * Update UI text based on current locale and theme
 */
function updateUIText() {
  const elements = document.querySelectorAll('[data-i18n]');
  const strings = TRANSLATIONS[currentState.locale];
  
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key === 'theme-toggle') {
      const themeKey = currentState.theme === 'dark' ? 'theme-toggle-light' : 'theme-toggle-dark';
      el.textContent = strings[themeKey];
    } else if (strings[key]) {
      el.textContent = strings[key];
    }
  });
}

/**
 * Apply the selected theme
 */
function applyTheme() {
  document.documentElement.setAttribute('data-theme', currentState.theme);
  updateUIText();
}

/**
 * Toggle between light and dark themes
 */
function toggleTheme() {
  currentState.theme = currentState.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', currentState.theme);
  applyTheme();
}

/**
 * Fetch the latest Data Dragon version
 */
async function fetchLatestVersion() {
  const response = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
  const versions = await response.json();
  currentState.version = versions[0];
}

/**
 * Fetch champion list from Data Dragon
 */
async function fetchChampions() {
  const url = `${CONFIG.DATA_DRAGON_BASE}/${currentState.version}/data/${currentState.locale}/champion.json`;
  const response = await fetch(url);
  const data = await response.json();
  currentState.champions = Object.values(data.data);
}

/**
 * Setup UI event listeners
 */
function setupEventListeners() {
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }

  const roleButtons = document.querySelectorAll('.role-btn');
  roleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active class
      roleButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const role = btn.getAttribute('data-role');
      pickRandomChampion(role);
    });
  });

  document.getElementById('reroll-btn').addEventListener('click', () => {
    if (currentState.selectedRole) {
      pickRandomChampion(currentState.selectedRole);
    }
  });
}

// Specific role mapping to refine selection (since Riot tags are broad)
const ROLE_OVERRIDES = {
  'TOP': ['Aatrox', 'Camille', 'Chogath', 'Darius', 'DrMundo', 'Fiora', 'Gangplank', 'Garen', 'Gnar', 'Gwen', 'Illaoi', 'Irelia', 'Jax', 'Jayce', 'KSante', 'Kayle', 'Kennen', 'Kled', 'Malphite', 'Mordekaiser', 'Nasus', 'Olaf', 'Ornn', 'Pantheon', 'Poppy', 'Quinn', 'Renekton', 'Riven', 'Rumble', 'Sett', 'Shen', 'Singed', 'Sion', 'Teemo', 'Tryndamere', 'Urgot', 'Vayne', 'Volibear', 'Warwick', 'Yorick'],
  'JUNGLE': ['Amumu', 'Belveth', 'Briar', 'Diana', 'Ekko', 'Elise', 'Evelynn', 'Fiddlesticks', 'Graves', 'Hecarim', 'Ivern', 'JarvanIV', 'Jax', 'Karthus', 'Kayn', 'Khazix', 'Kindred', 'LeeSin', 'Lillia', 'MasterYi', 'Nidalee', 'Nocturne', 'Nunu', 'Olaf', 'Rammus', 'RekSai', 'Rengar', 'Sejuani', 'Shaco', 'Shyvana', 'Skarner', 'Taliyah', 'Talon', 'Trundle', 'Udyr', 'Vi', 'Viego', 'Volibear', 'Warwick', 'MonkeyKing', 'XinZhao', 'Zac'],
  'MIDDLE': ['Ahri', 'Akali', 'Akshan', 'Anivia', 'Annie', 'AurelionSol', 'Azir', 'Cassiopeia', 'Corki', 'Diana', 'Ekko', 'Fizz', 'Galio', 'Hwei', 'Irelia', 'Kassadin', 'Katarina', 'Leblanc', 'Lissandra', 'Lux', 'Malzahar', 'Naafiri', 'Neeko', 'Orianna', 'Pantheon', 'Qiyana', 'Ryze', 'Sylas', 'Syndra', 'Taliyah', 'Talon', 'TwistedFate', 'Veigar', 'Vex', 'Viktor', 'Vladimir', 'Yasuo', 'Yone', 'Zed', 'Zoe'],
  'BOTTOM': ['Aphelios', 'Ashe', 'Caitlyn', 'Draven', 'Ezreal', 'Jhin', 'Jinx', 'Kaisa', 'Kalista', 'KogMaw', 'Lucian', 'MissFortune', 'Nilah', 'Samira', 'Sivir', 'Smolder', 'Tristana', 'Twitch', 'Varus', 'Vayne', 'Xayah', 'Zeri'],
  'UTILITY': ['Alistar', 'Bard', 'Blitzcrank', 'Brand', 'Braum', 'Karma', 'Leona', 'Lulu', 'Lux', 'Milio', 'Morgana', 'Nami', 'Nautilus', 'Pyke', 'Rakan', 'Rell', 'Renata', 'Senna', 'Seraphine', 'Sona', 'Soraka', 'Swain', 'Taric', 'Thresh', 'Xerath', 'Yuumi', 'Zilean', 'Zyra']
};

/**
 * Filter champions based on role and pick one randomly
 */
async function pickRandomChampion(role) {
  currentState.selectedRole = role;
  showLoading(true);
  
  let filtered = [];
  
  // Use manual mapping first, then fallback to tags
  const overrideIds = ROLE_OVERRIDES[role];
  if (overrideIds) {
    filtered = currentState.champions.filter(c => overrideIds.includes(c.id));
  }

  // Fallback if no champions match or role is not in overrides
  if (filtered.length === 0) {
    switch(role) {
      case 'TOP':
        filtered = currentState.champions.filter(c => c.tags.includes('Fighter') || c.tags.includes('Tank'));
        break;
      case 'JUNGLE':
        filtered = currentState.champions.filter(c => c.tags.includes('Fighter') || c.tags.includes('Assassin'));
        break;
      case 'MIDDLE':
        filtered = currentState.champions.filter(c => c.tags.includes('Mage') || c.tags.includes('Assassin'));
        break;
      case 'BOTTOM':
        filtered = currentState.champions.filter(c => c.tags.includes('Marksman'));
        break;
      case 'UTILITY':
        filtered = currentState.champions.filter(c => c.tags.includes('Support'));
        break;
      default:
        filtered = currentState.champions;
    }
  }

  if (filtered.length === 0) filtered = currentState.champions;
  
  const randomChamp = filtered[Math.floor(Math.random() * filtered.length)];
  await displayChampion(randomChamp.id);
}

/**
 * Fetch full champion data and display it
 */
async function displayChampion(championId) {
  try {
    const url = `${CONFIG.DATA_DRAGON_BASE}/${currentState.version}/data/${currentState.locale}/champion/${championId}.json`;
    const response = await fetch(url);
    const data = await response.json();
    const champion = data.data[championId];

    // Update UI
    document.getElementById('champ-name').textContent = champion.name;
    document.getElementById('champ-title').textContent = champion.title;
    
    // Splash image (using centered splash for better look)
    const splashUrl = `${CONFIG.DATA_DRAGON_BASE}/img/champion/splash/${championId}_0.jpg`;
    document.getElementById('champ-splash').src = splashUrl;

    // Tips
    const tipsList = document.getElementById('champ-tips-list');
    tipsList.innerHTML = '';
    
    // Use allytips for "Pro Tips"
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
    console.error('Error displaying champion:', error);
    showLoading(false);
  }
}

/**
 * Show/Hide loading state
 */
function showLoading(isLoading) {
  const loadingEl = document.getElementById('loading');
  if (isLoading) {
    loadingEl.classList.remove('hidden');
    // Hide result area while loading new one
    // document.getElementById('result-area').classList.add('hidden');
  } else {
    loadingEl.classList.add('hidden');
  }
}

// Start the app
init();
