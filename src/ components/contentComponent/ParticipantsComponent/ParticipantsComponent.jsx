import React, { useEffect, useState } from 'react'
import PacitipantsCard from '../../commonComponents/pacitipantsCard/pacitipantsCard'
import { ReactComponent as LIke } from "../../../assets/SVGs/like-outline.svg";
import { ReactComponent as CommentSingle } from "../../../assets/SVGs/comment-single.svg";
import { ReactComponent as Check } from "../../../assets/SVGs/check-outline.svg";
import { baseUrl, userInfo } from "../../../config";
import './ParticipantsComponent.css'
import CommentComponent from '../Comments/commentComponent';
export default function ParticipantsComponent(props) {
  let [usersData, changeUsersData] = useState([])
  console.log('ParticipantsComponent', props)
  useEffect(() => {
    const reqHeaders = new Headers({
      "Content-Type": "application/json",
      "X-BLACKCAT-TOKEN": userInfo().token
    });
    fetch(baseUrl + "/events/" + props.ActivityID + '/likes', {
      method: "get",
      headers: reqHeaders,
      mode: "cors",
      params: {
        eventId: props.ActivityID
      }
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("Participantsresponse", response);
        changeUsersData(response.users)
      })
      .catch((error) => {
        console.log("err" + error);
      });
  }, [])
  return (
    <div className='basicInformation'>
      <PacitipantsCard usersData={usersData} panticipantType="like"></PacitipantsCard>
      <div id="rowline"></div>
      <PacitipantsCard usersData={usersData} panticipantType="going"></PacitipantsCard>
    </div>

  )
}
