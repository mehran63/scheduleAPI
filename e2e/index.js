const { scenario1 } = require('./scenario1');

// Add more requires as you add more scenarios

async function runScenarios() {
    await scenario1();

    // Call other scenarios here
}

runScenarios();