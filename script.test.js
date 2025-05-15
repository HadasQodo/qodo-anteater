import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Import the functions and variables to test
import * as script from './script.js';

describe('Qodo Anteater Fact Feature', () => {
  let originalFetch;
  let originalGetElementById;
  let originalAddEventListener;
  let originalSetTimeout;
  let factBtn, factBox;

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

  it('test_fact_button_displays_random_fact_on_successful_fetch', async () => {
    // Arrange
    const mockFacts = ['Fact 1', 'Fact 2', 'Fact 3'];
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: vi.fn().mockResolvedValue('<html>irrelevant</html>'),
    });
    // Patch fetchFactsFromInternet to return mockFacts
    vi.spyOn(script, 'fetchFactsFromInternet').mockResolvedValue([...mockFacts]);
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
    // Re-require the script to register the event listener
    // (simulate script load)
    await import('./script.js');

    // Act
    await clickHandler();

    // Assert
    expect(factBox.classList.add).toHaveBeenCalledWith('fade');
    expect(factBox.textContent).not.toBe('Fetching an interesting anteater fact...');
    expect(mockFacts).toContain(factBox.textContent);
    expect(factBox.classList.remove).toHaveBeenCalledWith('fade');
  });

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

  it('test_facts_are_prefetched_on_dom_content_loaded', async () => {
    // Arrange
    const mockFacts = ['Prefetch Fact 1', 'Prefetch Fact 2'];
    vi.spyOn(script, 'fetchFactsFromInternet').mockResolvedValue([...mockFacts]);
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    let domContentLoadedHandler;
    global.document.addEventListener = vi.fn((event, handler) => {
      if (event === 'DOMContentLoaded') domContentLoadedHandler = handler;
    });

    // Simulate script load to register DOMContentLoaded
    await import('./script.js');

    // Act
    await domContentLoadedHandler();

    // Assert
    expect(script.cachedFacts).toEqual(mockFacts);
    expect(logSpy).toHaveBeenCalledWith('Facts prefetched successfully');
  });

  it('test_fallback_fact_displayed_on_fetch_failure', async () => {
    // Arrange
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));
    vi.spyOn(console, 'error').mockImplementation(() => {});
    global.document.getElementById = vi.fn((id) => {
      if (id === 'fact-btn') return factBtn;
      if (id === 'fact-box') return factBox;
      return null;
    });
    // Patch fetchFactsFromInternet to throw
    vi.spyOn(script, 'fetchFactsFromInternet').mockImplementation(async () => {
      throw new Error('Network error');
    });
    // Patch setTimeout to run instantly
    global.setTimeout = (fn, ms) => fn();

    // Simulate click event handler registration and trigger
    let clickHandler;
    factBtn.addEventListener = (event, handler) => {
      if (event === 'click') clickHandler = handler;
    };
    await import('./script.js');

    // Patch getRandomFact to use fallbackFacts
    script.cachedFacts = [...script.fallbackFacts];

    // Act
    await clickHandler();

    // Assert
    expect(script.fallbackFacts).toContain(factBox.textContent);
  });

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

  it('test_no_error_when_fact_box_missing', async () => {
    // Arrange
    global.document.getElementById = vi.fn((id) => {
      if (id === 'fact-btn') return factBtn;
      if (id === 'fact-box') return null;
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

    // Act & Assert (should not throw)
    await expect(clickHandler()).resolves.not.toThrow();
  });
});