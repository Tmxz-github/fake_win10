const df_state = {
    thickness_hide:true,
    select_pencil_color:true,
}

const df_canvas = {
    drawing:false,
    p_color:["0","0","0"],//铅笔颜色
    e_color:["255","255","255"],//橡皮颜色
    color:["0","0","0"],//用户选择的颜色
    lastX:0,//画笔轨迹
    lastY:0,
    X:0,
    Y:0,//画笔轨迹
    show_position:false,
    width:900,//画布初始宽
    height:300,//画布初始高
    thickness:2,//笔粗
    type:"pencil",//笔类型

    extending:false,//画布在扩张?
    extend_start_position:[0,0],
    extend_end_position:[0,0],
    extend_direction:"both",//扩展方向 右 下 右下
    tmp_W:900,//扩展时预览大小
    tmp_H:300,

    resized:false,
    tmp_cv:null,//扩展时预览画布

    is_scale:false,
    last_scale:1,
    scale:1,
    scale_v:1,

    step:[],
    step_index:0,
    undo:false,//撤销后腰修改step数组
}

const draw = (state = df_state,action) => {
    const dw = {
        ...state,
    }
    switch(action.type){
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
            cv.X = cv.lastX = Math.floor(action.payload.nativeEvent.layerX * cv.scale);
            cv.Y = cv.lastY = Math.floor(action.payload.nativeEvent.layerY * cv.scale);
            cv.drawing = true;
            return cv;
        }
        case "DRAW_ING":{
            cv.lastX = cv.X;
            cv.lastY = cv.Y;
            cv.X = Math.floor(action.payload.nativeEvent.layerX * cv.scale);
            cv.Y = Math.floor(action.payload.nativeEvent.layerY * cv.scale);
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
            if(!cv.drawing) return cv;
            const cur_cv = document.querySelector(".draw_board");
            const cur_ctx = cur_cv.getContext("2d");
            let data = cur_ctx.getImageData(0,0,cur_cv.width,cur_cv.height);
            if(cv.undo){
                cv.step = cv.step.slice(0,cv.step_index + 1);
                cv.undo = false;
            }
            cv.step.push(data);
            cv.step_index = cv.step.length - 1;
            cv.drawing = false;
            return cv;
        }
        case "REDO":{
            // let s = Date.now();
            if(cv.step_index === cv.step.length - 1){
                return cv;
            }
            const cur_cv = document.querySelector(".draw_board");
            const cur_ctx = cur_cv.getContext("2d");
            cv.step_index++;
            let data = cv.step[cv.step_index];
            cur_ctx.putImageData(data,0,0);
            // let e = Date.now();
            // console.log(e-s);
            return cv;
        }
        case "UNDO":{
            if(cv.step_index < 0) return cv;
            const cur_cv = document.querySelector(".draw_board");
            const cur_ctx = cur_cv.getContext("2d");
            if(cv.step_index-- <= 0){
                cur_ctx.clearRect(0,0,cur_cv.width,cur_cv.height);
                return cv;
            }
            let data = cv.step[cv.step_index];
            cur_ctx.putImageData(data,0,0);
            cv.undo = true;
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
            console.log("C");
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
        case "SCALE": {
            if (cv.last_scale === action.payload) return cv;
            const cur_cv = document.querySelector(".draw_board");
            const cur_ctx = cur_cv.getContext("2d");
            
            const tmp_cv = document.createElement("canvas");
            const tmp_ctx = tmp_cv.getContext("2d");
            tmp_cv.width = cur_cv.width;
            tmp_cv.height = cur_cv.height;
            tmp_ctx.drawImage(cur_cv,0,0);
            cv.scale = action.payload;
            cv.last_scale = cv.scale;
            cur_ctx.setTransform(action.payload,0,0,action.payload,0,0);
            // cur_ctx.drawImage(tmp_cv);
            cv.width = 900 * action.payload;
            cv.height = 300 * action.payload;
            // if(action.payload == cv.last_scale) return cv;
            cv.is_scale = true;
            // cv.scale = action.payload / cv.last_scale;
            // cv.last_scale = action.payload;

            
            // const cur_cv = document.querySelector(".draw_board");
            // cv.width *= cv.scale;
            // cv.height *= cv.scale;
            console.log(tmp_cv.width, tmp_cv.height);
            cv.tmp_cv = tmp_cv;
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