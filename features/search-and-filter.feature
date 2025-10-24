@search @filter @product-discovery
Feature: Search & Filter
  As a customer
  I want to search for products and apply filters
  So that I can quickly find the specific tools I need

  @search @search-functionality @smoke
  Scenario: Search for a specific product by name
    Given I am on the Practice Software Testing homepage
    Then I should see the correct page title
    When I enter "hammer" in the search box
    And I click the search button
    Then I should see the search results page
    And I should see products related to "hammer" displayed in the results
    And I should see the search term "hammer" in the results
    And I should see "Thor Hammer" in the search results

  @filter @sort @filter-functionality @regression
  Scenario: Filter and sort products on the main page
    Given I am logged in to my account
    And I am on the Practice Software Testing homepage
    When I apply filters and sorting with the following criteria:
      | category  | Hand Tools         |
      | min_price | 19                 |
      | max_price | 45                 |
      | sort      | Price (High - Low) |
    Then I should see the filtered and sorted products displayed correctly