A virtual marketplace where users can upload, edit, delete products, and purchase products from other users. This project includes:

[Server:](./Server/README.md): Backend API for managing products, user authentication, and data storage.
[Client](./Client/README.md): Frontend for user interaction with features like product listings, management, and checkout.

## Prerequisites

### backend

- Node.js (v16+ recommended)
- NPM or Yarn
- MongoDB (or a compatible database)

### frontend

- Node.js (v16+ recommended)
- NPM

## Installation

1. **Clone the repository:**
   ```bash
   git clone [Virtual-Market](https://github.com/MoazMubaydin/Virtual-Marketplace.git)
   cd Virtual-Marketplace
   cd Client
   ```
2. **Install frontend dependenices:**

   ```bash
   npm install
   ```

3. **Add frontend environment variables:**

   ```bash
    VITE_DATABASE_API_URL="You DATABASE API"

   ```

4. **Start the client:**

   ```bash
    npm run dev
   ```

5. **Navigate to backend**

   ```bash
       cd ..
       cd Server
   ```

6. **Install server dependenices:**

   ```bash
   npm install
   ```

7. **Add frontend environment variables:**

   ```bash
   PORT=
   ORIGIN="Your URl"
   TOKEN_SECRET="Token for authentication JWT"
   CLOUDINARY_NAME="Cloundiary name"
   CLOUDINARY_API_KEY="Cloundiary API key"
   CLOUDINARY_API_SECRET="Cloundainry API secert"

   ```
