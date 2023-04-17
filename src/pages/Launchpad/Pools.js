import React, { useState } from 'react'
import BaseLayout from '../../components/BaseLayout/BaseLayout'
import HomeLayout from '../../components/HomeLayout'
import LaunchpadSVG from '../../svgs/Sidebar/launchpad'
import { useDocumentTitle } from "../../hooks/setDocumentTitle"
import PoolsBase from '../../components/Launchpad/Pools'

const Tabs = [
  {
    id: 1,
    tabName: "Live",
  },
  {
    id: 2,
    tabName: "Ended"
  },
  {
    id: 3,
    tabName: "Upcoming"
  }
]

export default function Pools() {
  useDocumentTitle("Pools")
  const [activeTab, setActiveTab] = useState(1);

  return (
    <BaseLayout title={"Launchpad"} title_img={<LaunchpadSVG className="md:hidden fill-dim-text" />} page_name={"Pools"}
      page_description={"Discover upcoming or live sales."}>
      <HomeLayout tabs={Tabs} activeTab={activeTab} setActiveTab={setActiveTab}>
          <PoolsBase activeStatus={Tabs[activeTab-1].tabName} />
      </HomeLayout>
    </BaseLayout>
  )
}
