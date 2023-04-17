import React, { useState, useContext } from "react";
import TwitterSVG from "../../../svgs/Socials/twitter";
import DribbleSVG from "../../../svgs/Socials/dribble";
import HeadingTags from "../../TokenLocker/Subcomponents/HeadingTags";
import PreviewHeader from "components/Common/PreviewHeader";
import BackArrowSVG from "../../../svgs/back_arrow";
import LinkedinSVG from "../../../svgs/Socials/linkedin";
import { ThemeContext } from "../../../context/ThemeContext/ThemeProvider";
import GithubSVG from "../../../svgs/Socials/github";
import { isValidUrl } from "../../../utils/numberFormat";

export default function Detailspage({
  setActive,
  setAirdropData,
  airdropData,
}) {
  const [validWebsite, setValidWebsite] = useState(true);
  const [validTwitter, setValidTwitter] = useState(true);
  const [validLinkedin, setValidLinkedin] = useState(true);
  const [validGithub, setValidGithub] = useState(true);
  const [valid, setValid] = useState(true);
  const { theme } = useContext(ThemeContext);
  //there are multiple tooltips so we need to keep track of which one is being hovered
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
    if (!isValidUrl(airdropData.image)) {
      setValid(false);
      return;
    } else {
      setValid(true);
    }


    if (!isValidUrl(airdropData.website)) {
      setValidWebsite(false);
      return;
    } else {
      setValidWebsite(true);
    }


    if (airdropData.twitter !== "") {
      if (!isValidUrl(airdropData.twitter)) {
        setValidTwitter(false);
        return;
      } else {
        setValidTwitter(true);
      }
    }

    if (airdropData.linkedin !== "") {
      if (!isValidUrl(airdropData.linkedin)) {
        setValidLinkedin(false);
        return;
      } else {
        setValidLinkedin(true);
      }
    }


    if (airdropData.github !== "") {
      if (!isValidUrl(airdropData.github)) {
        setValidGithub(false);
        return;
      } else {
        setValidGithub(true);
      }
    }

    if (isValidUrl(airdropData.image) && isValidUrl(airdropData.website))
      setActive("Preview");
  };


  return (
    <div className="w-full p-5 md:p-9 bg-white dark:bg-dark-1 rounded-[10px] ">
      <>
        <div className="flex items-center mt-9">
          <HeadingTags name={"Token Logo"} required />
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
            {show.includes('info') && (
              <div className="absolute z-10 bg-dim-text bg-opacity-50 dark:bg-white rounded-[10px] shadow-lg p-1 bottom-3 left-5">
                <p className="text-light-text dark:text-dark-text font-extralight text-sm">
                  info
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between gap-5 cursor-pointer">
          <div className={`flex items-center justify-between bg-[#FAF8F5] border dark:bg-dark-2 px-5 py-4 rounded-md w-[100%] ${valid ? 'border-dim-text' : 'border-red-500'}`}>
            <input
              type="text"
              placeholder="Ex: https://..."
              className="w-[100%] font-bold text-dark-text dark:text-light-text"
              value={airdropData.image}
              onChange={(e) =>
                setAirdropData((prevState) => ({
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
            {show.includes('info2') && (
              <div className="absolute z-10 bg-dim-text bg-opacity-50 dark:bg-white rounded-[10px] shadow-lg p-1 bottom-3 left-5">
                <p className="text-light-text dark:text-dark-text font-extralight text-sm">
                  info
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="mt-5">
          <textarea
            className="bg-transparent w-full px-5 py-4 font-gilroy placeholder:font-medium placeholder:text-dim-text font-semibold text-dark-text dark:text-light-text focus:outline-none border-[1.5px] rounded-lg border-dim-text border-opacity-50"
            type={"text"}
            value={airdropData.description}
            onChange={(e) =>
              setAirdropData((prevState) => ({
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
            {show.includes('info3') && (
              <div className="absolute z-10 bg-dim-text bg-opacity-50 dark:bg-white rounded-[10px] shadow-lg p-1 bottom-3 left-5">
                <p className="text-light-text dark:text-dark-text font-extralight text-sm">
                  info
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="mt-5">
          <input
            className="bg-transparent w-full px-5 py-4 font-gilroy placeholder:font-medium placeholder:text-dim-text font-semibold text-dark-text dark:text-light-text focus:outline-none border-[1.5px] rounded-lg border-dim-text border-opacity-50"
            type={"text"}
            value={airdropData.tags}
            onChange={(e) =>
              setAirdropData((prevState) => ({
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
        <div className={`flex items-center rounded-lg border-[1.5px] pr-5  border-opacity-50 justify-between mt-5 ${validWebsite ? 'border-dim-text' : 'border-red-500'}`}>
          <input
            className={`bg-transparent w-full px-5 py-4 font-gilroy placeholder:font-medium placeholder:text-dim-text font-semibold text-dark-text dark:text-light-text focus:outline-none `}
            type={"text"}
            value={airdropData.website}
            onChange={(e) =>
              setAirdropData((prevState) => ({
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
        <div className={`flex items-center rounded-lg border-[1.5px] pr-5 border-dim-text border-opacity-50 justify-between mt-5 ${validTwitter ? 'border-dim-text' : 'border-red-500'}`}>
          <input
            className="bg-transparent w-full px-5 py-4 font-gilroy placeholder:font-medium placeholder:text-dim-text font-semibold text-dark-text dark:text-light-text focus:outline-none"
            type={"text"}
            value={airdropData.twitter}
            onChange={(e) =>
              setAirdropData((prevState) => ({
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
        <div className={`flex items-center rounded-lg border-[1.5px] pr-5 justify-between border-opacity-50 mt-5 ${validLinkedin ? 'border-dim-text' : 'border-red-500'}`}>
          <input
            className="bg-transparent w-full px-5 py-4 font-gilroy placeholder:font-medium placeholder:text-dim-text font-semibold text-dark-text dark:text-light-text focus:outline-none"
            type={"text"}
            value={airdropData.linkedin}
            onChange={(e) =>
              setAirdropData((prevState) => ({
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
        <HeadingTags name={"Github"} />
        <div className={`flex items-center rounded-lg border-[1.5px] pr-5 border-opacity-50 justify-between mt-5 ${validGithub ? 'border-dim-text' : 'border-red-500'}`}>
          <input
            className="bg-transparent w-full px-5 py-4 font-gilroy placeholder:font-medium placeholder:text-dim-text font-semibold text-dark-text dark:text-light-text focus:outline-none"
            type={"text"}
            value={airdropData.github}
            onChange={(e) =>
              setAirdropData((prevState) => ({
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

      <div className="mt-10">
        <div className="flex justify-end items-center mb-10">
          <button
            className="bg-white dark:bg-transparent mr-5 flex items-center gap-2 py-[10px] px-5"
            onClick={() => setActive("Token Info")}
          >
            <BackArrowSVG className="fill-dark-text dark:fill-light-text" />
            <span className="font-gilroy font-medium text-sm text-dark-text dark:text-light-text">
              Go Back
            </span>
          </button>

          <button
            className="bg-primary-green disabled:bg-light-text text-white font-gilroy font-bold px-8 py-3 rounded-md"
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
