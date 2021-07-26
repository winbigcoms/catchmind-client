import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SketchPicker } from 'react-color';
import useColors from '../hooks/useColors';
import useDraw from '../hooks/useDraw';
import styled from 'styled-components';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
const CanvasConatainer = styled.div`
  display:flex;
  justify-content:center;
  position:relative;
`
const Canvas = styled.canvas`
  border:1px solid #000;
`
const ColorPickerBtn = styled.button`
  position:absolute;
  top:0;
  right:0;
  background-color:#fff;
`
const ColorPickerBox = styled.div`
  border:1px solid #ccc;
  border-radius:5px;
  overflow:hidden;
  position:absolute;
  top:0px;
  right:-222px;
  background-color:#fff;
`
const RangeBox = styled.div`
  display:flex;
  justify-content:center;
  position:relative;
  background-color:#fff;
  font-size:12px;
  input{
    margin-left:10px
  }
`
const Answer = styled.div`
position:absolute;
top:1px;
left:1px;
background-color:#fff;
border:1px solid #ddd
`
const ResetBtn = styled.button`
  position:absolute;
  bottom:1px;
  left:1px;
  background-color:#fff;
  border:1px solid #ddd
`
const SaveBtn = styled.button`
  position:absolute;
  bottom:1px;
  right:1px;
  background-color:#fff;
  border:1px solid #ddd
`
const EraserBtn = styled.button`
  cursor:pointer;
  margin:10px 0px 5px 5px;
  background-color:#fff;
  border:1px solid #ccc;
`
const TextBox = styled.span`
  display:inline-block;
  width:66px;
`
interface canvasProps {
  width:number,
  height:number,
  socket:Socket<DefaultEventsMap, DefaultEventsMap>
}
interface location {
  x:number,
  y:number
}
function downloadImage(data="", filename = 'untitled.jpeg') {
  const a = document.createElement('a');
  a.href = data;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
}
const CanvasLayer : React.FC<canvasProps> = ({socket,width,height}:canvasProps)=>{
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {color,changeColor} = useColors();
  const [showColorPicker,setShowState] = useState(false);
  const [useEraser,setEraser] = useState(false);
  const [strokeWidth,setStrokeWidth] = useState(2);
  const [eraserWidth,setEraserWidth] = useState(20);
  const {mousePosition,onPaint,changeMousePosition,changePaintState} = useDraw();
  const subtitle = useRef("");
  const changeEraser = ()=>{
    setEraser(state=>!state);
  }
  const getLocation = useCallback((event:MouseEvent):location|void=>{
    if(!canvasRef.current) return;
    const canvas:HTMLCanvasElement = canvasRef.current;
    return{
      x: event.pageX - canvas.offsetLeft,
      y:event.pageY - canvas.offsetTop
    }
  },[]);
  const changeShowState = useCallback(()=>{
    setShowState(state=>!state);
  },[])
  const startPaint = useCallback((event:MouseEvent):void=>{
    const location = getLocation(event);
    if(location){
      changePaintState(true);
      changeMousePosition(location)
    }
  },[]);
  
  const stopPaint = useCallback(()=>{
    changePaintState(false);
  },[]);
  const changeStroke = useCallback((event)=>{
    setStrokeWidth(()=>event.target.value)
  },[])
  const changeEraserStroke = useCallback((event)=>{
    setEraserWidth(()=>event.target.value)
  },[])
  const draw = (BFmousePosition:location,AFmousePosition:location)=>{
    if(!canvasRef.current)return;
    const canvas:HTMLCanvasElement = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const relPosition = canvas.getBoundingClientRect();

    if(ctx){
      ctx.strokeStyle=useEraser?"#fff":color;
      ctx.lineJoin = 'round';
      ctx.lineWidth = useEraser?eraserWidth:strokeWidth;
      ctx.beginPath();
      ctx.moveTo(BFmousePosition.x-relPosition.x,BFmousePosition.y-relPosition.y);
      ctx.lineTo(AFmousePosition.x-relPosition.x,AFmousePosition.y-relPosition.y);
      ctx.closePath();
      ctx.stroke();
    }
  }
  const paint = useCallback((event:MouseEvent)=>{
    event.preventDefault();
    event.stopPropagation();
    if(onPaint){
      const newLocation = getLocation(event);
      if(mousePosition&&newLocation){
        draw(mousePosition,newLocation);
        changeMousePosition(newLocation);
      }
    }
  },[onPaint,mousePosition]);
  const resetPath = useCallback(()=>{
    if(!canvasRef.current)return;
    const canvas:HTMLCanvasElement = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if(ctx){
      ctx.clearRect(0,0,canvas.width,canvas.height)
    }
  },[]);
  const savePaint = ()=>{
    const data = canvasRef.current?.toDataURL("image/jpeg",1.0);
    downloadImage(data,'masterpiece.jpeg')
  }
  useEffect(()=>{
    if(!canvasRef.current)return;
    const canvas:HTMLCanvasElement = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if(ctx !== null){
      ctx.fillStyle="#ffffff"
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  },[])
  useEffect(()=>{
    if(!canvasRef.current)return;
    const canvas:HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener('mousedown',startPaint);
    canvas.addEventListener('mousemove',paint);
    canvas.addEventListener('mouseup',stopPaint);
    canvas.addEventListener('mouseleave',stopPaint);
    return ()=>{
      canvas.removeEventListener('mousedown',startPaint);
      canvas.removeEventListener('mousemove',paint);
      canvas.removeEventListener('mouseup',stopPaint);
      canvas.removeEventListener('mouseleave',stopPaint);
    }
  },[startPaint,paint,stopPaint]);
  useEffect(()=>{
    socket.emit('getSubtitle');
    socket.on("subtitle",(data)=>{
      subtitle.current = data;
    })
  },[])
  return (
    <CanvasConatainer>
      <Canvas ref={canvasRef} height={height} width={width}></Canvas>
      <Answer>{subtitle.current?subtitle.current:"준비중입니다."}</Answer>
      <ColorPickerBtn onClick={changeShowState}>붓 설정</ColorPickerBtn>
      <ResetBtn onClick={resetPath}>전체 지우기</ResetBtn>
      <SaveBtn onClick={savePaint}>작품저장</SaveBtn>
      {showColorPicker&&
        <ColorPickerBox>
          <SketchPicker 
            disableAlpha={true} 
            color={color} 
            onChangeComplete={(color)=>changeColor(color.hex)}
          />
          <RangeBox>
            <TextBox>
              펜 굵기:
            </TextBox>
            <input type="range" defaultValue={strokeWidth} onChange={changeStroke} max={20} min={1} step={1}/>
          </RangeBox>
          <RangeBox>
            <TextBox>
              지우개 크기:
            </TextBox>
            <input type="range" defaultValue={eraserWidth} onChange={changeEraserStroke} max={40} min={10} step={2}/>
          </RangeBox>
          <EraserBtn onClick={changeEraser}>{useEraser?"펜 사용":"지우개 사용"}</EraserBtn>
          
        </ColorPickerBox>
      }
    </CanvasConatainer>
  )

}
export default CanvasLayer;