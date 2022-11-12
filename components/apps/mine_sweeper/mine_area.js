import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";



const Mine_area = () => {

    const dispatch = useDispatch();
    const ms = useSelector(state => state.mine_sweeper);
    let map = ms.map;

    const canvasRef = useRef(null);

    const draw_num = (x, y, num, ctx) => {
        ctx.fillStyle = "#c0c0c0";
        ctx.fillRect(x * 22,y * 22, 22, 22);
        ctx.fillStyle = "#000000";
        ctx.fillText(num, 7 + x * 22, 14 + y * 22);
    }

    const open_empty = (col, row, ctx) => {
        let grid = map[row][col];
        if(grid.open) return;
        let x = col, y = row;
        if(grid.num != 0){
            draw_num(x, y, grid.num, ctx);
            grid.open = true;
            return;
        }
        else if(!grid.open){
            ctx.fillStyle = "#c0c0c0";
            ctx.fillRect(x * 22, y * 22, 22, 22);
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

    const init_grid = (x,y) => {
        const canvas_node = canvasRef.current;
        const context = canvas_node.getContext("2d");
        context.fillStyle = "#ffffff";
        context.fillRect(x * 22, y * 22, 22, 2);
        context.fillRect(x * 22, y * 22, 2, 22);

        context.fillStyle = "#c0c0c0";
        context.fillRect(2 + x * 22, 2 + y * 22, 18, 18);

        context.fillStyle = "#808080";
        context.fillRect(20 + x * 22, y * 22, 2, 22);
        context.fillRect(x * 22, 20 + y * 22, 22, 2);
    }

    const click_handle = (e) => {
        const canvas_node = canvasRef.current;
        const context = canvas_node.getContext("2d");
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

        let col = Math.floor(e.nativeEvent.layerX / 22), row = Math.floor(e.nativeEvent.layerY / 22);
        let x = col, y = row;
        let grid = map[row][col];
        
        if (grid.open || grid.context === 1) return;
        if(grid.num !== 0){
            draw_num(x, y, grid.num, context);
            grid.open = true;
        }
        else if(grid.mine){
            map.forEach((row,y) => {
                row.forEach((grid,x) => {
                    grid.context = 0;
                    if(grid.mine){
                        context.fillStyle = "#c0c0c0";
                        context.fillRect(x * 22, y * 22, 22, 22);

                        context.fillStyle = "#000000";
                        context.fillRect(7 + x * 22, 7 + y * 22, 8, 8);
                        context.fillRect(7 + x * 22, 7 + y * 22, 8, 8);
                    }
                });
            });
            context.fillStyle = "#ff0000";
            context.fillRect(4 + x * 22, 4 + y * 22, 14, 14);
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
        const canvas_node = canvasRef.current;
        const context = canvas_node.getContext("2d");
        let col = Math.floor(e.nativeEvent.layerX / 22), row = Math.floor(e.nativeEvent.layerY / 22);
        let x = col, y = row;
        let grid = map[row][col];
        if(grid.open) return;

        context.fillStyle = "#ffffff";
        context.fillRect(x * 22, y * 22, 22, 2);
        context.fillRect(x * 22, y * 22, 2, 22);

        context.fillStyle = "#c0c0c0";
        context.fillRect(2 + x * 22, 2 + y * 22, 18, 18);

        context.fillStyle = "#808080";
        context.fillRect(20 + x * 22, y * 22, 2, 22);
        context.fillRect(x * 22, 20 + y * 22, 22, 2);


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

        switch(grid.context){
            case 0: {
                break;
            }
            case 1: {
                context.fillText("🚩", 7 + x * 22, 14 + y * 22);
                if(grid.mine){
                    dispatch({
                        type: "MINE_RIGHT_INCRESMENT",
                    });  
                }
                break;
            }
            case 2: {
                context.fillStyle = "#000000";
                context.fillText("?", 7 + x * 22, 14 + y * 22);
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

    useEffect(() => {
        dispatch({
            type: "MINE_INIT",
        });
    }, []);//地图初始化
    useEffect(() => {
        const canvas_node = canvasRef.current;
        const context = canvas_node.getContext("2d");
        if(ms.right === ms.mine_num){
            dispatch({
                type: "MINE_SWEEPER_WIN",
            });
            map.forEach((row,y) => {
                row.forEach((grid,x) => {
                    if(grid.mine){
                        grid.context = 0;
                        init_grid(x,y);
                        context.fillStyle = "#000000";
                        context.fillRect(7 + x * 22, 7 + y * 22, 8, 8);
                        context.fillRect(7 + x * 22, 7 + y * 22, 8, 8);
                    }
                });
            });
        }
    }, [ms.right])
    useEffect(() => {
        map.forEach((row,y) => {
            row.forEach((grid, x) => {
                init_grid(x,y);

                // if(grid.mine){
                //     context.fillStyle = "#ffffff";
                //     context.fillRect(7 + x * 22, 7 + y * 22, 8, 8);
                //     context.fillRect(7 + x * 22, 7 + y * 22, 8, 8);
                // }
            })
        });
    }, [map]);
    
    return (
        <canvas
            className="mine_area_canvas"
            ref={canvasRef}
            width="198px"
            height="198px"
            onClick={ms.game_state === -1 ? null : click_handle}
            onContextMenu={ms.game_state === -1 ? null : context_click_handle}
        />
    )

}


export {Mine_area}
