# EPAM AT Specialization - Test Automation Framework

A comprehensive test automation framework using **Playwright** for browser automation with **Chai** assertions for enhanced readability and expressiveness.

## 🏗️ Project Structure

```
AT-Specializtion-Epam/
├── 📁 tests/                          # Playwright + Chai Tests
│   ├── 1-login.spec.ts                 # User authentication tests
│   ├── 2-profile.spec.ts               # User profile management
│   ├── 3-products-and-cart.spec.ts     # Product browsing & cart operations
│   ├── 4-search-and-filter.spec.ts     # Search & filtering functionality
│   ├── 5-checkout.spec.ts              # Complete checkout process
│   └── utils/                          # Shared utilities
│       ├── get-user.ts                 # User data generation
│       ├── login.ts                    # Login utilities
│       ├── register.ts                 # Registration utilities
│       ├── filter-utils.ts             # Reusable filter functions
│       └── test-config.ts              # Shared configuration
├── 📁 roadmap-tests/                   # Project documentation
│   └── current-steps.md                # Current progress tracking
├── 📁 playwright-report/               # Playwright test reports
├── 📁 test-results/                    # Test execution results
├── playwright.config.ts               # Playwright configuration
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

## 🧪 Testing Framework

### 🎭 Playwright + Chai Tests

End-to-end tests for the [Practice Software Testing](https://practicesoftwaretesting.com/) application using Playwright for browser automation and Chai for assertions.

**Features:**

- ✅ Playwright for robust browser automation
- ✅ Chai assertions for readable and expressive test validation
- ✅ Sequential test execution (login test runs first)
- ✅ Reusable utilities and configurations
- ✅ Comprehensive BDD scenarios following Gherkin syntax
- ✅ Advanced filtering and search functionality
- ✅ Complete e-commerce workflow testing
- ✅ Separation of concerns: Playwright for automation, Chai for assertions

## 📊 Reports & Maintenance 🎯 Test Scenarios Covered

### check the SCRIPTS.md file for info on reports and test scripts :D

## 🛠️ Configuration Files

### Playwright Configuration (`playwright.config.ts`)

- Sequential test execution with `workers: 1`
- Cross-browser testing support
- Report generation settings
- Timeout and retry configurations
- Base URL configuration for easy navigation

### TypeScript Configuration (`tsconfig.json`)

- Modern ES target settings
- Type definitions for Playwright and Chai
- Module resolution configuration

## 🏆 Learning Objectives

### Module 3 Achievements

- ✅ Created Test with Gherkin Syntax
- ✅ BDD test implementation following Gherkin scenarios
- ✅ 8 Tests written covering multiple features

### Module 4 Achievements

- ✅ Playwright test framework setup and configuration
- ✅ BDD test implementation following Gherkin scenarios
- ✅ Test dependency management and execution order
- ✅ Reusable utility functions and shared configurations
- ✅ Advanced locator strategies and wait patterns

### Module 5 Achievements

- ✅ Playwright + Chai integration and setup
- ✅ Implementation of all tests with Chai assertion library
- ✅ Separation of browser automation (Playwright) and assertions (Chai)
- ✅ Enhanced test readability and expressiveness
- ✅ Consistent assertion patterns across all test files

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
- [Chai Assertion Library](https://www.chaijs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Project Status**: ✅ Complete  
**Current Branch**: `playwright-chai-integration`  
**Last Updated**: September 2025
