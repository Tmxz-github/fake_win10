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
    let name = action.payload;
    switch(action.type){
        case "APP_OPEN":{
            let app = new App({
                name:name,
            });
            op_apps.apps.push(app);
            return op_apps;
            // 
            // let app_in = false;//应用已经打开?
            // op_apps.apps.forEach((app) => {
            //     app["focus"] = false;
            //     if(app["name"] === action.payload){
            //         app["focus"] = true;
            //         app_in = true;
            //     }
            // });
            // if(app_in) return op_apps;
            // op_apps.apps.push({
            //     ...df_app_state,
            //     name:action.payload,
            // });
            // return op_apps;
        }
        case "APP_CLOSE":{
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
            console.log(op_apps.apps[index]);
            console.log(op_apps.apps);
            op_apps.apps[index] = op_apps.apps[index];
            console.log(op_apps.apps);


            return op_apps;
        }
        case "TOP_MOUSE_UP":{

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
