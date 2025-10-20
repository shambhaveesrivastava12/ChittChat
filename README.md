# 💬 ChittChat: Real-Time Chatting Application

This project is a **real-time chatting application** built using the **MERN stack** (MongoDB, Express, React, and Node.js). It allows users to engage in dynamic, real-time conversations with one another. The application is responsive and scalable, designed to deliver a seamless chatting experience.


![GitHub repo size](https://img.shields.io/github/repo-size/shambhaveesrivastava12/ChittChat)
![GitHub contributors](https://img.shields.io/github/contributors/shambhaveesrivastava12/ChittChat)
![GitHub issues](https://img.shields.io/github/issues/shambhaveesrivastava12/ChittChat)
![GitHub forks](https://img.shields.io/github/forks/shambhaveesrivastava12/ChittChat)
![GitHub stars](https://img.shields.io/github/stars/shambhaveesrivastava12/ChittChat)
![MIT License](https://img.shields.io/badge/license-MIT-green)


## 📚 Table of Contents

- [🚀 Features](#🚀-features)
- [🖼️ Screenshots](#🖼️-screenshots)
- [🛠️ Technologies](#🛠️-technologies)
- [🧰 Getting Started](#🧰-getting-started)
  - [✅ Prerequisites](#✅-prerequisites)
  - [📦 Installation](#📦-installation)
  - [▶️ Running the Project](#▶️-running-the-project)
  - [🐳 Docker setup](#🐳-docker-setup)
- [📱 Usage](#📱-usage)
- [🤝 Contributing](#🤝-contributing)
- [📬 Contact](#📬-contact)
- [🎉 Hacktoberfest](#🎉-hacktoberfest)
- [📄 License](#📄-license)



## 🚀 Features

- **⚡ Real-time messaging** with [Socket.io](https://socket.io/)
- **📦 MongoDB** for efficient data storage of conversations and user info.
- **🖥️ Responsive UI** built with **React**.
- **🌐 RESTful API** with Express and Node.js.
- **🔐 Secure User authentication** with [JWT](https://jwtsecrets.com/)

## 🖼️ Screenshots

### 1. Login Page

![Login Page Screenshot](./screenshots/login.png)
![Login Page Screenshot](./screenshots/signup.png)

### 2. Chat Interface

![Chat Interface Screenshot](./screenshots/chat1.png)
![Chat Interface Screenshot](./screenshots/chat2.png)

## 🛠️ Technologies

<table>
  <tr>
    <th>💻 Frontend</th>
    <th>⚙️ Backend</th>
    <th>🗄️ Database</th>
    <th>🔁 Real-Time</th>
  </tr>
  <tr>
    <td align="center">
      <a href="https://react.dev/">
        <img src="https://img.shields.io/badge/React.js-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React.js" />
      </a>
    </td>
    <td align="center">
      <a href="https://nodejs.org/">
        <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
      </a>
    </td>
    <td align="center">
      <a href="https://www.mongodb.com/">
        <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
      </a>
    </td>
    <td align="center">
      <a href="https://socket.io/">
        <img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white" alt="Socket.io" />
      </a>
    </td>
  </tr>
</table>


## 🧰 Getting Started

### ✅ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v12 or higher)
- **MongoDB** (Ensure MongoDB is running locally or on a remote server)
- **npm** or **yarn**

### 📦 Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/shambhaveesrivastava12/ChittChat.git
   cd ChittChat
   ```

2. Install dependencies for both the frontend and backend:

   - Backend:
     ```bash
     cd backend
     npm install
     ```
   - Frontend:
     ```bash
     cd ../frontend
     npm install
     ```

3. Create a `.env` file in the backend folder to configure environment variables (e.g., MongoDB connection string, JWT secret).


    ```bash
    PORT=5000
    MONGO_DB_URI=mongodb://localhost:27017/
    JWT_SECRET=your_jwt_secret
    NODE_ENV=development
    BREVO_API_KEY=your_api_key
    FRONTEND_URLS=<your_localhost>,<official_domain>[Multiple links can be provided separated by ',']
    SMTP_EMAIL=your_brevo_smtp_mail
    SMTP_HOST=smtp-relay.brevo.com
    SMTP_PASS=your_smtp_brevo_master_password
    SMTP_PORT=587
    SMTP_USER=your_smtp_brevo_user
    VITE_API_URL=your_backend_link
    VITE_SOCKET_URL=your_backend_link
    ```
   - 💡For ``mongodb`` link, use ```cloud.mongodb.com -> Create Deployment -> Create User -> Allow Traffic 0.0.0.0 -> Connect via drivers ->Use username and password in project```.
   
   - 💡To generate ``jwttoken`` , use ```openssl rand -base64 32``` in your terminal.

### 💡 Setting Up the GIPHY API Key (for GIF Feature)

To enable the GIF search feature, you will need a free API key from GIPHY.

1.  **Create an Account:** Go to the [GIPHY Developers](https://developers.giphy.com/) website and create a free account.
2.  **Create an App:** After logging in to your developer dashboard, click "Create an App". Select the "API" option.
3.  **Get Your API Key:** Give your app a name and description. GIPHY will then provide you with your API Key. Copy this key.
4.  **Add Key to `.env` File:** Open the `.env` file in the root of the project. Find the `VITE_GIPHY_API_KEY` line (or add it if it's not there) and paste your key after the equals sign.

    The line in your `.env` file should look like this:
    ```
    VITE_GIPHY_API_KEY=d2s4f6g8h0j1k2l3...
    ```

5.  **Restart Your Server:** Stop and restart your development server for the key to be loaded.


### ▶️ Running the Project


1. **Start the backend server**:
   ```bash
   cd backend
   npm run server
   ```

2. **Start the frontend React app**:
   ```bash
   cd ../frontend
   npm run dev
   ```

3. **Access the application**:
   Open your browser and go to `http://localhost:5000`.

### 🐳 Docker setup

#### ⚙️ Prerequisites
- Ensure **Docker Desktop** is installed and running on your machine.
- No need to install Node.js, MongoDB, or any dependencies manually.

1. **🖥️ Frontend setup**:
 ```
 cd frontend
 docker-compose up -d
```


✅ This will:

- Build and run the frontend React app in a container.
- Serve the app at http://localhost:3001.
- Automatically install dependencies inside the container.


2. **🔧 Backend setup**:
 ```
 cd backend  
 docker-compose up -d
```
  ✅ This will:

- Build and run the backend Node.js server in a container.
- Connect to MongoDB (also containerized if configured).
- Serve the API at http://localhost:3000.
- Automatically install backend dependencies.

## 📱 Usage

- Register for an account or log in with an existing one.
- Start a chat with online users and enjoy real-time messaging.

## 🤝 Contributing

If you'd like to contribute, feel free to submit a pull request or open an issue.

## 📬 Contact
For questions or suggestions, reach out via [GitHub Issues](https://github.com/shambhaveesrivastava12/ChittChat/issues) or connect with the maintainer [@shambhaveesrivastava12](https://github.com/shambhaveesrivastava12).

## 🎉 Hacktoberfest

This project is participating in Hacktoberfest 2025! 🍂
We welcome contributions from developers of all levels.

### We welcome contributions from developers of all levels!

✅ You Can:
 - Fix bugs 🐛
 - Add features 🚀
 - Improve documentation 📚
 - Enhance UI/UX 🎨

❌ Please Avoid:
- Spammy or low-quality PRs
- Automated PRs without meaningful changes

## 📖 Inspiration
![burakorkmez]((https://github.com/burakorkmez))

## 📄 License

This project is licensed under The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The credit notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

