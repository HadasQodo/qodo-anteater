
# Qodo Anteater Project Best Practices

## HTML Structure

### Use Semantic HTML Elements
Use semantic HTML elements to improve accessibility and SEO.

```html
<!-- Good -->
<header class="header">
    <nav class="nav">
        <a href="#features">Features</a>
    </nav>
</header>

<!-- Avoid -->
<div class="header">
    <div class="nav">
        <a href="#features">Features</a>
    </div>
</div>
```

### Include Descriptive Comments
Add descriptive comments for major sections of your HTML.

```html
<!-- Header section with logo and navigation -->
<header class="header">
    <!-- Content here -->
</header>

<!-- Main content area -->
<main>
    <!-- Content here -->
</main>
```

### Use Proper Heading Hierarchy
Maintain proper heading hierarchy (h1, h2, h3) for better document structure.

```html
<section class="hero">
    <h1>Meet Qodo Anteater</h1>
    <!-- Content -->
</section>

<section class="features">
    <h2>Why Qodo Anteater?</h2>
    <div class="feature">
        <h3>Sniffs Out Bugs</h3>
        <!-- Content -->
    </div>
</section>
```

### Organize Content in Sections
Group related content in `<section>` elements with appropriate IDs for navigation.

```html
<section class="features" id="features">
    <!-- Features content -->
</section>

<section class="about" id="about">
    <!-- About content -->
</section>
```

## CSS Organization

### Use CSS Variables for Theming
Define and use CSS variables for consistent theming across the site.

```css
:root {
  --qodo-purple: #7968FA;
  --qodo-purple-dark: #6B5CE7;
  --qodo-black: #000000;
  --qodo-white: #ffffff;
  --qodo-bg: #ffffff;
  --qodo-gradient: linear-gradient(135deg, #7968FA 0%, #000000 100%);
  --qodo-shadow-purple: rgba(121, 104, 250, 0.13);
  --qodo-shadow-light: rgba(121, 104, 250, 0.07);
  --qodo-radius: 18px;
  --qodo-font: 'Inter', Arial, sans-serif;
}

.cta-btn {
  background: var(--qodo-gradient);
  border-radius: var(--qodo-radius);
}
```

### Group Related Styles
Group related styles together with descriptive comments.

```css
/* Hero section with gradient background */
.hero {
  background: var(--qodo-gradient);
  color: var(--qodo-white);
  border-radius: var(--qodo-radius);
  margin: 32px 0 48px 0;
  padding: 48px 0 32px 0;
  box-shadow: 0 8px 32px var(--qodo-shadow-purple);
}

/* Hero content area */
.hero-content {
  max-width: 540px;
}

/* Hero heading */
.hero h1 {
  font-size: 3rem;
  margin: 0 0 18px 0;
  font-weight: 700;
}
```

### Use Container Pattern
Implement a container pattern for consistent content width and padding.

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}
```

### Include Responsive Design
Add media queries for responsive design.

```css
/* Responsive design for smaller screens */
@media (max-width: 900px) {
  .hero .container {
    flex-direction: column;
    align-items: flex-start;
  }
  .hero-image {
    margin-top: 32px;
    align-self: center;
  }
  .features-list {
    flex-direction: column;
    align-items: center;
  }
}
```

## JavaScript Patterns

### Use ES Modules
Use ES modules for better code organization and maintainability.

```javascript
// Export constants and functions
export const fallbackFacts = [
  "Anteaters can eat up to 30,000 ants in a single day! 🐜",
  // More facts...
];

export async function fetchFactsFromInternet() {
  // Implementation...
}

// Import in test files
import { describe, it, expect, vi } from 'vitest';
import * as script from './script.js';
```

### Implement Caching Mechanisms
Use caching to improve performance and reduce API calls.

```javascript
// Cache for facts fetched from the internet
export let cachedFacts = [];

export async function getRandomFact() {
  // If we don't have cached facts yet, fetch them
  if (!cachedFacts || cachedFacts.length === 0) {
    cachedFacts = await fetchFactsFromInternet();
  }
  
  // Use cached facts
  if (!Array.isArray(cachedFacts) || cachedFacts.length === 0) {
    throw new Error('Facts array is empty or not defined');
  }
  
  return cachedFacts[Math.floor(Math.random() * cachedFacts.length)];
}
```

### Provide Fallback Mechanisms
Always include fallback mechanisms for external API calls.

```javascript
export async function fetchFactsFromInternet() {
  try {
    const response = await fetch('https://animalfactguide.com/animal-facts/giant-anteater/', { timeout: 5000 });
    
    if (!response.ok) {
      console.error(`Failed to fetch facts: ${response.status} ${response.statusText}`);
      return fallbackFacts;
    }
    
    // Process response...
    
  } catch (error) {
    console.error('Error fetching anteater facts:', error);
    return fallbackFacts; // Return fallback facts if fetch fails
  }
}
```

### Use Descriptive JSDoc Comments
Add JSDoc comments to document functions and variables.

```javascript
/**
 * Fetches anteater facts from the internet
 * @returns {Promise<string[]>} A promise that resolves to an array of anteater facts
 */
