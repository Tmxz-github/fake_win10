import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";



const Mine_area = () => {

    const dispatch = useDispatch();
    const ms = useSelector(state => state.mine_sweeper);
    let map = ms.map;

    const canvasRef = useRef(null);

    const draw_num = (x, y, num, ctx) => {
        ctx.fillStyle = "#c0c0c0";
        ctx.fillRect(x * 22.2,y * 22.2, 22, 22);
        ctx.fillStyle = "#000000";
        ctx.fillText(num, 7 + x * 22.2, 14 + y * 22.2);
    }

    const open_empty = (col, row, ctx) => {
        let grid = map[row][col];
        if(grid.open) return;
        let x = col, y = row;
        // debugger
        if(grid.num != 0){
            draw_num(x, y, grid.num, ctx);
            grid.open = true;
            return;
        }
        else if(!grid.open){
            ctx.fillStyle = "#c0c0c0";
            ctx.fillRect(x * 22.2, y * 22.2, 22, 22);
            grid.open = true;
        }
        
        try{
            if(map[row][col - 1]) open_empty(col - 1, row, ctx);
        } catch(err){}//左
        try{
            if(map[row][col + 1]) open_empty(col + 1, row, ctx);
        } catch(err){}//右
        try{
            if (map[row + 1][col]) open_empty(col, row + 1, ctx);
        }catch(err){}//下
        try{
            if (map[row - 1][col]) open_empty(col, row - 1, ctx);
        }catch(err){}//上

        return;
    }

    const click_handle = (e) => {
        if(ms.game_state === 0){
            dispatch({
                type: "MINE_SWEEPER_START",
            });
        }
        if(ms.game_state === 2){
            dispatch({
                type: "MINE_INIT",
            });
            return;
        }

        const context = e.target.getContext("2d");
        let col = Math.floor(e.nativeEvent.layerX / 22), row = Math.floor(e.nativeEvent.layerY / 22);
        let x = col, y = row;
        let grid = map[row][col];
        
        if (grid.open || grid.context === 1) return;
        if(grid.num !== 0){
            draw_num(x, y, grid.num, context);
            grid.open = true;
        }
        else if(grid.mine){
            context.fillStyle = "#c0c0c0";
            context.fillRect(x * 22.2, y * 22.2, 22, 22);
            context.fillStyle = "#000000";
            context.fillRect(8 + x * 22.2, 8 + y * 22.2, 6, 6);
            grid.open = true;
            dispatch({
                type: "MINE",
            });
            return;
        }
        else{
            open_empty(col, row, context);
        }
    }
    const context_click_handle = (e) => {
        const ctx = e.target.getContext("2d");
        let col = Math.floor(e.nativeEvent.layerX / 22), row = Math.floor(e.nativeEvent.layerY / 22);
        let x = col, y = row;
        let grid = map[row][col];
        if(grid.open) return;

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(x * 22.2, y * 22.2, 22.2, 2);
        ctx.fillRect(x * 22.2, y * 22.2, 2, 22.2);

        ctx.fillStyle = "#c0c0c0";
        ctx.fillRect(2 + x * 22.2, 2 + y * 22.2, 18, 18);

        ctx.fillStyle = "#808080";
        ctx.fillRect(20 + x * 22.2, y * 22.2, 2, 22.2);
        ctx.fillRect(x * 22.2, 20 + y * 22.2, 22.2, 2);


        if(grid.context === 0) {
            dispatch({
                type: "MINE_FLAGS_INCRESMENT",
            });
            grid.context = 1;
        }
        else if(grid.context === 1) {
            dispatch({
                type: "MINE_FLAGS_DECRESMENT",
            });
            grid.context = 2;
        }
        else if(grid.context === 2) {
            grid.context = 0;
        }
        // grid.context = grid.context + 1 > 2 ? 0 : grid.context + 1;

        switch(grid.context){
            case 0: {
                break;
            }
            case 1: {
                // ctx.fillStyle = "#cc0000";
                ctx.fillText("🚩", 7 + x * 22.2, 14 + y * 22.2);
                if(grid.mine){
                    dispatch({
                        type: "MINE_RIGHT_INCRESMENT",
                    });  
                }
                break;
            }
            case 2: {
                ctx.fillStyle = "#000000";
                ctx.fillText("?", 7 + x * 22.2, 14 + y * 22.2);
                if(grid.mine){
                    dispatch({
                        type: "MINE_RIGHT_DECRESMENT",
                    });  
                }
                break;
            }
            default: {
                break;
            }
        }
    }

    const draw = (ctx) => {
    }
    

    useEffect(() => {
        dispatch({
            type: "MINE_INIT",
        });
    }, []);//地图初始化
    useEffect(() => {
        if(ms.right === ms.mine_num){
            dispatch({
                type: "MINE_SWEEPER_WIN",
            });
        }
    }, [ms.right])
    useEffect(() => {
        const canvas_node = canvasRef.current;
        const context = canvas_node.getContext("2d");
        map.my_forEach((row,y) => {
            row.my_forEach((grid, x) => {
                context.fillStyle = "#ffffff";
                context.fillRect(x * 22.2, y * 22.2, 22.2, 2);
                context.fillRect(x * 22.2, y * 22.2, 2, 22.2);

                context.fillStyle = "#c0c0c0";
                context.fillRect(2 + x * 22.2, 2 + y * 22.2, 18, 18);

                context.fillStyle = "#808080";
                context.fillRect(20 + x * 22.2, y * 22.2, 2, 22.2);
                context.fillRect(x * 22.2, 20 + y * 22.2, 22.2, 2);

                if(grid.mine) {
                    context.fillStyle = "#000000";
                    context.fillRect(7 + x * 22.2, 7 + y * 22.2, 8, 8);
                    context.fillRect(7 + x * 22.2, 7 + y * 22.2, 8, 8);
                }
            })
        });
    }, [map]);
    
    return (
        <canvas
            className="mine_area_canvas"
            ref={canvasRef}
            width="200px"
            height="200px"
            onClick={ms.game_state === -1 ? null : click_handle}
            onContextMenu={ms.game_state === -1 ? null : context_click_handle}
        />
    )

}


export {Mine_area}
