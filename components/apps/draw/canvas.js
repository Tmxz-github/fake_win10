import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";


const Canvas = () => {
  
    const canvasRef = useRef(null);
    const canvas = useSelector(state => state.canvas);
    const dispatch = useDispatch(); 

    const draw = ctx => {
        if(!canvas.drawing){
            return;
        }
        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        switch(canvas.type){
            case "pencil":{
                ctx.strokeStyle = "rgb("+canvas.p_color[0]+","+canvas.p_color[1]+","+canvas.p_color[2]+")";
                ctx.lineWidth = canvas.thickness;
                break;
            }
            case "eraser":{
                ctx.strokeStyle = "rgb("+canvas.e_color[0]+","+canvas.e_color[1]+","+canvas.e_color[2]+")";
                ctx.lineWidth = 10;
                break;
            }
        }
        ctx.moveTo(canvas.lastX / canvas.scale,canvas.lastY / canvas.scale);
        ctx.lineTo(canvas.X / canvas.scale,canvas.Y / canvas .scale);
        ctx.closePath();
        ctx.stroke();
    }
    
    useEffect(() => {
        const canvas_node = canvasRef.current;
        const context = canvas_node.getContext("2d");
        if(canvas.resized){
            context.drawImage(canvas.tmp_cv,0,0);
            dispatch({
                type:"UNRESIZED",
            });
        }
        else if(canvas.is_scale){
            // context.clearRect(0,0,canvas.width,canvas.height);
            // context.scale(canvas.scale,canvas.scale);
            // context.drawImage(canvas.tmp_cv,0,0);
            dispatch({
                type:"UNSCALE",
            });
        }
        else draw(context);
    }, [draw])
    
    return (
        <canvas
            className="draw_board"
            onMouseDown={(e) => {
                dispatch({
                    type:"DRAW_START",
                    payload:e,
                });
            }}
            onMouseUp={() => {
                dispatch({
                    type:"DRAW_END",
                });
            }}
            onMouseEnter={() => {
                dispatch({
                    type:"SHOW_POSITION",
                });
            }}
            onMouseOut={() => {
                dispatch({
                    type:"UNSHOW_POSITION",
                });
                dispatch({
                    type:"DRAW_END",
                });
            }}
            onMouseMove={(e) => {
                dispatch({
                    type:"DRAW_ING",
                    payload:e,
                })
            }}
            width={canvas.width}
            height={canvas.height}
            
            ref={canvasRef}/>
    )
}
 
export {Canvas}
