const df_state = {
    key_10:[],
    toggle: false,
    key_down: false,
    key_up: true,
    
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
            // app.toggle = !app.toggle;
            app.key_up = false;
            app.key_down = true;
            return app;
        }
        case "KEY_UP": {
            app.key_down = false;
            app.key_up = true;
            return app;
        }
        default:
            return app;
    }
}

export {app}

