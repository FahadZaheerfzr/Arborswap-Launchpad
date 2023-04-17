import React from 'react'

export default function HeadingTags({ name, required }) {
  return (
    <span className="font-gilroy font-semibold text-gray dark:text-gray-dark">
      {name}
      {required && <span className="text-[#E56060]">&nbsp;*</span>}
    </span>
  )
}
