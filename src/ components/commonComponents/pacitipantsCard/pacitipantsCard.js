import React from 'react'
import { ReactComponent as Check } from "../../../assets/SVGs/check-outline.svg";
import { ReactComponent as Like } from "../../../assets/SVGs/like-outline.svg";
import './pacitipantsCard.css'

export default function pacitipantsCard(props) {
    const { panticipantType, usersData } = props
    // console.log(usersData)
    return (
        <div className='flexdisplaybetweeen'>
            <div className='leftpartstyle'>
                {panticipantType === "going" && <div>
                    <Check className="checklogo" stroke="#AC8EC9" width="15px" height="15px" />
                    <span className="verticalAlign">{usersData.length} going</span>
                </div>}
                {panticipantType === "like" && <div>
                    <Like width="15px" height="15px" stroke="#AC8EC9" className="checklogo" />
                    <span className="verticalAlign">{usersData.length} Likes</span>
                </div>}
            </div>
            <div>
            {
                usersData.map((item)=>{
                    return <img className='avatorStyle' src={item.avatar} alt="" />
                })
            }
                {/* <button id='paticipantCollapseBtn'></button> */}
            </div>
        </div>
    )
}
