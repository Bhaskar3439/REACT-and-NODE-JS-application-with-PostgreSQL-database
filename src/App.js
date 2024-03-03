import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form } from 'react-bootstrap';

function App() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('customer_name');

  useEffect(() => {
    axios.get('/api/customers')
      .then(response => setCustomers(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.location.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => (a[sortBy] > b[sortBy]) ? 1 : -1);

  return (
    <div className="container mt-5">
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Search by Name or Location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Form.Select value={sortBy} onChange={handleSortChange}>
          <option value="customer_name">Sort by Name</option>
          <option value="age">Sort by Age</option>
          <option value="location">Sort by Location</option>
        </Form.Select>
      </Form.Group>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Customer Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer, index) => (
            <tr key={customer.sno}>
              <td>{index + 1}</td>
              <td>{customer.customer_name}</td>
              <td>{customer.age}</td>
              <td>{customer.phone}</td>
              <td>{customer.location}</td>
              <td>{new Date(customer.created_at).toLocaleDateString()}</td>
              <td>{new Date(customer.created_at).toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
