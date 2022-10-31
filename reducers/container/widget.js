const df_state = {
    hide:true,
    max:false,
}



const widget = (state = df_state, action) => {
    const wg = {
        ...state,
    }
    switch(action.type){
        default:
            return wg;
    }
}

export{widget}
