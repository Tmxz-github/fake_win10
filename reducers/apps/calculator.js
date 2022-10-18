/*
    0:输入第一个数
    1:正在输入二元符号
    2:输入第二个数
    3:输入了等号
    -1:第一个数进行了一元运算
    -2:第二个数进行了一元运算
    -3:内存调用第一个数
    -4:内存调用第二个数
*/
const df_state = {
    type:"stander",
    hide:true,
    calc_state:0,   //计算器状态
    first_num:"",   //输入的第一个数，被操作数
    second_num:"",  //数日的第二个数，操作数
    curr_num:"0",   //显示的数字
    last_oper:"",   //上一个操作符
    curr_oper:"",   //当前输入的操作符
    formula:"",     //输入的式子
    last_formula:"",//上一个式子
    result:"",      //运算结果
    unary_char:"",  //一元运算用字符串
    muti_oper:false,//连续输入二元操作符？
    is_float:false, //输入的是否是小数

    memory:[],      //存放数字的内存
    memory_box_hide:true,//内存盒展开？
    memory_box_using:false,//内存在使用？

    history:[],     //历史记录
    history_box_hide:true,
    history_clear:false,

    mouse_down:false,//鼠标在顶栏开始拖动？
    offsetX:0,
    offsetY:0,

    max:false,
}

function UNARY_OPER(oper,num){
    num = PARSE(num);
    switch(oper){
        case "root":
            return Math.sqrt(num);
        case "square":
            return Math.pow(num,2);
        case "inverse":
            if(num === 0){
                return "除数不能为0";
            }
            return 1/num;
        case "pos_neg":
            return -num;
        default:
            return num;
    }
}
function UNARY_CHAR(oper,num){
    switch(oper){
        case "root":
            return "√("+num+")";
        case "square":
            return "sqr("+num+")";
        case "inverse":
            if(num === "") num = "0";
            return "1/("+num+")";
        case "pos_neg":
            return "negate("+num+")";
        default:
            return num;
    }
}
function CALC(first_num,second_num,oper){
    first_num = PARSE(first_num);
    second_num = PARSE(second_num);
    switch(oper){
        case "add":
            return first_num + second_num;
        case "sub":
            return first_num - second_num;
        case "division":
            if(second_num === 0){
                return "除数不能为0";
            }
            return first_num / second_num;
        case "muti":
            return first_num * second_num;
        default: return first_num;
    }
}
function CALC_CHAR(oper){
    switch(oper){
        case "add":
            return "+";
        case "sub":
            return "-";
        case "division":
            return "÷";
        case "muti":
            return "×";
        default: return " ";
    }
}
function PARSE(num){
    if(num === "") num = "0";
    return parseFloat(num);
}

