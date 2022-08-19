import React, { useEffect, useState } from 'react'
import CommentComponent from './commentComponent'
import './comments.css'
import { ReactComponent as Cross } from "../../../assets/SVGs/cross.svg";
import { ReactComponent as Send } from "../../../assets/SVGs/send.svg";
import { fetchData } from '../../../config';
export default function Comments(props) {
    // console.log('comments', props.ActivityID)
    let [commentContent,changecommentContent]=useState("")
    function clkSendMessage(){
        fetchData('post',`/events/${props.ActivityID}/comments`,{comment:commentContent}).then((response)=>{
            console.log('评价成功',response)
        })
    }
    function Inputchange(e){
        changecommentContent(e.target.value)
    }
    return (
        <div>
            <CommentComponent ActivityID={props.ActivityID}></CommentComponent>
            <div id='comments_bottomInteractiveBar'>
                <div id='comments_purplePart'>
                    <div >
                        <span ><Cross width='5%' id="Cross" className='verticalAlign '></Cross></span>
                        <input id="comments_commentInput" placeholder='Leave your comment here' onChange={Inputchange}></input>
                    </div>
                </div>
                <div id='comments_greenPart'>
                    <Send width='24px' height='24px' className='verticalmiddle' onClick={clkSendMessage}></Send>
                </div>
            </div>
        </div>

    )
}
