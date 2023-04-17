import React from 'react'
import BaseLayout from '../../components/BaseLayout/BaseLayout'
import Panel from '../../components/Launchpad/CreateSale/Panel'
import LaunchpadSVG from '../../svgs/Sidebar/launchpad'

export default function CreateSale() {
    return (
        <BaseLayout title={"Launchpad"} title_img={<LaunchpadSVG className="md:hidden fill-dim-text" />} page_name={"Create sale"}
            page_description={"Launch your project with Arborswap."}>
            <Panel />
        </BaseLayout>
    )
}
