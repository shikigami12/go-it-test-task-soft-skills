# TravelTrucks - Campervan Rental Frontend 🚚💨

This project is the frontend application for "TravelTrucks," a company specializing in campervan rentals. The web application allows users to browse, filter, and book campervans.

## 🎯 Project Goal

The main goal is to create a user-friendly frontend interface for renting campervans. This includes a home page, a catalog page with filtering capabilities, and a detailed camper page with reviews and a booking form.

## 🌐 Backend API

This frontend application consumes a ready-made backend API for managing campervan listings.

* **API Base URL:** `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/`
* **Main Endpoints:**
    * `GET /campers`: Retrieves all campervan listings. Supports filtering parameters.
    * `GET /campers/:id`: Retrieves details for a specific campervan by its ID.

## 🛠️ Tech Stack

* **Framework/Library:** React
* **Bundler:** Vite
* **State Management:** Redux Toolkit
* **Routing:** React Router
* **API Requests:** Axios
* **Styling:** CSS Modules
* **Icons:** Lucide React
* **Notifications:** React Toastify

## 📋 Features

- **Home Page**: Banner with a call-to-action to explore campervans
- **Catalog Page**: Browse and filter campervans by location, vehicle type, and various amenities
- **Detailed Camper Page**: View detailed information, gallery, reviews, and booking form
- **Favorites**: Add campervans to favorites (persists on page refresh)
- **Filtering**: Multiple filtering options by location, vehicle type, and features
- **Responsive Design**: Optimized for desktop view

## 🚀 Getting Started

### Prerequisites

- Node.js (v16.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd go-it-test-task-soft-skills
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

### Running the Application

To start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173/`

### Building for Production

To build the application for production:
```bash
npm run build
# or
yarn build
```

The build output will be in the `dist` directory.

### Preview Production Build

To preview the production build:
```bash
npm run preview
# or
yarn preview
```

## 🧭 Project Structure

- `/src/components` - Reusable UI components
- `/src/pages` - Page components corresponding to routes
- `/src/clients` - API client using Axios
- `/src/store` - Redux store and slices
- `/src/styles` - CSS variables and global styles
- `/src/assets` - Static assets like images

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

