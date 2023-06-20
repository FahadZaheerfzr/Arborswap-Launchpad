import React, { useState, useContext } from "react";
import TwitterSVG from "../../../svgs/Socials/twitter";
import DribbleSVG from "../../../svgs/Socials/dribble";
import HeadingTags from "../../TokenLocker/Subcomponents/HeadingTags";
import BackArrowSVG from "../../../svgs/back_arrow";
import LinkedinSVG from "../../../svgs/Socials/linkedin";
import { ThemeContext } from "../../../context/ThemeContext/ThemeProvider";
import GithubSVG from "../../../svgs/Socials/github";
import TelegramSVG from "svgs/Socials/telegram";
import { isValidUrl } from "utils/numberFormat";
import PreviewHeader from "components/Common/PreviewHeader";
import DiscordSVG from "svgs/Socials/discord";
import YoutubeSVG from "svgs/Socials/youtube";
import { toast } from "react-toastify";

export default function ProjectDetails({ setActive, setSaleData, saleData }) {
  const { theme } = useContext(ThemeContext);
  const [validWebsite, setValidWebsite] = useState(true);
  const [validTwitter, setValidTwitter] = useState(true);
  const [validLinkedin, setValidLinkedin] = useState(true);
  const [validGithub, setValidGithub] = useState(true);
  const [validTelegram, setValidTelegram] = useState(true);
  const [validDiscord, setValidDiscord] = useState(true);
  const [validYoutube, setValidYoutube] = useState(true);
  const [valid, setValid] = useState(true);
  const [show, setShow] = useState([]);

  const handleMouseEnter = (e) => {
    const id = e.target.id;
    setShow((prevState) => [...prevState, id]);
  };

  const handleMouseLeave = (e) => {
    const id = e.target.id;
    setShow((prevState) => prevState.filter((item) => item !== id));
  };

  const handleSubmit = () => {
    //if no image or website is provided, display error
    if (saleData.image === "" ) {
      toast.error("Please fill in the image field");
      return;
    }
    if (saleData.website === "") {
      toast.error("Please fill in the website field");
      return;
    }
    if (!isValidUrl(saleData.image)) {
      setValid(false);
      return;
    } else {
      setValid(true);
    }

    if (!isValidUrl(saleData.website)) {
      setValidWebsite(false);
      return;
    } else {
      setValidWebsite(true);
    }

    if (saleData.twitter !== "") {
      if (!isValidUrl(saleData.twitter)) {
        setValidTwitter(false);
        return;
      } else {
        setValidTwitter(true);
      }
    }

    if (saleData.linkedin !== "") {
      if (!isValidUrl(saleData.linkedin)) {
        setValidLinkedin(false);
        return;
      } else {
        setValidLinkedin(true);
      }
    }

    if(saleData.youtube !== "") {
      if(!isValidUrl(saleData.youtube)) {
        setValidYoutube(false);
        return;
      } else {
        setValidYoutube(true);
      }
    }
    if (saleData.github !== "") {
      if (!isValidUrl(saleData.github)) {
        setValidGithub(false);
        return;
      } else {
        setValidGithub(true);
      }
    }

    if (saleData.telegram !== "") {
      if (!isValidUrl(saleData.telegram)) {
        setValidTelegram(false);
        return;
      } else {
        setValidTelegram(true);
      }
    }

    if (saleData.discord !== "") {
      if (!isValidUrl(saleData.discord)) {
        setValidDiscord(false);
        return;
      } else {
        setValidDiscord(true);
      }
    }

    if (isValidUrl(saleData.image) && isValidUrl(saleData.website))
      setActive("Preview");
    else if (!isValidUrl(saleData.image)) {
      toast.error("Please fill in the image field correctly");
    } else if (!isValidUrl(saleData.website)) {
      toast.error("Please fill in the website field correctly");
    }
  };

  return (
    <div className="w-full p-5 md:p-9 bg-white dark:bg-dark-1 rounded-[10px] ">
      <>
        <div className="flex items-center mt-9">
          <HeadingTags name={"Project Logo"} required />
          <div className="relative">
            <img
              src="/images/lists/question.svg"
              alt="info"
              id="info"
              className="ml-2"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
            {/* tooltip to appear above img info tag */}
            {show.includes("info") && (
              <div className="absolute z-10 bg-dim-text bg-opacity-50 dark:bg-white rounded-[10px] shadow-lg p-1 bottom-3 left-5 w-36">
                <p className="text-light-text dark:text-dark-text font-extralight text-sm">
                  This is the logo of your project (atleast 1000px for quality)
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between gap-5 cursor-pointer">
          <div
            className={`flex items-center justify-between bg-[#FAF8F5] border dark:bg-dark-2 px-5 py-4 rounded-md w-[100%] ${
              valid ? "border-dim-text" : "border-red-500"
            }`}
          >
            <input
              type="text"
              placeholder="Ex: https://..."
              className="w-[100%] font-bold text-dark-text dark:text-light-text"
              value={saleData.image}
              onChange={(e) =>
                setSaleData((prevState) => ({
                  ...prevState,
                  image: e.target.value,
                }))
              }
            />
          </div>
        </div>
      </>

      <div className="mt-10">
        <div className="flex items-center">
          <HeadingTags name={"Description"} required />
          <div className="relative">
            <img
              src="/images/lists/question.svg"
              alt="info"
              id="info2"
              className="ml-2"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
            {/* tooltip to appear above img info tag */}
            {show.includes("info2") && (
              <div className="absolute z-10 bg-dim-text bg-opacity-50 dark:bg-white rounded-[10px] shadow-lg p-1 bottom-3 left-5 w-24">
                <p className="text-light-text dark:text-dark-text font-extralight text-sm">
                  This is the description of your project.
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="mt-5">
          <textarea
            className="bg-transparent w-full px-5 py-4 font-gilroy placeholder:font-medium placeholder:text-dim-text font-semibold text-dark-text dark:text-light-text focus:outline-none border-[1.5px] rounded-lg border-dim-text border-opacity-50"
            type={"text"}
            value={saleData.description}
            onChange={(e) =>
              setSaleData((prevState) => ({
                ...prevState,
                description: e.target.value,
              }))
            }
            placeholder="Describe about your project"
          />
        </div>
      </div>

      <div className="mt-10">
        <div className="flex items-center">
          <HeadingTags name={"Tags"} />
          <div className="relative">
            <img
              src="/images/lists/question.svg"
              alt="info"
              id="info3"
              className="ml-2"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
            {/* tooltip to appear above img info tag */}
            {show.includes("info3") && (
              <div className="absolute z-10 bg-dim-text bg-opacity-50 dark:bg-white rounded-[10px] shadow-lg p-1 bottom-3 left-5 w-36">
                <p className="text-light-text dark:text-dark-text font-extralight text-sm">
                  Labels to categorize your project (e.g Web3)
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="mt-5">
          <input
            className="bg-transparent w-full px-5 py-4 font-gilroy placeholder:font-medium placeholder:text-dim-text font-semibold text-dark-text dark:text-light-text focus:outline-none border-[1.5px] rounded-lg border-dim-text border-opacity-50"
            type={"text"}
            value={saleData.tags}
            onChange={(e) =>
              setSaleData((prevState) => ({
                ...prevState,
                tags: e.target.value,
              }))
            }
            placeholder="Tags"
          />
        </div>
      </div>
      <PreviewHeader heading={"Social Details"} />
      <div className="mt-7">
        <HeadingTags name={"Website"} required />
        <div
          className={`flex items-center rounded-lg border-[1.5px] pr-5  border-opacity-50 justify-between mt-5 ${
            validWebsite ? "border-dim-text" : "border-red-500"
          }`}
        >
          <input
            className={`bg-transparent w-full px-5 py-4 font-gilroy placeholder:font-medium placeholder:text-dim-text font-semibold text-dark-text dark:text-light-text focus:outline-none `}
            type={"text"}
            value={saleData.website}
            onChange={(e) =>
              setSaleData((prevState) => ({
                ...prevState,
                website: e.target.value,
              }))
            }
            placeholder="Ex: https://..."
          />
          <DribbleSVG className="w-5 h-5 fill-dark-text dark:fill-light-text" />
        </div>
      </div>
      <div className="mt-7">
        <HeadingTags name={"Twitter"} />
        <div
          className={`flex items-center rounded-lg border-[1.5px] pr-5 border-dim-text border-opacity-50 justify-between mt-5 ${
            validTwitter ? "border-dim-text" : "border-red-500"
          }`}
        >
          <input
            className="bg-transparent w-full px-5 py-4 font-gilroy placeholder:font-medium placeholder:text-dim-text font-semibold text-dark-text dark:text-light-text focus:outline-none"
            type={"text"}
            value={saleData.twitter}
            onChange={(e) =>
              setSaleData((prevState) => ({
                ...prevState,
                twitter: e.target.value,
              }))
            }
            placeholder="Ex: https://twitter.com/.."
          />
          <TwitterSVG className="w-5 h-5 fill-dark-text dark:fill-light-text" />
        </div>
      </div>

      <div className="mt-7">
        <HeadingTags name={"Linkedin"} />
        <div
          className={`flex items-center rounded-lg border-[1.5px] pr-5 justify-between border-opacity-50 mt-5 ${
            validLinkedin ? "border-dim-text" : "border-red-500"
          }`}
        >
          <input
            className="bg-transparent w-full px-5 py-4 font-gilroy placeholder:font-medium placeholder:text-dim-text font-semibold text-dark-text dark:text-light-text focus:outline-none"
            type={"text"}
            value={saleData.linkedin}
            onChange={(e) =>
              setSaleData((prevState) => ({
                ...prevState,
                linkedin: e.target.value,
              }))
            }
            placeholder="Ex: https://linkedin.com/.."
          />
          <LinkedinSVG
            className="w-5 h-5"
            outer={`${theme === "dark" ? "#fff" : "#464754"}`}
            inner={`${theme === "dark" ? "#464754" : "#fff"}`}
          />
        </div>
      </div>
      <div className="mt-7">
        <HeadingTags name={"Telegram"} />
        <div
          className={`flex items-center rounded-lg border-[1.5px] pr-5 border-opacity-50 justify-between mt-5 ${
            validTelegram ? "border-dim-text" : "border-red-500"
          }`}
        >
          <input
            className="bg-transparent w-full px-5 py-4 font-gilroy placeholder:font-medium placeholder:text-dim-text font-semibold text-dark-text dark:text-light-text focus:outline-none"
            type={"text"}
            value={saleData.telegram}
            onChange={(e) =>
              setSaleData((prevState) => ({
                ...prevState,
                telegram: e.target.value,
              }))
            }
            placeholder="Ex: https://t.me/.."
          />
          <TelegramSVG
            className="w-5 h-5"
            outer={`${theme === "dark" ? "#fff" : "#464754"}`}
            inner={`${theme === "dark" ? "#464754" : "#fff"}`}
          />
        </div>
      </div>
      <div className="mt-7">
        <HeadingTags name={"Github"} />
        <div
          className={`flex items-center rounded-lg border-[1.5px] pr-5 border-opacity-50 justify-between mt-5 ${
            validGithub ? "border-dim-text" : "border-red-500"
          }`}
        >
          <input
            className="bg-transparent w-full px-5 py-4 font-gilroy placeholder:font-medium placeholder:text-dim-text font-semibold text-dark-text dark:text-light-text focus:outline-none"
            type={"text"}
            value={saleData.github}
            onChange={(e) =>
              setSaleData((prevState) => ({
                ...prevState,
                github: e.target.value,
              }))
            }
            placeholder="Ex: https://github.com/.."
          />
          <GithubSVG
            className="w-5 h-5"
            outer={`${theme === "dark" ? "#fff" : "#464754"}`}
            inner={`${theme === "dark" ? "#464754" : "#fff"}`}
          />
        </div>
      </div>
      <div className="mt-7">
        <HeadingTags name={"Discord"} />
        <div
          className={`flex items-center rounded-lg border-[1.5px] pr-5 border-opacity-50 justify-between mt-5 ${
            validDiscord ? "border-dim-text" : "border-red-500"
          }`}
        >
          <input
            className="bg-transparent w-full px-5 py-4 font-gilroy placeholder:font-medium placeholder:text-dim-text font-semibold text-dark-text dark:text-light-text focus:outline-none"
            type={"text"}
            value={saleData.discord}
            onChange={(e) =>
              setSaleData((prevState) => ({
                ...prevState,
                discord: e.target.value,
              }))
            }
            placeholder="Ex: https://discord.com/.."
          />
          <DiscordSVG
            className="w-5 h-5"
            outer={`${theme === "dark" ? "#fff" : "#464754"}`}
            inner={`${theme === "dark" ? "#464754" : "#fff"}`}
          />
        </div>
      </div>
      <div className="mt-7">
        <HeadingTags name={"youtube"} />
        <div
          className={`flex items-center rounded-lg border-[1.5px] pr-5 border-opacity-50 justify-between mt-5 ${
            validYoutube ? "border-dim-text" : "border-red-500"
          }`}
        >
          <input
            className="bg-transparent w-full px-5 py-4 font-gilroy placeholder:font-medium placeholder:text-dim-text font-semibold text-dark-text dark:text-light-text focus:outline-none"
            type={"text"}
            value={saleData.youtube}
            onChange={(e) =>
              setSaleData((prevState) => ({
                ...prevState,
                youtube: e.target.value,
              }))
            }
            placeholder="Ex: https://youtu.be/.."
          />
          <YoutubeSVG
            className="w-5 h-5"
            outer={`${theme === "dark" ? "#fff" : "#464754"}`}
            inner={`${theme === "dark" ? "#464754" : "#fff"}`}
          />
        </div>
      </div>

      <div className="mt-10">
        <div className="flex justify-end items-center mb-10">
          <button
            className="bg-white dark:bg-transparent mr-5 flex items-center gap-2 py-[10px] px-5"
            onClick={() => setActive("Presale")}
          >
            <BackArrowSVG className="fill-dark-text dark:fill-light-text" />
            <span className="font-gilroy font-medium text-sm text-dark-text dark:text-light-text">
              Go Back
            </span>
          </button>

          <button
            className="bg-primary-green hover:opacity-40 disabled:bg-light-text text-white font-gilroy font-bold px-8 py-3 rounded-md"
            // disabled={address.length < 5}
            onClick={handleSubmit}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
