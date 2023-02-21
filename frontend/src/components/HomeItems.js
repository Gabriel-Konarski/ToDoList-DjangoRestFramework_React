import React from 'react'

const HomeItems = ({ item }) => {
    if (item.complete === false) {
        return (
            <p className="item">{item.name}</p>
        )
    } else {
        return (
            null
        )
    }
}

export default HomeItems