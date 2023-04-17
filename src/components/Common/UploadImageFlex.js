import React, { useRef } from 'react'
import UploadSVG from '../../svgs/CreateSale/upload'
import ImagePlaceholder from './ImagePlaceholder'

export default function UploadImageFlex({ image, setImage }) {
  const fileInput = useRef()

  const triggerFile = () => {
    fileInput.current.click()
  }

  const handleFile = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]))
    }
  }
  return (
    <div className="flex items-center gap-5 mt-5">
      <div className='w-full md:w-60'>
        <ImagePlaceholder image={image} />
      </div>
      <div className="w-full flex flex-col items-center text-center">
        <span className="font-gilroy font-medium text-gray dark:text-gray-dark">
          JPG,PNG or GIF. <br /> 300 x 300 Size
          <br /> Recommended
          <br />
          <span className="text-dark-text dark:text-light-text">MAX 5MB</span>
        </span>

        <button
          className="bg-light dark:bg-dark mt-2 flex gap-2 py-[10px] px-5"
          onClick={triggerFile}
        >
          <UploadSVG className="fill-dark-text dark:fill-light-text" />
          <span className="font-gilroy font-semibold text-sm text-gray dark:text-gray-dark">Upload File</span>
          <input
            type={'file'}
            className="hidden"
            accept="image/png, image/jpeg, image/gif, video/mp4, audio/mp3"
            onChange={handleFile}
            ref={fileInput}
          />
        </button>
      </div>
    </div>
  )
}
