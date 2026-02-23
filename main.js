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
    'disclaimer': "WhatChampToPlay는 Riot Games의 승인을 받지 않았으며 Riot Games 또는 League of Legends를 제작하거나 관리하는 데 공식적으로 관여한 모든 사람의 견해나 의견을 반영하지 않습니다."
  }
};

// State management
let currentState = {
  version: null,
  locale: CONFIG.DEFAULT_LOCALE,
  champions: [],
  selectedRole: null
};

/**
 * Initialize the application
 */
async function init() {
  setLocale();
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
 * Update UI text based on current locale
 */
function updateUIText() {
  const elements = document.querySelectorAll('[data-i18n]');
  const strings = TRANSLATIONS[currentState.locale];
  
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (strings[key]) {
      el.textContent = strings[key];
    }
  });
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
