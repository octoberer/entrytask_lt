import React from 'react'
import HasImageActivityCard from '../../commonComponents/hasImageActivityCard/hasImageActivityCard'
import NoDataTipComponents from '../../commonComponents/noDataTipComponents/noDataTipComponents'
import NoImageActivityCard from '../../commonComponents/noImageActivityCard/noImageActivityCard'
import './listComponent.css'

export default function ListComponent(props) {
  let { eventsData } = props
  return (
    <div className='listBox'>
      {eventsData.length === 0 && <NoDataTipComponents></NoDataTipComponents>}
      {eventsData.map((params) =>
      (<div key={params.id}>
        {/* {params.id} */}
        {(params.images !== undefined && params.images.length !== 0) ? <HasImageActivityCard params={params} /> : <NoImageActivityCard params={params} />}
        <div id="cardBottom"></div>
      </div>))
      }
    </div>
  )
}
