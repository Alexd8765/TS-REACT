import { useReducer } from "react"
import { Sub } from "../types"

interface FormState {
    inputValues: Sub
}


type FormReducerAction= {
    type: "change_value"
    payload: {
        inputName: string
        inputValue: string
    }
} | {
    type: "clear"
}

const formReducer = (state: FormState["inputValues"], action: FormReducerAction) => {
    switch (action.type) {
        case "change_value":
            const {inputName, inputValue} = action.payload
            return {
                ...state,
                [inputName]: inputValue
            }
            case "clear":
                return INITIAL_STATE
    }
}

const INITIAL_STATE: FormState["inputValues"] = {
    nick: '',
    subMonths: 0, // Asegúrate de que subMonths sea una cadena, ya que el valor se extrae de un input de tipo "text"
    avatar: '',
    description: '',
    gender: ''
}
const useNewSubForm = () => {
    return useReducer(formReducer,INITIAL_STATE)
}


export default useNewSubForm 