export async function fetchFactsFromInternet() {
  // Implementation...
}

/**
 * Returns a random fact, fetching from the internet if needed
 * @returns {Promise<string>} A promise that resolves to a randomly selected fact
 */
export async function getRandomFact() {
  // Implementation...
}
```

### Implement Proper Error Handling
Use try-catch blocks for error handling and provide user-friendly error messages.

```javascript
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
```

### Prefetch Data When Possible
Prefetch data on page load to improve user experience.

```javascript
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
```

### Check for Element Existence
Always check if DOM elements exist before manipulating them.

```javascript
const factBtn = document.getElementById('fact-btn');
if (factBtn) {
  factBtn.addEventListener('click', async function() {
    const box = document.getElementById('fact-box');
    if (!box) return;
    
    // Proceed with element manipulation
  });
}
```

## Testing Practices

### Use Vitest for Testing
Use Vitest for testing JavaScript code.

```javascript
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as script from './script.js';

describe('Qodo Anteater Fact Feature', () => {
  // Test cases...
});
```

### Set Up and Tear Down Test Environment
Use `beforeEach` and `afterEach` to set up and tear down the test environment.

```javascript
beforeEach(() => {
  // Reset cachedFacts before each test
  script.cachedFacts = [];

  // Mock fetch
  originalFetch = global.fetch;
  // Mock document.getElementById
  originalGetElementById = global.document.getElementById;
  // Mock document.addEventListener
  originalAddEventListener = global.document.addEventListener;
  // Mock setTimeout
  originalSetTimeout = global.setTimeout;

  factBtn = { addEventListener: vi.fn() };
  factBox = {
    classList: { add: vi.fn(), remove: vi.fn() },
    textContent: '',
  };
});

afterEach(() => {
  global.fetch = originalFetch;
  global.document.getElementById = originalGetElementById;
  global.document.addEventListener = originalAddEventListener;
  global.setTimeout = originalSetTimeout;
  vi.restoreAllMocks();
});
```

### Use Descriptive Test Names
Use descriptive test names that explain what is being tested.

```javascript
it('test_fact_button_displays_random_fact_on_successful_fetch', async () => {
  // Test implementation...
});

it('test_facts_are_cached_after_first_fetch', async () => {
  // Test implementation...
});

it('test_fallback_fact_displayed_on_fetch_failure', async () => {
  // Test implementation...
});
```

### Mock External Dependencies
Mock external dependencies to isolate the code being tested.

```javascript
// Mock fetch
global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  text: vi.fn().mockResolvedValue('<html>irrelevant</html>'),
});

// Patch fetchFactsFromInternet to return mockFacts
vi.spyOn(script, 'fetchFactsFromInternet').mockResolvedValue([...mockFacts]);

// Mock DOM elements
global.document.getElementById = vi.fn((id) => {
  if (id === 'fact-btn') return factBtn;
  if (id === 'fact-box') return factBox;
  return null;
});
```

### Test Edge Cases
Test edge cases and error scenarios.

```javascript
it('test_error_message_displayed_when_facts_array_invalid', async () => {
  // Arrange
  global.document.getElementById = vi.fn((id) => {
    if (id === 'fact-btn') return factBtn;
    if (id === 'fact-box') return factBox;
    return null;
  });
  // Patch setTimeout to run instantly
  global.setTimeout = (fn, ms) => fn();

  // Simulate click event handler registration and trigger
  let clickHandler;
  factBtn.addEventListener = (event, handler) => {
    if (event === 'click') clickHandler = handler;
  };
  await import('./script.js');

  // Invalidate cachedFacts
  script.cachedFacts = [];

  // Patch getRandomFact to throw
  vi.spyOn(script, 'getRandomFact').mockImplementation(async () => {
    throw new Error('Facts array is empty or not defined');
  });

  // Act
  await clickHandler();

  // Assert
  expect(factBox.textContent).toBe('Could not fetch anteater fact. Please try again!');
  expect(factBox.classList.remove).toHaveBeenCalledWith('fade');
});
```

### Use Arrange-Act-Assert Pattern
Structure tests using the Arrange-Act-Assert pattern.

```javascript
it('test_facts_are_cached_after_first_fetch', async () => {
  // Arrange
  const mockFacts = ['Cached Fact 1', 'Cached Fact 2'];
  let fetchCallCount = 0;
  vi.spyOn(script, 'fetchFactsFromInternet').mockImplementation(async () => {
    fetchCallCount++;
    return [...mockFacts];
  });
  script.cachedFacts = [];

  // Act
  await script.getRandomFact();
  await script.getRandomFact();

  // Assert
  expect(fetchCallCount).toBe(1);
  expect(script.cachedFacts).toEqual(mockFacts);
});
```

## Project Configuration

### Use ES Modules in package.json
Configure package.json to use ES modules.

```json
{
  "name": "qodo-anteater",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "test": "vitest"
  }
}
```

### Configure Vitest
Set up Vitest configuration for testing.

```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true
  }
});
```

### Use .gitignore
Maintain a comprehensive .gitignore file.

```
# Node modules
node_modules/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Debug logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build directory
/dist
/build

