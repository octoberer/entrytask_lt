import React from "react";
import "./hasImageActivityCard.css";
import "../../../commonStyle/font.css";
import "./hasImageActivityCard.css";
import ActivitiesContentBody from "../ActivitiesContentBody/ActivitiesContentBody";

export default function ActivityCard(props: { params: obj }) {
  const params = props.params;
  return (
    <div key={params.id} >
      <div className="headBox">
        <div id="userInformation">
          <img id="avatar" src={params.creator.avatar} alt="" />
          <span className="Semibold" id="cardUsername">
            {params.creator.username}
          </span>
        </div>
        <div id="channel" className="Regular">
          {params.channel.name}
        </div>
      </div>
      <div id="hasImageBox">
        <div id="NoImageActivityCardBox"><ActivitiesContentBody params={params} ></ActivitiesContentBody></div>
        <div id="ImageActivityCardBox">
          <img src={params.images[1]} width="100%"></img>
        </div>
      </div>
    </div>
  );
}
