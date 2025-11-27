import React, { useState, useEffect } from 'react';
import '../App.css';

function ItemList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Placeholder for RESTlet API endpoint URL
  // This should be replaced with the actual NetSuite RESTlet URL once deployed as a Suitelet
  const apiUrl = 'placeholder_restlet_url/items';

  useEffect(() => {
    // Function to fetch item data from RESTlet API
    const fetchItems = async () => {
      try {
        // In a real NetSuite Suitelet environment, this would use the actual RESTlet endpoint
        // For now, we'll simulate a response since we're in development mode
        // const response = await fetch(apiUrl);
        // if (!response.ok) throw new Error('Failed to fetch items');
        // const data = await response.json();
        // setItems(data.data);

        // Simulated data for development
        setTimeout(() => {
          setItems([
            { id: '1', itemId: 'ITEM001', displayName: 'Sample Item 1', description: 'A sample item for testing', cost: 10.99 },
            { id: '2', itemId: 'ITEM002', displayName: 'Sample Item 2', description: 'Another sample item', cost: 25.50 }
          ]);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError(err.message);
        setLoading(false);
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
