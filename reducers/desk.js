

const df_state = {
    apps:[],
    active_app:"",
    select:"",
}
const df_app_state = {
    name:"",
    active:false,
    min:false,
    focus: true,
    get_key:false,
}

const open_apps = (state = df_state,action) => {
    let op_apps = {
        ...state
    }
    switch(action.type){
        case "APP_OPEN":{
            let app_in = false;
            op_apps.apps.forEach((app) => {
                app["focus"] = false;
                if(app["name"] === action.payload){
                    app["focus"] = true;
                    app_in = true;
                }
            });
            if(app_in) return op_apps;
            op_apps.apps.push({
                ...df_app_state,
                name:action.payload,
            });
            return op_apps;
        }
        case "APP_CLOSE":{
            let name = action.payload;
            let index = 0;
            op_apps.apps.forEach((app,i) => {
                if(app["name"] === name) index = i;
            });
            op_apps.apps.splice(index,1);
            return op_apps;
        }
        case "APP_MIN":{
            let name = action.payload;
            let index = 0;
            op_apps.apps.forEach((app,i) => {
                if(app["name"] === name) index = i;
            });
            op_apps.apps[index].min = !op_apps.apps[index].min;
            op_apps.apps[index].focus = !op_apps.apps[index].focus;
            return op_apps;
        }
        case "TOP_MOUSE_DOWN":{
            let name = action.app;
            let app = action.payload.target.closest("."+name);
            app.dataset.offsetX = action.payload.pageX - app.offsetLeft;
            app.dataset.offsetY = action.payload.pageY - app.offsetTop;
            op_apps.active_app = name;
            return op_apps;
        }
        case "TOP_MOUSE_UP":{
            op_apps.active_app = "";
            return op_apps;
        }
        case "TO_TOP":{
            op_apps.apps.forEach((app) => {
                if(app["name"] === action.payload){
                    app["active"] = true;
                    app["focus"] = true;
                }
                else{
                    app["active"] = false;
                    app["focus"] = false;
                }
            });
            return op_apps;
        }
        case "SELECT":{
            op_apps.select = action.payload;
            return op_apps;
        }
        case "KEY_DOWN":{
            op_apps.apps.forEach((app) => {
                app.get_key = false;
                if(app["focus"]){
                    app.get_key = true;
                }
            });
            return op_apps;
        }
        default:
            return state;
    }
}

export {open_apps}
