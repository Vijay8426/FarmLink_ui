import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function ViewTender() {
  const cardStyle = {
    width: '550px',
    margin: '0 auto',
  };

  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchTenders = async () => {
      setLoading(true);
      try {
        const accessToken = localStorage.getItem('accessToken');
        const userRole = localStorage.getItem('userRole'); // Get user role from localStorage

        let apiUrl = '';
        if (userRole === '2') {
          apiUrl = 'https://farmlink-ewxs.onrender.com/tender/tender/buyer/';
        } else if (userRole === '1') {
          apiUrl = 'https://farmlink-ewxs.onrender.com/tender/tenders/';
        }

        if (apiUrl) {
          const response = await axios.get(apiUrl, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          setTenders(response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tenders:', error);
        setLoading(false);
      }
    };

    fetchTenders();
    AOS.init();
  }, []);

  return (
    <Row className="justify-content-center">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
          <Spinner animation="border" variant="primary" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        tenders.length > 0 ? (
          tenders.map((tender) => (
            <Col xs={12} md={6} className="d-flex justify-content-center mb-3" key={tender.id}>
              <Card style={cardStyle} data-aos="fade-up">
                <Card.Body>
                  <Card.Title>{tender.title}</Card.Title>
                  <Card.Text>
                    {tender.description || 'No description available.'}
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => {
                      navigate(`/app/tender-spec/${tender.id}`); // Use navigate instead of window.location.href
                    }}
                  >
                    Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No tenders available.</p>
        )
      )}
    </Row>
  );
}

export default ViewTender;
