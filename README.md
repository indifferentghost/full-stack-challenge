# SmartRent Full-Stack Engineering Challenge

## Welcome

First of all, welcome to our full-stack engineering challenge!

If you've made it this far, we are already interested in you. This challenge is not meant to trip you up, it's
designed for us to better learn where your technical skills lie and understand how you solve problems that might
come up in a day-to-day real world application.

## Coding Challenge

For this coding challenge, you will be working on both the backend of the application and the frontend of the application.

### Guidelines

- Use the languages you feel most comfortable in
- Refer to Google or documentation as needed

### Project Description

We are asking you to use a JSON blob that represents a list of fruit, return it from a backend API and then
to create a list in the UI that shows the fruit name, their color, and whether or not they are in season.

You should be able to filter the fruit by querystring to show only fruit of a certain color, AND OR
whether the fruit is in season or not.

### Acceptance Criteria

1. Create your backend webserver
2. Create an API that returns the JSON found in `fruitList.json`
3. Create a simple frontend that fetches the list of fruit from your backend API and loads it into the application state
4. In a list, render the names of the fruit, their colors, and whether or not they are in season or not
5. In the query string allow the user to filter fruit by:
   1. In season or not (`in_season`)
   2. Their color (`color`)
   3. Partial search on name (can be anywhere within the string) (`name`) (example: `app` => `apple`); other examples would be `APP` or `aPp`
6. Ability to change the querystring filters from the UI

### Examples

**Filtering by Color / in Season / Name:**

```
Example 1: /fruit?color=red
Example 2: /fruit?in_season=true
Example 3: /fruit?color=red&in_season=true
Example 4: /fruit?name=app
```

### Stretch Goals

The sky is the limit for customization of this challenge. Here are a few ideas to get you started.

1. Style the frontend
2. Add a database
3. Add tests
