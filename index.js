import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './reducers';

import App from "./app.js"
import "./index.css"

Array.prototype.my_forEach = function(fn){
    for(let i = 0; i < this.length; i++){
        fn(this[i], i, this);
    }
}

const store = createStore(rootReducer);

//==============================================
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Provider store={store}><App /></Provider>)
