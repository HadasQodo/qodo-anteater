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

// Test fetchFactsFromInternet function
async function testFetchFactsFromInternet() {
  try {
    const facts = await script.fetchFactsFromInternet();
    console.log(`✅ fetchFactsFromInternet returned ${facts.length} facts`);
    return true;
  } catch (error) {
    console.error('❌ fetchFactsFromInternet failed:', error);
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