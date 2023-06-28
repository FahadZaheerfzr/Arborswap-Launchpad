import React from 'react'

export default function SlideContent({name, img, mobile }) {
  if (mobile) {
    return (
      <div className="w-full px-2">
        <img className="w-full" src={img} alt={name}/>
      </div>
    )
  }
  return (
      <div className="w-1/3 pr-2">
        <img className="w-full rounded-xl" src={img} alt={name} />
      </div>
  )
}
