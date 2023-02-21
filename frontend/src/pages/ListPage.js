import React, { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import ListItem from '../components/ListItem';
import AuthContext from '../context/AuthContext'


const ListPage = () => {

    let { id } = useParams();
    let { authTokens } = useContext(AuthContext)

    let [item, newItem] = useState("");

    let [items, setItems] = useState([]);

    useEffect(() => {
        getItems();
    }, [])

    let getItems = async () => {
        let response = await fetch(`/api/list/${id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        });
        let data = await response.json();
        setItems(data);
    }


    let createItem = async () => {
        fetch(`/api/list/${id}/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: JSON.stringify(item)
        })
    }

    let handleFormSubmit = (e) => {
        e.preventDefault();
        createItem();
        newItem(" ");
    }


    return (
        <div className='layout'>
            <article className='list-content'>
                {items[0] &&
                    <header>
                        <h3>{items[0]?.lists.name}</h3>
                        <span>{items[0]?.lists.category.name}</span>
                    </header> ||
                    <header>
                        <h3>New List</h3>
                    </header>}
                <div className='list-items'>
                    {items.map((item, index) => (
                        <ListItem key={index} item={item} />
                    ))}
                </div>

                <form className='tasks-form' onSubmit={handleFormSubmit}>
                    <div className='input-section'>
                        <input name='item' id='item' value={item} type='text' placeholder='Add new items...' onInput={(e) => newItem(e.target.value)}></input>
                        <button type='submit' name='newItem'>Add</button>

                    </div>
                </form>

            </article>
        </div>
    )
}

export default ListPage;