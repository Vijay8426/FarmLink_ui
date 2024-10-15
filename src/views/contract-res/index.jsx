import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const DashDefault = () => {
  const [contracts, setContracts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        // Retrieve access token from local storage
        const accessToken = localStorage.getItem('accessToken');

        // Fetch contract data from the new API
        const response = await fetch('https://farmlink-ewxs.onrender.com/buyer/contract_submit/', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();

        // Map the relevant data from the response
        const contractData = result.map(contract => ({
          id: contract.id,
          title: contract.title,
          farmer_name: contract.farmer_name,
        }));

        setContracts(contractData);
      } catch (error) {
        console.error('Error fetching contracts:', error);
      }
    };

    fetchContracts();
  }, []);

  // Function to generate an avatar based on the first letter of the farmer's name
  const getAvatar = (farmerName) => {
    const initial = farmerName ? farmerName.charAt(0).toUpperCase() : '?';
    return (
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#007bff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '18px',
        }}
      >
        {initial}
      </div>
    );
  };

  // Function to handle navigation to the details page
  const handleDetailsClick = (id) => {
    navigate(`/app/res-details/${id}`);
  };

  return (
    <React.Fragment>
      <Row>
        <Col md={6} xl={12}>
          <Card className="Recent-Users widget-focus-lg">
            <Card.Header>
              <Card.Title as="h5">Contract</Card.Title>
            </Card.Header>
            <Card.Body className="px-0 py-2">
              {contracts.length > 0 ? (
                <Table responsive hover className="recent-users">
                  <tbody>
                    {contracts.map((contract) => (
                      <tr key={contract.id} className="unread">
                        <td>{getAvatar(contract.farmer_name)}</td>
                        <td>
                          <h6 className="mb-1">{contract.farmer_name}</h6>
                        </td>
                        <td>
                          <h6 className="text-muted">
                            <i className="fa fa-circle text-c-green f-10 m-r-15" />
                            {contract.title}
                          </h6>
                        </td>
                        <td>
                          <button
                            onClick={() => handleDetailsClick(contract.id)}
                            className="btn btn-primary btn-sm"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="text-center">
                  <h5>No requests available</h5>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default DashDefault;
