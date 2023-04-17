import React from 'react'
import AirdropCard from 'components/Airdropper/AirdropPage/AirdropCard.js';

export default function AirdropsBase({ publicList, endedList, timedList, liveList, activeTab }) {

    
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
            {activeTab === 3 &&
                endedList.map((airdrop, index) => <AirdropCard key={index} data={airdrop} status={activeTab} privateCard={airdrop.info.isPrivate} />)}

            {activeTab === 2 &&
                timedList.map((airdrop, index) => <AirdropCard key={index} data={airdrop} status={activeTab} privateCard={airdrop.info.isPrivate}/>)}   

            {activeTab === 1 &&
                liveList.map((airdrop, index) => <AirdropCard key={index} data={airdrop} status={activeTab} privateCard={airdrop.info.isPrivate}/>)} 
        </div>
    )
}
