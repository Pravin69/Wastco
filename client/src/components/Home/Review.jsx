import React from 'react'
import pic1 from '../../assets/pic1.png';
import pic2 from '../../assets/pic2.png';
import pic3 from '../../assets/pic3.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Review = () => {
  return (
    <section className="min-h-0 gradient-bg-services" id="reviews">
      <h1 className="font-semibold heading"> people's review </h1>
      <div className="flex flex-wrap items-center justify-center box-container">
        <div className="review-box">
          <FontAwesomeIcon icon={['fas','fa-quote-right']}  />
          <div className="user">
            <img src={pic1} alt="User1" />
            <h3>Mayuri Nidhonkar</h3>
            <div className="stars">
              <FontAwesomeIcon icon={['fas','fa-star']}  />
              <FontAwesomeIcon icon={['fas','fa-star']}  />
              <FontAwesomeIcon icon={['fas','fa-star']}  />
              <FontAwesomeIcon icon={['fas','fa-star']}  />
              <FontAwesomeIcon icon={['fas','fa-star']}  />
            </div>
            <div className="comment">
              For years now I have been sitting all day waiting on the street
              corner waiting on the garbage and recycle, and mail trucks. My
              autistic grandchild loves them all. He calls all drivers, his
              friend. There have been many drivers, all very kind, generous and
              sweet to honk and wave and give him a hat. Today's friend was
              Vincent, and we really appreciate you and all the others.
            </div>
          </div>
        </div>
        <div className="review-box">
          <FontAwesomeIcon icon={['fas','fa-quote-right']}  />
          <div className="user">
            <img src={pic2} alt="User2" />
            <h3>Pravin Thakur</h3>
            <div className="stars">
              <FontAwesomeIcon icon={['fas','fa-star']}  />
              <FontAwesomeIcon icon={['fas','fa-star']}  />
              <FontAwesomeIcon icon={['fas','fa-star']}  />
              <FontAwesomeIcon icon={['fas','fa-star']}  />
              <FontAwesomeIcon icon={['fas','fa-star-half-alt']}  />
            </div>
            <div className="comment">
              I live in a very large apartment complex and across the parking lot
              from the dumpsters. I notice every time they empty our dumpsters,
              they pick up the garbage thoughtless residents leave on the ground.
              It's always nice to see so much consideration for cleanliness!
              Thanks Waste Management for the top rate service!
            </div>
          </div>
        </div>
        <div className="review-box">
          <FontAwesomeIcon icon={['fas','fa-quote-right']}  />
          <div className="user">
            <img src={pic3} alt="User3" />
            <h3>Vaishnavi Rathod</h3>
            <div className="stars">
              <FontAwesomeIcon icon={['fas','fa-star']}  />
              <FontAwesomeIcon icon={['fas','fa-star']}  />
              <FontAwesomeIcon icon={['fas','fa-star']}  />
              <FontAwesomeIcon icon={['fas','fa-star']}  />
              <FontAwesomeIcon icon={['fas','fa-star']}  />
            </div>
            <div className="comment">
              Outstanding service from the 2 ladies who processed me through today
              5/21/22. They were struggling with technical issues and were back
              up. They were polite, professional and efficient despite there
              challenges. They are truly and asset to the company and show
              outstanding customer service.
            </div>
          </div>
        </div>
      </div>
  </section>
  )
}

export default Review;