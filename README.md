# Haum - Crypto x Real Estate Platform

Haum is a mock crypto-integrated real estate platform built using the MERN stack and Prisma. Inspired by @lamadev's YouTube tutorial, this project was an opportunity to deepen my full-stack development skills. I redesigned the layout, introduced a fresh color palette, and crafted a custom logo in Illustrator to make it my own.

## Features

- **User Authentication** - Secure signup and login with JWT.
- **Property Listings** - Browse, search, and filter real estate properties.
- **Crypto Payments (Mock)** - Simulated crypto transactions for property purchases.
- **Favorites & Wishlist** - Save and manage favorite properties.
- **Dashboard** - Manage listings with an intuitive UI.
- **Responsive UI** - Fully optimized for desktop and mobile devices.

## Tech Stack

- **Frontend**: React.js, React Router, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Prisma ORM
- **Authentication**: JSON Web Token (JWT)
- **Deployment**:
  - **Frontend**: Vercel
  - **Backend**: Render

## Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/yourusername/haum.git
   cd haum
   ```

2. **Set up the backend**
   ```sh
   cd api
   npm install
   node app.js
   ```

3. **Set up the frontend**
   ```sh
   cd client
   npm install
   npm run dev
   ```

4. **Environment Variables**
   Create a `.env` file in the server directory and add:
   ```env
   DATABASE_URL=mongodb+srv://your-mongo-url
   JWT_SECRET=your-secret-key
   ```


## Screenshots
https://devvsam.vercel.app/assets/mobilemockup.png

## License
This project is for learning purposes and is not intended for commercial use.

---

Feel free to contribute, fork, or share feedback!
