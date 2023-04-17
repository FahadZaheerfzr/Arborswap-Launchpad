import React, { useState } from 'react'

const TokenImage = ({ src, alt, className }) => {
  const [isUndefined, updateIsUndefined] = useState(false)

  const onError = () => {
    updateIsUndefined(true)
  }

  if (isUndefined) {
    return <img className={className} src="/images/fallback.png" alt={alt} />
  }

  return <img src={src} alt={alt} className={className} onError={onError} />
}

export default React.memo(TokenImage, () => true)
