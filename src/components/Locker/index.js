import React from 'react'
import { useDocumentTitle } from '../../hooks/setDocumentTitle'
import Card from './CardView/Card'
import List from './ListView/List'

export default function LockerBase({ cardFormat, itemSelected, tokenList, liquidityList }) {
  useDocumentTitle('Locker')

  return cardFormat === 'grid' ? (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 mt-7">
      {itemSelected === 'liquidity' &&
        liquidityList.map((liquidity, index) => <Card key={index} data={liquidity} token={false} />)}

      {itemSelected === 'token' &&
        tokenList.map((tokenList, index) => <Card key={index} data={tokenList} token={true} />)}
    </div>
  ) : (
    <div className="w-full grid grid-cols-2 gap-5 mt-7">
      {itemSelected === 'liquidity' &&
        liquidityList.map((liquidity, index) => <List key={index} data={liquidity} token={false} />)}

      {itemSelected === 'token' &&
        tokenList.map((tokenList, index) => <List key={index} data={tokenList} token={true} />)}
    </div>
  )
}
