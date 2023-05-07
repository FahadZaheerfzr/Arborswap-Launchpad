import React from 'react'
import Preview from '../Preview'
import SaleBox from '../Sale'
import UserPanel from '../UserPanel/UserPanel';
import AdminPanel from '../Admin/AdminPanel';
import FundRaised from '../Admin/FundRaised';

export default function PoolPageBase({ pool, showModal, admin }) {
  return (
    pool && (
      <div className="w-full flex justify-center">
        <div className="w-full px-4 md:px-0 md:flex md:w-10/12 md:gap-7">
          <div className="w-full md:w-[65%] bg-white dark:bg-dark-1 rounded-[10px]">
            <Preview
              name={pool.name}
              icon={pool.image}
              is_private={pool.saleType === 'Private'}
              tags={pool.tags}
              token={pool.token}
              description={pool.description}
              address={pool.saleAddress}
              starts_on={pool.startDate}
              ends_on={pool.endDate}
              soft_cap={pool.softCap}
              hard_cap={pool.hardCap}
              soft_cap_icon={pool.soft_cap_icon}
              hard_cap_icon={pool.hard_cap_icon}
              first_release={pool.first_release}
              vesting_release={pool.vesting_release}
            />
          </div>

          <div className="mt-14 md:mt-0 md:w-[35%] ">

            {admin ?
              <AdminPanel icon={pool.image} status={pool.saleType} hard_cap={pool.hardCap} filled_percent={pool.filled_percent}/>
              : <SaleBox hard_cap={pool.hardCap} hard_cap_icon={pool.image}
                min_allocation={pool.minAllocation} max_allocation={pool.maxAllocation} status={pool.saleType}
                filled_percent={pool.filled_percent} ends_on={pool.endDate} showModal={showModal} token = {pool.token} />
            }
            {
              admin && pool.status === 'Ended' &&
              <div className='mt-[30px]'>
                <FundRaised icon={pool.image} pool = {pool}/>
              </div>
            }
            {pool.sale_type !== 'Private' && !admin &&
              <div className='mt-[30px]'>
                <UserPanel icon={pool.image} pool = {pool}/>
              </div>
            }
          </div>
        </div>
      </div>
    )
  )
}
