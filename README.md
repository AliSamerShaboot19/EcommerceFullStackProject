# EcommerceFullStackProject

A full-stack ecommerce application built with React on the frontend and Node.js/Express on the backend. The project includes product browsing, cart management, authentication, checkout, real-time support chat, order tracking, and an admin workflow.

Live Demo: https://ecommercefullstackproject.onrender.com/

## Demo Preview

- Frontend: React + Vite
- Backend: Node.js + Express + TypeScript
- Database: PostgreSQL
- ORM: Drizzle
- Authentication: Clerk
- Payments: Polar
- Media: ImageKit
- Chat: Stream
- Monitoring: Sentry

## Features

- Product catalog with category browsing
- Search and product detail pages
- Shopping cart with quantity updates
- Secure sign-in and user management with Clerk
- Checkout flow with Polar payment integration
- Order creation and order history
- Admin-ready backend structure and store management
- Real-time customer support chat
- Image upload and media delivery with ImageKit
- Error monitoring with Sentry
- Dockerized deployment setup

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- Tailwind CSS
- Zustand
- React Router
- Clerk React SDK
- ImageKit React SDK
- Sentry React

### Backend
- Node.js
- Express
- TypeScript
- PostgreSQL
- Drizzle ORM
- Clerk Backend SDK
- Polar API integration
- Stream Chat API
- Sentry Node

## Project Structure

```txt
EcommerceFullStackProject/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── lib/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── webhooks/
│   │   ├── index.ts
│   │   └── instrument.ts
│   ├── scripts/
│   ├── package.json
│   ├── tsconfig.json
│   └── drizzle.config.ts
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
├── Dockerfile
├── .gitignore
├── .dockerignore
├── README.md
└── package.json
```

## Prerequisites

Before running this project locally, make sure you have:

- Node.js 22+
- npm
- PostgreSQL database
- Clerk account
- Polar account
- Stream account
- ImageKit account
- Optional: Sentry project

## Environment Variables

Create the required environment variables for the backend and frontend.

### Backend (.env)

```env
NODE_ENV=development
PORT=3001

DATABASE_URL=your_postgres_connection_string

CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret

FRONTEND_URL=http://localhost:5173

POLAR_ACCESS_TOKEN=your_polar_access_token
POLAR_WEBHOOK_SECRET=your_polar_webhook_secret
POLAR_API_BASE=https://api.polar.sh
POLAR_CHEKOUT_PRODUCT_ID=your_polar_checkout_product_id

STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_url_endpoint

SENTRY_DSN=your_sentry_dsn_optional
```

### Frontend

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=http://localhost:3001
```

## Local Development

### 1. Clone the repository

```bash
git clone https://github.com/AliSamerShaboot19/EcommerceFullStackProject.git
cd EcommerceFullStackProject
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

```bash
cd ../backend
npm install
```

### 4. Start the backend

```bash
cd backend
npm run dev
```

### 5. Start the frontend

```bash
cd frontend
npm run dev
```

The application should be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3001

## Production Build

This project includes a Dockerfile for production deployment.

### Build Docker image

```bash
docker build -t ecommercefullstackproject .
```

### Run Docker container

```bash
docker run -p 3001:3001 ecommercefullstackproject
```

## Deployment

The project is configured for deployment on Render and is live here:

https://ecommercefullstackproject.onrender.com/

## Scripts

### Backend

```bash
npm run dev
npm run build
npm run start
npm run db:push
npm run db:seed
```

### Frontend

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Notes

- The backend handles authentication, checkout, order processing, and webhook verification.
- The frontend is a React single-page app for storefront and customer interactions.
- PostgreSQL is used as the main relational database layer.
- The app is structured for future extension with more admin tools, analytics, and product management features.

## License

This project is licensed under the ISC License.

## Author

Ali Samer Shaboot
