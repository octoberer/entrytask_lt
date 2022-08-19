import ActivitiesContentBody from "../ActivitiesContentBody/ActivitiesContentBody";
import { useNavigate } from "react-router-dom";
import "./noImageActivityCard.css";
import "../../../commonStyle/font.css";
interface obj {
  id: number;
  going: number;
  me_going: boolean;
  me_likes: boolean;
  like: true;
  goings_count: number;
  likes_count: number;
  creator: object;
  userName: string;
  ActivityTitleName: string;
  ActivityID: number;
  begin_time: string;
  name: string;
  channel: string;
  images: string;
  start_time: string;
  end_time: string;
  description: string;
}
export default function ActivityCard(props) {
  const params = props.params;
  return (
    <div key={params.id}>
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
      <ActivitiesContentBody params={params}></ActivitiesContentBody>
    </div>
  );
}
