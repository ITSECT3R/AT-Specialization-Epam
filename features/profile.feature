@profile @user-management
Feature: User Profile Management
  As a registered user
  I want to update my profile information
  So that my account details stay current and accurate

  @profile @regression @user-data
  Scenario: Update user profile information
    Given I am logged in to my account
    When I navigate to my profile page
    Then I should be on the profile page
    When I update my personal information with new details
    And I save the changes
    Then my personal information should be updated successfully
    And the updated data should persist in the form fields