# Coverage directory
/coverage

# IDE specific files
.idea/
.vscode/
*.swp
*.swo
```

## Animation and UI Effects

### Use CSS Transitions for Animations
Use CSS transitions for smooth animations.

```css
.feature {
  transition: transform 0.2s;
}

.feature:hover {
  transform: translateY(-8px) scale(1.04);
}
```

### Implement Fade Effects
Use fade effects for content transitions.

```javascript
// Show loading state
box.classList.add('fade');
box.textContent = 'Fetching an interesting anteater fact...';

// Display the fact with animation
setTimeout(() => {
  box.textContent = fact;
  box.classList.remove('fade');
}, 300);
```

## Documentation

### Include a Comprehensive README
Maintain a comprehensive README with project information.

```markdown
# Qodo Anteater

A fun, playful landing page for the fictional Qodo Anteater mascot featuring responsive design, animations, and interactive elements.

## Features

- Responsive design that works on all devices
- Interactive anteater fact generator
- Smooth animations and transitions
- Clean, modern UI with Qodo branding

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Vitest for testing

## Getting Started

1. Clone the repository
2. Open `index.html` in your browser
3. Click the "Get Viral Anteater Fact" button to see a random anteater fact

## Development

To run tests:

```bash
npm test
```
```

### Document SVG Assets
Include documentation for SVG assets.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- 
  Background SVG for the hero section
  Creates a curved ramp effect with white stroke lines on a transparent background
  Used as a decorative element in the hero section of the Qodo Anteater landing page
-->
<svg width="2696px" height="530px" viewBox="0 0 2696 530" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- SVG content -->
</svg>
```

## Performance Optimization

### Set Timeout for Fetch Requests
Set a timeout for fetch requests to prevent long-running requests.

```javascript
const response = await fetch('https://animalfactguide.com/animal-facts/giant-anteater/', { timeout: 5000 });
```

### Use Efficient DOM Manipulation
Minimize DOM manipulation and batch changes when possible.

```javascript
// Instead of multiple updates, prepare content and update once
setTimeout(() => {
  box.textContent = fact;
  box.classList.remove('fade');
}, 300);
```

## Accessibility

### Use Alt Text for Images
Always include descriptive alt text for images.

```html
<img src="assets/anteater-hero.png" alt="Qodo Anteater Mascot">
```

### Ensure Proper Color Contrast
Use CSS variables to maintain consistent and accessible color contrast.

```css
:root {
  --qodo-purple: #7968FA;
  --qodo-black: #000000;
  --qodo-white: #ffffff;
  --qodo-bg: #ffffff;
}

.nav a {
  color: var(--qodo-purple);
}
```

### Use Proper Button Elements
Use `<button>` elements for interactive controls.

```html
<button id="fact-btn">Get Viral Anteater Fact</button>
```

## Code Verification

### Create Verification Scripts
Create scripts to verify fixes and functionality.

```javascript
// verify-fixes.js
import * as script from './script.js';

// Test getRandomFact function
async function testGetRandomFact() {
  try {
    const fact = await script.getRandomFact();
    console.log('✅ getRandomFact returned:', fact);
    return true;
  } catch (error) {
    console.error('❌ getRandomFact failed:', error);
    return false;
  }
}

// Run tests
async function runTests() {
  console.log('Running tests to verify fixes...');
  
  let passed = 0;
  let total = 2;
  
  if (await testFetchFactsFromInternet()) passed++;
  if (await testGetRandomFact()) passed++;
  
  console.log(`\nTests completed: ${passed}/${total} passed`);
}

runTests();
```
