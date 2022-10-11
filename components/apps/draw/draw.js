import { useSelector, useDispatch } from "react-redux";

import { Canvas } from "./canvas";
import "./draw.css"
import "./draw_funcs_css/draw_color.css"
import "./draw_funcs_css/draw_thickness.css"
import "./draw_effect.css"



const Draw = () => {
    const draw = useSelector(state => state.draw);
    const canvas = useSelector(state => state.canvas);
    const op_apps = useSelector(state => state.open_apps);
    const self = op_apps.apps.filter((app) => {
        return app["name"] === "DRAW";
    })[0];
    const dispatch = useDispatch();

    const empty_handle = (e) => {
        const empty_action = [
			["THICKNESS","THICKNESS_HIDE"],
		]
        let action_type = "";
        try{action_type = e.target.dataset.action || "";}
        catch(err){}
        let action_type1 = getComputedStyle(e.target).getPropertyValue(
			"--prefix"
		);
		empty_action.forEach((action) => {
			if(!action_type.startsWith(action[0]) && !action_type1.startsWith(action[0])){
				dispatch({
					type:action[1],
				});
			}
		});
    }
    const dispatch_click = (e) => {
        empty_handle(e);
        const key = e.target;
        if(key.dataset.type === "ctl_key"){
            dispatch({
                type:key.dataset.action || "",
            });
            dispatch({
                type:key.dataset.g_action || "",
                payload:key.dataset.name || "",
            });
            return;
        }
        if(key.closest(".func")){
            dispatch({
                type:key.dataset.action || "",
                payload:key.dataset.payload || "",
                target:key.dataset.target || "",
            });
        }
    }
    const drag_handle = (e,target) => {
        let x = e.pageX - target.dataset.offsetX;
        let y = e.pageY - target.dataset.offsetY;
        target.style.left = x + "px";
        target.style.top = y + "px";
    }
    const colors = [["black","0_0_0"],["grey","127_127_127"],["dark_red","136_0_21"],["red","237_28_36"],["orange","255_127_39"],
                    ["yellow","255_242_0"],["green","34_177_76"],["turquoise","0_162_232"],["indigo","63_72_204"],["purple","163_73_164"],
                    ["white","255_255_255"],["shallow_grey","195_195_195"],["brown","185_122_87"],["pink","255_174_201"],["gold","255_201_14"],
                    ["shallow_yellow","239_228_176"],["lime","181_230_29"],["shallow_turquoise","153_217_234"],["bluish_grey","112_146_190"],["shallow_purple","200_191_231"]]
                    .map((color) => {
                        let rgb = color[1].split("_");
                        let r = rgb[0];let g = rgb[1];let b = rgb[2];
                        return (
                            <li
                                key={color[0]}
                                className={"color " + color[0]}
                                data-type="color"
                                data-action="SET_COLOR"
                                data-target={draw.select_pencil_color ? "pencil" : "eraser"}
                                data-payload={color[1]}
                            >
                                <div
                                    style={{
                                        backgroundColor:"rgb("+r+","+g+","+b+")",
                                        margin:"1px",
                                    }}
                                    data-type="color"
                                    data-action="SET_COLOR"
                                    data-target={draw.select_pencil_color ? "pencil" : "eraser"}
                                    data-payload={color[1]}
                                ></div>
                            </li>
                        )
                    });
    return (
        <div
            className="draw app"
            onClick={dispatch_click}
            data-hide={draw.hide}
            data-max={draw.max}
            data-top={self ? self.active : ""}
        >
            <div
                className="draw_top_bar"
                onMouseDown={(e) => {
                    dispatch({
                        type:"TOP_MOUSE_DOWN",
                        payload:e,
                        app:"draw"
                    })
                }}
                onMouseUp={() => {
                    dispatch({
                        type:"TOP_MOUSE_UP",
                        app:"draw"
                    })
                }}
                onMouseOut={() => {
                    dispatch({
                        type:"TOP_MOUSE_UP",
                    })
                }}
                onMouseMove={op_apps.active_app === "draw" ? (e) => {
                    drag_handle(e,e.target.closest(".draw"));
                } : null}
            >
                <div>
                    <div className="draw_icon">画图</div>
                </div>
                <div>
                    <ul className="draw_oper_bar">
                        <li
                            className="min win_ctl"
                            data-type="ctl_key"
                            data-action="DRAW_CLOSE"
                            data-g_action="APP_MIN"
                            data-name="DRAW"
                        >
                            -
                        </li>
                        <li
                            className="max win_ctl"
                            data-type="ctl_key"
                            data-action="DRAW_MAX_TOGGLE"
                        >
                            口
                        </li>
                        <li
                            className="close win_ctl"
                            data-type="ctl_key"
                            data-action="DRAW_CLOSE"
                            data-g_action="APP_CLOSE"
                            data-name="DRAW"
                        >
                            X
                        </li>
                    </ul>
                </div>
            </div>
            <div
                className="draw_select_bar"
            >
                <ul>
                    <li
                        className="fraw_file"
                    >文件</li>
                    <li
                        className="fraw_main"
                    >主页</li>
                    <li
                        className="fraw_check"
                    >查看</li>
                </ul>
            </div>
            <div
                className="draw_funcs_bar"
            >
                <div
                    className="draw_funcs"
                >
                    {/* {<div
                        className="func draw_shear_plate"
                    >剪切板</div>} */}
                    <div
                        className="func draw_select"
                    >
                        <ul>
                            <li
                                data-action="SCALE"
                                className="draw_selected draw_hover"
                                data-payload={1}
                            >1X</li>
                            <li
                                data-action="SCALE"
                                className="draw_selected draw_hover"
                                data-payload={2}
                            >2X</li>
                            <li
                                data-action="SCALE"
                                className="draw_selected draw_hover"
                                data-payload={3}
                            >3X</li>
                            <li
                                data-action="SCALE"
                                className="draw_selected draw_hover"
                                data-payload={4}
                            >4X</li>
                        </ul>
                        <span>缩放</span>
                    </div>
                    {/* {<div
                        className="func draw_img"
                    >图像</div>} */}
                    <div
                        className="func draw_tool"
                    >
                        
                            <ul>
                                <li
                                    className="tool draw_selected draw_hover"
                                    data-action="SET_PENCIL"
                                    data-selected={canvas.type === "pencil"}
                                >铅</li>
                                {/* {<li
                                    className="tool"
                                >填</li>
                                <li
                                    className="tool"
                                >字</li>} */}
                                <li
                                    className="tool draw_selected draw_hover"
                                    data-action="SET_ERASER"
                                    data-selected={canvas.type === "eraser"}
                                >橡</li>
                                {/* {<li
                                    className="tool"
                                >吸</li>
                                <li
                                    className="tool"
                                >大</li>} */}
                            </ul>
                            <span>工具</span>
                        
                    </div>
                    {/*<div
                        className="func draw_brush"
                    >刷子
                    </div>*/}
                    {/* <div
                        className="func draw_shape"
                    >形状</div> */}
                    <div
                        className="func draw_thickness draw_hover"
                        data-action="THICKNESS_TOGGLE"
                    >
                        <div
                            className="thickness_icon"
                            data-action="THICKNESS_TOGGLE"
                        >
                            <ul>
                                <li
                                    data-action="THICKNESS_TOGGLE"
                                ></li>
                                <li
                                    data-action="THICKNESS_TOGGLE"
                                ></li>
                                <li
                                    data-action="THICKNESS_TOGGLE"
                                ></li>
                                <li
                                    data-action="THICKNESS_TOGGLE"
                                ></li>
                            </ul>
                        </div>
                        <span
                            data-action="THICKNESS_TOGGLE"
                        >粗细▼</span>
                        <div
                            className="thickness"
                            data-hide={draw.thickness_hide}
                        >
                            <ul>
                                <li
                                    className="draw_selected draw_hover"
                                    data-action="SET_THICKNESS"
                                    data-payload={1}
                                    data-selected={canvas.thickness == 1}
                                ></li>
                                <li
                                    className="draw_selected draw_hover"
                                    data-action="SET_THICKNESS"
                                    data-payload={2}
                                    data-selected={canvas.thickness == 2}
                                ></li>
                                <li
                                    className="draw_selected draw_hover"
                                    data-action="SET_THICKNESS"
                                    data-payload={3}
                                    data-selected={canvas.thickness == 3}
                                ></li>
                                <li
                                    className="draw_selected draw_hover"
                                    data-action="SET_THICKNESS"
                                    data-payload={4}
                                    data-selected={canvas.thickness == 4}
                                ></li>
                            </ul>
                        </div>
                    </div>
                    <div
                        className="func draw_color"
                    >
                        <div
                            className="draw_color_left"
                        >
                            <div
                                className="pencil_color color_select draw_selected draw_hover"
                                data-selected={draw.select_pencil_color}
                                data-action="SET_PENCIL_COLOR"
                            >
                                <div
                                    className="color"
                                    data-action="SET_PENCIL_COLOR"
                                >
                                    <div
                                        data-action="SET_PENCIL_COLOR"
                                        style={{
                                            backgroundColor:"rgb("+canvas.p_color[0]+","+canvas.p_color[1]+","+canvas.p_color[2]+")"
                                        }}
                                    ></div>
                                </div>
                                <span
                                    data-action="SET_PENCIL_COLOR"
                                >颜色1</span>
                            </div>
                            <div
                                className="eraser_color color_select draw_selected draw_hover"
                                data-selected={!draw.select_pencil_color}
                                data-action="SET_ERASER_COLOR"
                            >
                                <div
                                    className="color"
                                    data-action="SET_ERASER_COLOR"
                                >
                                    <div
                                        data-action="SET_ERASER_COLOR"
                                        style={{
                                            backgroundColor:"rgb("+canvas.e_color[0]+","+canvas.e_color[1]+","+canvas.e_color[2]+")"
                                        }}
                                    ></div>
                                </div>
                                <span
                                    data-action="SET_ERASER_COLOR"
                                >颜色2</span>
                            </div>
                        </div>
                        <div
                            className="draw_color_right"
                        >
                            <div
                                className="draw_palette"
                            >
                                <ul>
                                    {colors}
                                </ul>
                            </div>
                            <span>颜色</span>
                        </div>
                    </div>
                    {/* {<div
                        className="func draw_3d"
                    >3d</div>
                    <div
                        className="func draw_remind"
                    >提醒</div>} */}
                </div>
            </div>
            <div
                className="draw_box"
            >
                    <Canvas />
                    <canvas
                        className="tmp_canvas"
                        width={0}
                        height={0}
                        style={{
                            zIndex:"-1",
                            position:"absolute",
                        }}
                    ></canvas>
                    <div
                        className="canvas_extend_bottom"
                        style={{
                            top: canvas.height+4+"px",
                            left: canvas.width/2-4+"px",
                        }}
                        onMouseDown={(e) => {
                            dispatch({
                                type:"CANVAS_EXTEND",
                                dire:"bottom",
                                payload:e,
                            });
                        }}
                    ></div>
                    <div
                        className="canvas_extend_right"
                        style={{
                            top: canvas.height/2-4+"px",
                            left: canvas.width+4+"px",
                        }}
                        onMouseDown={(e) => {
                            dispatch({
                                type:"CANVAS_EXTEND",
                                dire:"right",
                                payload:e,
                            });
                        }}
                    ></div>
                    <div
                        className="canvas_extend"
                        style={{
                            top: canvas.height+4+"px",
                            left: canvas.width+4+"px",
                        }}
                        onMouseDown={(e) => {
                            dispatch({
                                type:"CANVAS_EXTEND",
                                dire:"both",
                                payload:e,
                            });
                        }}
                    ></div>
                    <div
                        className="draw_board_extend_sample"
                        style={{
                            width:canvas.tmp_W+"px",
                            height:canvas.tmp_H+"px",
                            display:canvas.extending ? "block" : "none",
                        }}
                    ></div>
            </div>
            <div
                className="draw_bottom_bar"
            >
                <div
                    className="canvas_mouse_position"
                >{canvas.show_position ? Math.trunc(canvas.X / canvas.last_scale)+","+Math.trunc(canvas.Y / canvas.last_scale)+"像素" : ""}</div>
                <div
                    className="canvas_size"
                >{canvas.width / canvas.last_scale+" × "+canvas.height / canvas.last_scale+"像素"}</div>
            </div>
        </div>
    )
}

export {Draw}