import React, { useState, useEffect } from 'react';
import '../App.css';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Placeholder for RESTlet API endpoint URL
  // This should be replaced with the actual NetSuite RESTlet URL once deployed as a Suitelet
  const apiUrl = 'placeholder_restlet_url/projects';

  useEffect(() => {
    // Function to fetch project data from RESTlet API
    const fetchProjects = async () => {
      try {
        // In a real NetSuite Suitelet environment, this would use the actual RESTlet endpoint
        // For now, we'll simulate a response since we're in development mode
        // const response = await fetch(apiUrl);
        // if (!response.ok) throw new Error('Failed to fetch projects');
        // const data = await response.json();
        // setProjects(data.data);

        // Simulated data for development
        setTimeout(() => {
          setProjects([
            { id: '1', name: 'Sample Project 1', status: 'In Progress', customer: 'Sample Customer 1', startDate: '2023-01-01', endDate: '2023-12-31' },
            { id: '2', name: 'Sample Project 2', status: 'Not Started', customer: 'Sample Customer 2', startDate: '2023-02-01', endDate: '2023-11-30' }
          ]);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProjects();
  }, [apiUrl]);

  if (loading) return <div>Loading projects...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="App-section">
      <h2>Project List</h2>
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <table className="entity-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Customer</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.id}>
                <td>{project.id}</td>
                <td>{project.name}</td>
                <td>{project.status}</td>
                <td>{project.customer}</td>
                <td>{project.startDate}</td>
                <td>{project.endDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className="App-button" onClick={() => alert('Add Project functionality to be implemented')}>
        Add Project
      </button>
    </div>
  );
}

export default ProjectList;
