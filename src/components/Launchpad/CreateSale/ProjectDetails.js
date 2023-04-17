import React, { useState, useContext } from 'react'
import TwitterSVG from '../../../svgs/Socials/twitter'
import DribbleSVG from '../../../svgs/Socials/dribble';
import HeadingTags from '../../TokenLocker/Subcomponents/HeadingTags';
import UploadImageFlex from '../../Common/UploadImageFlex';
import BackArrowSVG from '../../../svgs/back_arrow';
import LinkedinSVG from '../../../svgs/Socials/linkedin';
import { ThemeContext } from '../../../context/ThemeContext/ThemeProvider';
import GithubSVG from '../../../svgs/Socials/github';


export default function ProjectDetails({ setActive }) {
    const [profileImage, setProfileImage] = useState(null);
    const { theme } = useContext(ThemeContext);
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [twitter, setTwitter] = useState('');
    const [website, setWebsite] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [github, setGithub] = useState('');

    const handleSubmit = () => {
        setActive('Preview');
    }

    return (
        <div className="w-full p-5 md:p-9 bg-white dark:bg-dark-1 rounded-[10px] ">
            <HeadingTags name={'Project Logo'} />
            <UploadImageFlex image={profileImage} setImage={setProfileImage} />


            <div className="mt-10">
                <div className="flex items-center">
                    <HeadingTags name={'Description'} required />
                    {/* <Tooltip text={} /> */}
                </div>
                <div className="mt-5">
                    <textarea
                        className="bg-transparent w-full px-5 py-4 font-gilroy placeholder:font-medium placeholder:text-dim-text font-semibold text-dark-text dark:text-light-text focus:outline-none border-[1.5px] rounded-lg border-dim-text border-opacity-50"
                        type={'text'}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe about your project"
                    />{' '}
                </div>
            </div>


            <div className="mt-10">
                <div className="flex items-center">
                    <HeadingTags name={'Tags'} />
                    {/* <Tooltip text={} /> */}
                </div>
                <div className="mt-5">
                    <input
                        className="bg-transparent w-full px-5 py-4 font-gilroy placeholder:font-medium placeholder:text-dim-text font-semibold text-dark-text dark:text-light-text focus:outline-none border-[1.5px] rounded-lg border-dim-text border-opacity-50"
                        type={'text'}
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="Tags"
                    />
                </div>
            </div>



            <div className="mt-7">
                <HeadingTags name={'Website'} required />
                <div className="flex items-center rounded-lg border-[1.5px] pr-5 border-dim-text border-opacity-50 justify-between mt-5">
                    <input
                        className="bg-transparent w-full px-5 py-4 font-gilroy placeholder:font-medium placeholder:text-dim-text font-semibold text-dark-text dark:text-light-text focus:outline-none"
                        type={'text'}
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="Enter website URL"
                    />
                    <DribbleSVG className='w-5 h-5 fill-dark-text dark:fill-light-text' />
                </div>
            </div>
            <div className="mt-7">

                <HeadingTags name={'Twitter'} />
                <div className="flex items-center rounded-lg border-[1.5px] pr-5 border-dim-text border-opacity-50 justify-between mt-5">
                    <input
                        className="bg-transparent w-full px-5 py-4 font-gilroy placeholder:font-medium placeholder:text-dim-text font-semibold text-dark-text dark:text-light-text focus:outline-none"
                        type={'text'}
                        value={twitter}
                        onChange={(e) => setTwitter(e.target.value)}
                        placeholder="Enter your Twitter"
                    />
                    <TwitterSVG className='w-5 h-5 fill-dark-text dark:fill-light-text' />
                </div>

            </div>

            <div className="mt-7">
                <HeadingTags name={'Linkedin'} />
                <div className="flex items-center rounded-lg border-[1.5px] pr-5 border-dim-text border-opacity-50 justify-between mt-5">
                    <input
                        className="bg-transparent w-full px-5 py-4 font-gilroy placeholder:font-medium placeholder:text-dim-text font-semibold text-dark-text dark:text-light-text focus:outline-none"
                        type={'text'}
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        placeholder="Enter your Linkedin"
                    />
                    <LinkedinSVG className='w-5 h-5' outer={`${theme === "dark" ? "#fff" : "#464754"}`} inner={`${theme === "dark" ? "#464754" : "#fff"}`} />
                </div>
            </div>
            <div className="mt-7">

                <HeadingTags name={'Github'} />
                <div className="flex items-center rounded-lg border-[1.5px] pr-5 border-dim-text border-opacity-50 justify-between mt-5">
                    <input
                        className="bg-transparent w-full px-5 py-4 font-gilroy placeholder:font-medium placeholder:text-dim-text font-semibold text-dark-text dark:text-light-text focus:outline-none"
                        type={'text'}
                        value={github}
                        onChange={(e) => setGithub(e.target.value)}
                        placeholder="Enter your Github"
                    />
                    <GithubSVG className='w-5 h-5' outer={`${theme === "dark" ? "#fff" : "#464754"}`} inner={`${theme === "dark" ? "#464754" : "#fff"}`} />
                </div>
            </div>

            <div className="mt-10">
                <div className="flex justify-end items-center mb-10">

                    <button className="bg-white dark:bg-transparent mr-5 flex items-center gap-2 py-[10px] px-5"
                        onClick={() => setActive('Presale')}>
                        <BackArrowSVG className="fill-dark-text dark:fill-light-text" />
                        <span className="font-gilroy font-medium text-sm text-dark-text dark:text-light-text">Go Back</span>
                    </button>


                    <button
                        className="bg-primary-green hover:opacity-40 disabled:bg-light-text text-white font-gilroy font-bold px-8 py-3 rounded-md"
                        // disabled={address.length < 5}
                        onClick={handleSubmit}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}
