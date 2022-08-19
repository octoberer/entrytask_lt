import React, { useEffect, useState } from 'react'
import { ReactComponent as Time } from "../../../assets/SVGs/time.svg";
import { ReactComponent as Checklogo_outline } from "../../../assets/SVGs/check-outline.svg";
import { ReactComponent as Likelogo_outline } from "../../../assets/SVGs/like-outline.svg";
import { ReactComponent as Check } from "../../../assets/SVGs/check.svg";
import { ReactComponent as Like } from "../../../assets/SVGs/like.svg";
import { useNavigate } from "react-router-dom";
import './ActivitiesContentBody.css'
import { fetchData,getDate,getTime } from '../../../config'
export default function ActivitiesContentBody(props) {
  const params = props.params;
  let navigate = useNavigate();
  let [me_going, changeGoingState] = useState(false)
  let [me_likes, changeLikeState] = useState(false)
  function clkActivityCard(id) {
    navigate(`/home/detail/${id}`, { replace: true });
  }
  useEffect(() => {
    changeGoingState(params.me_going)
    changeLikeState(params.me_likes)
  }, [params])
  function clkJoin(id) {
    console.log('id',id)
    if(me_going){
      fetchData("delete", "/events/"+id+"/participants", {})
      .then((response) => {
        console.log('joinnews',response);
        changeGoingState(false)
      })
      .catch((error) => {
        console.log("err" + error);
      });
    }
    else{
      fetchData("post", "/events/"+id+"/participants")
      .then((response) => {
        console.log('joinnews',response);
        changeGoingState(true)
      })
      .catch((error) => {
        console.log("err" + error);
      });
    }
    
  }
  function clkLike(id) {
    if(me_likes){
      fetchData("delete", "/events/"+id+"/likes")
      .then((response) => {
        console.log(response)
        changeLikeState(false)
      })
      .catch((error) => {
        console.log("err" + error);
      });
    }
    else{
      fetchData("post", "/events/"+id+"/likes")
      .then((response) => {
        changeLikeState(true)
      })
      .catch((error) => {
        console.log("err" + error);
      });
    }
  }
  return (
    <div><div className="bodyBox">
      <div className="Semibold" id="ActivityName" onClick={() => { clkActivityCard(params.id) }}>
        {params.name}
      </div>
      <div id="timeBox">
        <Time stroke="#8560A9" width="15px" height="15px" id="Timelogo" />
        <span className="Regular" id="cardTime">
          {getDate(params.begin_time)+" "+getTime(params.begin_time)} - {getDate(params.end_time)+' '+getTime(params.end_time)}
        </span>
      </div>
      <div className="Regular" id="content">
        {params.description}
      </div>
      <div id="endBox">
        {me_going && (
          <span className="check Regular">
            <Check
              className="checklogo"
              fill="#AECB4F"
              width="15px"
              height="15px"
              onClick={() => { clkJoin(params.id) }}
            />
            <span className="verticalAlign">I am going</span>
          </span>
        )}
        {!me_going && (
          <span className="check Regular">
            <Checklogo_outline fill='#AC8EC9' className="checklogo" width="15px" height="15px" onClick={() => { clkJoin(params.id) }} />
            <span className="verticalAlign">{params.goings_count} Going</span>
          </span>
        )}
        {me_likes && (
          <span className="check Regular like" id="like">
            <Like
              className="checklogo"
              fill="#FF5C5C"
              width="15px"
              height="15px"
              onClick={() => { clkLike(params.id)} }
            />
            <span className="verticalAlign">I like it</span>
          </span>
        )}
        {!me_likes && (
          <span className="check Regular like">
            <Likelogo_outline fill='#AC8EC9' width="15px" height="15px" className="checklogo" onClick={() => { clkLike(params.id)} }/>
            <span className="verticalAlign">{params.likes_count} Likes</span>
          </span>
        )}
      </div>
    </div></div>
  )
}
