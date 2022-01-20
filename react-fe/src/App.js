import React, { useState } from 'react';
import './App.css';
import { addItem, deleteItem, editItem, getDeletedItems, getItems, undeleteItem } from './api/api';

function App() {
  const [items, setItems] = useState([]);
  const [deletedItems, setDeletedItems] = useState([]);
  const [message, setMessage] = useState("");
  function callback(jsonRes){
    getItemsFE();
    getDeletedItemsFE();
    setMessage(jsonRes);
  }
  const addItemFE = () => {
    let body = {
      title : document.getElementById("addTitle").value,
      price : parseFloat(document.getElementById("addPrice").value),
      description : document.getElementById("addDescription").value,
      quantity : parseInt(document.getElementById("addQuantity").value)
    }
    addItem(body, callback, callback);
  }

  const editItemFE = () => {
    let body = {
      title : document.getElementById("editT").value,
      price : parseFloat(document.getElementById("editP").value),
      description : document.getElementById("editD").value,
      quantity : parseInt(document.getElementById("editQ").value),
      id: parseInt(document.getElementById("editId").value),
    }
    editItem(body, callback, callback);
  }

  const deleteItemFE = () => {
    let body = {
      id: parseInt(document.getElementById("deleteId").value),
      comment: document.getElementById("deleteC").value
    }
    deleteItem(body, callback, callback);
  }

  const restoreItemFE = () => {
    let body = {
      id: parseInt(document.getElementById("undeleteId").value),
    }
    undeleteItem(body, callback, callback);
  }

  const getItemsFE = () => {
    function successCallback(jsonRes){
      setItems(jsonRes);
    }
    getItems(successCallback, callback);
  }

  const getDeletedItemsFE = () => {
    function successCallback(jsonRes){
      setDeletedItems(jsonRes);
    }
    getDeletedItems(successCallback, callback);
  }

  return (
    <div className="App">
      <label>{message}</label>
      <form onSubmit={e => {
          e.preventDefault();
      }}>
        <h1>Add Item</h1>
        <label>
          Title:
          <input type="text" id="addTitle"/>
        </label>
        <label>
          Price:
          <input type="text" id="addPrice" />
        </label>
        <label>
          Description:
          <input type="text" id="addDescription" />
        </label>
        <label>
          Quantity:
          <input type="text" id="addQuantity" />
        </label>
        <button type="submit" value="SubmitAdd" onClick={()=>addItemFE()}>submit</button>
      </form>

      <form onSubmit={e => {
          e.preventDefault();
      }}>
        <h1>Edit Item</h1>
        <label>
          ID:
          <input type="text" id="editId" />
        </label>
        <label>
          Title:
          <input type="text" id="editT" />
        </label>
        <label>
          Price:
          <input type="text" id="editP" />
        </label>
        <label>
          Description:
          <input type="text" id="editD" />
        </label>
        <label>
          Quantity:
          <input type="text" id="editQ" />
        </label>
        <button type="submit" value="SubmitAdd" onClick={()=>editItemFE()}>submit</button>
      </form>

      <form onSubmit={e => {
          e.preventDefault();
      }}>
        <h1>Delete Item</h1>
        <label>
          ID:
          <input type="text" id="deleteId" />
        </label>
        <label>
          Comment:
          <input type="text" id="deleteC" />
        </label>
        <button type="submit" value="SubmitAdd" onClick={()=>deleteItemFE()}>submit</button>
      </form>

      <form onSubmit={e => {
          e.preventDefault();
      }}>
        <h1>Undelete Item</h1>
        <label>
          ID:
          <input type="text" id="undeleteId" />
        </label>
        <button type="submit" value="SubmitAdd" onClick={()=>restoreItemFE()}>submit</button>
      </form>

      <h1>Get Items</h1>
      <button type="submit" value="SubmitAdd" onClick={()=>getItemsFE()}>submit</button>
      {items.length == 0 ? null : 
        items.map(item =>(
          <div>
            <div>
              title: {item.title}
            </div>
            <div>
              price: {item.price}
            </div>
            <div>
              description: {item.description}
            </div>
            <div>
              quantity: {item.quantity}
            </div>
            <br/>
          </div>
        ))
      }
      <h1>Get Deleted Items</h1>
      <button type="submit" value="SubmitAdd" onClick={()=>getDeletedItemsFE()}>submit</button>
      {deletedItems.length == 0 ? null : 
        deletedItems.map(item =>(
          <div>
            <div>
              title: {item.title}
            </div>
            <div>
              price: {item.price}
            </div>
            <div>
              description: {item.description}
            </div>
            <div>
              quantity: {item.quantity}
            </div>
            <div>
              comment: {item.deletion_comment}
            </div>
            <br/>
          </div>
        ))
      }
    </div>
  );
}

export default App;
