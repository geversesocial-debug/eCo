import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

function App() {
  const [providers, setProviders] = useState([]);
  const [connectedAccounts, setConnectedAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProviders();
    fetchConnectedAccounts();
  }, []);

  const fetchProviders = async () => {
    try {
      const response = await axios.get('/api/accounts/providers/list');
      setProviders(response.data);
    } catch (error) {
      console.error('Error fetching providers:', error);
    }
  };

  const fetchConnectedAccounts = async () => {
    try {
      const response = await axios.get('/api/accounts');
      setConnectedAccounts(response.data);
    } catch (error) {
      console.error('Error fetching connected accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = (providerId) => {
    // Redirect to OAuth authentication
    window.location.href = `/auth/${providerId}`;
  };

  const isConnected = (providerId) => {
    return connectedAccounts.some(account => account.provider === providerId);
  };

  const getAccountDescription = (providerId) => {
    const descriptions = {
      google: 'Connect your Google account for Gmail, Calendar, Drive and more',
      facebook: 'Manage your Facebook pages and posts',
      instagram: 'Connect Instagram for business insights and posting',
      linkedin: 'Manage your LinkedIn professional network',
      twitter: 'Connect Twitter for tweets and analytics'
    };
    return descriptions[providerId] || 'Connect this account';
  };

  if (loading) {
    return (
      <div className="container">
        <div className="header">
          <h1>⚡ eCo All-in-One</h1>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>⚡ eCo All-in-One</h1>
          <p>Connect all your accounts in one place</p>
          <p>Um aplicativo all-in-one que conecta todas as suas contas</p>
        </header>

        <div className="accounts-grid">
          {providers.map((provider) => (
            <div key={provider.id} className="account-card">
              <h3>
                <span className="icon">{provider.icon}</span>
                {provider.name}
              </h3>
              <p>{getAccountDescription(provider.id)}</p>
              <button
                className={`connect-button ${isConnected(provider.id) ? 'connected' : ''}`}
                onClick={() => handleConnect(provider.id)}
                disabled={!provider.enabled}
              >
                {isConnected(provider.id) ? '✓ Connected' : 'Connect Account'}
              </button>
              <div className={`status-badge ${isConnected(provider.id) ? 'status-connected' : 'status-disconnected'}`}>
                {isConnected(provider.id) ? 'Active' : 'Not Connected'}
              </div>
            </div>
          ))}
        </div>

        <footer className="footer">
          <p>© 2025 eCo Agency - Marketing ESG - Social Impact</p>
          <p>All-in-One Application v1.0.0</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
