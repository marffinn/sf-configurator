## Deployment Instructions

This project consists of two main parts that need to be deployed:

1.  **The Frontend (React Application):** This is what users interact with in their browser.
2.  **The Backend (Node.js Email Server):** This handles the secure email sending.

### 1. Building the Frontend

To prepare your React application for deployment, you need to create a production-ready build.

**Action:** In your terminal, from the root directory of your project (`c:\Users\Tomasz\Documents\GitHub\sf-configurator`), run:

```bash
npm run build
```

This command will compile your React application and place all the static assets (HTML, CSS, JavaScript, images) into a `build` folder in your project's root directory. These are the files you will upload to your web server for the frontend.

### 2. Deploying the Backend (Node.js Email Server)

The backend server (in the `server` directory) needs to be deployed separately. How you deploy it depends on your server environment. Here are general steps for a common scenario (e.g., a Virtual Private Server or a dedicated server):

**a. Upload the Backend Code:**
*   Copy the entire `server` directory to your server.

**b. Install Node.js and Dependencies on Your Server:**
*   Ensure Node.js and npm are installed on your server.
*   Navigate to the `server` directory on your server and run:
    ```bash
    npm install
    ```

**c. Configure Environment Variables:**
*   On your server, create a `.env` file inside the `server` directory.
*   Populate this `.env` file with your actual email credentials, just like you did locally:
    ```
    EMAIL_HOST=smtp.yourcompany.com
    EMAIL_PORT=587
    EMAIL_SECURE=false # Set to true if your SMTP server uses SSL/TLS
    EMAIL_USER=your_email@yourcompany.com
    EMAIL_PASS=your_email_password
    ```
    **Important:** Never hardcode these credentials directly into your `server.js` file. Environment variables are the secure way to handle them.

**d. Start the Backend Server:**
*   You'll want to run your Node.js server continuously. A process manager like `PM2` is highly recommended for this.
    *   Install PM2 globally on your server: `npm install -g pm2`
    *   Navigate to your `server` directory and start your application: `pm2 start server.js --name email-service`
    *   To ensure PM2 restarts your app on server reboot: `pm2 startup` (follow the instructions it provides).

**e. Configure Frontend to Talk to Backend:**
*   In your `src/Steps.js` file, the `fetch` request currently points to `http://localhost:3001/api/send-recommendations`.
*   **Before building your frontend**, you need to change this URL to the public URL of your deployed backend server (e.g., `https://api.yourwebsite.com/api/send-recommendations`). You might want to use an environment variable for this in your React app as well (e.g., `process.env.REACT_APP_BACKEND_URL`).

**f. Serve the Frontend Files:**
*   Upload the contents of the `build` folder (generated in step 1) to your web server (e.g., Apache, Nginx, or a static file hosting service). Configure your web server to serve these static files.

