import React from 'react'
import './DetailsComponent.css'
import '../../../commonStyle/font.css'

import ParticipantsComponent from '../ParticipantsComponent/ParticipantsComponent'
import CommentComponent from '../Comments/commentComponent'
import { ReactComponent as LIke } from "../../../assets/SVGs/like-outline.svg";
import { ReactComponent as CommentSingle } from "../../../assets/SVGs/comment-single.svg";
import { ReactComponent as Check } from "../../../assets/SVGs/check-outline.svg";
import { ReactComponent as Date_from } from "../../../assets/SVGs/date-from.svg";
import { ReactComponent as Date_to } from "../../../assets/SVGs/date-to.svg";

import pic_map from '../../../assets/Imgs/gmap.png';
import { getDate, getTime } from '../../../config'
export default function DetailsComponent(props) {
  const { params } = props
  console.log('params', params)
  // console.log('description',description)
  return (
    <div >
      <div style={{display:"flex",overflow:"scroll",padding:"0 16px"}}>
        {params.images.map((item) => {
          return <img width="180px" style={{margin:'20px 10px',borderTopLeftRadius:'20px',borderBottomRightRadius:'20px'}} src={item} alt="" />
        })}
      </div>
      <div className='wrap'>
        <input type="checkbox" className="exp" id="exp" />
        <div className='basicfont text Regular'>
          <label id="collapsebutton" for="exp" />
          {params.description}
        </div>
      </div>
      <div className='when'>
        <div className='part_title'>When</div>
        <div className='when_content'>
          <div className='date_from'>
            <div className='when_date_bar'>
              <Date_from fill='#AECB4F' width='15px' />
              <p className='when_date'>{getDate(params.begin_time)}</p>
            </div>
            <p className='when_time'>{getTime(params.begin_time)}</p>
          </div>
          <div>
            <div className='when_date_bar' >
              <Date_to fill='#AECB4F' width='15px' />
              <p className='when_date'>{getDate(params.end_time)}</p>
            </div>
            <p className='when_time'>{getTime(params.end_time)}</p>
          </div>
        </div>
      </div>

      <div className='where'>
        <div className='part_title'>Where</div>
        <div className='where_contain'>
          <p className='where_location'>{params.location}</p>
          <p className='where_location_detail'>{params.location_detail}</p>
          <img src={pic_map} className='where_pic' alt='' />
        </div>
      </div>
      <ParticipantsComponent ActivityID={props.ActivityID}></ParticipantsComponent>
      <CommentComponent ActivityID={props.ActivityID}></CommentComponent>
      <div id='bottomInteractiveBar'>
        <div id='purplePart'>
          <div className='equaldivide'>
            <CommentSingle width='20%'></CommentSingle>
          </div>
          <div className='equaldivide '>
            <LIke width='20%'></LIke>
          </div>
        </div>
        <div id='greenPart'>
          <Check width='10%' className='verticalmiddle'></Check>
          <span id="spanSpace">join</span>
        </div>
      </div>
    </div>

  )
}
