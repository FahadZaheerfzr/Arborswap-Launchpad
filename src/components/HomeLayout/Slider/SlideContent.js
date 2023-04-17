import React from 'react'

export default function SlideContent({ img1, img2, img3, mobile }) {
  if (mobile) {
    return (
      <div className="w-full px-2">
        <img className="w-full" src={img1} alt="banner-1" />
      </div>
    )
  }
  return (
    <div className=" flex gap-5">
      <div className="w-1/3 pr-2">
        <img className="w-full rounded-xl" src={img1} alt="banner-1" />
      </div>

      <div className="w-1/3 flex justify-end pr-2">
        <img className="w-full rounded-xl" src={img2} alt="banner-2" />
      </div>

      <div className="w-1/3 flex justify-end pr-2">
        <img className="w-full rounded-xl" src={img3} alt="banner-3" />
      </div>
    </div>
  )
}
