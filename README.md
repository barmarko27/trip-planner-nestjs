# Trip Planner

![Trip Planner Logo](logo.webp)

Trip Planner is a Dockerized microservice application built with NestJS, designed for planning and retrieving trips from a third-party API. The application follows the Domain-Driven Design (DDD) pattern and is fully tested to ensure reliability and maintainability.

---

## Features
- **Microservice Architecture**: Built with the DDD pattern for clear separation of concerns.
- **API Documentation**: Swagger documentation available for easy API exploration.
- **Third-Party Integration**: Retrieves trip data from an external API.
- **Dockerized Deployment**: Simplified containerization with Docker Compose.

---

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Docker and Docker Compose
- Node.js (for local development, optional)

### Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/barmarko27/trip-planner-nestjs
   cd trip-planner-nestjs
   ```

2. **Configure Environment Variables**
    - Copy the `.env.dist` file to `.env` and populate it with your local configuration for the third-party API.
      ```bash
      cp .env.dist .env
      ```
    - Modify the `.env` file with your local values (do not edit `.env.dist`).

3. **Update Docker Compose Override**
    - Copy the `compose.override.yml.dist` file to `compose.override.yml` and populate it with your local configurations.
      ```bash
      cp compose.override.yml.dist compose.override.yml
      ```
    - Modify the `compose.override.yml` file as needed.

4. **Build and Start the Application**
   ```bash
   docker-compose up --d
   ```

5. **Wait for the Application to Start**

   The application will take a few seconds to start. You can check the logs with:
   ```bash
   docker-compose logs -f
   ```
   
6. **Access Swagger Documentation**
   Once the application is running, Swagger documentation will be available at:
   ```
   http://localhost:[CONFIGURED-PORT]/api
   ```
   Replace `[CONFIGURED-PORT]` with the port specified in your `compose.override.yml` file.

---

## Testing

The application is fully tested. To run the tests:

1. Enter the container:
   ```bash
   docker exec -it [container_name] /bin/bash
   ```
2. Run the test suite:
   ```bash
   yarn test
   ```

---

## Project Structure
The project is organized following the DDD (Domain-Driven Design) pattern:
- **Domain**: Core business logic and entities.
- **Application**: Controllers and application services.
- **Infrastructure**: External dependencies and integrations.
---