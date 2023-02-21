import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext'

const ListItem = ({ item }) => {

    let { id } = useParams();
    let { authTokens } = useContext(AuthContext)


    let changeComplete = async () => {
        fetch(`/api/list/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: item.id
        })
    };

    let deleteItem = async () => {
        fetch(`/api/list/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: item.id
        })
    };

    if (item.complete === false) {
        return (
            <p className="item">
                <label>{item.name}
                    <input type='checkbox' onClick={changeComplete}></input>
                </label>
                <button className='delete-button' onClick={deleteItem}>X</button>
            </p>
        )
    } else {
        return (
            <p className="item">
                <label><s>{item.name}</s>
                    <input type='checkbox' onClick={changeComplete} defaultChecked></input>
                </label>
                <button className='delete-button' onClick={deleteItem}>X</button>
            </p>
        )
    }
};

export default ListItem;