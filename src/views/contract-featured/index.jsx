import React from 'react';
import { Link } from 'react-router-dom';
// Import the image
import secureContractsImage from '../../assets/images-home/Smart-contracts-01.png';

function SecureContract() {
  return (
    <div>
      <div
        role="tabpanel"
        id="servicesTab-tabpane-scs"
        aria-labelledby="servicesTab-tab-scs"
        className="fade page_serviceTabPane__SvNni tab-pane active show"
      >
        <div className="row">
          <div className="col-md-6 order-lg-1">
            {/* Use the imported image */}
            <img
              alt="SecureContracts"
              data-aos="fade-left"
              loading="lazy"
              width="600"
              height="500"
              decoding="async"
              className="page_serviceImage__97B3_ undefined"
              style={{ color: 'transparent' }}
              src={secureContractsImage}
            />
          </div>
          <div className="col-lg-6">
            <p>
              Secure contracts are digital agreements that are legally binding and protected against tampering. 
              They detail all terms, including quantity, quality, delivery schedules, and prices. By using encryption 
              and blockchain technology, these contracts ensure transparency and trust between farmers and buyers. 
              This prevents fraud and ensures that both parties adhere to the agreed terms.
            </p>
            <div className="buttonContainer">
              <Link role="button" tabIndex="0" to='/semiconductor' className="button btn btn-primary">
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecureContract;
