@language
Feature: Language Selection
  
  Scenario: User changes site language
    Given the user is on the main page
    When the user selects "DE" from the language dropdown
    Then the site interface should be displayed in the selected language
    And main navigation labels should be translated to the selected language
