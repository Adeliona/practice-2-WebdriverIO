@basket
Feature: Basket Functionality

  Scenario: User adds a product to the basket
    Given the user is on the product listing page
    When the user clicks on a product name
    And the user adds the product to the basket
    And the user navigates to the basket
    Then the basket should list the selected product with correct details
