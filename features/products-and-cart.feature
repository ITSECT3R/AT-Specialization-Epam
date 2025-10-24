@products @cart @e-commerce
Feature: Products Shop & Cart Testing
  As a customer
  I want to browse products, view details, and manage my cart
  So that I can shop effectively and make informed purchase decisions

  @products @product-details @regression
  Scenario: View detailed product information
    Given I am on the Practice Software Testing homepage
    When I click on the Bolt Cutters product from the product list
    Then I should be on the product details page
    And I should see the product name "Bolt Cutters"
    And I should see the product image is visible
    And I should see the product description is visible
    And I should see the product price "$48.41"
    And I should see the product description contains expected text
    And I should see related products including "Combination Pliers"

  @products @cart @add-to-cart @smoke
  Scenario: Add Thor Hammer to shopping cart
    Given I am on the Practice Software Testing homepage
    When I click on the Thor Hammer product
    Then I should be on the Thor Hammer product details page
    And I should see the default quantity is "1"
    When I click the "Add to Cart" button
    Then I should see the cart quantity updated to "1"
    When I navigate to the shopping cart page
    Then I should be on the checkout page
    And I should see the Thor Hammer product in my cart
    And I should see the correct quantity "1" and price "$11.14"

  @products @favorites @regression
  Scenario: Add product to favorites list
    Given I am logged in to my account
    When I navigate to the Long Nose Pliers product details page
    Then I should be on the product details page
    And I should see the product name "Long Nose Pliers"
    When I click the "Add to Favorites" button
    Then I should see a confirmation message that the product was added to favorites