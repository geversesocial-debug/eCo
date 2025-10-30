const express = require('express');
const router = express.Router();

// In-memory storage for connected accounts (in production, use a database)
let connectedAccounts = [];

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Not authenticated' });
};

// Get all connected accounts for current user
router.get('/', isAuthenticated, (req, res) => {
  const userAccounts = connectedAccounts.filter(
    account => account.userId === req.user.id
  );
  res.json(userAccounts);
});

// Add a new account connection
router.post('/', isAuthenticated, (req, res) => {
  const { provider, accountData } = req.body;
  
  const newAccount = {
    id: Date.now().toString(),
    userId: req.user.id,
    provider,
    accountData,
    connectedAt: new Date().toISOString()
  };
  
  connectedAccounts.push(newAccount);
  res.status(201).json(newAccount);
});

// Get a specific account
router.get('/:id', isAuthenticated, (req, res) => {
  const account = connectedAccounts.find(
    acc => acc.id === req.params.id && acc.userId === req.user.id
  );
  
  if (!account) {
    return res.status(404).json({ error: 'Account not found' });
  }
  
  res.json(account);
});

// Delete an account connection
router.delete('/:id', isAuthenticated, (req, res) => {
  const index = connectedAccounts.findIndex(
    acc => acc.id === req.params.id && acc.userId === req.user.id
  );
  
  if (index === -1) {
    return res.status(404).json({ error: 'Account not found' });
  }
  
  connectedAccounts.splice(index, 1);
  res.json({ message: 'Account disconnected successfully' });
});

// Get available providers
router.get('/providers/list', (req, res) => {
  const providers = [
    { id: 'google', name: 'Google', icon: '🔍', enabled: true },
    { id: 'facebook', name: 'Facebook', icon: '📘', enabled: true },
    { id: 'instagram', name: 'Instagram', icon: '📷', enabled: true },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼', enabled: true },
    { id: 'twitter', name: 'Twitter', icon: '🐦', enabled: true }
  ];
  res.json(providers);
});

module.exports = router;
