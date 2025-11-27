import React, { useState, useEffect } from 'react';
import '../App.css';
import API_CONFIG from '../config/api';

function ItemList() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const apiUrl = API_CONFIG.getUrl(API_CONFIG.endpoints.items);

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    const filtered = items.filter(item =>
      item.itemId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchTerm, items]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch items: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        setItems(data.data);
        setFilteredItems(data.data);
      } else {
        throw new Error('Invalid data format received from API');
      }
      setLoading(false);
      setError(null);
    } catch (err) {
      setError(`Error fetching items: ${err.message}`);
      setLoading(false);
      console.error('API Error:', err);
    }
  };

  if (loading) {
    return (
      <div className="App-section">
        <div className="loading-spinner">Loading items...</div>
      </div>
    );
  }

  return (
    <div className="App-section">
      <h2>Item List</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by item ID, name, or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredItems.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <table className="entity-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Item ID</th>
              <th>Display Name</th>
              <th>Description</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.itemId}</td>
                <td>{item.displayName}</td>
                <td>{item.description}</td>
                <td>${item.cost ? item.cost.toFixed(2) : '0.00'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ItemList;
