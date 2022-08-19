import React, { useEffect, useState } from 'react'
import CommentCard from '../../commonComponents/commentCard/commentCard'
import './comments.css'
import { baseUrl, userInfo } from "../../../config";

export default function Comments(props) {
    let [usersCommentData, changeUsersCommentData] = useState([])
    console.log('comments', props.ActivityID)
    useEffect(() => {
        const reqHeaders = new Headers({
            "Content-Type": "application/json",
            "X-BLACKCAT-TOKEN": userInfo().token
        });
        fetch(baseUrl + "/events/" + props.ActivityID + '/comments', {
            method: "get",
            headers: reqHeaders,
            mode: "cors",
            params: {
                eventId: props.ActivityID
            }
        })
            .then((res) => res.json())
            .then((response) => {
                console.log("commentsResponse", response);
                changeUsersCommentData(response.comments)
            })
            .catch((error) => {
                console.log("err" + error);
            });
    }, [])
    return (
        <div className='commentslistBox listBox'>
            {
                usersCommentData.map((item) => {
                    return <CommentCard params={item}></CommentCard>
                })
            }
        </div>

    )
}
