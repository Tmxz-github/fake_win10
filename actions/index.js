
const app_hide = (app_obj) => {
    return {
        type:"HIDE",
        payload:app_obj,
    }
}

const app_show = (app_obj) => {
    return {
        type:"SHOW",
        payload:app_obj,
    }
}

const allActions = {
    app_hide,
    app_show,
}

export {allActions}