import React from 'react';
import useSnowData from "../hooks/useSnowData";

const Snows = ({color}:{color:string})=>{
  const [snows] = useSnowData(30);
  return <>{snows.map((data,idx)=>(<div key={idx} style={{
    position:"absolute",
    fontSize:"35px",
    color:`${color}`,
    left:`${data.x}px`,
    top:`${data.y}px`
  }} >*</div>))}</>
}

export default React.memo(Snows)