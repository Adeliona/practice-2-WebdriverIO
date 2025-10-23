@details
Feature: Product Details

  Scenario: User views product details
    Given the user is on the main page
    When the user clicks on a product name or image
    Then the user should be taken to the product details page
    And the page should display the product name, description, price, and "Add to Basket" button
