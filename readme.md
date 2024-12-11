# Webhook Receiver Project

This project contains both the backend and frontend code for the Beceptor application. The backend is built with Node.js and Express, while the frontend is built with React. The project also includes configuration for deploying to Azure using GitHub Actions.

## Folder Structure

### `backend/server.js`
This file contains the server-side code for the application. It is responsible for:
- Setting up an Express server.
- Configuring middleware for CORS and JSON body parsing.
- Serving static files from the React frontend build.
- Handling API endpoints for document-related requests.
- Connecting to Azure Cosmos DB to save and retrieve documents.
- Serving the React frontend app for all other routes.

### `frontend/src/App.js`
This file contains the main React component for the frontend application. It is responsible for:
- Fetching data from the `/documents` endpoint on the server.
- Storing the fetched documents in the component's state.
- Rendering the documents in a styled format.
- Displaying each document's payload in a readable format.

### `frontend/src/App.css`
This file contains the CSS styles for the React application. It is responsible for:
- Styling the main application container and header.
- Styling each document with a background color, padding, and rounded corners.
- Adding a bottom border to separate each document visually.

### `.env`
This file contains environment variables used by the server. It is responsible for:
- Storing sensitive information such as the Cosmos DB endpoint, key, database ID, and container ID.
- Configuring the server port.

### `.gitignore`
This file specifies which files and directories should be ignored by Git. It is responsible for:
- Ignoring the `node_modules` directory to avoid committing dependencies.
- Ignoring the `.env` file to avoid committing sensitive information.

### `main_webhook-receiver-p.yml`
This file contains the GitHub Actions workflow for building and deploying the application. It is responsible for:
- Checking out the code from the repository.
- Setting up Node.js environments for both the frontend and backend.
- Installing dependencies and building the frontend and backend.
- Moving the frontend build output to the backend directory.
- Zipping the backend directory for deployment.
- Uploading the zipped artifact.
- Downloading the artifact in the deployment job.
- Logging in to Azure and deploying the application to an Azure Web App.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Summary
This project contains both the backend and frontend code for the application, along with configuration files for environment variables, Git, and CI/CD. The backend server handles API requests and serves the React frontend, while the frontend fetches and displays data from the backend. The GitHub Actions workflow automates the build and deployment process to Azure.