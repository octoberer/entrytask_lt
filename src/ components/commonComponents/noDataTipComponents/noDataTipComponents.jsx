import React from 'react'
import { ReactComponent as NoActivityLogo } from '../../../assets/SVGs/no-activity.svg'
export default function NoDataTipComponents() {
  return (
    <div style={{ display: 'flex',flexDirection: 'column',alignItems: 'center',padding:'100px'}}>
        <NoActivityLogo width='100px' fill="#D3C1E5"></NoActivityLogo>
        <div style={{color:'#BABABA',fontSize:"14px"}}>No activity found</div>
    </div>
  )
}
