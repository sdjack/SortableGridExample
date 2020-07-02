import React from 'react';
import Container from 'react-bootstrap/Container';
import SortableList from './components/SortableList.js';
import './App.css';

const App = () => {
  return (
    <Container className="p-4" fluid>
      <SortableList />
    </Container>
  );
}

export default App;
