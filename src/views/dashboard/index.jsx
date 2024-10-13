import React, { useState, useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import SecureContract from 'views/contract-featured';
import Negotiation from 'views/Negotiation';
import TimelyPayments from 'views/TimelyPayments';

// Import the image from src directory
import bannerImage from '../../assets/images-home/hp-banner-mobile.0b0478c0.webp';
import bannerVideo from '../../assets/media/home-video.mp4';

function DashDefault() {
  const [contract, setcontract] = useState(true);
  const [negotiation, setnegotiation] = useState(false);
  const [Payments, setPayments] = useState(false);
  const contractac = useRef(null);
  const negotiateac = useRef(null);
  const payac = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const getcontract = () => {
    setcontract(true);
    setnegotiation(false);
    setPayments(false);
    contractac.current.classList.add('active');
    negotiateac.current.classList.remove('active');
    payac.current.classList.remove('active');
  };

  const getnegotiate = () => {
    setcontract(false);
    setnegotiation(true);
    setPayments(false);
    contractac.current.classList.remove('active');
    negotiateac.current.classList.add('active');
    payac.current.classList.remove('active');
  };

  const getpay = () => {
    setcontract(false);
    setnegotiation(false);
    setPayments(true);
    contractac.current.classList.remove('active');
    negotiateac.current.classList.remove('active');
    payac.current.classList.add('active');
  };

  return (
    <div>
      <main>
        <section className="banner bannerWithContent page_homeBanner___C8lq" data-aos="fade-up">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="vstack">
                  <h1><span>Let’s Cultivate the Future of </span> Agriculture Together</h1>
                  <p className='text-dark'>
                    Grow the Future of Farming with Us. Seamless Connections Through Digital Contracts.
                    Fostering Innovation and Trust in Agriculture.
                  </p>
                  <div className="buttonContainer">
                    <a role="button" tabIndex="0" className=" btn btn-info" href="#services-section">
                      Learn more
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Use the imported image */}
          <img
            alt="Senanipay banner"
            fetchPriority="high"
            width="415"
            height="604"
            decoding="async"
            data-nimg="1"
            className="page_bannerImage__MeuLX"
            style={{ color: 'transparent' }}
            src={bannerImage}
          />

          {/* Use the imported video */}
          <video className="page_bannerVideo__Q_vff" playsInline autoPlay muted loop>
            <source src={bannerVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </section>

        <section className="page_servicesSection__0UHoG" data-aos="fade-right" id="services-section">
          <div className="container">
            <h2 data-aos="fade-up" data-aos-delay="100">Our services</h2>
            <div className="page_tabHeader__7v13_ row">
              <div className="col-xl-6 col-lg-7 col-md-12">
                <div className="nav nav-pills nav-fill" role="tablist">
                  <div className="nav-item">
                    <Link role="tab" className="nav-link active" tabIndex="0" ref={contractac} onClick={getcontract}>
                      Secure Contracts
                    </Link>
                  </div>
                  <div className="nav-item">
                    <Link role="tab" className="nav-link" tabIndex="-1" ref={negotiateac} onClick={getnegotiate}>
                      Price Negotiation
                    </Link>
                  </div>
                  <div className="nav-item">
                    <Link role="tab" className="nav-link" tabIndex="-1" ref={payac} onClick={getpay}>
                      Timely Payments
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-content">
              {contract && <SecureContract />}
              {negotiation && <Negotiation />}
              {Payments && <TimelyPayments />}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default DashDefault;
