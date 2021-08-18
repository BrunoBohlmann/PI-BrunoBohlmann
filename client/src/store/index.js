// Importamos redux en general
import { createStore, applyMiddleware} from "redux";
// thunk junto con applyMiddleware sirven para funciones async (va dentro del middleware)
import thunk from "redux-thunk";
// Para poder usar devtools
import { composeWithDevTools } from 'redux-devtools-extension';

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// importamos el reducer con otro nombre
import rootReducer from "../reducers/index";


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;