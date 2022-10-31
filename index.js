import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './reducers';

import App from "./app.js"
import "./index.css"



const store = createStore(rootReducer);

//==============================================
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Provider store={store}><App /></Provider>)
