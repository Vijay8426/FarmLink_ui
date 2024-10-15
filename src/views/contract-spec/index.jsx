import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Card, Table, Form, Button } from 'react-bootstrap';
import axios from 'axios';

// Utility function to format dates using native JavaScript
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return date.toLocaleDateString('en-US', options);
};

const ContractSpec = () => {
  const { id } = useParams(); // Get the contract ID from URL params
  const [contractDetails, setContractDetails] = useState(null);
  const [role,setRole]=useState('');
  const [fileLink, setFileLink] = useState(''); // State to store the file link
  const [selectedFile, setSelectedFile] = useState(null); // State to store the selected file

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
        console.log(role)

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

  // Handle file input change
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle form submission for file upload
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    try {
      const accessToken = localStorage.getItem('accessToken'); // Retrieve accessToken from local storage

      // Prepare FormData
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Make the API call with FormData
      await axios.post(
        `https://farmlink-ewxs.onrender.com/contract/delivery/${id}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload the file. Please try again.');
    }
  };

  if (!contractDetails) {
    return <p>Loading contract details...</p>;
  }

  const contract = contractDetails[0]; // First object in data for contract
  const tender = contractDetails[1]; // Second object contains tender details
  const farmer = contractDetails.find((item) => item.role === 1); // Farmer details
  const buyer = contractDetails.find((item) => item.role === 2); // Buyer details
  const invoice=contractDetails[4];

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">{contract.title}</Card.Title>
            </Card.Header>
            <Card.Body>
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
                  <tr>
                  <th>Invoice File</th>
                  <td><a href={`https://farmlink-ewxs.onrender.com${invoice.invoice_file}`} className='text-success'>Invoice</a></td>
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

          {/* File Upload Form */}
          {(role==='1')&&
          <Card>
            <Card.Header>
              <Card.Title as="h5">Submit Your Invoice</Card.Title>
              <span className="d-block m-t-5">
                Attach your invoice file with necessary proofs
              </span>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col sm={12} style={{ overflowX: 'auto' }}>
                  <Form className="d-inline-flex" onSubmit={handleSubmit}>
                    <Form.Group className="d-inline-flex mx-3 align-items-center">
                      <Form.Label className="mb-0">Email:</Form.Label>
                      <Form.Control className="mx-2" plaintext readOnly defaultValue="email@example.com" />
                    </Form.Group>
                    <Form.Group className="d-inline-flex mr-5 mx-3 align-items-center">
                      <Form.Control className="mx-4" type="file" onChange={handleFileChange} />
                    </Form.Group>
                    <Form.Group className="d-inline-flex mx-3" style={{ overflow: 'unset' }}>
                      <Button className="mb-0" type="submit">Submit</Button>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Card>}
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ContractSpec;
