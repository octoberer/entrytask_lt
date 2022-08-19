import React, { useEffect, useState } from 'react'
import ParticipantsComponent from './ParticipantsComponent'
import { ReactComponent as LIke } from "../../../assets/SVGs/like-outline.svg";
import { ReactComponent as CommentSingle } from "../../../assets/SVGs/comment-single.svg";
import { ReactComponent as Check } from "../../../assets/SVGs/check-outline.svg";
import { baseUrl, userInfo } from "../../../config";
import './ParticipantsComponent.css'
import CommentComponent from '../Comments/commentComponent';
export default function Participants(props) {
//   goings_count: 12
// id: 1
// images: (5) ['https://tse2-mm.cn.bing.net/th?id=OIP.w8XC0KPitDfMEeSv9P3GxgHaEt&w=248&h=160&c=7&o=5&dpr=2&pid=1.7', 'https://tse2-mm.cn.bing.net/th?id=OIP.B7gjATIkLyifGdknxysjVwHaFj&w=222&h=167&c=7&o=5&dpr=2&pid=1.7', 'https://tse2-mm.cn.bing.net/th?id=OIP.NI9vpiDmGzrQLPKq23e2_wHaFj&w=234&h=173&c=7&o=5&dpr=2&pid=1.7', 'https://tse2-mm.cn.bing.net/th?id=OIP.rzUYVz0YoOqkmoehDQcKRgHaEo&w=295&h=181&c=7&o=5&dpr=2&pid=1.7', 'https://tse2-mm.cn.bing.net/th?id=OIP.wTqIPNLDZ96_gPsHc-pplQHaFI&w=228&h=160&c=7&o=5&dpr=2&pid=1.7']
// likes_count: 12
// location: "Marina Bay Sands"
// location_detail: "10 Bayfront Ave, S018956"
// me_going: true
// me_likes: true
    const {ActivityID,params}=props
    let [me_going,change_me_going]=useState(false)
    let [me_like,change_me_like]=useState(false)
    return (
        <div className='basicInformation'>
            <ParticipantsComponent ActivityID={ActivityID} ></ParticipantsComponent>
            <CommentComponent ActivityID={ActivityID}></CommentComponent>
            <div id='bottomInteractiveBar'>
                <div id='purplePart'>
                    <div className='equaldivide'>
                        <CommentSingle width='20%'></CommentSingle>
                    </div>
                    <div className='equaldivide '>
                    {params.me_like&&<LIke width='20%' fill="#D5EF7F"></LIke>}
                    {!params.me_like&&<LIke width='20%' ></LIke>}
                    </div>
                </div>
                <div id='greenPart'>
                {params.me_going && (
          <span className="check Regular">
            <Check
              className="checklogo"
              fill="#FFAECB4F"
              width="15px"
              height="15px"
            />
            <span className="verticalAlign">I am going</span>
          </span>
        )}
        {!params.me_going && (
          <span className="check Regular">
            <Check fill='#AC8EC9' className="checklogo" width="15px" height="15px" />
            <span className="verticalAlign">{props.goings_count} Going</span>
          </span>
        )}
                </div>
            </div>
        </div>

    )
}
