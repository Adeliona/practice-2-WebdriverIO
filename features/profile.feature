@profile @loginProfile
Feature: User Profile Management  
  
  Scenario: User updates profile information
    Given the user is logged in and on the profile page
    When the user updates their display name and phone number
    And saves the profile changes
    Then the page should show the message "Your profile is successfully updated!"
    And the updated name and phone number should be visible on the profile page
