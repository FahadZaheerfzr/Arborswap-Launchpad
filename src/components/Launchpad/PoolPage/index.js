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
              icon={pool.icon}
              is_private={pool.private}
              tags={pool.tags}
              description={pool.description}
              address={pool.address}
              starts_on={pool.presale_starts}
              ends_on={pool.presale_ends}
              soft_cap={pool.soft_cap}
              hard_cap={pool.hard_cap}
              soft_cap_icon={pool.soft_cap_icon}
              hard_cap_icon={pool.hard_cap_icon}
              first_release={pool.first_release}
              vesting_release={pool.vesting_release}
            />
          </div>

          <div className="mt-14 md:mt-0 md:w-[35%] ">

            {admin ?
              <AdminPanel icon={pool.hard_cap_icon} status={pool.status} hard_cap={pool.hard_cap} filled_percent={pool.filled_percent}/>
              : <SaleBox hard_cap={pool.hard_cap} hard_cap_icon={pool.hard_cap_icon}
                min_allocation={pool.min_allocation} max_allocation={pool.max_allocation} status={pool.status}
                filled_percent={pool.filled_percent} ends_on={pool.presale_ends} showModal={showModal} />
            }
            {
              admin && pool.status === 'Ended' &&
              <div className='mt-[30px]'>
                <FundRaised icon={pool.hard_cap_icon} />
              </div>
            }
            {pool.sale_type !== 'Private' && !admin &&
              <div className='mt-[30px]'>
                <UserPanel icon={pool.icon} />
              </div>
            }
          </div>
        </div>
      </div>
    )
  )
}
