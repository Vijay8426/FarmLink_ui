import React from 'react';
import { Row, Col, Card, Table,Form,Button} from 'react-bootstrap';



const Tender = () => {
  return (
    <React.Fragment>

      <Row>
        <Col>
        <Card>
  <Card.Header>
    <Card.Title as="h5">Organic Ragi Supply Tender</Card.Title>

  </Card.Header>
  <Card.Body>
  <p className='text-dark'>
               We invite qualified and reliable suppliers to submit bids for the procurement of high-quality organic ragi (finger millet). This tender aims to meet the increasing demand for nutritious and organic grains in both domestic and international markets. The successful bidder will be responsible for ensuring a consistent supply of pesticide-free ragi, adhering to the highest standards of quality and sustainability.
            </p>
    <Table >
      <thead>
        <tr>
          <th>Start Date</th>
          <td>22-Nov-2024</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>End Date</th>
          <td>08-Jan-2025</td>
        </tr>
        <tr>
          <th>Attachment</th>
          <td className='link-primary'>Tenderfile.pdf</td>
        </tr>
        <tr>
          <th>Minimum Bid</th>
          <td>100000/-</td>
        </tr>
        <tr>
          <th>Maximum Bid</th>
          <td>1300000/-</td>
        </tr>
      </tbody>
    </Table>
  </Card.Body>
</Card>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Enrollments</Card.Title>
 
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Vendor</th>
                    <th>Attachment</th>
                    <th >Negotiate</th>
                    <th >Contract</th>
                    

                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td className='link-primary'><a href="">file1.pdf</a></td>
                    <td className='link-info'>Message</td>
                    <td className='link-success'>Create a contract</td>

                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Wood</td>
                    <td className='link-primary'><a href="">file2.pdf</a></td>
                    <td className='link-info'>Message</td>
                    <td className='link-success'>Create a contract</td>

                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>klassen</td>
                    <td className='link-primary'><a href="">file3.pdf</a></td>
                    <td className='link-info'>Message</td>
                    <td className='link-success'>Create a contract</td>

                  </tr>

                </tbody>
              </Table>
            </Card.Body>
          </Card>


          <Card>
            <Card.Header>
              <Card.Title as="h5">Enroll</Card.Title>
              <span className="d-block m-t-5">
                Attach your draft (a detailed description like bid,personal info etc.)
              </span>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col sm={12} style={{ overflowX: 'auto' }}>
                  <Form className="d-inline-flex">
                    <Form.Group className="d-inline-flex mx-3 align-items-center">
                      <Form.Label className="mb-0">Email:</Form.Label>
                      <Form.Control className="mx-2" plaintext readOnly defaultValue="email@example.com" />
                    </Form.Group>
                    <Form.Group className="d-inline-flex mr-5 mx-3 align-items-center">

                      <Form.Control className="mx-4" type="file" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="d-inline-flex mx-3" style={{ overflow: 'unset' }}>
                      <Button className="mb-0">Submit Draft</Button>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Tender;
