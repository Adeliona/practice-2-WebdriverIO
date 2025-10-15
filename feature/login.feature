@login
Feature: User Login

  Scenario: User signs in with valid credentials
    Given the user is on the login page
    When the user logs in with a valid username and password
    Then the user should be redirected to their profile page
    And the profile page should display the user's account