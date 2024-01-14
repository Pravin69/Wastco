import React from 'react'
import about from '../../assets/about-img_prev_ui.png';

const About = () => {
  return (
    <section className="gradient-bg-about min-h-[80vh]" id="about">
      <h1 className="heading font-semibold"> About us </h1>
      <div className="flex flex-wrap items-center justify-center">
        <div className="flex-[0.5_1_38rem]">
          <img src={about} className="rounded-[2rem] w-[70%]" alt="About us" />
        </div>
        <div className="flex-[1_1_40rem] text-justify content">
          <h3 className="text-[2.7rem] font-semibold text-gradient">
            Creating New Bussiness opportunities in to Professional Scrapping
          </h3>
          <p>
            Wastco provides your company with detailed, real-time visibility on
            waste and recycling streams, helping your company:
            <br />
          </p>
          <ul list-style="disc">
            <li>meet its circular economy goals.</li>
            <li>
              improve collaboration across different teams driving sustainability
              initiatives.
            </li>
            <li>support and improve your CSR waste initiatives.</li>
          </ul>
          <p>
            Our platform works to track and trace waste materials both internally
            and across supply chain partners.
          </p><p>
            Whether you are looking to improve your circular economy initiatives,
            reduce the waste impact of your company or improve the circularity of
            your production, Wastco digital solutions can help maximise your
            results and impact.
          </p>
        </div>
      </div>
  </section>
  )
}

export default About;