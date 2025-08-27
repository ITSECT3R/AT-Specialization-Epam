# EPAM AT Specialization - Test Automation Framework

A comprehensive test automation framework combining **Playwright** for E2E testing and **Mocha + Chai** for unit/integration testing, built with TypeScript.

## 🏗️ Project Structure

```
AT-Specializtion-Epam/
├── 📁 tests/                          # Playwright BDD Tests (Module 4)
│   ├── 1-login.spec.ts                 # User authentication tests
│   ├── 2-profile.spec.ts               # User profile management
│   ├── 3-products-and-cart.spec.ts     # Product browsing & cart operations
│   ├── 4-search-and-filter.spec.ts     # Search & filtering functionality
│   ├── 5-checkout.spec.ts              # Complete checkout process
│   ├── test-config.ts                  # Shared configuration & utilities
│   └── filter-utils.ts                 # Reusable filter functions
├── 📁 tests-mocha/                     # Mocha + Chai Tests (Module 5)
│   ├── 1-login-assert.spec.ts          # Tests using Chai Assert interface
│   ├── test-config.ts                  # Mocha test configuration
│   └── [future test files]             # Should & Expect interface tests
├── 📁 roadmap-tests/                   # Project documentation
│   ├── current-steps.md                # Current progress tracking
│   └── mocha-integration-module5.md    # Module 5 requirements
├── 📁 playwright-report/               # Playwright test reports
├── 📁 test-results/                    # Test execution results
├── playwright.config.ts               # Playwright configuration
├── .mocharc.json                      # Mocha configuration
├── tsconfig.json                      # TypeScript configuration
└── package.json                       # Project dependencies & scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ITSECT3R/AT-Specializtion-Epam.git
   cd AT-Specializtion-Epam
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npm run install-browsers
   ```

## 🧪 Testing Frameworks

### 🎭 Playwright Tests (Module 4)

End-to-end tests for the [Practice Software Testing](https://practicesoftwaretesting.com/) application using BDD methodology.

**Features:**

- ✅ Sequential test execution (login test runs first)
- ✅ Reusable utilities and configurations
- ✅ Comprehensive BDD scenarios following Gherkin syntax
- ✅ Advanced filtering and search functionality
- ✅ Complete e-commerce workflow testing

### ☕ Mocha + Chai Tests (Module 5)

Unit and integration tests demonstrating all three Chai assertion interfaces.

**Assertion Interfaces:**

- **Assert Interface** - Classical assertion style
- **Should Interface** - Expressive BDD style (coming soon)
- **Expect Interface** - Natural language assertions (coming soon)

## 📋 Available Scripts

### 🏃‍♂️ Test Execution

```bash
# Run all Mocha tests (default)
npm test

# Run both Mocha and Playwright tests
npm run test:all

# Mocha + Chai tests only
npm run test:mocha
npm run test:mocha:watch    # Watch mode

# Playwright tests only
npm run test:playwright
npm run test:playwright:headed    # With browser UI
npm run test:playwright:debug     # Debug mode
npm run test:playwright:ui        # Playwright UI mode
```

### 🎯 Individual Test Execution

```bash
# Individual Playwright tests
npm run test:login          # User registration & login
npm run test:profile        # Profile management
npm run test:products       # Products & cart operations
npm run test:search         # Search & filtering
npm run test:checkout       # Checkout process
npm run test:sequential     # All tests in dependency order
```

### 📊 Reports & Maintenance

```bash
# View Playwright test reports
npm run show-report

# Clean up test artifacts
npm run clean

# Install/update Playwright browsers
npm run install-browsers
```

## 🎯 Test Scenarios Covered

### E2E Testing (Playwright)

- **User Authentication**: Registration, login, session management
- **Profile Management**: User profile updates, form validation
- **Product Operations**: Browsing, detailed views, cart management, favorites
- **Search & Filter**: Product search, category filtering, price ranges, sorting
- **Checkout Process**: Complete purchase workflow, payment selection, order confirmation

### Unit/Integration Testing (Mocha + Chai)

- **Assert Interface**: Classical assertion demonstrations
- **Should Interface**: Expressive BDD assertions (planned)
- **Expect Interface**: Natural language assertions (planned)

## 🛠️ Configuration Files

### Playwright Configuration (`playwright.config.ts`)

- Sequential test execution with `workers: 1`
- Cross-browser testing support
- Report generation settings
- Timeout and retry configurations

### Mocha Configuration (`.mocharc.json`)

- TypeScript support via ts-node
- Test file patterns and timeouts
- Reporter settings

### TypeScript Configuration (`tsconfig.json`)

- Modern ES target settings
- Type definitions for testing frameworks
- Module resolution configuration

## 🏆 Learning Objectives

### Module 4 Achievements

- ✅ Playwright test framework setup and configuration
- ✅ BDD test implementation following Gherkin scenarios
- ✅ Test dependency management and execution order
- ✅ Reusable utility functions and shared configurations
- ✅ Advanced locator strategies and wait patterns

### Module 5 Goals

- 🔄 Mocha + Chai integration and setup
- 🔄 Implementation of all three Chai assertion interfaces
- 🔄 Understanding differences between assertion styles
- 🔄 Best practices for different testing scenarios

## 🌐 Application Under Test

**Practice Software Testing**: https://practicesoftwaretesting.com/

A modern e-commerce application designed for test automation practice, featuring:

- User registration and authentication
- Product catalog with categories and filtering
- Shopping cart and checkout functionality
- User profile management
- Search and sorting capabilities

## 🤝 Contributing

This project is part of the EPAM AT Specialization program. For questions or improvements:

1. Create feature branches from `main`
2. Follow the existing code structure and naming conventions
3. Ensure all tests pass before creating pull requests
4. Update documentation for new features

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/)
- [Mocha Testing Framework](https://mochajs.org/)
- [Chai Assertion Library](https://www.chaijs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Project Status**: 🔄 Active Development  
**Current Branch**: `mocha-integration-module5`  
**Last Updated**: August 2025
