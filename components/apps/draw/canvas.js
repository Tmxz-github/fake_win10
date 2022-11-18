import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";


const Canvas = () => {
  
    const canvasRef = useRef(null);
    const canvas = useSelector(state => state.canvas);
    const dispatch = useDispatch(); 

    const draw = (ctx) => {
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
        ctx.moveTo(Math.floor(canvas.lastX / canvas.scale / canvas.scale),Math.floor(canvas.lastY / canvas.scale / canvas.scale));
        ctx.lineTo(Math.floor(canvas.X / canvas.scale / canvas.scale),Math.floor(canvas.Y / canvas .scale / canvas.scale));
        ctx.closePath();
        ctx.stroke();
    }
    
    useEffect(() => {
        const canvas_node = canvasRef.current;
        const context = canvas_node.getContext("2d");
        // const show_cv = document.querySelector(".tmp_canvas");
        // const show_ctx = show_cv.getContext("2d");
        if (canvas.resized) {
            context.drawImage(canvas.tmp_cv, 0, 0);
            dispatch({
                type: "UNRESIZED",
            });
        }
        // else if (canvas.is_scale) {
        //     // context.clearRect(0,0,canvas.width,canvas.height);
        //     // context.scale(canvas.scale,canvas.scale);
        //     // context.drawImage(canvas.tmp_cv, 0, 0, canvas.tmp_cv.width, canvas.tmp_cv.height, 0, 0, canvas.width, canvas.height);
        //     show_ctx.clearRect(0, 0, show_cv.width, show_cv.height);
        //     dispatch({
        //         type: "UNSCALE",
        //     });
        // }
        else {
            draw(context);
        }
    }, [draw]);
    useEffect(() => {
        
        const cur_cv = document.querySelector(".draw_board");
        const cur_ctx = cur_cv.getContext("2d");
        
        const show_cv = document.querySelector(".tmp_canvas");
        const show_ctx = show_cv.getContext("2d");
        
        if(canvas.is_scale){
            show_ctx.clearRect(0, 0, show_cv.width, show_cv.height);
            dispatch({
                type: "UNSCALE",
            });
        }

        show_ctx.drawImage(cur_cv, 0, 0, cur_cv.width / canvas.scale, cur_cv.height / canvas.scale, 0, 0, show_cv.width, show_cv.height);
    }, [canvas]);
     
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
                    type: "DRAW_ING",
                    payload: e,
                });
            }}
            width={canvas.width}
            height={canvas.height}
            
            ref={canvasRef}/>
    )
}
 
export {Canvas}
