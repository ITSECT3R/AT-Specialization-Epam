# Project Organization & Standards

This document outlines the organizational standards and conventions used in this test automation project.

## 📁 Directory Structure Standards

### `/tests/` - Playwright BDD Tests

**Purpose**: End-to-end testing using Playwright framework
**Naming Convention**: `{number}-{feature}.spec.ts`

- Sequential numbering ensures proper execution order
- Descriptive feature names for easy identification

**Files:**

- `1-login.spec.ts` - Authentication & user registration
- `2-profile.spec.ts` - User profile management
- `3-products-and-cart.spec.ts` - Product operations & cart
- `4-search-and-filter.spec.ts` - Search & filtering functionality
- `5-checkout.spec.ts` - Checkout process
- `test-config.ts` - Shared configuration & utilities
- `filter-utils.ts` - Reusable filter functions

### `/tests-mocha/` - Mocha + Chai Tests

**Purpose**: Unit/Integration testing with different assertion styles
**Naming Convention**: `{number}-{feature}-{assertion-style}.spec.ts`

**Files:**

- `1-login-assert.spec.ts` - Assert interface demonstrations
- `test-config.ts` - Mocha-specific configuration
- Future: `2-profile-should.spec.ts` - Should interface tests
- Future: `3-products-expect.spec.ts` - Expect interface tests

### `/roadmap-tests/` - Documentation

**Purpose**: Project tracking and requirements documentation

- `current-steps.md` - Progress tracking
- `mocha-integration-module5.md` - Module 5 requirements

## 🏷️ Naming Conventions

### Test Files

- **Format**: `{priority}-{feature}-{variant}.spec.ts`
- **Priority**: Sequential number for execution order
- **Feature**: Clear, descriptive feature name
- **Variant**: Framework or assertion style (optional)

### Test Descriptions

- **Describe blocks**: Feature-focused (`'Login Tests - Using Chai Assert Interface'`)
- **Test cases**: BDD style (`'Should navigate to homepage successfully'`)
- **Comments**: Gherkin-style Given-When-Then structure

### Functions & Variables

- **camelCase** for functions and variables
- **PascalCase** for classes and types
- **UPPER_CASE** for constants
- Descriptive names over abbreviations

## 🔧 Configuration Standards

### TypeScript Configuration

- **Target**: ES2020 for modern JavaScript features
- **Module**: CommonJS for Node.js compatibility
- **Strict mode**: Enabled for type safety
- **Types**: Explicit type definitions for testing frameworks

### Test Configuration

- **Timeouts**: 30 seconds for UI tests, 10 seconds for API tests
- **Retries**: Configured at framework level
- **Parallel execution**: Disabled for Playwright (sequential)
- **Reporters**: Spec format for clear output

## 📋 Code Organization Principles

### 1. Separation of Concerns

- **Test logic** separated from **configuration**
- **Reusable utilities** in dedicated files
- **Framework-specific** code in separate directories

### 2. DRY (Don't Repeat Yourself)

- Common functionality in utility files
- Shared configuration objects
- Reusable helper functions

### 3. Single Responsibility

- Each test file focuses on one feature area
- Utility functions have single, clear purposes
- Configuration files serve specific frameworks

### 4. Explicit Dependencies

- Clear imports and exports
- Type definitions for all dependencies
- Version pinning in package.json

## 🎯 Testing Standards

### Test Structure

```typescript
describe("Feature Area - Assertion Style", () => {
  // Setup/teardown hooks
  before / after / beforeEach / afterEach;

  it("Should perform specific action successfully", async () => {
    // Given - Setup conditions
    // When - Perform action
    // Then - Assert results
  });
});
```

### Assertion Patterns

- **Assert Interface**: `assert.equal(actual, expected, message)`
- **Should Interface**: `result.should.equal(expected)`
- **Expect Interface**: `expect(result).to.equal(expected)`

### Error Handling

- Meaningful error messages
- Appropriate timeouts
- Graceful cleanup in hooks

## 📊 Documentation Standards

### README.md

- Project overview and setup instructions
- Clear script documentation
- Feature descriptions and status

### Code Comments

- JSDoc format for functions
- Inline comments for complex logic
- TODO/FIXME tags for future improvements

### Commit Messages

- **Format**: `type: description`
- **Types**: feat, fix, docs, test, refactor, style
- **Description**: Clear, concise action description

This organization ensures maintainability, scalability, and clear understanding of the project structure for all contributors.
