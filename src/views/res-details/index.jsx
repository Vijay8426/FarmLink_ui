import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Card, Table, Modal, Button } from 'react-bootstrap';
import axios from 'axios';

// Utility function to format dates using native JavaScript
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return date.toLocaleDateString('en-US', options);
};

const ContractSpec = () => {
  const { id } = useParams();  // Get the contract ID from URL params
  const [contractDetails, setContractDetails] = useState(null);
  const [fileLink, setFileLink] = useState('');  // State to store the file link
  const [showPopup, setShowPopup] = useState(false);  // State to show/hide redirection popup
  const [redirectTimeout, setRedirectTimeout] = useState(null);  // To track the timeout

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
        setFileLink(fileResponse.data.fileLink);  // Set the file link in state
      } catch (error) {
        console.error('Error fetching contract details or file link:', error);
        alert('Failed to fetch contract details. Please try again later.');
      }
    };

    fetchContractDetails();
  }, [id]);

  // Handle the Pay for Contract button click
  const handlePayForContract = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken'); // Fetch accessToken from local storage

      // API call to get the payment link
      const paymentResponse = await axios.post(
        `https://farmlink-ewxs.onrender.com/payment/buyer/${id}/`,
        {}, // Empty body
        {
          headers: {
            Authorization: `Bearer ${accessToken}` // Add accessToken to the headers
          }
        }
      );

      const paymentLink = paymentResponse.data.url;

      // Show the redirection popup
      setShowPopup(true);


      // Redirect after 2 seconds
      const timeoutId = setTimeout(() => {
       window.location.href=paymentLink
      }, 2000);
      setRedirectTimeout(timeoutId); // Save timeout ID to clear if necessary
    } catch (error) {
      console.error('Error during payment:', error);
      alert('Failed to initiate payment.');
    }
  };

  // Clear timeout if modal is closed
  const handleCloseModal = () => {
    setShowPopup(false);
    if (redirectTimeout) {
      clearTimeout(redirectTimeout); // Clear the timeout if modal is closed
      setRedirectTimeout(null); // Reset the timeout state
    }
  };

  if (!contractDetails) {
    return <p>Loading contract details...</p>;
  }

  const contract = contractDetails[0];  // First object in data for contract
  const tender = contractDetails[1];    // Second object contains tender details
  const farmer = contractDetails.find(item => item.role === 1); // Farmer details
  const buyer = contractDetails.find(item => item.role === 2);  // Buyer details

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <Card.Title as="h5" className="mb-0">{contract.title}</Card.Title>
              <div className="d-flex flex-column flex-sm-row mt-2 mt-sm-0 gap-2">
                <button className="btn btn-success btn-md" onClick={handlePayForContract}>Pay for Contract</button>
              </div>
            </Card.Header>

            <Card.Body>
              <Table>
                <tbody>
                  <tr>
                    <th>Effective Date</th>
                    <td>{tender?.open_time ? formatDate(tender.open_time) : 'N/A'}</td>
                  </tr>
                  <tr>
                    <th>Expiration Date</th>
                    <td>{tender?.close_time ? formatDate(tender.close_time) : 'N/A'}</td>
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

      {/* Modal or Popup for Redirection */}
      <Modal show={showPopup} onHide={handleCloseModal} centered>
        <Modal.Body>
          <p>Redirecting to the payment page...</p>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default ContractSpec;
