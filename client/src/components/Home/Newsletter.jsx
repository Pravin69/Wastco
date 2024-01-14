import React from 'react'

const Newsletter = () => {
  return (
    <div className="text-center py-20 px-4 bg-cover bg-center min-h-0 gradient-bg-newsletter font-semibold newsletter">
      <h3 className="heading">Subscribe For New Features</h3>
      <form action="" className='flex max-w-6xl border-[0.2rem] border-solid border-[#fff] p-2 rounded-[5rem] my-8 mx-auto h-[5.5rem]'>
        <input type="email" placeholder="enter your email" className='py-0 px-8 text-3xl bg-transparent w-full focus:outline-none text-white normal-case' />
        <input type="submit" value="Subscribe" className='bg-white w-80 text-3xl rounded-[5rem] cursor-pointer' />
      </form>
  </div>
  )
}

export default Newsletter;