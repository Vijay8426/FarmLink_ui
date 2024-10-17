import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PaymentList = () => {
  const [contracts, setContracts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        // Retrieve access token from local storage
        const accessToken = localStorage.getItem('accessToken');
        
        // Fetch contract payment data from the new API endpoint
        const response = await fetch('https://farmlink-ewxs.onrender.com/contract/contract_payment/farmer/', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        // Handle the response
        const result = await response.json();

        // Extract the contracts data from the response
        const contractData = result.contracts || []; // Ensure contracts is an array
        setContracts(contractData);
      } catch (error) {
        console.error('Error fetching contracts:', error);
      }
    };

    fetchContracts();
  }, []);

  // Function to generate an avatar based on the first letter of the buyer's name
  const getAvatar = (buyerName) => {
    const initial = buyerName ? buyerName.charAt(0).toUpperCase() : '?';
    return (
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#4fc978',
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
    navigate(`/app/payment-form/${id}`);
  };

  return (
    <React.Fragment>
      <Row>
        <Col md={6} xl={12}>
          <Card className="Recent-Users widget-focus-lg">
            <Card.Header>
              <Card.Title className='text-info h5'>Pending Transactions</Card.Title>
            </Card.Header>
            <Card.Body className="px-0 py-2">
              <Table responsive hover className="recent-users">
                <tbody>
                  {contracts.map((contract) => (
                    <tr key={contract.id} className="unread">
                      <td>{getAvatar(contract.buyer_name)}</td>
                      <td>
                        <h6 className="mb-1">{contract.buyer_name}</h6>
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
                          className="btn btn-success btn-sm"
                        >
                          Receive
                        </button>
                      </td>
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

export default PaymentList;
