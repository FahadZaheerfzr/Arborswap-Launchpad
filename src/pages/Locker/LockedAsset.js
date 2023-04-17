import React, { useEffect, useState } from 'react'
import { getTokenLockInfos, getLpLockInfos } from 'utils/getLockList'

import { useNavigate, useParams } from 'react-router-dom'
import BaseLayout from '../../components/BaseLayout/BaseLayout'
import LockedAssetBase from '../../components/LockedAsset'

export default function LockedAsset({ type }) {

  const { id } = useParams()
  const [asset, setAsset] = useState(null)
  const [ready, setReady] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    let active = true

    const handleFetch = async () => {
      setAsset(false)

      try {
        if (type === 'token') {
          const info = await getTokenLockInfos([id])
          if (!active) {
            return
          }
          if (info.success) {
            setAsset(info.data[0])
            setReady(true)
            return
          } else {
            navigate('/locked-assets')
          }
        }
        if (type === 'lp-token') {
          const infoLp = await getLpLockInfos([id])
          if (!active) {
            return
          }
          if (infoLp.success) {
            setAsset(infoLp.data[0])
            setReady(true)
            return
          } else {
            navigate('/locked-assets')
          }
        }
        if (!active) {
          return
        }
      } catch (error) {}
    }
    handleFetch(type, id)

    return () => {
      active = false
    }
  }, [type, id, navigate])

  return ready ? (
    // <BaseLayout title={asset && `${asset.name1}/${asset.name2}`} page_name={'Locked Assets'} subpage>
    <BaseLayout title={type} page_name={'Locked Assets'} subpage>
      <LockedAssetBase asset={asset} type={type} />
    </BaseLayout>
  ) : (
    <></>
  )
}
