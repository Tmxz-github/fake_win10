import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
// import allActions from './actions'

import {
	Task_bar,
	Desk,
	Draw,
	Start_menu,
	Calculator,
	Context_menu,
	Widget
} from './components/index';

const App = () => {
	const dispatch = useDispatch();
	const op_apps = useSelector(state => state.open_apps);
	const canvas = useSelector(state => state.canvas);

	const click_empty = (e) => {
		if(!e) return;
		const empty_action = [
			["START","START_HIDE"],
			["SIDE","SIDE_HIDE"],
			["SIDE_POWER","POWER_SIDE_HIDE"],
			["SIDE_USER","USER_SIDE_HIDE"],
			["CONTEXT","CLOSE_CONTEXT_MENU"],
			["FUNCS_INFO","CLOSE_FUNCS_INFO_MENU"],
		]
		let action_type = "";
		try{
			action_type = e.target.dataset.action || "";
		}catch(err){}

		let action_type1 = getComputedStyle(e.target).getPropertyValue(
			"--prefix"
		);
		empty_action.forEach((action,i) => {
			if(!action_type.startsWith(action[0]) && !action_type1.startsWith(action[0])){
				dispatch({
					type:action[1],
				});
			}
		});

		if(e.target.dataset.action != "APP_OPEN"){
			dispatch({
				type:"SELECT",
				payload:"",
			});
		}
		else{
			dispatch({
				type:"SELECT",
				payload:e.target.dataset.name,
			});
		}
	}
	const to_top = (e) => {
		if(e.target.closest(".app")){
			let name = e.target.closest(".app").classList[0].toUpperCase();
			op_apps.apps.forEach((app) => {
				if(app.name === name){
					dispatch({
						type:"TO_TOP",
						payload:name,
					})
				}
			})
		}
	}
	const handle_context_menu = (e) => {
		e.preventDefault();
		click_empty(e);
		if(getComputedStyle(e.target).getPropertyValue("--prefix") === "CONTEXT") return;
		if(e.target.classList[0] != "desk" && e.target.classList[0] != "desk_icons"){
			dispatch({
				type:"CLOSE_CONTEXT_MENU",
				payload:e,
			});
		}
		else{
			dispatch({
				type:"OPEN_CONTEXT_MENU",
				payload:e,
			});
		}
	}
	const dispatch_dbclick = (e) => {
		if(e.target.dataset.action != "APP_OPEN") return;
        dispatch({
            type:"TO_TOP",
            payload:e.target.dataset.name,
        });
        dispatch({
            type:e.target.dataset.name+"_OPEN",
        });
        dispatch({
            type:e.target.dataset.action,
            payload:e.target.dataset.name,
        });
	}
	const keyboard_handle = (e) => {
		dispatch({
			type: "KEY_DOWN",
			payload: e.key,
		});
	}

	window.onclick = click_empty;
	window.oncontextmenu = handle_context_menu;
	window.onmousedown = to_top;
	window.ondblclick = dispatch_dbclick;
	window.onkeydown = keyboard_handle;

	return (
		<div
			className="screen"
			onMouseMove={canvas.extending ? (e) => {
				dispatch({
					type:"EXTENDING",
					payload:e,
				})
			} : null}
			onMouseUp={canvas.extending ? (e) => {
				dispatch({
					type:"CANCLE_CANVAS_EXTEND",
					payload:e,
				})
			} : null}
		>
			<Desk />
			<Widget
				app="widget"
			/>
			<Calculator />
			<Draw />
			<Task_bar />
			<Start_menu />
			<Context_menu />
		</div>
	)
}

export default App
