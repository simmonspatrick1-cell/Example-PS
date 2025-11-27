import React, { useState, useEffect } from 'react';
import '../App.css';

function PurchaseOrderList() {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Placeholder for RESTlet API endpoint URL
  // This should be replaced with the actual NetSuite RESTlet URL once deployed as a Suitelet
  const apiUrl = 'placeholder_restlet_url/purchaseorders';

  useEffect(() => {
    // Function to fetch purchase order data from RESTlet API
    const fetchPurchaseOrders = async () => {
      try {
        // In a real NetSuite Suitelet environment, this would use the actual RESTlet endpoint
        // For now, we'll simulate a response since we're in development mode
        // const response = await fetch(apiUrl);
        // if (!response.ok) throw new Error('Failed to fetch purchase orders');
        // const data = await response.json();
        // setPurchaseOrders(data.data);

        // Simulated data for development
        setTimeout(() => {
          setPurchaseOrders([
            { id: '1', poNumber: 'PO001', vendor: 'Sample Vendor 1', total: 2500.00, status: 'Pending Approval', date: '2023-01-10' },
            { id: '2', poNumber: 'PO002', vendor: 'Sample Vendor 2', total: 7500.00, status: 'Approved', date: '2023-02-05' }
          ]);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPurchaseOrders();
  }, [apiUrl]);

  if (loading) return <div>Loading purchase orders...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="App-section">
      <h2>Purchase Order List</h2>
      {purchaseOrders.length === 0 ? (
        <p>No purchase orders found.</p>
      ) : (
        <table className="entity-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>PO Number</th>
              <th>Vendor</th>
              <th>Total ($)</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {purchaseOrders.map(po => (
              <tr key={po.id}>
                <td>{po.id}</td>
                <td>{po.poNumber}</td>
                <td>{po.vendor}</td>
                <td>{po.total.toFixed(2)}</td>
                <td>{po.status}</td>
                <td>{po.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className="App-button" onClick={() => alert('Add Purchase Order functionality to be implemented')}>
        Add Purchase Order
      </button>
    </div>
  );
}

export default PurchaseOrderList;
