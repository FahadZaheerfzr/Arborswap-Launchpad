import FeeText from 'components/Common/FeeText'
import React from 'react'

export default function Note({ standard }) {
  return !standard ? (
    <ul className=" list-disc px-5">
      <li>&nbsp;Best for tokens with Rewards.</li>
      <li>&nbsp;Withdraw rewards anytime.</li>
      <li>
        &nbsp;
        <FeeText type="token" />
      </li>
    </ul>
  ) : (
    <ul className=" list-disc px-5">
      <li>&nbsp;Best for standard tokens.</li>
      <li>&nbsp;Withdraw rewards anytime.</li>
      <li>
        &nbsp;
        <FeeText type="token" />
      </li>
    </ul>
  )
}
