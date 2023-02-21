import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import HomeItems from './HomeItems';
import AuthContext from '../context/AuthContext'



const ListHeader = ({ list }) => {

    let { authTokens } = useContext(AuthContext)
    let [items, setItems] = useState([]);

    useEffect(() => {
        getItems();
    }, [])

    let getItems = async () => {
        let response = await fetch(`/api/list/${list.id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        });
        let data = await response.json();
        setItems(data);
    }

    let deleteList = async () => {
        fetch(`/api/lists/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: list.id
        })
    };

    return (
        <div>
            <Link to={`/list/${list.id}`}>

                <header className='list-card'>
                    <h3>{list.name}</h3>
                    <span>{list.category.name}</span>
                </header>
                <div className='home-items'>
                    {items.map((item, index) => (
                        <HomeItems key={index} item={item} />
                    ))}
                </div>

            </Link>
            <button className='delete-list' onClick={deleteList}>Delete</button>
        </div>
    )
}

export default ListHeader