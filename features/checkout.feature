@checkout @e-commerce @payment
Feature: Checkout Process
  As a customer
  I want to complete the checkout process
  So that I can purchase products from the store

  @checkout @payment @critical @regression
  Scenario: Complete checkout process with product in cart
    Given I am on the Practice Software Testing homepage
    And I am logged in to my account
    When I navigate to the "Combination Pliers" product page
    Then I should see the product details page
    And the product name should include "Combination Pliers"
    When I add the product to my cart
    Then I should see the cart has been updated
    When I proceed to the checkout page
    Then I should be on the checkout overview page
    And I should see "Combination Pliers" in my cart
    When I proceed through checkout step 1
    And I proceed through checkout step 2
    And I fill in my shipping information:
      | field      | value           |
      | street     | 123 Test Street |
      | city       | Test City       |
      | state      | Test State      |
      | country    | United States   |
      | postalCode | 12345          |
    And I proceed through checkout step 3
    And I complete the payment process
    Then I should see the payment success confirmation