import React from "react";
import { Token_details } from "../../../data/sale";
import BackArrowSVG from "../../../svgs/back_arrow";
import PreviewDetails from "../../Common/PreviewDetails";
import PreviewHeader from "../../Common/PreviewHeader";
import HeadingTags from "../../TokenLocker/Subcomponents/HeadingTags";
import { getTokenInfo } from "utils/tokenInfo";
import { useEthers } from "@usedapp/core";
import { useModal } from "react-simple-modal-provider";
import { isAddress } from "ethers/lib/utils";
import { formatBigToNum } from '../../../utils/numberFormat'


export default function TokenInfo({
  setActive,
  setSaleType,
  setSaleData,
  saleData,
}) {
  const [address, setAddress] = React.useState(saleData.tokenAddress);
  const [enable, setEnable] = React.useState(saleData.isValid);
  const [visible, setVisible] = React.useState(saleData.showDetails);
  const [formStatus, setFormStatus] = React.useState({
    isError: false,
    message: "",
  });
  const { account } = useEthers();
  const { open: openLoadingModal, close: closeLoadingModal } =
    useModal("LoadingModal");

  const handleChange = async(e) => {
    setFormStatus((prevState) => ({
      ...prevState,
      isError: false,
      message: "",
    }));
    setEnable(false);
    setVisible(false);
    setAddress(e.target.value);

    if (isAddress(e.target.value)) {
      openLoadingModal();
      const tokenInfo = await getTokenInfo(e.target.value);
      console.log(tokenInfo)
      if (tokenInfo.success) {
        setSaleData((prevState) => ({
            ...prevState,
            name: tokenInfo.data.name,
            tokenAddress: e.target.value,
            tokenName: tokenInfo.data.name,
            tokenSymbol: tokenInfo.data.symbol,
            tokenDecimals: tokenInfo.data.decimals,
            tokenSupply: tokenInfo.data.totalSupply,
            showDetails: true,
            isValid: true,
            }));
        setVisible(true);
        setEnable(true);
        } else {
            setFormStatus((prevState) => ({
                ...prevState,
                isError: true,
                message: "Not Valid ERC20 Token",
            }));
        }
        closeLoadingModal();
    } else {
        setSaleData((prevState) => ({
            ...prevState,
            showDetails: false,
            isValid: false,
        }));
    }
    };
  return (
    <div className="w-full">
      <HeadingTags name={"Token Address"} required />

      <input
        className="bg-transparent mt-5 w-full px-5 py-4 font-gilroy placeholder:font-medium placeholder:text-dim-text font-semibold text-dark-text dark:text-light-text focus:outline-none border-[1.5px] rounded-lg border-dim-text border-opacity-50"
        type={"text"}
        placeholder="0xc197033c129839ED4740c29919Bd88fD42bbde"
        onChange={(e) => {
          handleChange(e);
        }}
      />

      <PreviewHeader heading={"Token address Details"} />
      {visible && (
        <div className="mt-5">
          <>
            <PreviewDetails name="Name" value={saleData.tokenName} />
            <PreviewDetails name="Symbol" value={saleData.tokenSymbol} />
            <PreviewDetails name="Decimals" value={saleData.tokenDecimals} />
            <PreviewDetails
              name="Total Supply"
              value={`${formatBigToNum(
                saleData.tokenSupply,
                saleData.tokenDecimals
              )} ${saleData.tokenSymbol}`}
            />
          </>
        </div>
      )}

      <div className="mt-10">
        <div className="flex justify-end items-center mb-10">
          <button
            className="bg-white dark:bg-transparent mr-5 flex items-center gap-2 py-[10px] px-5"
            onClick={() => setSaleType(null)}
          >
            <BackArrowSVG className="fill-dark-text dark:fill-light-text" />
            <span className="font-gilroy font-medium text-sm text-dark-text dark:text-light-text">
              Go Back
            </span>
          </button>

          <button
            className="bg-primary-green hover:opacity-40 disabled:bg-dim-text disabled:dark:bg-dim-text-dark text-white font-gilroy font-bold px-8 py-3 rounded-md"
            disabled={!enable}
            onClick={() => setActive("Presale")}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
