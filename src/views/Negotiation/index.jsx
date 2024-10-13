import React from 'react';
import { Link } from 'react-router-dom';
// Import the image
import priceNegotiationImage from '../../assets/images-home/price.jpg';

function Negotiation() {
  return (
    <div>
      <div
        role="tabpanel"
        id="servicesTab-tabpane-sls"
        aria-labelledby="servicesTab-tab-sls"
        className=" page_serviceTabPane__SvNni tab-pane"
      >
        <div className="row">
          <div className="col-md-6 order-lg-1">
            {/* Use the imported image */}
            <img
              alt="Payment Negotiation"
              data-aos="fade-left"
              loading="lazy"
              width="670"
              height="400"
              decoding="async"
              className="page_serviceImage__97B3_ undefined"
              src={priceNegotiationImage}
            />
          </div>
          <div className="col-lg-6">
            <p>
              Price negotiation allows farmers and buyers to discuss and agree on fair prices before finalizing contracts. 
              The platform provides tools and market data to facilitate transparent discussions. This ensures that pricing 
              reflects current market conditions and benefits both parties. Fair negotiation promotes equitable transactions 
              and strengthens relationships in the supply chain.
            </p>
            <div className="buttonContainer">
              <Link role="button" tabIndex="0" to='/system-soln' className="button btn btn-primary">
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Negotiation;
