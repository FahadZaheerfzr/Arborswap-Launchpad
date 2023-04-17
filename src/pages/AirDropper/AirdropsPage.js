import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import BaseLayout from '../../components/BaseLayout/BaseLayout'
import AirdropPageBase from '../../components/Airdropper/AirdropPage'
import AddAllocations from 'components/Airdropper/AirdropPage/Modal/AddAllocations'
import RemoveAllocations from 'components/Airdropper/AirdropPage/Modal/RemoveAllocations'
import StartPrivateAirdrop from '../../components/Airdropper/AirdropPage/Modal/StartPrivateAirdrop'
import StartPublicAirdrop from '../../components/Airdropper/AirdropPage/Modal/StartPublicAirdrop'
import { getAirdropInfos, getAirdropStatus } from 'utils/getAirdropList'
import { useEthers} from '@usedapp/core'
import useAirdropOwner from 'hooks/useAirdropOwner'
import useIsOwner from 'hooks/useIsOwner'
import { getTokenInfo } from 'utils/tokenInfo'




export default function PoolPage() {
  const [modal, showModal] = useState(0);
  //const [admin] = useState(true);
  const [adminMode, setAdminMode] = useState(false);
  const { id } = useParams()
  const [asset, setAsset] = useState(null)
  const [status, setStatus] = useState('k')
  const [ready, setReady] = useState(false)
  const [token, setToken] = useState()
  const [tokenInfo, setTokenInfo] = useState()
  const navigate = useNavigate();
  const { account} = useEthers();
  

  const owner = useAirdropOwner(id)
  const isOwner = useIsOwner(id, account);
  


  useEffect(() => {

    if(isOwner){
      setAdminMode(true)
    }else{
      setAdminMode(false)
    }
    
    
  }, [owner])


  useEffect(() => {
    let activated = true
    const handleFetch = async () => {
      setAsset(false)
      try {
        const airdropInfo = await getAirdropInfos([id])
        if(airdropInfo.success){
          setToken(airdropInfo.data[0].info.token)
        }
        const info = await getTokenInfo(airdropInfo.data[0].info.token)
        if(info.success){
          setTokenInfo(info.data)
        }
        const statuses = await getAirdropStatus([id])
        const isStarted = statuses.data[0].airDropStarted;
        const isEmpty = statuses.data[0].isEmpty;
        const isCancelled = statuses.data[0].airdropCancelled;

        if(isStarted === true && (!isEmpty && !isCancelled)){
          setStatus('Live')
          
        }

        if(isStarted === false && isEmpty === false  && isCancelled === false){
          setStatus('Timed')
        }

        if(isEmpty === true || isCancelled === true){
          setStatus('Ended')
        }

        if (!activated) {
          return
        }
        if (airdropInfo.success) {
          setAsset(airdropInfo.data[0])

          document.title = airdropInfo.data[0].info.description[7]
          setReady(true)
          return
        } else {
          navigate('/airdropper/airdrops')
        }
        
        if (!activated) {
          return
        }
      } catch (error) {
        

      }
    }
    handleFetch(id)
    
    
    return () => {
      activated = false
    }
  }, [id, navigate])

  return (
    ready ? (
    <div className='w-full'>
      {modal !== 0 &&
        <div className="fixed z-50  top-0 left-0">
          {modal === 1 && <AddAllocations decimals={tokenInfo.decimals} tokenAddress={token} showModal={showModal}/>} 
          {modal === 2 && <RemoveAllocations showModal={showModal}/>} 
          {modal === 3 && <StartPrivateAirdrop decimals={tokenInfo.decimals} tokenAddress={token}  showModal={showModal} modal={modal}/>}
          {modal === 4 && <StartPublicAirdrop decimals={tokenInfo.decimals} tokenAddress={token}  showModal={showModal} modal={modal}/>}
        </div>
      }
      <BaseLayout page_name={'Airdrops'} title={asset.info.description[7]} subpage admin={adminMode} setAdminMode={setAdminMode}>
        <AirdropPageBase tokenInfo={tokenInfo} status={status} airdrop={asset} showModal={showModal} admin={adminMode} owner={owner}/>
      </BaseLayout>
    </div>
    ) : (
      <></>
    )

  )
}
