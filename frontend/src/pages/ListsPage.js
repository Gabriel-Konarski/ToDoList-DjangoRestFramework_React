import React, { useState, useEffect, useContext } from 'react'
import CreateList from '../components/CreateList'
import ListHeader from '../components/ListHeader'
import AuthContext from '../context/AuthContext'

const ListsPage = () => {

    let [lists, setLists] = useState([])
    let { authTokens } = useContext(AuthContext)

    useEffect(() => {
        getLists()
    }, [])

    let getLists = async () => {
        let response = await fetch('/api/lists/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        setLists(data)
    }


    return (
        <div className='layout'>
            <section className='home-settings'>
                <CreateList />
            </section>
            <article className='lists-card'>
                {lists.map((list, index) => (
                    <ListHeader key={index} list={list} />
                ))}
            </article>
        </div>
    )
}

export default ListsPage