const app_widget_state = {
    name:"",
    open:false,
    max:false,
}
const df_state = {
    apps:[
        {...app_widget_state,name:"calculator"},
        {...app_widget_state, name:"draw"},
        {...app_widget_state,name:"mine_sweeper"},
    ],
    default: {
        name:"widget",
        open:false,
        max:false,
    }
}

const widgets = (state = df_state, action) => {
    const wgs = {
        ...state,
    }
    let wg = {};
    wgs.apps.forEach((app) => {
        if(app["name"] === action.payload){
            wg = app;
            return;
        }
    });
    switch(action.type){
        case "OPEN":{
            wg.open = true;
            return wgs;
        }
        case "MIN":{
            wg.open = false;
            return wgs;
        }
        case "CLOSE":{
            wg.open = false;
            return wgs;
        }
        case "TOGGLE":{
            wg.open = !wg.open;
            return wgs;
        }
        case "MAX_TOGGLE":{
            wg.max = !wg.max;
            return wgs;
        }
        default:
            return wgs;
    }
}

export{widgets}
