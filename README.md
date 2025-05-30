# Mantra Attorney – Backend API

This is the backend for the **Mantra Attorney Law Firm Website**, built with **Node.js + Express** and deployed via **Render**.

It handles:
- Booking form submissions (with file uploads)
- JWT-based admin authentication
- Email notifications via Nodemailer
- Optional CMS APIs for testimonials and blog articles
- AWS S3 file upload integration (simulated/demo-ready)

---

## Technologies used

- **Node.js** / **Express**
- **MongoDB** via Mongoose
- **JWT Authentication**
- **Multer** for file handling
- **AWS SDK** (S3 upload)
- **Nodemailer** (email alerts)
- **dotenv**, **CORS**, **Nodemon**

---

##  Getting Started

### 1. Clone the project
```bash
git clone https://github.com/Gaius-Okoase/mantra-attorney-website.git
cd backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file with the following variables
> Do **not** commit your `.env` file. Use it locally only.

```env
MONGO_URI=<your_uri>
ADMIN_USERNAME=<your_admin_username>
ADMIN_PASSWORD=<your_admin_password>
JWT_SECRET=<your_secret_key>
PORT=3500 || <your_preferred_port>
EMAIL_USER=<your_email>
EMAIL_PASSWORD=<your_app_password>
ADMIN_EMAIL=<your_admin_email>
```

### 4. Run the server locally
```bash
npm start
```
The backend will start on `http://localhost:3500`.

---

## Admin Auth Flow

- `POST /api/auth/login` → Returns JWT on valid login
- Protected routes use a JWT middleware to verify token access

Example of protected usage:
```http
GET /api/bookings
Authorization: Bearer <your_jwt_token>
```

---

## Booking Flow

- `POST /api/bookings` → Accepts booking form + optional file
- Sends confirmation email to admin
- Stores data in MongoDB
- Uploads file to S3 (Demo)

---

## CMS Endpoints (Demo-ready)

> These are prepared but **not fully implemented in frontend** (due to time constraints).  
> Eventually hardcoded in the final UI.

- `POST /api/testimonials` → Add testimonial
- `GET /api/testimonials` → Get all testimonials
- `DELETE /api/testimonials/:id` → Delete testimonial

Same for `/api/articles` if enabled.

---

## API Testing

You can test all endpoints with Postman or Thunder Client.  
The project includes error handling for:
- Invalid login
- Missing fields
- Unauthorized access
- File upload issues

---

## Project Structure

```bash
/backend
|- config/              - MongoDB configuration
|- controllers/         - Route logic
|- middleware/          - Mongoose schemas
|- models/              - API route files
|- node_modules         - Dependencies (ignored)
|- public               - Admin login and dashboard page
|- routes/              - Auth, upload, error handling
|- utils/               - S3 upload, email sender
|- .gitignore           - All ignored files and folders
|- .env                 - Environment variables (ignored)
|- server.js            - Entry point
|- README.md
```

---

## Deployment

The backend is deployed to Render.  
Just push to GitHub, and Render redeploys automatically.

---

## ✅ Status Summary

| Feature                        | Status     |
|--------------------------------|------------|
| Booking API                   | ✅ Working  |
| Email Notification            | ✅ Working  |
| Admin Auth (JWT)              | ✅ Working  |
| S3 Upload (Simulated)         | ✅ Ready for future |
| CMS Endpoints                 | ⛔ Not connected to frontend |
| Dashboard Auth Route          | ✅ Working  |

---

## License

This backend project is built for educational and demo purposes under the **M4ACE Hackathon**. Not for production use.