const df_state = {
    hide:true,

    mouse_down:false,//鼠标在顶栏开始拖动？
    
    thickness_hide:true,
    select_pencil_color:true,

    max:false,
}

const df_canvas = {
    drawing:false,
    p_color:["0","0","0"],
    e_color:["255","255","255"],
    color:["0","0","0"],
    lastX:0,
    lastY:0,
    X:0,
    Y:0,
    show_position:false,
    width:900,
    height:300,
    thickness:2,
    type:"pencil",

    extending:false,
    extend_start_position:[0,0],
    extend_end_position:[0,0],
    extend_direction:"both",
    tmp_W:900,
    tmp_H:300,

    resized:false,
    tmp_cv:null,

    is_scale:false,
    last_scale:1,
    scale:1,
    scale_v:1,
}

const draw = (state = df_state,action) => {
    const dw = {
        ...state,
    }
    switch(action.type){
        case "DRAW_MAX_TOGGLE":{
            dw.max = !dw.max;
            return dw;
        }
        case "DRAW_TOGGLE":{
            dw.hide = !dw.hide;
            return dw;
        }
        case "DRAW_OPEN":{
            dw.hide = false;
            return dw;
        }
        case "DRAW_CLOSE":{
            dw.hide = true;
            return dw;
        }
        case "THICKNESS_TOGGLE":{
            dw.thickness_hide = !dw.thickness_hide;
            return dw;
        }
        case "THICKNESS_HIDE":{
            dw.thickness_hide = true;
            return dw;
        }
        case "SET_PENCIL_COLOR":{
            dw.select_pencil_color = true;
            return dw;
        }
        case "SET_ERASER_COLOR":{
            dw.select_pencil_color = false;
            return dw;
        }
        default:
            return dw
    }
}

const canvas = (state = df_canvas,action) => {
    const cv = {
        ...state
    }
    switch(action.type){
        case "DRAW_START":{
            cv.X = cv.lastX = action.payload.nativeEvent.layerX;
            cv.Y = cv.lastY = action.payload.nativeEvent.layerY;
            cv.drawing = true;
            return cv;
        }
        case "DRAW_ING":{
            cv.lastX = cv.X;
            cv.lastY = cv.Y;
            cv.X = action.payload.nativeEvent.layerX;
            cv.Y= action.payload.nativeEvent.layerY;
            return cv;
        }
        case "SET_COLOR":{
            let color = action.payload.split("_");
            if(action.target === "pencil"){
                cv.p_color = color;
            }
            else{
                cv.e_color = color;
            }
            return cv;
        }
        case "SET_THICKNESS":{
            cv.thickness = action.payload;
            return cv;
        }
        case "SET_PENCIL":{
            cv.type = "pencil";
            return cv;
        }
        case "SET_ERASER":{
            cv.type = "eraser";
            return cv;
        }
        case "SHOW_POSITION":{
            cv.show_position = true;
            return cv;
        }
        case "UNSHOW_POSITION":{
            cv.show_position = false;
            return cv;
        }
        case "DRAW_END":{
            cv.drawing = false;
            return cv;
        }
        case "CANVAS_EXTEND":{
            cv.extending = true;
            cv.extend_start_position = [action.payload.pageX,action.payload.pageY];
            cv.extend_direction = action.dire;
            cv.resized = false;
            return cv;
        }
        case "CANCLE_CANVAS_EXTEND":{
            cv.extending = false;
            
            cv.resized = true;
            const tmp_cv = document.createElement("canvas");
            const tmp_ctx = tmp_cv.getContext("2d");
            const cur_cv = document.querySelector(".draw_board");
            tmp_cv.width = cur_cv.width;
            tmp_cv.height = cur_cv.height;
            tmp_ctx.drawImage(cur_cv,0,0);
            cv.tmp_cv = tmp_cv;

            cv.extend_end_position = [action.payload.pageX,action.payload.pageY];
            switch(cv.extend_direction){
                case "right":{
                    cv.width += (cv.extend_end_position[0] - cv.extend_start_position[0]);
                    break;
                }
                case "bottom":{
                    cv.height += (cv.extend_end_position[1] - cv.extend_start_position[1]);
                    break;
                }
                case "both":
                default:{
                    cv.width += (cv.extend_end_position[0] - cv.extend_start_position[0]);
                    cv.height += (cv.extend_end_position[1] - cv.extend_start_position[1]);
                    break;
                }
            }
            cv.tmp_W = cv.width;
            cv.tmp_H = cv.height;
            cv.extend_start_position = [0,0];
            cv.extend_end_position = [0,0];
            return cv;
        }
        case "UNRESIZED":{
            cv.resized = false;
            return cv;
        }
        case "EXTENDING":{
            cv.extend_end_position = [action.payload.pageX,action.payload.pageY];
            switch(cv.extend_direction){
                case "right":{
                    cv.tmp_W = cv.width + (cv.extend_end_position[0] - cv.extend_start_position[0]);
                    break;
                }
                case "bottom":{
                    cv.tmp_H = cv.height + (cv.extend_end_position[1] - cv.extend_start_position[1]);
                    break;
                }
                case "both":
                default:{
                    cv.tmp_W = cv.width + (cv.extend_end_position[0] - cv.extend_start_position[0]);
                    cv.tmp_H = cv.height + (cv.extend_end_position[1] - cv.extend_start_position[1]);
                    break;
                }
            }
            return cv;
        }
        case "SCALE":{
            if(action.payload == cv.scale) return cv;
            cv.is_scale = true;
            cv.scale = action.payload / cv.last_scale;
            cv.last_scale = action.payload;

            const tmp_cv = document.createElement("canvas");
            const tmp_ctx = tmp_cv.getContext("2d");
            const cur_cv = document.querySelector(".draw_board");
            tmp_cv.width = cur_cv.width;
            tmp_cv.height = cur_cv.height;
            tmp_ctx.drawImage(cur_cv,0,0);
            cv.width *= cv.scale;
            cv.height *= cv.scale;
            cv.tmp_cv = tmp_cv;
            // cv.last_scale = cv.scale;
            // cv.scale = action.payload / cv.last_scale;
            // cv.scale_v = action.payload;
            return cv;
        }
        case "UNSCALE":{
            cv.is_scale = false;
            return cv;
        }
        default:
            return cv;
    }
    
}


export {draw, canvas}