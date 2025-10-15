@favorites @loginFavorites
Feature: Favorites Functionality  
  
  Scenario: User adds the product "Combination Pliers" to their favorites list
    Given the user is viewing the details page of the product "Combination Pliers"
    When the user adds the product to their favorites
    And the user navigates to their favorites page
    Then the product "Combination Pliers" should appear in the favorites list