
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

let cachedFacts = [];

export function getCachedFacts() {
  return [...cachedFacts];
}

export function setCachedFacts(facts) {
  if (Array.isArray(facts)) {
    cachedFacts = [...facts];
  }
}

export async function fetchFactsFromInternet() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch('https://animalfactguide.com/animal-facts/giant-anteater/', { 
      signal: controller.signal 
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      return fallbackFacts;
    }
    
    await response.text();
    
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
    
    facts.push(
      "Qodo Anteater never bugs out — it just sniffs out bugs!",
      "The Qodo Anteater is immune to code spaghetti. It just slurps it up! 🍝",
      "Qodo Anteater: The only dev who brings their own snacks to standup."
    );
    
    if (facts.length < 5) {
      return [...facts, ...fallbackFacts.slice(0, 10 - facts.length)];
    }
    
    return facts;
  } catch (error) {
    return fallbackFacts;
  }
}

export async function getRandomFact() {
  if (cachedFacts.length === 0) {
    cachedFacts = await fetchFactsFromInternet();
  }
  
  if (cachedFacts.length === 0) {
    throw new Error('Facts array is empty or not defined');
  }
  
  return cachedFacts[Math.floor(Math.random() * cachedFacts.length)];
}

function initializeUI() {
  const factBtn = document.getElementById('fact-btn');
  const box = document.getElementById('fact-box');
  
  if (!factBtn || !box) {
    return;
  }
  
  factBtn.addEventListener('click', async function() {
    box.classList.add('fade');
    box.textContent = 'Fetching an interesting anteater fact...';
    
    try {
      const fact = await getRandomFact();
      
      setTimeout(() => {
        box.textContent = fact;
        box.classList.remove('fade');
      }, 300);
    } catch (error) {
      box.textContent = 'Could not fetch anteater fact. Please try again!';
      box.classList.remove('fade');
    }
  });
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      cachedFacts = await fetchFactsFromInternet();
    } catch (error) {
      cachedFacts = [...fallbackFacts];
    }
    
    initializeUI();
  });
}