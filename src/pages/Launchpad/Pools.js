import React from 'react'
import BaseLayout from '../../components/BaseLayout/BaseLayout'
import HomeLayout from '../../components/HomeLayout'
import LaunchpadSVG from '../../svgs/Sidebar/launchpad'
import { useDocumentTitle } from "../../hooks/setDocumentTitle"
import PoolsBase from '../../components/Launchpad/Pools'
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "config/constants/LaunchpadAddress";

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
  const [loading, setLoading] = useState(true);
  const [pools, setPools] = useState([]);
  const [filteredPools, setFilteredPools] = useState([]);

    //we will get data for pools from api
    useEffect(() => {
      //api request to localhost:8080/api/sale
      setLoading(true);
      axios
        .get(`${BACKEND_URL}/api/sale`)
        .then((res) => {
          setPools(res.data);
          setFilteredPools(res.data);
        })
        .catch((err) => {});
  
      setLoading(false);
    }, []);

  return (
    <BaseLayout title={"Launchpad"} title_img={<LaunchpadSVG className="md:hidden fill-dim-text" />} page_name={"Pools"}
      page_description={"Discover upcoming or live sales."}>
      <HomeLayout tabs={Tabs} activeTab={activeTab} setActiveTab={setActiveTab} pools = {pools} setFilteredPools={setFilteredPools}>
          <PoolsBase activeStatus={Tabs[activeTab-1].tabName} pools={filteredPools} loading={loading} />
      </HomeLayout>
    </BaseLayout>
  )
}
