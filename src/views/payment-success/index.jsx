import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Card, Table, Modal } from 'react-bootstrap';
import axios from 'axios';

// Utility function to format dates using native JavaScript
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return date.toLocaleDateString('en-US', options);
};

const styles = {
  body: {
    textAlign: 'center',
    padding: '40px 0',
    background: '#EBF0F5',
  },
  card: {
    background: 'white',
    padding: '60px',
    borderRadius: '4px',
    boxShadow: '0 2px 3px #C8D0D8',
    display: 'inline-block',
    margin: '0 auto',
  },
  checkmarkContainer: {
    borderRadius: '200px',
    height: '200px',
    width: '200px',
    background: '#F8FAF5',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: '#9ABC66',
    fontSize: '100px',
    lineHeight: '200px',
    marginLeft: '-15px',
  },
  heading: {
    color: '#88B04B',
    fontFamily: '"Nunito Sans", "Helvetica Neue", sans-serif',
    fontWeight: 900,
    fontSize: '40px',
    marginBottom: '10px',
  },
  paragraph: {
    color: '#404F5E',
    fontFamily: '"Nunito Sans", "Helvetica Neue", sans-serif',
    fontSize: '20px',
    margin: 0,
  },
};

const ContractSpec = () => {
  const { id } = useParams(); // Get the contract ID from URL params
  const [contractDetails, setContractDetails] = useState(null);
  const [fileLink, setFileLink] = useState(''); // State to store the file link
  const [loading, setLoading] = useState(true); // State for loading and blur effect
  const [paymentSuccess, setPaymentSuccess] = useState(null); // State to store payment success data

  // Fetch contract details and file link
  useEffect(() => {
    const fetchContractDetails = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken'); // Fetch accessToken from local storage

        // First API call to get contract details
        const contractResponse = await axios.get(
          `https://farmlink-ewxs.onrender.com/contract/contract_details/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}` // Add accessToken to the headers
            }
          }
        );
        setContractDetails(contractResponse.data.data);

        // Second API call to get the file link
        const fileResponse = await axios.get(
          `https://farmlinkbc.onrender.com/file/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}` // Add accessToken to the headers
            }
          }
        );
        setFileLink(fileResponse.data.fileLink); // Set the file link in state
      } catch (error) {
        console.error('Error fetching contract details or file link:', error);
      }
    };

    fetchContractDetails();
  }, [id]);

  // Fetch payment success details and manage loading state
// Fetch payment success details and manage loading state
useEffect(() => {
    const fetchPaymentSuccess = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken'); // Retrieve the accessToken from local storage
        const response = await axios.get(
          `https://farmlinkbc.onrender.com/paymentsuccess/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Add accessToken to the headers
            },
          }
        );
        setPaymentSuccess(response.data);
      } catch (error) {
        console.error('Error fetching payment success details:', error);
      } finally {
        setLoading(false); // Stop loading after the response arrives
      }
    };
  
    fetchPaymentSuccess();
  }, [id]);
  

  if (!contractDetails) {
    return <p>Loading contract details...</p>;
  }

  const contract = contractDetails[0]; // First object in data for contract
  const tender = contractDetails[1]; // Second object contains tender details
  const farmer = contractDetails.find(item => item.role === 1); // Farmer details
  const buyer = contractDetails.find(item => item.role === 2); // Buyer details

  return (
    <React.Fragment>
      {/* Overlay for loading state */}
      {loading && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 9999 }} />
      )}

      <div style={{ filter: loading ? 'blur(5px)' : 'none' }}>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">{contract.title}</Card.Title>
              </Card.Header>
              <Card.Body>
                <div style={styles.body}>
                  <div style={styles.card}>
                    <div style={styles.checkmarkContainer}>
                      <i style={styles.checkmark}>✓</i>
                    </div>
                    <h1 style={styles.heading}>Success</h1>
                    <p style={styles.paragraph}>
                      We received your payment;
                    </p>
                  </div>
                </div>
                <Table>
                  <tbody>
                    <tr>
                      <th>Effective Date</th>
                      <td>{tender.open_time ? formatDate(tender.open_time) : 'N/A'}</td>
                    </tr>
                    <tr>
                      <th>Expiration Date</th>
                      <td>{tender.close_time ? formatDate(tender.close_time) : 'N/A'}</td>
                    </tr>
                    <tr>
                      <th>Attachment</th>
                      <td>
                        {fileLink ? (
                          <a href={fileLink} target="_blank" rel="noopener noreferrer" className="link-primary">
                            Contract File
                          </a>
                        ) : (
                          'N/A'
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>Status</th>
                      <td>{contract.status}</td>
                    </tr>
                    <tr>
                      <th>Payment Status</th>
                      <td>{contract.payment_status}</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>

            {/* Farmer Details */}
            <Card>
              <Card.Header>
                <Card.Title as="h5">Promisor (Farmer)</Card.Title>
              </Card.Header>
              <Card.Body>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <td>{farmer?.name || 'N/A'}</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Email</th>
                      <td>{farmer?.email || 'N/A'}</td>
                    </tr>
                    <tr>
                      <th>Phone</th>
                      <td>{farmer?.phone_no || 'N/A'}</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>

            {/* Buyer Details */}
            <Card>
              <Card.Header>
                <Card.Title as="h5">Promisee (Buyer)</Card.Title>
              </Card.Header>
              <Card.Body>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <td>{buyer?.name || 'N/A'}</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Email</th>
                      <td>{buyer?.email || 'N/A'}</td>
                    </tr>
                    <tr>
                      <th>Phone</th>
                      <td>{buyer?.phone_no || 'N/A'}</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Payment Success Popup */}
      <Modal show={Boolean(paymentSuccess)} centered>
        <Modal.Body>
          <h4>Payment Successful</h4>
          <p>{paymentSuccess?.message || 'Your payment has been processed successfully.'}</p>
          <button onClick={() => setPaymentSuccess(null)}>Close</button>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default ContractSpec;
