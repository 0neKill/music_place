import {Context, createWrapper, MakeStore} from "next-redux-wrapper";
import {AnyAction, applyMiddleware, createStore} from "redux";
import rootReducer, {IRoot} from "./reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";


const makeStore: MakeStore<IRoot>
    = (context: Context) => createStore(rootReducer, applyMiddleware(thunk));

// export an assembled wrapper

export const wrapper = createWrapper<IRoot>(makeStore, {debug: true});

export type NextThunkDispatch = ThunkDispatch<IRoot, void, AnyAction>