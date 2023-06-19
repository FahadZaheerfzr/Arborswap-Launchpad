import Options from 'components/LockedAsset/Preview/Subcomponents/Options'
import { ThemeContext } from 'context/ThemeContext/ThemeProvider'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import DribbleSVG from 'svgs/Socials/dribble'
import GithubSVG from 'svgs/Socials/github'
import TelegramSVG from 'svgs/Socials/telegram'
import TwitterSVG from 'svgs/Socials/twitter'
import DiscordSVG from 'svgs/Socials/discord'

export default function Info({ icon, name, is_private, tags, pool }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <img src={icon} alt={name} className="w-[54px] h-[54px]" />

        <div className=" ml-4">
          <div className="flex items-center">
            <h3 className=" font-bold dark:text-light-text">{name}</h3>
            {is_private && (
              <span className="ml-[10px] text-[10px] font-bold bg-[#E56060] dark:bg-[#B86363] py-[2px] px-2 text-white rounded-[10px]">
                Private
              </span>
            )}
          </div>

          <div className="flex items-center mt-2">
            {/* tags are not array, its a string, we have to divide by space*/}
            {tags.split(', ').map((tag) => (
              tag !== "" &&
              <span key={tag} className="text-[10px] font-bold bg-[#F6E05E] dark:bg-[#B86363] py-[2px] px-2 text-white rounded-[10px] mr-2">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-5">
          {pool.github !== "" &&
          <Link to={pool.github} target="_blank" rel="noopener noreferrer" >
          <GithubSVG
            className="w-5 h-5 hidden md:block  "
            outer={`${theme === "dark" ? "#fff" : "#464754"}`}
            inner={`${theme === "dark" ? "#464754" : "#fff"}`}
          />
          </Link>
          }
        {pool.twitter !== "" &&
        <Link to={pool.twitter} target="_blank" rel="noopener noreferrer" >
          <TwitterSVG className="fill-dark-text dark:fill-light-text hidden md:block" />
          </Link>
        }
        {pool.website !== "" &&
        <Link to={pool.website} target="_blank" rel="noopener noreferrer" >
        <DribbleSVG className="fill-dark-text dark:fill-light-text hidden md:block" />
        </Link>
        }
        {pool.telegram !== "" &&
        <Link to={pool.telegram} target="_blank" rel="noopener noreferrer" >
          <TelegramSVG className="fill-dark-text dark:fill-light-text hidden md:block" />
          </Link>
        }
        {pool.discord !== "" &&
        <Link to={pool.discord} target="_blank" rel="noopener noreferrer" >
          <DiscordSVG className="fill-dark-text dark:fill-light-text hidden md:block" />
          </Link>
        }
        {/* <Options width={'w-7'} height={'h-7'} color={'[#FAF8F5]'} dark_color={'dark-2'} /> */}
      </div>
    </div>
  )
}
