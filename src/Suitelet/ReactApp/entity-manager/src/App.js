import React from 'react';
import './App.css';
import CustomerList from './components/CustomerList';
import ItemList from './components/ItemList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>NetSuite Entity Manager</h1>
        <p>A React Suitelet app for managing entities in NetSuite.</p>
      </header>
      <main>
        <CustomerList />
        <ItemList />
      </main>
    </div>
  );
}

export default App;
