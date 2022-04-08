# Shopping List App

## Live URL

https://shopping-list-v2-simon.herokuapp.com/

## Main Goals

1. Create from scratch a reactive (can perform actions) and responsive (fit for mobile/tablet) website.
2. Store (in local storage) and manage (move from one category to another) data added by the user in a user freindly way.
3. Fetch and make use of data from APIs
4. Use UI/UX libraries.
5. Manage actions and state with a global state with redux library

## Project Structure

The website have two routes: Home and Stores.
A navbar is accessible in both routes (via HOC) from which the user can navigate between the routes, set the currency and interval time and also switch between light and dark mode styles.
The exchange rate of the currency is fetched from an API every 10 sec (configurable) in the currency component with a "hook" function. It is stored and availible in the global state.
The website starts with a display of a full page loading for the initial currency fetch. If the initial fetch is failed a full page error is displayed.
In the home page there is a secondary navbar which allows the display of two categories of items (in delivery and arrieved) and the option to add a new item.
In the body of the pages is a data table that shows the data selected by the user. From the home page the two availble categories and from the stores page a summury of all the stores and prices.
Data is managed in the "father components" and passed to the data table for display.
The data table has an action column from which the user can set item as recieved/in delivery, edit and delete.
In the home page, "add new item" opens a form dialog.
In the form dialog there is an autocomplete component which fetches suggestions from an API. If an item is selected from there, a price in USD is added to the form.
The currency input is set by default to the current state (selected by the user).
Store is added manually.
A date picker can allow the user to select a "recive date estimation" that must not be in the past.
Only if all the fields are full, an item can be added to delivery list. It is stored in the state and in the local storage (always in USD).
At the bottom of both pages is a "clear all" button that deletes all items.
Important actions (and errors) trigger a "toast" message for the user.
