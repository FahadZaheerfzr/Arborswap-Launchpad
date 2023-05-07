import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BaseLayout from "../../components/BaseLayout/BaseLayout";
import PoolPageBase from "../../components/Launchpad/PoolPage";
import { Pools } from "../../data/pools";
import { useEthers } from "@usedapp/core";
import Modal from "components/Launchpad/Modal";
import axios from "axios";
import { Contract } from "ethers";

export default function PoolPage() {
  const { id } = useParams();
  const [pool, setPool] = useState(null);
  const [modal, showModal] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [adminMode, setAdminMode] = useState(false);
  const { account } = useEthers();
  console.log(pool);
  useEffect(() => {
    //get pool data from api
    axios
      .get(`http://localhost:8080/api/sale/${id}`)
      .then((res) => {
        setPool(res.data);
        console.log("The pool is", res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    //gonna check if the user is admin or not
    //also gonna check if pool is empty or not
    if (account && pool) {
      if (pool.sale.owner.toLowerCase() === account.toLowerCase()) {
        // setAdmin(true);
        // setAdminMode(true);
      }
    }
  }, [id]);
  return (
    pool && (
      <div className="w-full">
        {modal && (
          <div className="fixed z-50  top-0 left-0">
            <Modal
              showModal={showModal}
              from_symbol={pool.sale.token.tokenSymbol}
              from_icon={pool.sale.token.image}
              to_icon={pool.sale.token.image}
              to_symbol={pool.sale.token.tokenSymbol}
              token = {pool.sale.token}
              sale = {pool.sale}
            />
          </div>
        )}
        <BaseLayout
          page_name={"Pools"}
          title={pool.sale.name}
          subpage
          admin={admin}
          setAdminMode={setAdminMode}
        >
          <PoolPageBase
            pool={pool.sale}
            showModal={showModal}
            admin={adminMode}
          />
        </BaseLayout>
      </div>
    )
  );
}
