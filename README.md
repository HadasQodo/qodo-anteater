# Qodo Anteater

A fun, playful landing page for the fictional Qodo Anteater mascot featuring responsive design, animations, and interactive elements.

## Project Structure

- `index.html` - Main HTML file for the landing page
- `style.css` - CSS styles for the landing page
- `script.js` - JavaScript functionality, including the anteater fact generator
- `assets/` - Directory containing images and other assets
- `tests/` - Directory containing all test files

## Testing

This project includes comprehensive testing using Vitest for unit tests and Playwright for end-to-end tests.

### Prerequisites

Before running the tests, make sure you have Node.js installed and run:

```bash
npm install
npm run install:playwright
```

### Running Tests

#### All Tests

To run all tests (unit and end-to-end):

```bash
npm test
```

#### Unit Tests

To run only the unit tests:

```bash
npm run test:unit
```

To run unit tests with coverage:

```bash
npm run test:unit:coverage
```

To run unit tests in watch mode (for development):

```bash
npm run test:unit:watch
```

#### End-to-End Tests

To run all end-to-end tests:

```bash
npm run test:e2e
```

To run end-to-end tests with UI:

```bash
npm run test:ui
```

#### Specific Test Suites

To run only CSS tests:

```bash
npm run test:css
```

To run only component tests:

```bash
npm run test:components
```

To run verification tests:

```bash
npm run test:verify
```

### Test Files

- `script.test.js` - Unit tests for JavaScript functionality
- `tests/homepage.spec.js` - End-to-end tests for the homepage
- `tests/style.test.js` - Tests for CSS styling
- `tests/components.spec.js` - Tests for individual components
- `tests/verify-fixes.test.js` - Tests for the verification script

## Test Coverage

The tests cover:

1. **JavaScript Unit Tests**:
   - Fetching anteater facts from the internet
   - Fallback mechanism when fetch fails
   - Random fact selection
   - DOM event handling
   - Error handling

2. **End-to-End Tests**:
   - Page navigation and structure
   - Interactive elements
   - Responsive design
   - Visual appearance

3. **CSS Tests**:
   - Proper application of styles
   - Responsive design
   - Visual effects and animations

4. **Component Tests**:
   - Individual component functionality
   - Component interactions
   - User interactions with components

## Continuous Integration

These tests can be integrated into a CI/CD pipeline by running:

```bash
npm test
```

This will execute all tests and report any failures.