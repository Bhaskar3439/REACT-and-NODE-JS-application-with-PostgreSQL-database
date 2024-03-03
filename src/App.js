import React, { useState, useEffect } from 'react';
import { Table, Form } from 'react-bootstrap';
import './App.css'; // Import CSS file for styling

function App() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    // Dummy data for testing
    const dummyData = [
      {
        sno: 1,
        customer_name: 'Bhaskar Reddy',
        age: 22,
        phone: '6309364153',
        location: 'Rayachoty',
        created_at: '2024-03-01T10:30:00Z' // Assuming UTC timestamp
      },
      {
        sno: 2,
        customer_name: 'Lalith',
        age: 21,
        phone: '9948788174',
        location: 'Allagadda',
        created_at: '2024-03-02T15:45:00Z' // Assuming UTC timestamp
      },
      {
        sno: 3,
        customer_name: 'Sreenath Kumar',
        age: 21,
        phone: '9703606674',
        location: 'Madanapalli',
        created_at: '2024-03-03T08:00:00Z' // Assuming UTC timestamp
      },
      {
        sno: 4,
        customer_name: 'Ravali',
        age: 20,
        phone: '9490727879',
        location: 'Karnool',
        created_at: '2024-03-04T12:20:00Z' // Assuming UTC timestamp
      },
      {
        sno: 5,
        customer_name: 'Thunder Tharun',
        age: 21,
        phone: '7780466349',
        location: 'Madanapali',
        created_at: '2024-03-05T09:10:00Z' // Assuming UTC timestamp
      },
      {
        sno: 6,
        customer_name: 'Priyanka',
        age: 21,
        phone: '9000064659',
        location: 'Ananthapuram',
        created_at: '2024-03-05T09:10:00Z' // Assuming UTC timestamp
      }
    ];

    // Set dummy data to state
    setCustomers(dummyData);
  }, []);

  const sortedCustomers = [...customers].map((customer, index) => ({ ...customer, originalIndex: index })).sort((a, b) => {
    if (sortBy === 'customer_name') {
      return a.customer_name.localeCompare(b.customer_name) || a.originalIndex - b.originalIndex;
    } else if (sortBy === 'location') {
      return a.location.localeCompare(b.location) || a.originalIndex - b.originalIndex;
    }
    return 0;
  });

  const filteredCustomers = sortedCustomers.filter(customer =>
    customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <div className="search-sort-container">
        <Form.Control
          className="search-input"
          type="text"
          placeholder="Search by Name or Location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Form.Control
          className="sort-select"
          as="select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="customer_name">Customer Name</option>
          <option value="Phone">Phone</option>
          <option value="location">Location</option>
          <option value="Date">Date</option>
          <option value="Time">Time</option>
          
        </Form.Control>
      </div>
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