const calculator = (state = df_state, action) => {
    const calc = {
        ...state,
    }
    switch(action.type){
        case "CALCULATOR_MAX_TOGGLE":{
            calc.max = !calc.max;
            return calc;
        }
        case "CALCULATOR_TOGGLE":{
            calc.hide = !calc.hide;
            return calc;
        }
        case "CALCULATOR_OPEN":{
            calc.hide = false;
            return calc;
        }
        case "CALCULATOR_CLOSE":{
            calc.hide = true;
            return calc;
        }
        case "NUM":{
            switch(calc.calc_state){
                case -3:{
                    calc.first_num = "";
                    calc.calc_state = 0;
                    break;
                }
                case -4:{
                    calc.second_num = "";
                    calc.calc_state = 2;
                    break;
                }
                case 3:{
                    for(let arr in df_state){
                        calc[arr] = df_state[arr];
                    }
                    calc.hide = false;
                    break;
                }
                default: break;
            }
            switch(calc.calc_state){
                case -1:{//1square1
                    calc.first_num = "";
                    calc.formula = "";
                    calc.calc_state = 0;
                    return calc;
                }
                case -2:{//1+2square1
                    calc.second_num = "";
                    calc.formula = calc.last_formula;
                    calc.calc_state = 2;
                    return calc;
                }
                case 0:{//1
                    if(calc.first_num === "0") calc.first_num = action.payload;
                    else calc.first_num += action.payload;
                    calc.result = calc.first_num;
                    calc.curr_num = calc.first_num;
                    calc.calc_state = 0;
                    return calc;
                }
                case 1:
                case 2:{//1+2
                    calc.calc_state = 2;
                    if(calc.second_num === "0") calc.second_num = action.payload;
                    else calc.second_num += action.payload;
                    calc.curr_num = calc.second_num;
                    return calc;
                }
                default: return calc;
            }
        }
        case "BI_OPER":{
            calc.is_float = false;
            if(calc.first_num === ""){//+
                calc.first_num = "0";
            }
            if(calc.curr_oper !== ""){//1+2-
                calc.muti_oper = true;
            }
            if(calc.muti_oper){//1+2-
                calc.last_oper = calc.curr_oper;
            }
            if(calc.first_num !== "" && calc.second_num !== ""){//1+2-
                calc.result = calc.curr_num = CALC(calc.result,calc.second_num,calc.last_oper);
                if(calc.result === "除数不能为0"){
                    return {
                        ...df_state,
                        hide:calc.hide,
                        curr_num:"除数不能为0",
                        calc_state:0,
                    }
                }
            }
            calc.curr_oper = action.payload;
            calc.first_num = calc.curr_num;
            calc.formula = calc.formula === "" ? 
                                        calc.first_num+"" + CALC_CHAR(action.payload) : 
                                        calc.first_num + CALC_CHAR(action.payload);
                                        // calc.first_num + calc.second_num+"" + CALC_CHAR(action.payload);
            calc.second_num = "";
            calc.calc_state = 1;
            return calc;
        }
        case "UNARY_OPER":{
            calc.is_float = false;
            switch(calc.calc_state){
                case 3:{//1+2=square
                    calc.unary_char = UNARY_CHAR(action.payload,calc.first_num);
                    calc.first_num = UNARY_OPER(action.payload,calc.first_num);
                    calc.last_formula = calc.formula;
                    calc.formula = "";
                    calc.formula += calc.unary_char;
                    calc.result = calc.curr_num = calc.first_num;
                    calc.second_num = "";
                    calc.calc_state = -1;
                    return calc;
                }
                case 0:{//1square
                    calc.unary_char = UNARY_CHAR(action.payload,calc.first_num);
                    calc.first_num = UNARY_OPER(action.payload,calc.first_num);
                    calc.last_formula = calc.formula;
                    calc.formula += calc.unary_char;
                    calc.result = calc.curr_num = calc.first_num;
                    calc.second_num = "";
                    calc.calc_state = -1;
                    return calc;
                }
                case 2:{//1+2square
                    calc.unary_char = UNARY_CHAR(action.payload,calc.second_num);
                    calc.second_num = UNARY_OPER(action.payload,calc.second_num);
                    calc.last_formula = calc.formula;
                    calc.formula += calc.unary_char;
                    calc.curr_num = calc.second_num;
                    calc.calc_state = -2;
                    return calc;
                }
                case -1:{//1square square
                    calc.unary_char = UNARY_CHAR(action.payload,calc.unary_char);
                    calc.first_num = UNARY_OPER(action.payload,calc.first_num);
                    calc.formula = calc.last_formula + calc.unary_char;
                    calc.result = calc.curr_num = calc.first_num;
                    return calc;
                }
                case -2:{//1+2square square
                    calc.unary_char = UNARY_CHAR(action.payload,calc.first_num);
                    calc.second_num = UNARY_OPER(action.payload,calc.first_num);
                    calc.last_formula = calc.formula;
                    calc.formula += calc.unary_char;
                    calc.curr_num = calc.second_num;
                    calc.calc_state = -2;
                    return calc;
                }
                default: return calc
            }
        }
        case "EQUAL":{
            calc.is_float = false;
            calc.result = calc.curr_num = CALC(calc.result,calc.second_num,calc.curr_oper);
            if(calc.result === "除数不能为0"){
                return {
                    ...df_state,
                    hide:calc.hide,
                    curr_num:"除数不能为0",
                    calc_state:0,
                }
            }
            calc.first_num = calc.first_num === "" ? "0" : calc.first_num;
            calc.formula = calc.formula === "" ? calc.first_num + CALC_CHAR(calc.last_oper) 
                                                : calc.first_num + CALC_CHAR(calc.curr_oper) + calc.second_num + "=";
            // calc.formula = calc.formula === "" ? calc.first_num + CALC_CHAR(calc.last_oper) : calc.formula;
            if(calc.history_clear) calc.history = [];
            calc.history.push(calc.formula + calc.result);
            calc.history_clear = false;
            // calc.formula = "";
            calc.first_num = calc.curr_num;
            calc.calc_state = 3;
            return calc;
        }
        case "DOT":{
            switch(calc.calc_state){
                case 0:{//1.
                    if(!calc.is_float){
                        if(calc.first_num === "") calc.first_num = "0";
                        calc.first_num += action.payload;
                        calc.result = calc.curr_num = calc.first_num;
                        calc.is_float = true;
                        return calc;
                    }
                    return calc;
                }
                case 1:
                case 2:{//1+. 1+2.
                    if(!calc.is_float){
                        if(calc.second_num === "") calc.second_num = "0";
                        calc.second_num += action.payload;
                        calc.curr_num = calc.first_num;
                        calc.is_float = true;
                        return calc;
                    }
                    return calc;
                }
                case 3:{//1+2=.
                    calc.first_num = "0";
                    calc.first_num += action.payload;
                    calc.result = calc.curr_num = calc.first_num;
                    calc.is_float = true;
                    calc.calc_state = 0;
                    return calc;
                }
                default: return calc;
            }
        }
        case "BACK":{
            switch(calc.calc_state){
                case 0:{
                    if(calc.first_num.endsWith(".")){
                        calc.is_float = false;
                    }
                    calc.first_num = calc.first_num.slice(0,calc.first_num.length - 1);
                    if(calc.first_num === "") calc.first_num = "0";
                    calc.result = calc.curr_num = calc.first_num;
                    return calc;
                }
                case 2:{
                    if(calc.second_num.endsWith(".")){
                        calc.is_float = false;
                    }
                    calc.second_num = calc.second_num.slice(0,calc.second_num.length - 1);
                    if(calc.second_num === "") calc.second_num = "0";
                    calc.curr_num = calc.second_num;
                    return calc;
                }
                default: return calc;
            }
        }
        case "CE":{
            calc.is_float = false;
            calc.curr_num = calc.second_num = "0";
            return calc;
        }
        case "C":{
            return {
                ...df_state,
                hide:calc.hide,
                memory:calc.memory,
                memory_box_using:calc.memory_box_using,
            };
        }
        case "MS":{
            calc.memory.push(calc.curr_num);
            calc.memory_box_using = true;
            calc.calc_state = -3;
            return calc;
        }
        case "MEM_TOGGLE":{
            calc.memory_box_hide = !calc.memory_box_hide;
            return calc;
        }
        case "M_HIDE":{
            calc.memory_box_hide = true;
            return calc;
        }
        case "MC":{
            calc.memory = [];
            calc.memory_box_using = false;
            return calc;
        }
        case "DEL_MEMORY":{
            calc.memory = [];
            calc.memory_box_using = false;
            return calc;
        }
        case "MR":{
            calc.curr_num = calc.memory[calc.memory.length - 1];
            switch(calc.calc_state){
                case -1:
                case 0:
                case 3:{
                    calc.result = calc.first_num = calc.curr_num;
                    // calc.formula = calc.last_formula;
                    calc.calc_state = -3;
                    return calc;
                }
                case -2:
                case 1:
                case 2:{
                    calc.second_num = calc.curr_num;
                    // calc.formula = calc.last_formula;
                    calc.calc_state = -4;
                    return calc;
                }
                case -3:
                case -4:
                default:
                    return calc;
            }
        }
        case "M+":{
            calc.memory_box_using = true;
            calc.memory[calc.memory.length - 1] = CALC(calc.memory[calc.memory.length - 1],calc.curr_num,"add");
            return calc;
        }
        case "M-":{
            calc.memory_box_using = true;
            calc.memory[calc.memory.length - 1] = CALC(calc.memory[calc.memory.length - 1],calc.curr_num,"sub");
            return calc;
        }
        case "HISTORY_CALC_TOOGLE":{
            calc.history_box_hide = !calc.history_box_hide;
            return calc;
        }
        case "HISTORY_HIDE":{
            calc.history_box_hide = true;
            return calc;
        }
        case "DEL_HISTORY":{
            calc.history = [];
            calc.history_clear = true;
            return calc;
        }
        default:
            return state;
    }
}


export {calculator}
