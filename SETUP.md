# Setup Guide - eCo All-in-One Application

## Quick Start Guide

### 1. Installation

```bash
# Install all dependencies (backend and frontend)
npm run install-all
```

### 2. Environment Configuration

Copy the example environment file:
```bash
cp .env.example .env
```

### 3. Configure OAuth Providers

You need to create OAuth applications for each provider you want to support. Update the `.env` file with your credentials.

#### Minimum Required Configuration

For development, you can start with just one provider. Here's the minimal setup:

```env
PORT=5000
NODE_ENV=development
SESSION_SECRET=your-random-secret-key-here
CLIENT_URL=http://localhost:3000
```

### 4. Running the Application

#### Development Mode (Recommended)

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run client
```

#### Alternative: Run Both Together
```bash
# Start backend
npm run server &

# Start frontend
npm run client
```

### 5. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Health Check: http://localhost:5000/api/health

## Detailed OAuth Setup

### Google OAuth Setup

1. Go to https://console.cloud.google.com/
2. Create a new project: "eCo All-in-One"
3. Enable APIs:
   - Google+ API
   - Gmail API (optional)
   - Google Calendar API (optional)
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Application type: Web application
6. Authorized JavaScript origins: `http://localhost:3000`
7. Authorized redirect URIs: `http://localhost:5000/auth/google/callback`
8. Copy Client ID and Client Secret to `.env`

### Facebook OAuth Setup

1. Go to https://developers.facebook.com/
2. Create a new app
3. Select "Consumer" or "Business" based on your needs
4. Add "Facebook Login" product
5. In Facebook Login settings:
   - Valid OAuth Redirect URIs: `http://localhost:5000/auth/facebook/callback`
6. Copy App ID and App Secret to `.env`

### Instagram Setup

Instagram API is now part of Facebook. Follow Facebook OAuth setup and:
1. In your Facebook App, add Instagram product
2. Request necessary permissions
3. Use the same credentials as Facebook

### LinkedIn OAuth Setup

1. Go to https://www.linkedin.com/developers/
2. Create a new app
3. Fill in required information
4. In "Auth" tab:
   - Add OAuth 2.0 redirect URL: `http://localhost:5000/auth/linkedin/callback`
5. Request access to r_liteprofile and r_emailaddress
6. Copy Client ID and Client Secret to `.env`

### Twitter OAuth Setup

1. Go to https://developer.twitter.com/
2. Create a new project and app
3. In app settings:
   - Enable OAuth 2.0
   - Callback URL: `http://localhost:5000/auth/twitter/callback`
4. Copy API Key and API Secret Key to `.env`

## Production Deployment

### Environment Variables for Production

Update your `.env` for production:

```env
NODE_ENV=production
PORT=5000
SESSION_SECRET=generate-a-strong-random-key

# Use HTTPS URLs in production
CLIENT_URL=https://your-domain.com
GOOGLE_CALLBACK_URL=https://your-domain.com/auth/google/callback
FACEBOOK_CALLBACK_URL=https://your-domain.com/auth/facebook/callback
# ... update all callback URLs
```

### Build Steps

```bash
# Build frontend
cd client
npm run build

# The backend will serve the built frontend from server
```

### Deployment Options

#### Option 1: Heroku
```bash
# Install Heroku CLI
heroku create eco-all-in-one
heroku config:set NODE_ENV=production
# Set all environment variables
git push heroku main
```

#### Option 2: Docker
```bash
# Build Docker image
docker build -t eco-all-in-one .

# Run container
docker run -p 5000:5000 --env-file .env eco-all-in-one
```

#### Option 3: VPS/Cloud Server
```bash
# On your server
git clone <repository>
npm run install-all
npm run build
npm start

# Use PM2 for process management
npm install -g pm2
pm2 start server/index.js --name eco-all-in-one
pm2 startup
pm2 save
```

## Troubleshooting

### Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>
```

### OAuth Errors
- Verify callback URLs match exactly
- Check that OAuth apps are in development/testing mode
- Ensure all required scopes are requested

### CORS Issues
- Check CLIENT_URL in .env matches your frontend URL
- Verify credentials option is set in axios requests

## Next Steps

1. Configure at least one OAuth provider
2. Start the application
3. Click on a provider card to connect
4. You'll be redirected to OAuth consent screen
5. After authorization, you'll return to the dashboard

## Support

For issues or questions, please check the README.md or create an issue in the repository.
