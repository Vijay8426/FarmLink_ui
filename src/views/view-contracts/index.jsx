import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import axios from 'axios';

const BootstrapTable = () => {
  const [contracts, setContracts] = useState([]);
  const [signedContracts, setSignedContracts] = useState([]);
  const [pendingContracts, setPendingContracts] = useState([]);
  const [completedContracts, setCompletedContracts] = useState([]);

  // Fetch contracts from the API with accessToken in headers
  useEffect(() => {
    const fetchContracts = async () => {
      try {
        // Retrieve the access token from local storage
        const accessToken = localStorage.getItem('accessToken');

        const response = await axios.get('https://farmlink-ewxs.onrender.com/contract/contracts/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const allContracts = response.data;
        console.log(response.data);

        setContracts(allContracts);

        // Filter contracts based on status
        setSignedContracts(allContracts); // All contracts
        setPendingContracts(allContracts.filter(contract => contract.status === "Active")); // Pending contracts
        setCompletedContracts(allContracts.filter(contract => contract.status === "Completed")); // Completed contracts
      } catch (error) {
        console.error('Error fetching contracts:', error);
      }
    };

    fetchContracts();
  }, []);

  // Function to handle row click
  const handleRowClick = (id) => {
    window.location.href = `http://localhost:3000/demos/admin-templates/datta-able/react/free/app/contract-spec/${id}`;
  };

  return (
    <React.Fragment>
      <Row>
        <Col>

          {/* Contracts Signed Table */}
          <Card>
            <Card.Header>
              <Card.Title as="h5">Contracts Signed</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Promisor</th>
                    <th>Promisee</th>
                    <th>Contract Title</th>
                  </tr>
                </thead>
                <tbody>
                  {signedContracts.map((contract, index) => (
                    <tr key={contract.id} onClick={() => handleRowClick(contract.id)}>
                      <th scope="row">{index + 1}</th>
                      <td>{contract.farmer_name}</td>
                      <td>{contract.buyer_name}</td>
                      <td>{contract.title}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          {/* Contracts Pending Table */}
          <Card>
            <Card.Header>
              <Card.Title as="h5">Contracts Pending</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Promisor</th>
                    <th>Promisee</th>
                    <th>Contract Title</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingContracts.map((contract, index) => (
                    <tr key={contract.id} onClick={() => handleRowClick(contract.id)}>
                      <th scope="row">{index + 1}</th>
                      <td>{contract.farmer_name}</td>
                      <td>{contract.buyer_name}</td>
                      <td>{contract.title}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          {/* Contracts Completed Table */}
          <Card>
            <Card.Header>
              <Card.Title as="h5">Contracts Completed</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Promisor</th>
                    <th>Promisee</th>
                    <th>Contract Title</th>
                  </tr>
                </thead>
                <tbody>
                  {completedContracts.map((contract, index) => (
                    <tr key={contract.id} onClick={() => handleRowClick(contract.id)}>
                      <th scope="row">{index + 1}</th>
                      <td>{contract.farmer_name}</td>
                      <td>{contract.buyer_name}</td>
                      <td>{contract.title}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

        </Col>
      </Row>
    </React.Fragment>
  );
};

export default BootstrapTable;
