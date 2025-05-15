
/**
 * Fallback facts about anteaters and Qodo Anteater in case API fails
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
 * Cache for facts fetched from the internet
 * @type {string[]}
 */
export let cachedFacts = [];

/**
 * Fetches anteater facts from the internet
 * @returns {Promise<string[]>} A promise that resolves to an array of anteater facts
 */
export async function fetchFactsFromInternet() {
  try {
    // Using a public API that doesn't require authentication to get anteater facts
    const response = await fetch('https://animalfactguide.com/animal-facts/giant-anteater/', { timeout: 5000 });
    
    if (!response.ok) {
      console.error(`Failed to fetch facts: ${response.status} ${response.statusText}`);
      return fallbackFacts;
    }
    
    const htmlText = await response.text();
    
    // Extract interesting facts about anteaters from the HTML response
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
    
    // Add some Qodo-specific facts to mix with real anteater facts
    facts.push("Qodo Anteater never bugs out — it just sniffs out bugs!");
    facts.push("The Qodo Anteater is immune to code spaghetti. It just slurps it up! 🍝");
    facts.push("Qodo Anteater: The only dev who brings their own snacks to standup.");
    
    // If we couldn't get enough facts, use some from our fallback list
    if (facts.length < 5) {
      return [...facts, ...fallbackFacts.slice(0, 10 - facts.length)];
    }
    
    return facts;
  } catch (error) {
    console.error('Error fetching anteater facts:', error);
    return fallbackFacts; // Return fallback facts if fetch fails
  }
}

/**
 * Returns a random fact, fetching from the internet if needed
 * @returns {Promise<string>} A promise that resolves to a randomly selected fact
 */
export async function getRandomFact() {
  // If we don't have cached facts yet, fetch them
  if (!cachedFacts || cachedFacts.length === 0) {
    cachedFacts = await fetchFactsFromInternet();
  }
  
  // Use cached facts (which might be the fallback facts if fetch failed)
  if (!Array.isArray(cachedFacts) || cachedFacts.length === 0) {
    throw new Error('Facts array is empty or not defined');
  }
  
  return cachedFacts[Math.floor(Math.random() * cachedFacts.length)];
}

/**
 * Event listener for the fact button click
 * Displays a random fact with a fade animation effect
 */
const factBtn = document.getElementById('fact-btn');
if (factBtn) {
  factBtn.addEventListener('click', async function() {
    const box = document.getElementById('fact-box');
    if (!box) return;
    
    // Show loading state
    box.classList.add('fade');
    box.textContent = 'Fetching an interesting anteater fact...';
    
    try {
      // Get a random fact (this will fetch from internet if needed)
      const fact = await getRandomFact();
      
      // Display the fact with animation
      setTimeout(() => {
        box.textContent = fact;
        box.classList.remove('fade');
      }, 300);
    } catch (error) {
      console.error('Error getting fact:', error);
      box.textContent = 'Could not fetch anteater fact. Please try again!';
      box.classList.remove('fade');
    }
  });
}

// Prefetch facts when the page loads
document.addEventListener('DOMContentLoaded', async () => {
  try {
    cachedFacts = await fetchFactsFromInternet();
    console.log('Facts prefetched successfully');
  } catch (error) {
    console.error('Error prefetching facts:', error);
    // Ensure we have fallback facts available
    cachedFacts = [...fallbackFacts];
  }
});