import React from 'react'
import './commentCard.css'
import { ReactComponent as ReplyLogo } from "../../../assets/SVGs/reply.svg";

export default function CommentCard(props) {
  const { params } = props
  return (
    <div id='outBox'>
      <div id="commenterAvator"><img id="Avatorimg" src={params.user.avatar}></img></div>
      <div id="commentInfor">
        <div>
          <span id='commenterName'>{params.user.username}</span>
          <span id='commentTime'>{params.create_time}</span>
        </div>
        <div id='commentContent'>{params.comment}</div>
      </div>
      <div id="replylogo"><ReplyLogo fill="#D5EF7F," width='20px' ></ReplyLogo></div>
    </div>
  )
}
