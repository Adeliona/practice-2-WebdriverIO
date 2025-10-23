@registration
Feature: User Registration 
 
  Scenario: User signs up with valid credentials
    Given the user is on the registration page
    When the user submits the registration form with a valid username, email, and password
    Then the user should be redirected to the login page
    And the login form should be displayed