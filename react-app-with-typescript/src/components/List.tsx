import React from 'react';
import { Sub } from "../types";

interface Props {
    subs: Sub[];
    onDelete: (nick: string) => void;
}

const List = ({ subs, onDelete }: Props) => {
    const renderAvatar = (gender: string) => {
        if (gender === 'Hombre') {
            return 'https://img.freepik.com/vector-gratis/avatar-personaje-empresario-aislado_24877-60111.jpg'; // URL de la imagen para Hombre
        } else if (gender === 'Mujer') {
            return 'https://previews.123rf.com/images/yupiramos/yupiramos1709/yupiramos170910660/85494557-avatar-mujer-retrato-de-la-mujer-ilustraci%C3%B3n-imagen-del-vector.jpg'; // URL de la imagen para Mujer
        } else {
            return 'URL_POR_DEFECTO_SI_EL_GÉNERO_NO_ESTÁ_ESPECIFICADO'; // URL de una imagen por defecto o un placeholder si el género no está especificado
        }
    };

    const handleDeleteSub = (nick: string) => {
        onDelete(nick);
    };

    const renderList = (): JSX.Element[] => {
        return subs.map(sub => {
            return (
                <li key={sub.nick}>
                    <h3 onClick={() => handleDeleteSub(sub.nick)}>X</h3>
                    <img src={sub.avatar || renderAvatar(sub.gender)} alt={`Avatar for ${sub.nick}`} />
                    <h4>{sub.nick} (<small>{sub.subMonths}</small>)</h4>
                    <p>{sub.description?.substring(0, 100)}</p>
                </li>
            );
        });
    };

    return (
        <ul>
            {renderList()}
        </ul>
    );
};

export default List;
