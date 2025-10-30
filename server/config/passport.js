const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;

module.exports = function(passport) {
  // Serialize user for session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // Deserialize user from session
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  // Google OAuth Strategy
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = {
          provider: 'google',
          id: profile.id,
          email: profile.emails && profile.emails[0] ? profile.emails[0].value : null,
          name: profile.displayName,
          photo: profile.photos && profile.photos[0] ? profile.photos[0].value : null,
          accessToken,
          refreshToken
        };
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }));
  }

  // Facebook OAuth Strategy
  if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
    passport.use(new FacebookStrategy({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ['id', 'emails', 'name', 'picture']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = {
          provider: 'facebook',
          id: profile.id,
          email: profile.emails ? profile.emails[0].value : null,
          name: profile.displayName,
          photo: profile.photos ? profile.photos[0].value : null,
          accessToken,
          refreshToken
        };
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }));
  }

  // LinkedIn OAuth Strategy
  if (process.env.LINKEDIN_CLIENT_ID && process.env.LINKEDIN_CLIENT_SECRET) {
    passport.use(new LinkedInStrategy({
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: process.env.LINKEDIN_CALLBACK_URL,
      scope: ['r_emailaddress', 'r_liteprofile']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = {
          provider: 'linkedin',
          id: profile.id,
          email: profile.emails ? profile.emails[0].value : null,
          name: profile.displayName,
          photo: profile.photos ? profile.photos[0].value : null,
          accessToken,
          refreshToken
        };
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }));
  }

  // Twitter OAuth Strategy
  if (process.env.TWITTER_CONSUMER_KEY && process.env.TWITTER_CONSUMER_SECRET) {
    passport.use(new TwitterStrategy({
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: process.env.TWITTER_CALLBACK_URL,
      includeEmail: true
    },
    async (token, tokenSecret, profile, done) => {
      try {
        const user = {
          provider: 'twitter',
          id: profile.id,
          email: profile.emails ? profile.emails[0].value : null,
          name: profile.displayName,
          username: profile.username,
          photo: profile.photos ? profile.photos[0].value : null,
          accessToken: token,
          tokenSecret
        };
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }));
  }
};
