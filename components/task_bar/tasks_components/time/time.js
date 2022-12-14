import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux"
import "./time.css"

const Time = () => {

    const task_bar = useSelector(state => state.task_bar);
    const dispatch = useDispatch();

    const border_layer = document.querySelector(".calendar_item_border");
    const calendar_move = (e) => {
        let x = e.pageX;
        let y = e.pageY;
        let bounding = border_layer.getBoundingClientRect();
        border_layer.style.webkitMaskPosition = `${x - bounding.x - 80}px ${y -bounding.y - 80}px`;
    }

    const click_dispatch = (e) => {
        const target = e.target;
        const action = target.dataset.action;
        dispatch({
            type:action || "",
            payload:{
                m:target.dataset.m || "",
                y:target.dataset.y || "",
                selected:target.dataset.selected_i || "",
            },
        });
        dispatch({
            type:"CALENDAR_INIT",
        })
    }

    const char_num = ["零", "一", "二", "三", "四", "五",
                    "六", "七", "八", "九", "十",
                    "十一", "十二", "十三", "十四", "十五",
                    "十六", "十七", "十八", "十九", "二十",
                    "二十一", "二十二", "二十三", "二十四", "二十五",
                    "二十六", "二十七", "二十七", "二十八", "二十九", "三十", "三十一"];
    const CALENDAR_ITEMS_NUM = 42;
    const date = new Date();
    const [time_s, set_time_s] = useState(date.toLocaleTimeString());
    const get_time = () => {
        let h = date.getHours();
        h = h < 10 ? "0"+h : ""+h;
        let m = date.getMinutes();
        m = m < 10 ? "0"+m : ""+m;
        return h+":"+m;
    }
    const get_date = () => {
        return date.toLocaleDateString();
    }
    const get_full_date = () => {
        const y = date.getFullYear();
        const m = date.getMonth()+1;
        const d = date.getDate();
        let f = y+"年"+m+"月"+d+"日";
        const M = char_num[m];
        const D = char_num[d];
        let s = M+"月"+D;
        return [f,s];
    }
    const update_calendar = () => {
        let lis = [];
        for (let date = task_bar.last_month_days - task_bar.week_day + 2; date <= task_bar.last_month_days; date++){
            lis.push(date);
        }//获取上个月显示的天数
        for (let date = 1; date <= task_bar.this_month_days; date++){
            lis.push(date);
        }//获取本月显示的天数
        for (let date = 1; date <= (CALENDAR_ITEMS_NUM - task_bar.week_day + 1 - task_bar.this_month_days); date++){
            lis.push(date);
        }//获取下月显示的天数
        let this_month = false;
        const calendar = lis.map((day,i) => {
            if(day === 1){
                this_month = !this_month;
            }
            return (
                <li
                    className="calendar_day grid date_selected"
                    data-selected={parseInt(task_bar.selected_i) === i}
                    data-today={day === date.getDate() && task_bar.m === date.getMonth()+1 && task_bar.y === date.getFullYear() && this_month}
                    data-this_month={this_month}
                    key={i}
                >
                    <div>{day}</div>
                </li>
            )
        });
        const border_items = lis.map((day,i) => {
            return (
                <li
                    className="calendar_day_border grid"
                    data-action="DATE_SELECT_TOOGLE"
                    data-selected_i={i}
                    data-day={day}
                    key={i}
                >
                </li>
            )
        });
        return [calendar,border_items];
    }

    const [calendar, set_calendar] = useState();
    const [border_items, set_border_items] = useState();

    useEffect(() => {
        dispatch({
            type:"CALENDAR_INIT",
        });
    },[]);
    useEffect(() => {
        const data = update_calendar()
        set_calendar(data[0]);
        set_border_items(data[1]);
    },[task_bar.m,task_bar.selected_i,task_bar.funcs_info]);
    useEffect(() => {
        const date = new Date();
        setTimeout(() => {
            set_time_s(date.toLocaleTimeString("zh-cn",{
                hour12:false,
            }));
        },1000);
    },[time_s]);

    return (
        <li
            className="time task"
            data-action="FUNCS_INFO_TOOGLE"
            data-name="time"
        >
            <div
                className="task_bar_task_content task_hover"
                data-action="FUNCS_INFO_TOOGLE"
                data-name="time"
            >
                <div
                    className="clock_m"
                    data-action="FUNCS_INFO_TOOGLE"
                    data-name="time"
                >{get_time()}</div>
                <div
                    className="date"
                    data-action="FUNCS_INFO_TOOGLE"
                    data-name="time"
                >{get_date()}</div>
            </div>
            <div
                className="time_info"
                data-hide={task_bar.funcs_info !== "time"}
                style={{ "--prefix": "FUNCS_INFO" }}
            >
                <div
                    className="time_info_top"
                >
                    <div
                        className="clock_s"
                    >{time_s}</div>
                    <div
                        className="date_full"
                    >
                        <span>{get_full_date()[0]}</span>
                        <span>{get_full_date()[1]}</span>
                    </div>
                </div>
                <div
                    className="time_info_bottom"
                >
                    <div
                        className="calendar_top"
                    >
                        <span>{task_bar.y+"年"+task_bar.m+"月"}</span>
                        <div
                            className="calendar_ctl"
                        >
                            <button
                                onClick={click_dispatch}
                                data-action="CALENDAR_UP"
                                data-m={task_bar.m-1}
                                data-y={task_bar.y}
                            >-</button>
                            <button
                                onClick={click_dispatch}
                                data-action="CALENDAR_DOWN"
                                data-m={task_bar.m+1}
                                data-y={task_bar.y}
                            >+</button>
                        </div>
                    </div>
                    <div
                        className="calendar_container"
                    >
                        <div
                            className="week"
                        >
                            <ul>
                                <li>一</li>
                                <li>二</li>
                                <li>三</li>
                                <li>四</li>
                                <li>五</li>
                                <li>六</li>
                                <li>日</li>
                            </ul>
                        </div>
                        <div
                            className="calendar"
                        >
                            <ul
                                className="calendar_body calendar_item_border"
                                onClick={click_dispatch}
                                onMouseMove={calendar_move}
                            >
                                {border_items}
                            </ul>
                            <ul
                                className="calendar_body calendat_days"
                            >{calendar}</ul>
                        </div>
                    </div>
                    <div
                        className="date_time_setting"
                    >日期和时间设置</div>
                </div>
            </div>
        </li>
    )

}

export {Time}
