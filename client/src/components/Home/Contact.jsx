import React from 'react'
import contact from '../../assets/contact-img.png';

const Contact = () => {
  return (
    <section className="flex flex-wrap items-center justify-center pb-16 gradient-bg-transactions" id="contact">
      <div className="flex-[1_1_40rem]">
        <img src={contact} alt="Contact Us" className='w-11/12 p-8' />
      </div>
      <form className="flex-[1_1_40rem] py-8 px-12 border-[0.1rem] border-solid border-black/20 shadow-[0_0.5rem_1rem_rgba(0,0,0,0.5)] rounded-[2rem] bg-[rgba(39,51,89,0.4)] " action="">
        <h1 className="heading font-semibold text-left p-0 pb-8 ">contact us</h1>
        <div className="relative inputBox">
          <input  type="text" required />
          <label >name</label>
        </div>
        <div className="relative inputBox">
          <input type="email" required />
          <label >email</label>
        </div>
        <div className="relative inputBox">
          <input type="number" required />
          <label >phone</label>
        </div>
        <div className="relative inputBox">
          <textarea
            name=""
            id=""
            cols={30}
            rows={10}
            className="resize-none h-52 "
            required
          />
          <label>message</label>
        </div>
        <input type="submit" className="btn" value="send message" />
      </form>
  </section>
  )
}

export default Contact;