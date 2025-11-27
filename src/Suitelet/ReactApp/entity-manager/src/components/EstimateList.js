import React, { useState, useEffect } from 'react';
import '../App.css';

function EstimateList() {
  const [estimates, setEstimates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Placeholder for RESTlet API endpoint URL
  // This should be replaced with the actual NetSuite RESTlet URL once deployed as a Suitelet
  const apiUrl = 'placeholder_restlet_url/estimates';

  useEffect(() => {
    // Function to fetch estimate data from RESTlet API
    const fetchEstimates = async () => {
      try {
        // In a real NetSuite Suitelet environment, this would use the actual RESTlet endpoint
        // For now, we'll simulate a response since we're in development mode
        // const response = await fetch(apiUrl);
        // if (!response.ok) throw new Error('Failed to fetch estimates');
        // const data = await response.json();
        // setEstimates(data.data);

        // Simulated data for development
        setTimeout(() => {
          setEstimates([
            { id: '1', estimateNumber: 'EST001', customer: 'Sample Customer 1', total: 5000.00, status: 'Pending', date: '2023-01-15' },
            { id: '2', estimateNumber: 'EST002', customer: 'Sample Customer 2', total: 7500.00, status: 'Approved', date: '2023-02-10' }
          ]);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError(err.message);
        setLoading(false);
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
