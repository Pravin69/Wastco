import React from 'react';
import card1 from '../../assets/card1.jpg';
import card2 from '../../assets/card2.jpg';
import card3 from '../../assets/card3.jpg';

const Services = () => {
  return (
    <section className='min-h-0 gradient-bg-transactions' id ="services">
      <h1 className="heading font-semibold"> Services </h1>
      <div className="flex flex-wrap items-center justify-center">
        <div className="services-box">
          <img src={card1} alt="" />
          <h3>Pickup Partners</h3>
          <p>Boost your Earnings.</p>
          <a href="#" className="btn">
            read more
          </a>
        </div>
        <div className="services-box">
          <img src={card2} alt="" />
          <h3>Refurbishes Partners</h3>
          <p>Rewarding yours skill.</p>
          <a href="#" className="btn">
            read more
          </a>
        </div>
        <div className="services-box">
          <img src={card3} alt="" />
          <h3>Loading Vehicle Partners</h3>
          <p>Join Hands for Continuous Growth </p>
          <a href="#" className="btn">
            read more
          </a>
        </div>
      </div>
    </section>
  )
}

export default Services;