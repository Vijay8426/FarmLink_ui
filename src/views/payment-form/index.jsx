import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Container, Row, Col, Card, Table, Form, Button } from 'react-bootstrap';
import axios from 'axios';

// Utility function to format dates using native JavaScript
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return date.toLocaleDateString('en-US', options);
};

const Payment_form = () => {
  const { id } = useParams(); // Get the contract ID from URL params
  const [contractDetails, setContractDetails] = useState(null);
  const [role, setRole] = useState('');
  const [fileLink, setFileLink] = useState(''); // State to store the file link
  const [formData, setFormData] = useState({
    accountHolderName: '',
    email: '',
    accountNumber: '',
    ifscCode: '',
  });

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
              Authorization: `Bearer ${accessToken}`, // Add accessToken to the headers
            },
          }
        );
        setContractDetails(contractResponse.data.data);
        setRole(localStorage.getItem('userRole'));

        // Second API call to get the file link
        const fileResponse = await axios.get(
          `https://farmlinkbc.onrender.com/file/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Add accessToken to the headers
            },
          }
        );
        setFileLink(fileResponse.data.fileLink); // Set the file link in state
      } catch (error) {
        console.error('Error fetching contract details or file link:', error);
      }
    };

    fetchContractDetails();
  }, [id]);

  if (!contractDetails) {
    return <p>Loading contract details...</p>;
  }

  const contract = contractDetails[0]; // First object in data for contract
  const tender = contractDetails[1]; // Second object contains tender details
  const farmer = contractDetails.find((item) => item.role === 1); // Farmer details
  const buyer = contractDetails.find((item) => item.role === 2); // Buyer details
  const invoice = contractDetails[4];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email } = formData; // Only extract the email for submission

    try {
      const accessToken = localStorage.getItem('accessToken');
      await axios.post(
        `https://farmlink-ewxs.onrender.com/payment/farmer/${id}/`,
        { email }, // Only sending the email to backend
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Attach the accessToken
          },
        }
      );
      alert('Payment email submitted successfully!');
    } catch (error) {
      console.error('Error submitting payment email:', error);
    }
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <Card.Title as="h5" className="mb-0">{contract.title}</Card.Title>
            </Card.Header>
            <Card.Body>

              <Row className="d-flex justify-content-center">
                <Col md="10" lg="12" xl="12">
                  <Card className="rounded-3">
                    <Card.Body className="p-4">
                      <div className="text-center mb-4">
                        <h3>Payment</h3>
                      </div>

                      {/* Payment Form */}
                      <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="accountHolderName" className="py-1">
                          <Form.Label>Account holder's Name</Form.Label>
                          <Form.Control
                            type="text"
                            size="lg"
                            name="accountHolderName"
                            value={formData.accountHolderName}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                        <Form.Group controlId="email" className="py-1">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            size="lg"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                        <Form.Group controlId="accountNumber" className="py-1">
                          <Form.Label>Account Number</Form.Label>
                          <Form.Control
                            type="number"
                            size="lg"
                            name="accountNumber"
                            value={formData.accountNumber}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                        <Form.Group controlId="ifscCode" className="py-1">
                          <Form.Label>IFSC Code</Form.Label>
                          <Form.Control
                            type="text"
                            size="lg"
                            name="ifscCode"
                            value={formData.ifscCode}
                            onChange={handleInputChange}
                          />
                        </Form.Group>

                        <Form.Group className="pt-3">
                          <Button type="submit" variant="success" size="lg" block>
                            Proceed
                          </Button>
                        </Form.Group>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Contract and Details Table */}
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
                  {role === '2' && (
                    <tr>
                      <th>Invoice File</th>
                      <td>
                        <a href={`https://farmlink-ewxs.onrender.com${invoice.invoice_file}`} className="text-success">
                          Invoice
                        </a>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>

            </Card.Body>
          </Card>

          {/* Farmer and Buyer Details */}
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
    </React.Fragment>
  );
};

export default Payment_form;
