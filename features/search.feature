@search
Feature: Product Search  
  
  Scenario: User searches for a specific product
    Given the user is on the main page
    When the user searches for "Thor Hammer" in the search bar
    Then the search results should include the product "Thor Hammer"
    And the user should be able to open the product details page