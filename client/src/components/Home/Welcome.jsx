import React from 'react'
import video from '../../assets/vid-1.mp4'

const Welcome = () => {
  return (
    <div className="flex flex-row justify-center items-center container_custom">
      <div className="home__content">
        <h1 className="text-[5rem] font-semibold drop-shadow-[3px_3px_5px_rgba(0,0,0,0.1)] leading-[0.8] mb-4 home__title">
          Be a part of
          <br />
          <span className="font-['Yellowtail',cursive] text-[#0077b6]">solution</span>
          <br />
          not a part of pollution
        </h1>
        <p className="text-[2.2rem]  font-bold mb-12 text-gradient home__text">What a difference one bottle can make ?</p>
        <a href="#" className="btn !py-6 !px-8 font-bold hover:bg-emerald-600/[0.4]">
          Discover More
        </a>
        <div className="flex items-center mt-8 relative home__controls">
          <svg
            className="hover:translate-x-[-5px] .home__controls"
            data-id="video"
            xmlns="http://www.w3.org/2000/svg"
            width="86.742"
            height="73.216"
            viewBox="0 0 86.742 73.216"
          >
            <path d="M22.897 73.216L0 48.158 44.032 0v6.983L27.159 25.498l17.248 18.94L84.897 0v6.985L68.533 24.942l18.209 19.961v7.01L65.35 28.435 47.593 47.931l16.681 18.304v6.981l-40.299-44.22L6.468 48.207l16.429 18.028z" />
          </svg>
          <div className="text-[2.5rem] font-bold text-[#fff] ml-[1.2rem] mr-[1.2rem]">Our Agenda</div>
          <svg
            className="hover:translate-x-[5px] "
            data-id="video"
            xmlns="http://www.w3.org/2000/svg"
            width="86.742"
            height="73.216"
            viewBox="0 0 86.742 73.216"
          >
            <path d="M63.845 73.216l22.897-25.058L42.71 0v6.983l16.873 18.515-17.248 18.94L1.845 0v6.985l16.364 17.957L0 44.903v7.01l21.392-23.478 17.757 19.496-16.681 18.304v6.981l40.299-44.22 17.507 19.211-16.429 18.028z" />
          </svg>
        </div>
      </div>
      <div className="h-full relative left-[5%] w-[80%]">
        <video
          src={video}
          className="relative top-full left-0 w-full h-full rounded-[32px] object-fill transition-opacity"
          id="video1"
          type="”video/mp4”"
          preload="auto"
          controls autoPlay
        />
      </div>
  </div>
  )
}

export default Welcome;