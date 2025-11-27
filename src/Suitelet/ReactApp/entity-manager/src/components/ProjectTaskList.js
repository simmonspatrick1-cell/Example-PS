import React, { useState, useEffect } from 'react';
import '../App.css';
import API_CONFIG from '../config/api';

function ProjectTaskList() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    status: '',
    startDate: '',
    endDate: ''
  });

  const apiUrl = API_CONFIG.getUrl(API_CONFIG.endpoints.projectTasks);

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    // Filter tasks based on search term
    const filtered = tasks.filter(task =>
      task.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.status?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTasks(filtered);
  }, [searchTerm, tasks]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch project tasks: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        setTasks(data.data);
        setFilteredTasks(data.data);
      } else {
        throw new Error('Invalid data format received from API');
      }
      setLoading(false);
      setError(null);
    } catch (err) {
      setError(`Error fetching project tasks: ${err.message}`);
      setLoading(false);
      console.error('API Error:', err);
    }
  };

  const handleAdd = () => {
    setCurrentTask(null);
    setFormData({
      title: '',
      company: '',
      status: '',
      startDate: '',
      endDate: ''
    });
    setShowModal(true);
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    setFormData({
      title: task.title || '',
      company: task.company || '',
      status: task.status || '',
      startDate: task.startDate || '',
      endDate: task.endDate || ''
    });
    setShowModal(true);
  };

  const handleDeleteClick = (taskId) => {
    setDeleteTaskId(taskId);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    try {
      // Note: Delete functionality would need to be implemented in the Suitelet
      // For now, this is a placeholder
      console.log('Deleting task ID:', deleteTaskId);
      setSuccessMessage('Delete functionality to be implemented in Suitelet');
      setShowDeleteConfirm(false);
      setDeleteTaskId(null);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(`Error deleting task: ${err.message}`);
      console.error('Delete Error:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Note: Create/Update functionality would need to be implemented in the Suitelet
      // For now, this is a placeholder
      if (currentTask) {
        setSuccessMessage('Update functionality to be implemented in Suitelet');
      } else {
        setSuccessMessage('Create functionality to be implemented in Suitelet');
      }
      setShowModal(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(`Error saving task: ${err.message}`);
      console.error('Save Error:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentTask(null);
  };

  if (loading) {
    return (
      <div className="App-section">
        <div className="loading-spinner">Loading project tasks...</div>
      </div>
    );
  }

  return (
    <div className="App-section">
      <h2>Project Task List</h2>

      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title, company, or status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="App-button" onClick={handleAdd}>
          Add New Task
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <p>No project tasks found.</p>
      ) : (
        <table className="entity-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Company</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map(task => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{task.company}</td>
                <td>{task.status}</td>
                <td>{task.startDate}</td>
                <td>{task.endDate}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="App-button btn-small btn-success"
                      onClick={() => handleEdit(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="App-button btn-small btn-danger"
                      onClick={() => handleDeleteClick(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{currentTask ? 'Edit Project Task' : 'Add New Project Task'}</h2>
              <button className="modal-close" onClick={closeModal}>&times;</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="title">Title *</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Status</option>
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="startDate">Start Date</label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="endDate">End Date</label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="App-button btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" className="App-button btn-success">
                  {currentTask ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Confirm Delete</h2>
              <button className="modal-close" onClick={() => setShowDeleteConfirm(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this project task? This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button
                className="App-button btn-secondary"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="App-button btn-danger"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectTaskList;
