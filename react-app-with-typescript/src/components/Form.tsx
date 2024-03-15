import React, { useState, ChangeEvent } from 'react';
import { Sub } from "../types";
import useNewSubForm from "../hook/useNewSubForm";

interface FormProps {
    onNewSub: (newSub: Sub) => void;
}

const Form = ({ onNewSub }: FormProps) => {
    const [inputValues, dispatch] = useNewSubForm();
    const [acceptPrivacy, setAcceptPrivacy] = useState(false);
    const [gender, setGender] = useState<string>('');

    const handleSubmit = (evt: React.ChangeEvent<HTMLFormElement>) => {
        evt.preventDefault();
        if (acceptPrivacy) {
            // Agregar el campo gender al objeto inputValues antes de llamar a onNewSub
            const newSubWithGender: Sub = { ...inputValues, gender };
            onNewSub(newSubWithGender);
            handleClear();
        } else {
            alert("Debes aceptar la Política de Privacidad para continuar.");
        }
    }

    const handleChange = (evt: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = evt.target as HTMLInputElement | HTMLTextAreaElement; // Asegúrate de que el tipo sea compatible


        // Si el campo es 'gender', establecer el valor de género
        if (name === 'gender') {
            setGender(value);
        } else {
            dispatch({
                type: "change_value",
                payload: {
                    inputName: name,
                    inputValue: value
                }
            });
        }
    }

    const handleClear = () => {
        dispatch({ type: "clear" });
        setGender('');
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} value={inputValues.nick} type="text" name="nick" placeholder="nick" />
                <input onChange={handleChange} value={inputValues.subMonths} type="number" name="subMonths" placeholder="avatar" />
                <textarea onChange={handleChange} value={inputValues.description} name="description" placeholder="description" />
                <input type="checkbox" checked={acceptPrivacy} onChange={() => setAcceptPrivacy(!acceptPrivacy)} />Acepta Política de Privacidad <br />
                <select name="gender" onChange={handleChange} required> {/* Agregar un campo select para seleccionar el género */}
                    <option value="">Selecciona</option>
                    <option value="Hombre">Hombre</option>
                    <option value="Mujer">Mujer</option>
                </select>
                {/* Mostrar la imagen correspondiente al género seleccionado */}
                {gender === 'Hombre' && (
                    <img src="https://img.freepik.com/vector-gratis/avatar-personaje-empresario-aislado_24877-60111.jpg" alt="Avatar de Hombre" />
                )}
                {gender === 'Mujer' && (
                    <img src="https://previews.123rf.com/images/yupiramos/yupiramos1709/yupiramos170910660/85494557-avatar-mujer-retrato-de-la-mujer-ilustraci%C3%B3n-imagen-del-vector.jpg" alt="Avatar de Mujer" />
                )}
                <div className="form-buttons">
                    <button onClick={handleClear} type="button">Limpiar formulario</button>
                    <button type="submit">Guardar nuevo suscriptor</button>
                </div>
            </form>
        </div>
    )
}

export default Form;
