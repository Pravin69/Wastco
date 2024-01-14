import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => {
  return (
    <div className="pt-12 bg-cover bg-center gradient-bg-footer">
      <div className="flex flex-wrap">
        <div className="footer-box">
          <h3>about us</h3>
          <p>
          Wastco platform allows brands, retailers and manufacturers to bridge the gap between sustainability and operations.
         <p>&nbsp;&nbsp;Our platform provides the real-time data for better decision making on how to lead the circular economy transformation of brands and retailers.</p>
          </p>
        </div>
        <div className="footer-box">
          <h3>quick links</h3>
          <a href="#">home</a>
          <a href="#">services</a>
          <a href="#">about us</a>
          <a href="#">reviews</a>
          <a href="#">contact us</a>
        </div>
        <div className="footer-box">
          <h3>follow us</h3>
          <a href="#">facebook</a>
          <a href="#">instagram</a>
          <a href="#">pinterest</a>
          <a href="#">twitter</a>
        </div>
        <div className="footer-box">
          <h3>contact info</h3>
          <div className="info">
            <FontAwesomeIcon icon={['fas','fa-phone']} viewBox="-250 -250 1000 1000"  />
            <p>
              {" "}
              +123-456-7890 <br /> +111-2222-333{" "}
            </p>
          </div>
          <div className="info">
            <FontAwesomeIcon icon={['fas','fa-envelope']} viewBox="-250 -250 1000 1000"  />
            <p>
              {" "}
              pravin@gmail.com <br /> akshad@gmail.com{" "}
            </p>
          </div>
          <div className="info">
            <FontAwesomeIcon icon={['fas','fa-map-marker-alt']} viewBox="-300 -250 1000 1000"  />
            <p> aurangabad, india - 400104 </p>
          </div>
        </div>
      </div>
      <h1 className="text-[2rem] font-normal tracking-[0.1rem] text-[#fff] border-solid border-0 border-t-[0.1rem] border-t-[#fff5] py-10 px-4 text-center"> © copyright @ 2022</h1>
    </div>
  )
}

export default Footer;