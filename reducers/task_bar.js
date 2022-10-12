const df_state = {
    hover:false,
    funcs_info:"",
    options_fold:false,
}

const task_bar = (state = df_state,action) => {
    const tk = {
        ...state
    }
    switch(action.type){
        case "START_COLOR_TOGGLE":{
            tk.hover = !tk.hover;
            return tk
        }
        case "FUNCS_INFO_TOOGLE":{
            if(tk.funcs_info === action.payload){
                tk.funcs_info = "";
                return tk;
            }
            tk.funcs_info = action.payload;
            return tk;
        }
        case "CLOSE_FUNCS_INFO_MENU":{
            tk.funcs_info = "";
            return tk;
        }
        case "OPTIONS_TOGGLE":{
            console.log("x");
            tk.options_fold = !tk.options_fold;
            return tk;
        }
        default:
            return tk;
    }
}

export {task_bar}
