import {TypedUseSelectorHook, useSelector} from "react-redux";
import {IRoot} from "../store/reducer";


export const useTypedSelector: TypedUseSelectorHook<IRoot> = useSelector;