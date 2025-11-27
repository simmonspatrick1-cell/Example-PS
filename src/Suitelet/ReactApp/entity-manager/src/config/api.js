// NetSuite Suitelet API Configuration
const API_CONFIG = {
  // Base Suitelet URL (same origin - no CORS issues!)
  baseUrl: 'https://td3049589.app.netsuite.com/app/site/hosting/scriptlet.nl?script=5252&deploy=1',

  // Entity endpoints
  endpoints: {
    customers: 'customers',
    items: 'items',
    projects: 'projects',
    estimates: 'estimates',
    purchaseOrders: 'purchaseorders',
    projectTasks: 'projecttasks'
  },

  // Helper function to build API URL with entity parameter
  getUrl: function(entity) {
    return `${this.baseUrl}&entity=${entity}`;
  }
};

export default API_CONFIG;
