const df_state = {
    apps:[],
    active_app:"",
    select:"",
}

class App{
    constructor(args){
        this.name = args.name || "";
        this.moving = false;//移动中?
        this.min = false;
        this.max = false;
        this.focus = false;//焦点?
        this.get_key = false;//获取键盘输入中?
    }
}

const open_apps = (state = df_state,action) => {
    let op_apps = {
        ...state
    }
    switch(action.type){
        case "APP_OPEN":{
            let name = action.payload;
            let app = new App({
                name:name,
            });
            op_apps.apps.push(app);
            return op_apps;
        }
        case "APP_CLOSE":{
            let name = action.payload;
            let index = 0;
            op_apps.apps.forEach((app,i) => {
                if(app.name === name){
                    index = i;
                    return;
                }
            });
            op_apps.apps.splice(index,1);
            return op_apps;
        }
        case "APP_MIN":{
            let name = action.payload;
            let index = 0;
            op_apps.apps.forEach((app,i) => {
                if(app.name === name){
                    index = i;
                    return;
                }
            });
            op_apps.apps[index].min = !op_apps.apps[index].min;
            op_apps.apps[index].focus = false;
            return op_apps;
        }
        case "TOP_MOUSE_DOWN":{
            let name = action.payload;

            let e = action.e;
            let elem = e.target.closest("."+name);
            elem.dataset.offsetX = e.pageX - elem.offsetLeft;
            elem.dataset.offsetY = e.pageY - elem.offsetTop;

            let index = 0;
            op_apps.apps.forEach((app,i) => {
                if(app.name === name){
                    index = i;
                    return;
                }
            });
            op_apps.apps[index].moving = true;

            return op_apps;
        }
        case "TOP_MOUSE_UP": {
            let name = action.payload;
            let index = 0;
            op_apps.apps.forEach((app,i) => {
                if(app.name === name){
                    index = i;
                    return;
                }
            });
            op_apps.apps[index].moving = false;
            return op_apps;
        }
        case "TO_TOP":{
            let name = action.payload;
            op_apps.apps.forEach((app) => {
                if(app.name === name){
                    app.focus = true;
                }
                else{
                    app["active"] = false;
                    app["focus"] = false;
                }
            });
            return op_apps;
        }
        case "SELECT":{
            let name = action.payload;
            op_apps.select = name;
            return op_apps;
        }
        case "KEY_DOWN":{
            op_apps.apps.forEach((app) => {
                app.get_key = false;
                if(app.focus){
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
