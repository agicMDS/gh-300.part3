"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApiBaseUrl = getApiBaseUrl;
exports.logApiInfo = logApiInfo;
/**
 * Get the base API URL for Codespaces or local development
 */
function getApiBaseUrl() {
    const codespaceName = process.env.CODESPACE_NAME;
    if (codespaceName) {
        return `https://${codespaceName}-8000.app.github.dev`;
    }
    return 'http://localhost:8000';
}
/**
 * Log API information including Codespaces URL if available
 */
function logApiInfo(baseUrl = getApiBaseUrl()) {
    console.log(`\n🚀 OctoFit Tracker API`);
    console.log(`Base URL: ${baseUrl}`);
    console.log(`\n📝 Available Endpoints:`);
    console.log(`  Health Check:`);
    console.log(`    GET ${baseUrl}/api/health\n`);
    console.log(`  Users:`);
    console.log(`    GET    ${baseUrl}/api/users`);
    console.log(`    GET    ${baseUrl}/api/users/:id`);
    console.log(`    POST   ${baseUrl}/api/users\n`);
    console.log(`  Teams:`);
    console.log(`    GET    ${baseUrl}/api/teams`);
    console.log(`    GET    ${baseUrl}/api/teams/:id`);
    console.log(`    POST   ${baseUrl}/api/teams\n`);
    console.log(`  Activities:`);
    console.log(`    GET    ${baseUrl}/api/activities`);
    console.log(`    GET    ${baseUrl}/api/activities/:id`);
    console.log(`    POST   ${baseUrl}/api/activities\n`);
    console.log(`  Leaderboard:`);
    console.log(`    GET    ${baseUrl}/api/leaderboard`);
    console.log(`    GET    ${baseUrl}/api/leaderboard/:id`);
    console.log(`    GET    ${baseUrl}/api/leaderboard/team/:teamId\n`);
    console.log(`  Workouts:`);
    console.log(`    GET    ${baseUrl}/api/workouts`);
    console.log(`    GET    ${baseUrl}/api/workouts/:id`);
    console.log(`    POST   ${baseUrl}/api/workouts\n`);
    console.log(`  Database Stats:`);
    console.log(`    GET    ${baseUrl}/api/db-stats\n`);
}
