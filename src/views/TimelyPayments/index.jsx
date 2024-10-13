import React from 'react';
import { Link } from 'react-router-dom';
// Import the image
import timelyPaymentsImage from '../../assets/images-home/pay.jpg';

function TimelyPayments() {
  return (
    <div>
      <div
        role="tabpanel"
        id="servicesTab-tabpane-sgs"
        aria-labelledby="servicesTab-tab-sgs"
        className="page_serviceTabPane__SvNni tab-pane"
      >
        <div className="row">
          <div className="col-md-6 order-lg-1">
            {/* Use the imported image */}
            <img
              alt="Timely Payments"
              data-aos="fade-left"
              loading="lazy"
              width="1100"
              height="880"
              decoding="async"
              className="page_serviceImage__97B3_ undefined"
              style={{ color: 'transparent' }}
              src={timelyPaymentsImage}
            />
          </div>
          <div className="col-lg-6">
            <p>
              Timely payments ensure farmers receive their money promptly after delivering their produce. 
              The system automates payment processes based on contract fulfillment, reducing delays and 
              administrative burden. This feature provides financial stability and predictability for farmers. 
              It builds trust and encourages ongoing participation in the contract farming system.
            </p>
            <div className="buttonContainer">
              <Link role="button" tabIndex="0" to="/technological-services" className="button btn btn-primary">
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimelyPayments;
