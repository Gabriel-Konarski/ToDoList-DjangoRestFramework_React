import React, { useState, useContext } from 'react'
import AuthContext from '../context/AuthContext'

const CreateList = () => {
    let { authTokens } = useContext(AuthContext)

    let OpenAddForm = async () => {
        document.getElementById("createForm").style.display = "block";
    }

    let CloseAddForm = async () => {
        document.getElementById("createForm").style.display = "none";
    }

    let newList = {
        listName: "",
        listCat: ""
    };

    let [listValue, setListValue] = useState(newList);


    let handleInputChange = (e) => {
        const { name, value } = e.target;
        setListValue({
            ...listValue,
            [name]: value,
        });
    };

    let addingList = (e) => {
        e.preventDefault()
        addList()
    }

    let addList = async () => {
        fetch(`/api/lists/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: JSON.stringify({
                'listName': listValue.listName,
                'listCat': listValue.listCat
            }
            )
        })
    }

    return (
        <div>
            <button className="add-button" onClick={OpenAddForm}>Create +</button>

            <div className="form-popup" id="createForm">
                <form className="create-form">
                    <h1>New List</h1>
                    <button type="button" className="closeBtn" onClick={CloseAddForm}>X</button>

                    <label><b>List Name</b></label>
                    <input name="listName" type="text" value={listValue.listName} placeholder="Enter Name" required
                        onChange={handleInputChange} />
                    <br />
                    <label><b>List Category</b></label>
                    <input name="listCat" type="text" value={listValue.listCat} placeholder="Enter Category" required
                        onInput={handleInputChange} />

                    <button type="submit" className="createBtn" onClick={addingList}>Create</button>
                </form>
            </div>
        </div>
    )
}

export default CreateList