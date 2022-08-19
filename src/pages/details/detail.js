import React, { useEffect, useState } from 'react'
import { useParams, Link, Routes, Route ,Navigate} from "react-router-dom";
import DetailsComponent from '../../ components/contentComponent/DetailsComponent/DetailsComponent';
import "../../commonStyle/font.css";
import './detail.css'
import Participants from '../../ components/contentComponent/ParticipantsComponent/Participants';
import Comments from '../../ components/contentComponent/Comments/comments';
import { ReactComponent as Info } from "../../assets/SVGs/info.svg";
import { ReactComponent as People } from "../../assets/SVGs/people.svg";
import { ReactComponent as Comment } from "../../assets/SVGs/comment.svg";
import { useLocation } from 'react-router-dom'
import { baseUrl, fetchData, userInfo } from "../../config";

export default function Detail(props) {
  let [detailsData, changeDetailsData] = useState({
    id: 0,
    going: 0,
    me_going: true,
    me_likes: true,
    goings_count: 1,
    likes_count: 1,
    creator: {},
    userName: 'string',
    ActivityTitleName: 'string',
    ActivityID: 1,
    begin_time: 'string',
    name: 'string',
    channel: 'string',
    images: [],
    start_time: 'string',
    end_time: 'string',
    description: 'string'
  })
  var reg = /\d/
  let location = useLocation();
  const ActivityID=reg.exec(location.pathname)[0]
  console.log('location',location.pathname)
  useEffect(() => {
    fetchData('get', "/events/" + ActivityID)
      .then((response) => {
        console.log("detailresponse", response);
        changeDetailsData(response.event)
      })
      .catch((error) => {
        console.log("err" + error);
      });
  },[])
  return (
    <div className="contentBox">
      <div className='basicInformation'>
        <span id='channel' className="Regular">{detailsData.channel.name}</span>
        <div id='ActivityName' className="Semibold">{detailsData.name}</div>
        <div id="publisherInforBox">
          <div id='publisherBox'><img src={detailsData.creator.avatar} width='36px' height='36px'></img></div>
          <div>
            <div id='publisherName' className='Regular'>{detailsData.creator.username}</div>
            <div id='publishTime' className='Regular'>{detailsData.creator.createdAt}</div>
          </div>
        </div>
      </div>
      {/* <div className="underline"></div> */}
      <div id="routerStyle">
        <div className='Trisection'><Link to={'/home/detail/'+ActivityID+'/Details'}>
          <Info fill={location.pathname !== '/home/detail/'+ActivityID+'/Details' ? "" : "#AECB4F"} width='10%' className='verticalmiddle'></Info>
          <span className={location.pathname !== '/home/detail/'+ActivityID+'/Details' ? 'dropAstyle' : 'chosenAstyle'}>Details</span>
        </Link>
        </div>
        <div className='Trisection'><Link to={'/home/detail/'+ActivityID+'/Participants'}>
          <People fill={location.pathname !== '/home/detail/'+ActivityID+'/Participants' ? "" : "#AECB4F"} width='10%' className='verticalmiddle'></People>
          <span className={location.pathname !== '/home/detail/'+ActivityID+'/Participants' ? 'dropAstyle' : 'chosenAstyle'}>Participants</span></Link>
        </div>
        <div className='Trisection' id="lastItem"><Link to={'/home/detail/'+ActivityID+'/Comments'}>
          <Comment fill={location.pathname !== '/home/detail/'+ActivityID+'/Comments' ? "" : "#AECB4F"} width='10%' className='verticalmiddle'></Comment>
          <span className={location.pathname !== '/home/detail/'+ActivityID+'/Comments' ? 'dropAstyle' : 'chosenAstyle'}>Comments</span></Link>
        </div>
      </div>
      {/* <div className="underline"></div> */}
      <Routes>
        <Route path={ActivityID+'/Details'} element={<DetailsComponent params={detailsData} ActivityID={ActivityID}/>}></Route>
        <Route path={ActivityID+'/Participants'} element={<Participants ActivityID={ActivityID} 
          params={detailsData}
        />}></Route>
        <Route path={ActivityID+'/Comments'} element={<Comments ActivityID={ActivityID} />}></Route>
        <Route path={ActivityID+'/*'} element={<Navigate to={"/home/detail/"+ActivityID+'/Details'} />}></Route>
      </Routes>

    </div>
  )
}
