# Cheeseria_PZ

## Deliverables:
- Frontend (React, MUI)
- Backend (NodeJS, ExpressJS, Swagger)
- Unit tests for two frontend component
- Dockerfile
(Screenshots below)


The backend features a straightforward API designed for handling the predefined cheese dataset.
APIs:
- GET /cheeses: Retrieves a list of all cheeses.
- GET /cheeses/{id}: Retrieves a single cheese by its ID.
- POST /cheeses: Adds a new cheese to the collection.
- PUT /cheeses/{id}: Updates an existing cheese.
- DELETE /cheeses/{id}: Deletes a cheese by its ID.

Within the project's UI, users can find a listing of all five cheeses stored in the backend. Additionally, a section enables users to calculate the price of cheese based on its weight. The UI also incorporates two buttons facilitating the update and addition of cheese data within the backend. These functionalities are intentionally streamlined due to time constraints, serving primarily as a showcase of CRUD (Create, Read, Update, Delete) operations.

The website allows users to perform essential CRUD actions on cheese data. When updating a cheese entry, the system prefixes the cheese name with "Updated" and sets the price per kilo to $1000. Adding cheese data is a one-time operation, as attempting to add it again triggers a failure notification.

## Installation

Requires [Node.js](https://nodejs.org/) v14+ to run.

Install the dependencies and start the server and client.

```sh
cd server
npm i
npm start
```

```sh
cd client/cheese
npm i
npm start
```

## For actual working websites (what I would do differently with more time):

1. Authorization (users and admin) and potentially authentication based on requirements. 
2. Actual database (preferably SQL).
3. Performance optimization.
  - A better way to store images. Currently, there are only 6 images stored on the client side which will affect website performance if the dataset gets bigger. A hosting service should be considered.
  - Separate API calls from the UI layer.
4. Deployment and CI/CD
  - URLs need to be put somewhere safe. Both sides of the project are running on different ports at localhost. A more secure and universal way to handle networking would be needed.
5. More comprehensive test suites.
5. Better logging.
6. Better styling.

## Screenshots

  ![frontend](https://github.com/hariywill/Cheeseria_PZ/assets/21359358/a22f337c-b626-4741-84c2-3ffb1d9d78c7)
  ![swagger](https://github.com/hariywill/Cheeseria_PZ/assets/21359358/1392c51e-cc62-405c-885e-5ac52ff461a5)
  ![unit test result](https://github.com/hariywill/Cheeseria_PZ/assets/21359358/a4375f97-40c1-4d96-a547-aa9725794464)



