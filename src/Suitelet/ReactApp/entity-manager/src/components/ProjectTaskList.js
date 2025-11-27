import React, { useState, useEffect } from 'react';
import '../App.css';

function ProjectTaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Placeholder for RESTlet API endpoint URL
  // This should be replaced with the actual NetSuite RESTlet URL once deployed as a Suitelet
  const apiUrl = 'placeholder_restlet_url/projecttasks';

  useEffect(() => {
    // Function to fetch project task data from RESTlet API
    const fetchTasks = async () => {
      try {
        // In a real NetSuite Suitelet environment, this would use the actual RESTlet endpoint
        // For now, we'll simulate a response since we're in development mode
        // const response = await fetch(apiUrl);
        // if (!response.ok) throw new Error('Failed to fetch project tasks');
        // const data = await response.json();
        // setTasks(data.data);

        // Simulated data for development
        setTimeout(() => {
          setTasks([
            { id: '1', title: 'Task 1', project: 'Sample Project 1', status: 'In Progress', startDate: '2023-01-05', endDate: '2023-01-15' },
            { id: '2', title: 'Task 2', project: 'Sample Project 2', status: 'Not Started', startDate: '2023-02-01', endDate: '2023-02-10' }
          ]);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTasks();
  }, [apiUrl]);

  if (loading) return <div>Loading project tasks...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="App-section">
      <h2>Project Task List</h2>
      {tasks.length === 0 ? (
        <p>No project tasks found.</p>
      ) : (
        <table className="entity-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Project</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{task.project}</td>
                <td>{task.status}</td>
                <td>{task.startDate}</td>
                <td>{task.endDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className="App-button" onClick={() => alert('Add Project Task functionality to be implemented')}>
        Add Project Task
      </button>
    </div>
  );
}

export default ProjectTaskList;
