import React, { useState, useEffect } from 'react';
import todo from '../images/todo.png';

const getLocalItmes = () => {
    let list = localStorage.getItem('lists');
    if (list) {
        return JSON.parse(localStorage.getItem('lists'));
    } else {
        return [];
    }
}
export default function Todo() {
    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalItmes());
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);

    const addItem = () => {
        if (!inputData) {
            alert('Please Fill Your Item');
        } else if(inputData && !toggleSubmit) {
            setItems(
                items.map((elem) => {
                    if (elem.id === isEditItem) {
                        return { ...elem, name: inputData }
                    }
                    return elem;
                })
            )
                 setToggleSubmit(true);
                 setInputData('');
                 setIsEditItem(null);
        } else {
            const allInputData = { id: new Date().getTime().toString(), name:inputData }
            setItems([...items, allInputData]);
            setInputData('')
        }
    }

    // const addItemWithEnter = (event)=>{
    //     if(event.key === 'Enter')
    //     {if (!inputData) {
    //         alert('Please Fill Your Item');
    //     } else if(inputData && !toggleSubmit) {
    //         setItems(
    //             items.map((elem) => {
    //                 if (elem.id === isEditItem) {
    //                     return { ...elem, name: inputData }
    //                 }
    //                 return elem;
    //             })
    //         )
    //              setToggleSubmit(true);
    //              setInputData('');
    //              setIsEditItem(null);
    //     } else {
    //         const allInputData = { id: new Date().getTime().toString(), name:inputData }
    //         setItems([...items, allInputData]);
    //         setInputData('')
    //     }}
    // }                onKeyDown={addItemWithEnter}

    const deleteItem = (index) => {
        const updateditems = items.filter((elem) => {
            return index !== elem.id;
        });

        setItems(updateditems);
    }
    const editItem = (id) => {
        let newEditItem = items.find((elem) => {
            return elem.id === id
        });
        setToggleSubmit(false);
        setInputData(newEditItem.name);
        setIsEditItem(id);
    }

    // remove all 
    const ClearList = () => {
         setItems([]);
    }

    // add data to localStorage
    useEffect(() => {
       localStorage.setItem('lists', JSON.stringify(items))
    }, [items]);

    return (
        <>
            <div className="outer_box">
                <div className="inner_box">
                    <figure>
                        <img src={todo} alt="todo"/>
                        <figcaption>Add Your List 📝</figcaption>
                    </figure>

                    <div className="addItems">
                        <input type="text" placeholder="Add Items... ✍" value={inputData} onChange={(e) => setInputData(e.target.value) }/>
                        {
                            toggleSubmit ? <i className="fa fa-plus add-btn" title="Add Item" onClick={addItem} ></i> :
                                           <i className="far fa-edit add-btn" title="Update Item" onClick={addItem} ></i>
                        }   
                    </div>

                    <div className="showItems">
                        {
                            items.map((elem) => {
                                return (
                                    <div className="eachItem" key={elem.id}>
                                        <h3>{elem.name}</h3>
                                        <div className="todo-btn">
                                            <i className="far fa-edit" title="Edit Item" onClick={() => editItem(elem.id)}></i>
                                            <i className="far fa-trash-alt" title="Delete Item" onClick={() => deleteItem(elem.id)}></i>
                                        </div>
                                  </div>
                                )
                            })

                        }
                       
                    </div>
                
                    <div className="showItems">
                        <button className="btn animate" data-sm-link-text="Remove All" onClick={ClearList}><span> CHECKLIST </span> </button>
                    </div>
                </div>
          </div>  
        </>
    )
}