# Package.json Scripts Documentation

This document explains all the npm scripts available in this project and their purposes.

## 🏃‍♂️ Test Execution Scripts

### Main Test Commands

- **`npm test`** - Runs Mocha tests (default test runner for Module 5)
- **`npm run test:all`** - Runs both Mocha and Playwright tests sequentially

### Mocha + Chai Tests (Module 5)

- **`npm run test:mocha`** - Execute all Mocha tests with Chai assertions
- **`npm run test:mocha:watch`** - Run Mocha tests in watch mode (re-runs on file changes)

### Playwright Tests (Module 4)

- **`npm run test:playwright`** - Execute all Playwright E2E tests (headless mode)
- **`npm run test:playwright:headed`** - Run Playwright tests with visible browser
- **`npm run test:playwright:debug`** - Debug Playwright tests with step-by-step execution
- **`npm run test:playwright:ui`** - Open Playwright's interactive UI mode

### Individual Playwright Test Files

- **`npm run test:login`** - User registration and authentication tests
- **`npm run test:profile`** - User profile management tests
- **`npm run test:products`** - Product browsing and cart operation tests
- **`npm run test:search`** - Search and filtering functionality tests
- **`npm run test:checkout`** - Complete checkout process tests
- **`npm run test:sequential`** - Run all Playwright tests in dependency order

## 📊 Reporting & Maintenance

- **`npm run show-report`** - Open Playwright HTML test report in browser
- **`npm run install-browsers`** - Install/update Playwright browser binaries
- **`npm run clean`** - Remove test artifacts (reports, results, coverage)

## 🛠️ Development Tools

- **`npm run lint`** - Code linting (placeholder - not configured yet)
- **`npm run format`** - Code formatting (placeholder - not configured yet)

## 📋 Script Organization

Scripts are organized by category:

1. **Primary Commands** - Main test execution
2. **Framework-Specific** - Mocha vs Playwright commands
3. **Individual Tests** - Granular test execution
4. **Reporting** - Test result viewing and browser management
5. **Development** - Code quality and maintenance tools

## 🎯 Usage Examples

```bash
# Quick test run (Mocha only)
npm test

# Full test suite
npm run test:all

# Debug a specific issue
npm run test:playwright:debug

# Development with auto-reload
npm run test:mocha:watch

# Individual test development
npm run test:login

# View latest results
npm run show-report
```

This organization ensures clear separation between testing frameworks while maintaining consistency in naming conventions.
