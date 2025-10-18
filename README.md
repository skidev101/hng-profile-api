# Dynamic Profile API

## Overview
A robust Node.js Express API that serves a dynamic user profile, integrates an external cat fact API, and includes comprehensive error handling. Designed to showcase modern backend development practices and efficient external service integration.

## Features
- **Dynamic User Profile**: Serves personal information (email, name, stack) upon request.
- **External API Integration**: Fetches real-time cat facts from `catfact.ninja` to enrich the profile data.
- **Robust Error Handling**: Implements graceful error management for external API timeouts (504 Gateway Timeout) and unavailability (502 Bad Gateway).
- **CORS Management**: Configured middleware to allow requests from specified origins.
- **Request Logging**: Custom middleware for logging incoming HTTP method and path for monitoring.
- **Health Check Endpoint**: Provides a simple endpoint to verify the API's operational status.

## Getting Started
To get this project up and running locally, follow these instructions.

### Installation
1.  **Clone the Repository**:
    ```bash
    git clone (https://github.com/skidev101/hng-profile-api.git)
    ```
2.  **Navigate to Project Directory**:
    ```bash
    cd hng-profile-api
    ```
3.  **Install Dependencies**:
    The project uses `pnpm` as its package manager.
    ```bash
    pnpm install
    
    ```
4.  **Start the Server**:
    For development with auto-restarts on file changes:
    ```bash
    pnpm dev
  
    ```
    The server will start on the configured port, typically `http://localhost:3000`.

### Environment Variables
The following environment variable is required to run the project:

-   `PORT`: The port number on which the server will listen for incoming requests.
    *   **Example**: `PORT=5000`
    *   **Default**: If not set, the server will default to port `3000`.

## API Documentation

### Base URL
`http://localhost:[PORT]` (or `https://your-deployed-url.com`)

### Endpoints

#### GET /me
**Overview**: Retrieves a dynamic user profile along with a random cat fact fetched from an external API. This endpoint demonstrates integration with a third-party service and robust error handling for external dependencies.
**Request**:
No request body required.

**Response**:
```json
{
  "status": "success",
  "user": {
    "email": "skidev101@gmail.com",
    "name": "Ojomona Ethan Inedu",
    "stack": "Node.js/Express"
  },
  "timestamp": "2023-10-27T10:30:00.000Z",
  "fact": "Cats can make over 100 different sounds whereas dogs can only make about 10."
}
```

**Errors**:
-   `504 Gateway Timeout`: Occurs if the external Cat Facts API times out (e.g., after 5 seconds).
-   `502 Bad Gateway`: Occurs if the external Cat Facts API is unavailable or returns an error.
-   `500 Internal Server Error`: A generic server error occurred when processing the request.

#### GET /
**Overview**: A simple health check endpoint to verify the API's operational status and list available main endpoints. Useful for monitoring and deployment checks.
**Request**:
No request body required.

**Response**:
```json
{
  "message": "Profile API is good",
  "endpoints": ["/me"],
  "status": "running"
}
```

**Errors**:
-   `None specific to this endpoint.`

#### GET * (404 Handler)
**Overview**: Catches requests made to undefined API endpoints, providing a standardized error response.
**Request**:
Any request to an invalid or non-existent path.

**Response**:
```json
{
  "status": "error",
  "message": "Endpoint not found"
}
```

**Errors**:
-   `404 Not Found`: The requested endpoint does not exist on the server.

## Usage
After starting the server, you can access the API endpoints using tools like cURL, Postman, or directly from your browser.

**Access the profile endpoint:**
```bash
curl http://localhost:3000/me
```

**Check the API status:**
```bash
curl http://localhost:3000/
```

## Technologies Used
| Technology | Description |
| :--------- | :---------- |
| [Node.js](https://nodejs.org/) | JavaScript runtime environment for building scalable network applications. |
| [Express.js](https://expressjs.com/) | Fast, unopinionated, minimalist web framework for Node.js. |
| [Axios](https://axios-http.com/) | Promise-based HTTP client for making requests to external resources. |
| [CORS](https://github.com/expressjs/cors) | Express middleware to enable Cross-Origin Resource Sharing. |
| [Nodemon](https://nodemon.io/) | A utility that monitors for any changes in your source and automatically restarts your server. |

## Contributing
Contributions are welcome! If you'd like to improve this project, please follow these steps: ✨

*   Fork the repository.
*   Create a new branch (`git checkout -b feature/your-feature`).
*   Make your changes.
*   Commit your changes (`git commit -m 'Add new feature'`).
*   Push to the branch (`git push origin feature/your-feature`).
*   Open a Pull Request. 

## License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Author
**Ojomona Ethan Inedu**
*   Email: `skidev101@gmail.com`
*   Twitter: `https://x.com/monaski_`

## Badges
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18.2-blue.svg)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![pnpm](https://img.shields.io/badge/pnpm-8.15.0-orange.svg)](https://pnpm.io/)
