const df_state = {
    key_10:[],
    toggle:false,
}


const app = (state = df_state, action) => {
    let app = {
        ...state,
    }
    switch(action.type){
        case "KEY_DOWN":{
            if(app.key_10.length === 10){
                app.key_10.shift();
            }
            app.key_10.push(action.payload);
            app.toggle = !app.toggle;
            return app;
        }
        default:
            return app;
    }
}

export {app}

