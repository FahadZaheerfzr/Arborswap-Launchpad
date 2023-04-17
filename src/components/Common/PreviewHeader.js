import React from 'react'

export default function PreviewHeader({ heading }) {
  return (
    <div className="flex justify-around items-center mt-10">
      <div className="border border-dashed border-dim-text dark:border-dim-text-dark border-opacity-30 w-full" />
      <div className="w-full flex justify-center items-center">
        <span className="font-gilroy text-sm text-center font-medium text-dim-text dark:text-dim-text-dark">{heading}</span>
      </div>

      <div className="border border-dashed border-dim-text dark:border-dim-text-dark border-opacity-30 w-full" />
    </div>
  )
}
