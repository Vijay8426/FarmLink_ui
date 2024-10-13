import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import AOS from 'aos';
import 'aos/dist/aos.css';

function HeaderAndFooterExample() {
  const cardStyle = {
    width: '550px',
    margin: '0 auto',
  };

  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTenders = async () => {
      setLoading(true);
      try {
        const accessToken = localStorage.getItem('accessToken');

        const response = await axios.get('https://farmlink-ewxs.onrender.com/tender/tender/buyer/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setTenders(response.data);
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
                    {tender.description}
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => {
                      // Change the window location to the tender details page
                      window.location.href = `https://farmlink-ui.onrender.com/demos/admin-templates/datta-able/react/free/app/tender-spec/${tender.id}`;
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

export default HeaderAndFooterExample;
