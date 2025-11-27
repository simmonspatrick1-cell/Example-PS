import React, { useState, useEffect } from 'react';
import '../App.css';

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Placeholder for RESTlet API endpoint URL
  // This should be replaced with the actual NetSuite RESTlet URL once deployed as a Suitelet
  const apiUrl = 'placeholder_restlet_url/customers';

  useEffect(() => {
    // Function to fetch customer data from RESTlet API
    const fetchCustomers = async () => {
      try {
        // In a real NetSuite Suitelet environment, this would use the actual RESTlet endpoint
        // For now, we'll simulate a response since we're in development mode
        // const response = await fetch(apiUrl);
        // if (!response.ok) throw new Error('Failed to fetch customers');
        // const data = await response.json();
        // setCustomers(data.data);

        // Simulated data for development
        setTimeout(() => {
          setCustomers([
            { id: '1', companyName: 'Sample Customer 1', email: 'customer1@example.com', phone: '123-456-7890', address: '123 Main St' },
            { id: '2', companyName: 'Sample Customer 2', email: 'customer2@example.com', phone: '987-654-3210', address: '456 Oak Ave' }
          ]);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [apiUrl]);

  if (loading) return <div>Loading customers...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="App-section">
      <h2>Customer List</h2>
      {customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <table className="entity-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Company Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.companyName}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className="App-button" onClick={() => alert('Add Customer functionality to be implemented')}>
        Add Customer
      </button>
    </div>
  );
}

export default CustomerList;
