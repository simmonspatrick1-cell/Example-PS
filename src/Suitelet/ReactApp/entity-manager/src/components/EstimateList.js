import React, { useState, useEffect } from 'react';
import '../App.css';
import API_CONFIG from '../config/api';

function EstimateList() {
  const [estimates, setEstimates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // NetSuite RESTlet API endpoint URL
  const apiUrl = API_CONFIG.getUrl(API_CONFIG.endpoints.estimates);

  useEffect(() => {
    // Function to fetch estimate data from RESTlet API
    const fetchEstimates = async () => {
      try {
        // Uncomment the following lines and update apiUrl with the actual RESTlet endpoint post-deployment
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch estimates: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          setEstimates(data.data);
        } else {
          throw new Error('Invalid data format received from API');
        }
        setLoading(false);

        // Simulated data for development - remove this block post-deployment
        // setTimeout(() => {
        //   setEstimates([
        //     { id: '1', estimateNumber: 'EST001', customer: 'Sample Customer 1', total: 5000.00, status: 'Pending', date: '2023-01-15' },
        //     { id: '2', estimateNumber: 'EST002', customer: 'Sample Customer 2', total: 7500.00, status: 'Accepted', date: '2023-02-20' }
        //   ]);
        //   setLoading(false);
        // }, 1000);
      } catch (err) {
        setError(`Error fetching estimates: ${err.message}`);
        setLoading(false);
        console.error('API Error:', err);
      }
    };

    fetchEstimates();
  }, [apiUrl]);

  if (loading) return <div>Loading estimates...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="App-section">
      <h2>Estimate List</h2>
      {estimates.length === 0 ? (
        <p>No estimates found.</p>
      ) : (
        <table className="entity-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Estimate Number</th>
              <th>Customer</th>
              <th>Total ($)</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {estimates.map(estimate => (
              <tr key={estimate.id}>
                <td>{estimate.id}</td>
                <td>{estimate.estimateNumber}</td>
                <td>{estimate.customer}</td>
                <td>{estimate.total.toFixed(2)}</td>
                <td>{estimate.status}</td>
                <td>{estimate.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className="App-button" onClick={() => alert('Add Estimate functionality to be implemented')}>
        Add Estimate
      </button>
    </div>
  );
}

export default EstimateList;
