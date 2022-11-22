import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";


const Canvas = (args) => {
  
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
        let s_x = canvas.drag_position[0];
        let s_y = canvas.drag_position[1];
        ctx.moveTo(Math.floor((canvas.lastX - s_x) / canvas.scale), Math.floor((canvas.lastY - s_y) / canvas.scale));
        ctx.lineTo(Math.floor((canvas.X - s_x) / canvas.scale),Math.floor((canvas.Y - s_y) / canvas .scale));
        ctx.closePath();
        ctx.stroke();
    }
    
    useEffect(() => {
        const canvas_node = canvasRef.current;
        const context = canvas_node.getContext("2d");
        if(canvas.resized){
            context.drawImage(canvas.tmp_cv, 0, 0);
            dispatch({
                type: "UNRESIZED",
            });
        }
        else{
            draw(context);
        }
    });
    useEffect(() => {
        const cur_cv = canvasRef.current;
        const show_cv = document.querySelector(".tmp_canvas");
        const show_ctx = show_cv.getContext("2d");
        show_ctx.clearRect(0, 0, show_cv.width, show_cv.height);
        if(canvas.is_scale){
            dispatch({
                type: "UNSCALE",
            });
        }
        let s_x = canvas.drag_position[0];
        let s_y = canvas.drag_position[1];
        show_ctx.drawImage(cur_cv, Math.floor((-s_x) / canvas.scale),
                                   Math.floor((-s_y) / canvas.scale),
                    cur_cv.width / canvas.scale, cur_cv.height / canvas.scale, 0, 0, show_cv.width, show_cv.height);
    }, [canvas]);
     
    return (
        <canvas
            className="draw_board"
            onMouseDown={(e) => {
                if (args.Space) {
                    dispatch({
                        type: "DRAW_DRAG_START",
                        payload: e,
                    });
                }
                else {
                    dispatch({
                        type: "DRAW_START",
                        payload: e,
                    });
                }
            }}
            onMouseUp={() => {
                if(args.Space){
                    dispatch({
                        type: "DRAW_DRAG_END",
                    });
                }
                else{
                    dispatch({
                        type: "DRAW_END",
                    });
                }
            }}
            onMouseEnter={() => {
                dispatch({
                    type: "SHOW_POSITION",
                });
            }}
            onMouseOut={() => {
                dispatch({
                    type: "UNSHOW_POSITION",
                });
                if(args.Space){
                    dispatch({
                        type: "DRAW_DRAG_END",
                    });
                }
                else{
                    dispatch({
                        type: "DRAW_END",
                    });
                } 
            }}
            onMouseMove={(e) => {
                if(args.Space){
                    dispatch({
                        type: "DRAW_DRAGGING",
                        payload: e,
                    });
                }
                else{
                    dispatch({
                        type: "DRAW_ING",
                        payload: e,
                    });
                }
            }}
            onWheel={args.Shift ? (e) => {
                if(e.deltaY === 0) return;
                dispatch({
                    type: "SCALE_WHEEL",
                    payload: e,
                });
            } : null}
            width={canvas.width}
            height={canvas.height}
            data-space={args.Space}
            data-dragging={canvas.dragging}
            
            ref={canvasRef}/>
    )
}
 
export {Canvas}
