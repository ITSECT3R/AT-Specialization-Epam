@login @smoke
Feature: User Authentication
  As a user of the Practice Software Testing website
  I want to be able to register and login
  So that I can access my account and manage my profile

  @smoke @regression
  Scenario: User registration and login process
    Given I am on the Practice Software Testing homepage
    When I register a new account with valid credentials
    And I login with the newly created account credentials  
    Then I should be successfully logged in and see my account dashboard
    And I should see my name displayed in the navigation menu
