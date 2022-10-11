import { useSelector, useDispatch } from "react-redux";
import "./context_menu.css"

const Context_menu = () => {
    
	const context_menu = useSelector(state => state.context_menu);
    const dispatch = useDispatch();

    const dispatch_click = (e) => {
        const action = e.target.closest(".context_menu_key").dataset.action || "";
        dispatch({
            type:action
        });
    }

    return (
        <div
            className="context_menu"
            data-hide={context_menu.hide}
            data-action="CONTEXT"
            style={{
                "--prefix":"CONTEXT",
                top:context_menu.Y > document.body.clientHeight - 208 ? (context_menu.Y - 208)+"px" : context_menu.Y+"px",
                left:context_menu.X > document.body.clientWidth - 192 ? document.body.clientWidth - 192 : context_menu.X+"px",
            }}shuax
        >
            <ul>
                <li>
                    <span>查看</span>
                    <span>{">"}</span>
                </li>
                <li>
                    <span>
                        排序方式
                    </span>
                    <span>{">"}</span>
                </li>
                <li
                    className="context_menu_key refresh"
                    data-action="REFRESH"
                    onClick={dispatch_click}
                >
                    <span>刷新</span>
                </li>
            </ul>
            <ul>
                <li>
                    <span>粘贴</span>
                </li>
                <li>
                    <span>粘贴快捷方式</span>
                </li>
            </ul>
            <ul>
                <li>
                    <span>新建</span>
                    <span>{">"}</span>
                </li>
            </ul>
            <ul>
                <li>
                    <span>显示设置</span>
                </li>
                <li>
                    <span>个性化</span>
                </li>
            </ul>
        </div>
    )
}

export {Context_menu}