import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import "./time.css"

const Time = () => {

    const task_bar = useSelector(state => state.task_bar);
    const char_num = ["零","一","二","三","四","五",
                      "六","七","八","九","十",
                      "十一","十二","十三","十四","十五",
                      "十六","十七","十八","十九","二十",
                      "二十一","二十二","二十三","二十四","二十五",
                      "二十六","二十七","二十七","二十八","二十九","三十","三十一"]
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
        const date = new Date();
        const y = date.getFullYear();
        const m = date.getMonth()+1;
        const d = date.getDate();
        let f = y+"年"+m+"月"+d+"日";
        const M = char_num[m];
        const D = char_num[d];
        let s = M+"月"+D;
        return [f,s];
    }
    let d = date.getDate();
    let w = date.getDay();
    d = 16;
    w = 7;
    let array_42 = [];
    let cjt = Math.ceil(d/7)*7 - d;
    let week_day = (w+cjt+1) > 7 ? (w+cjt+1) % 7 : (w+cjt+1);
    // console.log(week_day);

    useEffect(() => {
        const date = new Date();
        setTimeout(() => {
            set_time_s(date.toLocaleTimeString("zh-cn",{
                hour12:false,
            }));
        }, 1000);
    },[time_s])

    return (
        
        <li
        className="time task_hover task"
        data-action="FUNCS_INFO_TOOGLE"
        >
            <div
                className="clock_m"
                data-action="FUNCS_INFO_TOOGLE"
            >{get_time()}</div>
            <div
                className="date"
                data-action="FUNCS_INFO_TOOGLE"
            >{get_date()}</div>
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
                        <span>2020</span>
                        <div
                            className="calendar_ctl"
                        >
                            <button>xia</button>
                            <button>shang</button>
                        </div>
                    </div>
                    <div
                        className="calendar"
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
