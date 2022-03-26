import { combineReducers } from "redux";
import user from './user/reducers';
import global from './global/reducers';
import product from './products/reducers';
import order from './orders/reducers';

export default combineReducers({ user, global, product, order });