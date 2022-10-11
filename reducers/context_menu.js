const df_state = {
    hide:true,
    X:500,
    Y:150,
}



const context_menu = (state = df_state,action) => {
    const ct = {
        ...state
    }
    switch(action.type){
        case "OPEN_CONTEXT_MENU":{
            ct.X = action.payload.pageX;
            ct.Y = action.payload.pageY;
            ct.hide = false;
            return ct
        }
        case "CLOSE_CONTEXT_MENU":{
            ct.hide = true;
            return ct
        }
        case "REFRESH":{
            ct.hide = true;
            return ct;
        }
        default:
            return ct;
    }
}

export {context_menu}
