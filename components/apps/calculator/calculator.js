import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import "./calculator.css"

const Calculator = () => {
    const calculator = useSelector(state => state.calculator);
    const op_apps = useSelector(state => state.open_apps);
    const app = useSelector(state => state.app);
    const self = op_apps.apps.filter((app) => {
        return app["name"] === "CALCULATOR";
    })[0];
    const dispatch = useDispatch();
    

    const empty_handle = (e) => {
        const empty_action = [
			["MEM_","M_HIDE"],
            ["HISTORY_","HISTORY_HIDE"],
		]
        let action_type = "";
        try{action_type = e.target.dataset.action || "";}
        catch(err){}
        let action_type1 = getComputedStyle(e.target).getPropertyValue(
			"--prefix"
		);
		empty_action.forEach((action) => {
			if(!action_type.startsWith(action[0]) && !action_type1.startsWith(action[0])){
				dispatch({
					type:action[1],
				});
			}
		});
    }
    const dispatch_click = (e) => {
        empty_handle(e);
        const key = e.target;
        if(key.classList[0] === "key"){
            dispatch({
                type:key.dataset.action || "",
                payload:key.value || "",
            });
            return;
        }
        if(key.classList[0] === "ctl_key"){
            dispatch({
                type:key.dataset.action || "",
            });
            dispatch({
                type:key.dataset.g_action || "",
                payload:key.dataset.name || "",
            });
            if(key.classList[1] === "max"){
                let calc = key.closest(".calculator");
                if(calc.style.left !== "0px" || calc.style.top !== "0px"){
                    calc.style.left = 0 + "px";
                    calc.style.top = 0 + "px";
                }
                else{
                    calc.style.left = 450 + "px";
                    calc.style.top = 42 + "px";
                }
            }
            return;
        }
    }
    const drag_handle = (e,target) => {
        let x = e.pageX - target.dataset.offsetX;
        let y = e.pageY - target.dataset.offsetY;
        target.style.left = x + "px";
        target.style.top = y + "px";
    }
    useEffect(() => {
        if(self){
            if(self.get_key){
                let key = app.key_10[app.key_10.length - 1];
                if("0123456789".indexOf(key) >= 0){
                    dispatch({
                        type:"NUM",
                        payload:key,
                    });
                }
                if("+-*/".indexOf(key) >= 0){
                    let oper = ";"
                    switch(key){
                        case "+":{
                            oper = "add";
                            break;
                        }
                        case "-":{
                            oper = "sub";
                            break;
                        }
                        case "*":{
                            oper = "muti";
                            break;
                        }
                        case "/":{
                            oper = "division"
                            break;
                        }
                        default:
                            break;
                    }
                    dispatch({
                        type:"BI_OPER",
                        payload:oper,
                    });
                }
                if(key === "."){
                    dispatch({
                        type:"DOT",
                        payload:".",
                    });
                }
                if(key === "=" || key === "Enter"){
                    dispatch({
                        type:"EQUAL",
                        payload:"equal",
                    });
                }
                if(key === "Backspace"){
                    dispatch({
                        type:"BACK",
                        payload:"back",
                    });   
                }
            }
        }
    },[app.toggle])
    

    const memories = calculator.memory.map((mem,index) => {
        return (
            <li
                className="memory_item func_item"
                key={index}
            >
                <div>{mem}</div>
                <ul>
                    <li>
                        <button
                            className="key memory_box_M MC"
                            data-action="MC"
                        >MC</button>
                    </li>
                    <li>
                        <button
                            className="key memory_box_M M+"
                            data-action="M+"
                        >M+</button>
                    </li>
                    <li>
                        <button
                            className="key memory_box_M M-"
                            data-action="M-"
                        >M-</button>
                    </li>
                </ul>
            </li>
        )
    }).reverse();
    const history = calculator.history.map((his,index) => {
        his = his.split("=");
        return (
            <li
                className="history_item func_item"
                key={index}
            >
                <div
                    className="history_formula"
                >{his[0]+"="}</div>
                <div
                    className="history_result"
                >{his[1]}</div>
            </li>
        )
    }).reverse();

    
    return (
        <div
            className="calculator app"
            onClick={dispatch_click}
            data-hide={calculator.hide}
            data-max={calculator.max}
            data-top={self ? self.active : ""}
        >
            <div
                className="calculator_top_bar"
                onMouseDown={(e) => {
                    dispatch({
                        type:"TOP_MOUSE_DOWN",
                        app:"calculator",
                        payload:e,
                    });
                }}
                onMouseUp={() => {
                    dispatch({
                        type:"TOP_MOUSE_UP",
                        app:"calculator",
                    });
                }}
                onMouseOut={() => {
                    dispatch({
                        type:"TOP_MOUSE_UP",
                    });
                }}
                onMouseMove={op_apps.active_app === "calculator" ? (e) => {
                    drag_handle(e,e.target.closest(".calculator"));
                } : null}
            >
                <div>
                    <div className="calculator_icon">计算器</div>
                </div>
                <div>
                    <ul className="calculator_oper_bar">
                        <li
                            className="ctl_key min win_ctl"
                            data-action="CALCULATOR_CLOSE"
                            data-g_action="APP_MIN"
                            data-name="CALCULATOR"
                        >
                            -
                        </li>
                        <li
                            className="ctl_key max win_ctl"
                            data-action="CALCULATOR_MAX_TOGGLE"
                        >
                            口
                        </li>
                        <li
                            className="ctl_key close win_ctl"
                            data-action="CALCULATOR_CLOSE"
                            data-g_action="APP_CLOSE"
                            data-name="CALCULATOR"
                        >
                            X
                        </li>
                    </ul>
                </div>
            </div>
            <div
                className="percent_box"
            >
                <div
                    className="calculator_status_bar"
                >
                    <div className="calculator_status_bar_left">
                        <div>导航</div>
                        <div>标准</div>
                    </div>
                    <div
                        className="key calculator_history"
                        data-action="HISTORY_CALC_TOOGLE"
                    >历史</div>
                </div>
                <div
                    className="calculator_display_bar"
                >
                    <div
                        className="calc_formula"
                    >{calculator.formula}</div>
                    <div
                        className="calc_result"
                    >{calculator.curr_num}</div>
                </div>
                <div
                    className="calculator_memory_control_bar"
                >
                    <button
                        className="key MC"
                        data-action="MC"
                        disabled={!calculator.memory_box_using || !calculator.memory_box_hide}
                    >MC</button>
                    <button
                        className="key MR"
                        data-action="MR"
                        disabled={!calculator.memory_box_using || !calculator.memory_box_hide}
                    >MR</button>
                    <button
                        className="key M+"
                        data-action="M+"
                        disabled={!calculator.memory_box_hide}
                    >M+</button>
                    <button
                        className="key M-"
                        data-action="M-"
                        disabled={!calculator.memory_box_hide}
                    >M-</button>
                    <button
                        className="key MS"
                        data-action="MS"
                        disabled={!calculator.memory_box_hide}
                    >MS</button>
                    <button
                        className="key M⬇"
                        data-action="MEM_TOGGLE"
                        disabled={!calculator.memory_box_using}
                    >M⬇</button>
                    <div></div>
                </div>
                <div
                    className="calculator_keyboard"
                >
                    <div
                        className="calculator_memory_box calculator_func_box"
                        data-hide={calculator.memory_box_hide}
                        style={{ "--prefix": "MEM_BOX" }}
                    >
                        <ul
                            className="history_list func_list"
                        >
                            {memories.length === 0 ? 
                            "内存中没有内容" : 
                            memories}
                        </ul>  
                        <div className="memory_bottom_bar func_bottom_bar">
                            <button
                                className="key del_memory del_key"
                                data-action="DEL_MEMORY"
                                data-show={!(memories.length === 0)}
                            >删除</button>
                        </div>
                    </div>
                    <div
                        className="calculator_history_box calculator_func_box"
                        data-hide={calculator.history_box_hide}
                        style={{ "--prefix": "HISTORY_CALC" }}
                    >
                        <ul
                            className="history_list func_list"
                        >
                            {history.length === 0 ? 
                            "尚无历史记录" : 
                            history}
                        </ul>
                        <div className="history_bottom_bar func_bottom_bar">
                            <button
                                className="key del_history del_key"
                                data-action="DEL_HISTORY"
                                data-show={!(history.length === 0)}
                            >删除</button>
                        </div>
                    </div>
                    <button
                        className="key oper mod"
                        value="mod"
                        data-action="UNARY_OPER"
                    >%</button>
                    <button
                        className="key oper CE"
                        value="CE"
                        data-action="CE"
                    >CE</button>
                    <button
                        className="key oper C"
                        value="C"
                        data-action="C"
                    >C</button>
                    <button
                        className="key oper back"
                        value="back"
                        data-action="BACK"
                    >back</button>
                    <button
                        className="key oper root"
                        value="root"
                        data-action="UNARY_OPER"
                    >√</button>
                    <button
                        className="key oper square"
                        value="square"
                        data-action="UNARY_OPER"
                    >x²</button>
                    <button
                        className="key oper inverse"
                        value="inverse"
                        data-action="UNARY_OPER"
                    >1/x</button>
                    <button
                        className="key oper division"
                        value="division"
                        data-action="BI_OPER"
                    >÷</button>
                    <button
                        className="key num nine"
                        value="7"
                        data-action="NUM"
                    >7</button>
                    <button
                        className="key num nine"
                        value="8"
                        data-action="NUM"
                    >8</button>
                    <button
                        className="key num nine"
                        value="9"
                        data-action="NUM"
                    >9</button>
                    <button
                        className="key oper muti"
                        value="muti"
                        data-action="BI_OPER"
                    >×</button>
                    <button
                        className="key num nine"
                        value="4"
                        data-action="NUM"
                    >4</button>
                    <button
                        className="key num nine"
                        value="5"
                        data-action="NUM"
                    >5</button>
                    <button
                        className="key num nine"
                        value="6"
                        data-action="NUM"
                    >6</button>
                    <button
                        className="key oper sub"
                        value="sub"
                        data-action="BI_OPER"
                    >-</button>
                    <button
                        className="key num nine"
                        value="1"
                        data-action="NUM"
                    >1</button>
                    <button
                        className="key num nine"
                        value="2"
                        data-action="NUM"
                    >2</button>
                    <button
                        className="key num nine"
                        value="3"
                        data-action="NUM"
                    >3</button>
                    <button
                        className="key oper add"
                        value="add"
                        data-action="BI_OPER"
                    >+</button>
                    <button
                        className="key oper pos_neg nine"
                        value="pos_neg"
                        data-action="UNARY_OPER"
                    >±</button>
                    <button
                        className="key num nine"
                        value="0"
                        data-action="NUM"
                    >0</button>
                    <button
                        className="key oper dot nine"
                        value="."
                        data-action="DOT"
                    >.</button>
                    <button
                        className="key oper equal"
                        value="equal"
                        data-action="EQUAL"
                    >=</button>
                </div>
            </div>
        </div>
    )
}

export {Calculator}
