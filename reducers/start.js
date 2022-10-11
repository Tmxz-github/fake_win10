const df_state = {
    hide:true,
}

const start_menu = (state = df_state,action) => {
    switch(action.type){
        case "START_TOOGLE":
            return {
                ...state,
                hide:state["hide"]?false:true,
            };
        case "START_HIDE":
        return {
            ...state,
            hide:true
        };
        case "START_SHOW":
        return {
            ...state,
            hide:false
        };
        default:
            return state;
    }
}

const start_side = (state = df_state,action) => {
    switch(action.type){
        case "SIDE_TOGGLE":
            return {
                ...state,
                hide:state["hide"]?false:true,
            };
        case "SIDE_HIDE":
        return {
            ...state,
            hide:true
        };
        case "SIDE_SHOW":
        return {
            ...state,
            hide:false
        };
        case "SIDE_KEEP":
        default:
            return state;
    }
}

const start_side_power = (state = df_state,action) => {
    switch(action.type){
        case "SIDE_POWER_TOGGLE":
            return {
                ...state,
                hide:state["hide"]?false:true,
            };
        case "POWER_SIDE_HIDE":
        return {
            ...state,
            hide:true
        };
        case "POWER_SIDE_SHOW":
        return {
            ...state,
            hide:false
        };
        case "SIDE_POWER_KEEP":
        default:
            return state;
    }
};

const start_side_user = (state = df_state,action) => {
    switch(action.type){
        case "SIDE_USER_TOGGLE":
            return {
                ...state,
                hide:state["hide"]?false:true,
            };
        case "USER_SIDE_HIDE":
        return {
            ...state,
            hide:true
        };
        case "USER_SIDE_SHOW":
        return {
            ...state,
            hide:false
        };
        case "SIDE_USER_KEEP":
        default:
            return state;
    }
};


export {start_menu, start_side, start_side_power, start_side_user}