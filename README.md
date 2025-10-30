# eCo All-in-One Application

**Um aplicativo all-in-one que conecta todas as suas contas** / An all-in-one application that connects all your accounts

eCo Agency - Marketing ESG - Social Impact

## 🚀 Overview

eCo All-in-One is a comprehensive platform that allows you to connect and manage all your social media and business accounts in a single place. Perfect for marketing agencies, social impact organizations, and ESG-focused businesses.

## ✨ Features

- **Multiple Account Integration**: Connect Google, Facebook, Instagram, LinkedIn, and Twitter accounts
- **Unified Dashboard**: Manage all your connected accounts from one interface
- **OAuth Authentication**: Secure authentication using OAuth 2.0
- **Modern UI**: Beautiful, responsive React interface
- **RESTful API**: Backend API for account management
- **Extensible Architecture**: Easy to add new providers

## 📋 Supported Platforms

- 🔍 **Google** - Gmail, Calendar, Drive integration
- 📘 **Facebook** - Page management and posting
- 📷 **Instagram** - Business insights and content management
- 💼 **LinkedIn** - Professional network management
- 🐦 **Twitter** - Tweet management and analytics

## 🛠️ Technology Stack

### Backend
- Node.js
- Express.js
- Passport.js (OAuth authentication)
- Express Session

### Frontend
- React 18
- Axios
- React Router
- Modern CSS with responsive design

## 🔒 Security Considerations

### For Development/Demo
This application is configured for development and demonstration purposes. Before deploying to production, consider implementing:

1. **Rate Limiting**: Add rate limiting middleware (e.g., `express-rate-limit`) to prevent abuse
2. **CSRF Protection**: Implement CSRF tokens (e.g., `csurf` middleware) for form submissions
3. **Database**: Replace in-memory storage with a proper database
4. **Environment Security**: Use strong session secrets and secure environment variable management
5. **HTTPS**: Always use HTTPS in production
6. **OAuth Scope Validation**: Carefully review and minimize OAuth scopes

### Recommended Security Packages
```bash
npm install express-rate-limit csurf helmet
```

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
```bash
git clone <repository-url>
cd eCo
```

2. **Install dependencies**
```bash
npm run install-all
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your OAuth credentials for each provider you want to enable.

4. **Start the development servers**

Start backend server:
```bash
npm run server
```

In another terminal, start frontend:
```bash
npm run client
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🔑 Configuration

### Getting OAuth Credentials

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:5000/auth/google/callback`

#### Facebook OAuth
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add Facebook Login product
4. Configure OAuth redirect URI: `http://localhost:5000/auth/facebook/callback`

#### LinkedIn OAuth
1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Create a new app
3. Add OAuth 2.0 redirect URL: `http://localhost:5000/auth/linkedin/callback`

#### Twitter OAuth
1. Go to [Twitter Developer Portal](https://developer.twitter.com/)
2. Create a new app
3. Configure callback URL: `http://localhost:5000/auth/twitter/callback`

## 📡 API Endpoints

### Health Check
```
GET /api/health
```

### Authentication
```
GET /auth/google
GET /auth/facebook
GET /auth/linkedin
GET /auth/twitter
GET /auth/user
GET /auth/logout
```

### Account Management
```
GET /api/accounts              - Get all connected accounts
POST /api/accounts             - Add new account
GET /api/accounts/:id          - Get specific account
DELETE /api/accounts/:id       - Disconnect account
GET /api/accounts/providers/list - Get available providers
```

## 🚀 Deployment

### Production Build

1. Build the frontend:
```bash
cd client
npm run build
```

2. Set environment variables for production in `.env`:
```
NODE_ENV=production
```

3. Start the server:
```bash
npm start
```

## 🤝 Contributing

This is an eCo Agency project for marketing ESG and social impact initiatives. For contributions or inquiries, please contact the development team.

## 📄 License

MIT License - See LICENSE file for details

## 🌟 About eCo Agency

eCo Agency specializes in Marketing ESG (Environmental, Social, and Governance) and Social Impact initiatives. We help organizations connect with their audiences across multiple platforms while maintaining sustainable and impactful practices.

---

**Version**: 1.0.0  
**Last Updated**: 2025
