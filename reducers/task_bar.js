const date = new Date();
const month_days = [0,31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const df_state = {
    hover:false,
    funcs_info:"",
    options_fold:false,

    y:date.getFullYear(),
    m:date.getMonth()+1,
    d:date.getDate(),
    w:date.getDay(),
    gap:0,
    week_day:0,//本月1号星期几
    last_week_day:0,//本月最后一天星期几
    last_month_days:0,
    this_month_days:0,
    is_leap:false,

    selected_i:"",
}

const is_Feb = (is_leap) => {
    return is_leap ? 29 : 28
}

const task_bar = (state = df_state,action) => {
    const tk = {
        ...state
    }
    switch(action.type){
        case "START_COLOR_TOGGLE":{
            tk.hover = !tk.hover;
            return tk
        }
        case "FUNCS_INFO_TOOGLE":{
            if(tk.funcs_info === action.payload){
                tk.funcs_info = "";
                return tk;
            }
            tk.funcs_info = action.payload;
            return tk;
        }
        case "CLOSE_FUNCS_INFO_MENU":{
            tk.funcs_info = "";
            return tk;
        }
        case "OPTIONS_TOGGLE":{
            tk.options_fold = !tk.options_fold;
            return tk;
        }
        case "CALENDAR_INIT":{
            tk.is_leap = ((tk.y % 100 != 0 && tk.y % 4 === 0) || tk.y % 400 === 0);
            tk.gap = Math.ceil(tk.d/7)*7 - tk.d;
            tk.week_day = (tk.w+tk.gap+1) > 7 ? (((tk.w+tk.gap+1) % 7) === 0 ? 7 : ((tk.w+tk.gap+1) % 7)) : (tk.w+tk.gap+1);
            tk.last_month_days = tk.m - 1 > 0 ? month_days[tk.m - 1] : month_days[12];
            tk.this_month_days = month_days[tk.m];
            if(tk.last_month_days === 0) tk.last_month_days = is_Feb(tk.is_leap);
            if(tk.this_month_days === 0) tk.this_month_days = is_Feb(tk.is_leap);
            if(tk.m === 2){
                tk.last_week_day = tk.is_leap ? tk.week_day : ((tk.week_day - 1) < 0 ? 7 : (tk.week_day - 1));
            }
            else if (tk.this_month_days === 30){
                tk.last_week_day = (tk.week_day + 1) > 7 ? 1 : (tk.week_day + 1);
            }
            else{
                tk.last_week_day = (tk.week_day + 2) > 7 ? 1 : (tk.week_day + 2);
            }
            return tk;
        }
        case "CALENDAR_UP":{
            let m = parseInt(action.payload.m);
            let y = parseInt(action.payload.y);
            if(m === 0){
                tk.m = 12;
                tk.y = y - 1;
            }
            else{
                tk.m = m;
            }
            tk.d = tk.last_month_days;
            tk.w = (tk.week_day - 1) < 1 ? 7 : tk.week_day - 1;
            return tk;
        }
        case "CALENDAR_DOWN":{
            let m = parseInt(action.payload.m);
            let y = parseInt(action.payload.y);
            if(m === 13){
                tk.m = 1;
                tk.y = y + 1;
            }
            else{
                tk.m = m;
            }
            tk.d = 1;
            tk.w = (tk.last_week_day + 1) > 7 ? 1 : (tk.last_week_day + 1);
            console.log(tk.w);
            return tk;
        }
        case "DATE_SELECT_TOOGLE":{
            if(tk.selected_i === action.payload.selected){
                tk.selected_i = "";
                return tk;
            }
            tk.selected_i = action.payload.selected;
            return tk;
        }
        default:
            return tk;
    }
}

export {task_bar}
