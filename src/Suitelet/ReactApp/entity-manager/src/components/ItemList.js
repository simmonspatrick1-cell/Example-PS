import React, { useState, useEffect } from 'react';
import '../App.css';
import API_CONFIG from '../config/api';

function ItemList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // NetSuite RESTlet API endpoint URL
  const apiUrl = API_CONFIG.getUrl(API_CONFIG.endpoints.items);

  useEffect(() => {
    // Function to fetch item data from RESTlet API
    const fetchItems = async () => {
      try {
        // Uncomment the following lines and update apiUrl with the actual RESTlet endpoint post-deployment
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch items: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          setItems(data.data);
        } else {
          throw new Error('Invalid data format received from API');
        }
        setLoading(false);

        // Simulated data for development - remove this block post-deployment
        // setTimeout(() => {
        //   setItems([
        //     { id: '1', itemId: 'ITEM001', displayName: 'Sample Item 1', description: 'A sample item for testing', cost: 10.99 },
        //     { id: '2', itemId: 'ITEM002', displayName: 'Sample Item 2', description: 'Another sample item', cost: 25.50 }
        //   ]);
        //   setLoading(false);
        // }, 1000);
      } catch (err) {
        setError(`Error fetching items: ${err.message}`);
        setLoading(false);
        console.error('API Error:', err);
      }
    };

    fetchItems();
  }, [apiUrl]);

  if (loading) return <div>Loading items...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="App-section">
      <h2>Item List</h2>
      {items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <table className="entity-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Item ID</th>
              <th>Display Name</th>
              <th>Description</th>
              <th>Cost ($)</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.itemId}</td>
                <td>{item.displayName}</td>
                <td>{item.description}</td>
                <td>{item.cost.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className="App-button" onClick={() => alert('Add Item functionality to be implemented')}>
        Add Item
      </button>
    </div>
  );
}

export default ItemList;
