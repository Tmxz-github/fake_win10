const app_widget_state = {
    name:"",
    hide:true,
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
        hide:true,
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
            wg.hide = false;
            return wgs;
        }
        case "CLOSE":{
            wg.hide = true;
            return wgs;
        }
        case "TOGGLE":{
            wg.hide = !wg.hide;
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
