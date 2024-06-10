# Project Name

## Description

This application consisted on having details available on the already added movies.

## Things Needed / SETUP

1- database named `saga_movies_weekend`
2- Running the already made queries from `database.sql` on the `saga_movies_weekend` database

3- to `npm install`
4- `npm run test`: verify that the Cypress tests work
    -One test should pass right away, the rest should fail
5- `npm run server` run server on PORT 5001
6- `npm run client` run React app on PORT 5173
7- import react router and route

## the tables

1- it is a many to many relationship between the tables

## The Home/List Page

1- Should view all the movie posters and titles from the movie database
2- Each poster should be an img element and be able to be clicked.
    -which will teleport the user to the details/description page
3- For the tests to pass, each movie items need `data-testid="movieItem"` attribute
4- Each poster's img element needs `data-testid="toDetails"` to pass

## Details Page

1- This page shows all details, inc ALL the genres, from the selected movie
    -Using Sagas and Redux to handle the requests and data
2- The details page needs `data-testid="movieDetails"` attribute
3- Also needing a button that brings the user back to the main page
4- The "back to movie list" button must have a `data-testid="toList"` attribute.
5- I needed to use req.params and useParams to accomplish this problem.
6- To move back to the main page i used useHistory and attached the url from the Route.

## Extras
1- I styled it up a bit by using a display and adding a background color.
2- Also making the images into cards.

Additional README details can be found [here](https://github.com/PrimeAcademy/readme-template/blob/master/README.md).
