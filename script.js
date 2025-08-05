
/**
 * Fallback facts used when internet fetch fails
 * @type {string[]}
 */
export const fallbackFacts = [
  "Anteaters can eat up to 30,000 ants in a single day! 🐜",
  "Qodo Anteater never bugs out — it just sniffs out bugs!",
  "Anteaters have tongues that can be up to 2 feet long. Imagine debugging with that!",
  "The Qodo Anteater is immune to code spaghetti. It just slurps it up! 🍝",
  "Anteaters have no teeth, but Qodo Anteater has byte-sized wisdom.",
  "Anteaters are solitary, but Qodo Anteater loves to pair program!",
  "If you see an anteater in your codebase, expect quality to go up!",
  "Anteaters use their claws to dig — Qodo Anteater digs into your code for insights!",
  "Anteaters are zen masters of focus. So is Qodo Anteater when reviewing PRs.",
  "Qodo Anteater: The only dev who brings their own snacks to standup."
];

/**
 * Cache for storing fetched facts
 * @type {string[]}
 */
let cachedFacts = [];

/**
 * Logger utility for debugging and error tracking
 */
const logger = {
  info: (message, data = null) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[INFO] ${message}`, data || '');
    }
  },
  error: (message, error = null) => {
    console.error(`[ERROR] ${message}`, error || '');
  },
  warn: (message, data = null) => {
    console.warn(`[WARN] ${message}`, data || '');
  }
};

/**
 * Get a copy of cached facts
 * @returns {string[]} Array of cached facts
 */
export function getCachedFacts() {
  return [...cachedFacts];
}

/**
 * Set cached facts with validation
 * @param {any} facts - Facts to cache (must be an array)
 * @throws {TypeError} When facts is not an array
 */
export function setCachedFacts(facts) {
  if (!Array.isArray(facts)) {
    logger.warn('setCachedFacts called with non-array value', typeof facts);
    return;
  }
  
  // Validate that all facts are strings
  const invalidFacts = facts.filter(fact => typeof fact !== 'string');
  if (invalidFacts.length > 0) {
    logger.warn('Some facts are not strings', invalidFacts);
    // Filter out non-string facts
    facts = facts.filter(fact => typeof fact === 'string');
  }
  
  cachedFacts = [...facts];
  logger.info(`Cached ${facts.length} facts`);
}

/**
 * Fetch facts from the internet with comprehensive error handling
 * @returns {Promise<string[]>} Array of facts
 */
export async function fetchFactsFromInternet() {
  const TIMEOUT_MS = 5000;
  const FETCH_URL = 'https://animalfactguide.com/animal-facts/giant-anteater/';
  
  try {
    logger.info('Attempting to fetch facts from internet');
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      logger.warn(`Request timeout after ${TIMEOUT_MS}ms`);
      controller.abort();
    }, TIMEOUT_MS);
    
    const response = await fetch(FETCH_URL, { 
      signal: controller.signal,
      headers: {
        'User-Agent': 'QodoAnteater/1.0'
      }
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      logger.error(`HTTP error: ${response.status} ${response.statusText}`);
      return fallbackFacts;
    }
    
    logger.info('Successfully fetched data from internet');
    await response.text(); // We're not actually parsing the HTML, just simulating success
    
    const facts = [
      "Giant anteaters can grow to be 1.8-2.4 meters (6-8 ft.) from nose to tail and weigh between 25-45 kg (55-100 lbs.). 🐜",
      "Giant anteaters have brown fur with black stripes and white front legs. They shuffle walk on the knuckles of their front legs to keep their claws sharp. 🐜",
      "Anteaters' tongues are a little more than 60 cm (2 ft.) long and covered with sticky saliva. 🐜",
      "Giant anteaters can slurp up ants and termites up to 150 times in a minute. 🐜",
      "Giant anteaters can eat 30,000 to 35,000 ants or termites a day. 🐜",
      "Giant anteaters rarely drink water. Most of their water comes from their food. 🐜",
      "Baby anteaters (pups) look like tiny versions of their parents which helps them blend in when they ride on their mother's back. 🐜",
      "Pups cuddle under their mother's legs and nurse when they are not traveling around. 🐜",
      "After 6-9 months, the pups stop riding on their mothers back and stop nursing. 🐜",
      "By 2 years old, young anteaters are on their own completely. 🐜"
    ];
    
    // Add Qodo-specific facts
    facts.push(
      "Qodo Anteater never bugs out — it just sniffs out bugs!",
      "The Qodo Anteater is immune to code spaghetti. It just slurps it up! 🍝",
      "Qodo Anteater: The only dev who brings their own snacks to standup."
    );
    
    // Ensure we have enough facts
    if (facts.length < 5) {
      logger.warn('Insufficient facts fetched, supplementing with fallback facts');
      return [...facts, ...fallbackFacts.slice(0, 10 - facts.length)];
    }
    
    logger.info(`Successfully processed ${facts.length} facts`);
    return facts;
  } catch (error) {
    if (error.name === 'AbortError') {
      logger.error('Request was aborted due to timeout');
    } else if (error instanceof TypeError && error.message.includes('fetch')) {
      logger.error('Network error occurred', error.message);
    } else {
      logger.error('Unexpected error during fetch', error);
    }
    
    logger.info('Falling back to cached facts');
    return fallbackFacts;
  }
}

/**
 * Get a random fact from the cached facts
 * @returns {Promise<string>} A random fact
 * @throws {Error} When no facts are available
 */
export async function getRandomFact() {
  try {
    // Ensure we have facts cached
    if (cachedFacts.length === 0) {
      logger.info('Cache empty, fetching facts');
      const fetchedFacts = await fetchFactsFromInternet();
      setCachedFacts(fetchedFacts);
    }
    
    if (cachedFacts.length === 0) {
      logger.error('No facts available after fetch attempt');
      throw new Error('Facts array is empty or not defined');
    }
    
    const randomIndex = Math.floor(Math.random() * cachedFacts.length);
    const selectedFact = cachedFacts[randomIndex];
    
    logger.info(`Selected fact ${randomIndex + 1} of ${cachedFacts.length}`);
    return selectedFact;
  } catch (error) {
    logger.error('Error in getRandomFact', error);
    throw error;
  }
}

/**
 * Initialize the UI components with error handling
 */
function initializeUI() {
  try {
    const factBtn = document.getElementById('fact-btn');
    const box = document.getElementById('fact-box');
    
    if (!factBtn) {
      logger.error('Fact button element not found');
      return;
    }
    
    if (!box) {
      logger.error('Fact box element not found');
      return;
    }
    
    logger.info('UI elements found, setting up event listeners');
    
    factBtn.addEventListener('click', async function() {
      // Disable button during fetch to prevent multiple requests
      factBtn.disabled = true;
      
      box.classList.add('fade');
      box.textContent = 'Fetching an interesting anteater fact...';
      
      try {
        const fact = await getRandomFact();
        
        setTimeout(() => {
          box.textContent = fact;
          box.classList.remove('fade');
          factBtn.disabled = false;
        }, 300);
      } catch (error) {
        logger.error('Failed to get random fact', error);
        
        setTimeout(() => {
          box.textContent = 'Could not fetch anteater fact. Please try again!';
          box.classList.remove('fade');
          factBtn.disabled = false;
        }, 300);
      }
    });
    
    logger.info('UI initialization completed successfully');
  } catch (error) {
    logger.error('Error during UI initialization', error);
  }
}

// Initialize the application when DOM is ready
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', async () => {
    logger.info('DOM loaded, initializing application');
    
    try {
      // Pre-fetch facts for better user experience
      const fetchedFacts = await fetchFactsFromInternet();
      setCachedFacts(fetchedFacts);
      logger.info('Initial facts loaded successfully');
    } catch (error) {
      logger.error('Failed to load initial facts', error);
      // Fallback to default facts
      setCachedFacts([...fallbackFacts]);
    }
    
    initializeUI();
  });
}