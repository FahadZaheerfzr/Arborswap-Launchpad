import React from "react";
import BaseLayout from "../../components/BaseLayout/BaseLayout";
import HomeLayout from "../../components/HomeLayout";
import LaunchpadSVG from "../../svgs/Sidebar/launchpad";
import { useDocumentTitle } from "../../hooks/setDocumentTitle";
import PoolsBase from "../../components/Launchpad/Pools";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "config/constants/LaunchpadAddress";
import { useModal } from "react-simple-modal-provider";

const Tabs = [
  {
    id: 1,
    tabName: "Live",
  },
  {
    id: 2,
    tabName: "Ended",
  },
  {
    id: 3,
    tabName: "Upcoming",
  },
];

export default function Pools() {
  useDocumentTitle("Pools");
  const [activeTab, setActiveTab] = useState(1);
  const [loading, setLoading] = useState(true);
  const [pools, setPools] = useState([]);
  const [filteredPools, setFilteredPools] = useState([]);
  const { open: openLoadingModal, close: closeLoadingModal } =
    useModal("LoadingModal");
  //we will get data for pools from api
  useEffect(() => {
    //api request to localhost:8080/api/sale
    
    async function getPools() {
      openLoadingModal();
      setLoading(true);
      try {
        const res = await axios.get(`${BACKEND_URL}/api/sale`);
        console.log(res.data)
        const filteredPools = res.data.filter(
          (pool) => pool.sale.status === Tabs[activeTab - 1].tabName
        );
        filteredPools.sort((a, b) => {
          return (
            new Date(b.sale.startDate).getTime() -
            new Date(a.sale.startDate).getTime()
          );
        });
        setPools(filteredPools);
        setFilteredPools(filteredPools);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
      closeLoadingModal();
    }

    getPools();
  }, [activeTab]);

  return (
    <BaseLayout
      title={"Launchpad"}
      title_img={<LaunchpadSVG className="md:hidden fill-dim-text" />}
      page_name={"Pools"}
      page_description={"Discover upcoming or live sales."}
    >
      <HomeLayout
        tabs={Tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pools={pools}
        setFilteredPools={setFilteredPools}
        launchpad={true}
      >
        <PoolsBase pools={filteredPools} loading={loading} />
      </HomeLayout>
    </BaseLayout>
  );
}
