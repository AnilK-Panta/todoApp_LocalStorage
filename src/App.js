import { useEffect, useState } from "react";
import "./App.css";

const getFromLocalStorage=()=>{
  const list= localStorage.getItem("TODO_List")
  if(list){
    return JSON.parse(list)
  }
  else{
    return [];
  }
}

function App() {
  
  const [listValue, setListValue] = useState('');
  const [items, setItems] = useState(getFromLocalStorage());
  const [updatedList, setUpdatedList] = useState("")
  const [toggleButton, setToggleButton] = useState(false)


  

  const addItem = () => {
    if (!listValue) {
      alert("Please Enter the list name");
    }
    else if (listValue && toggleButton){
      setItems(
        items.map((curElem)=>{
          if(curElem.id===updatedList){
            return{...curElem, name: listValue}
          }
          return curElem;
        })
      )
      setListValue("")
      setToggleButton(false)


    }
    else {
      const newInputData={
        id: new Date().getTime().toString(),
        name: listValue
      }
      setItems([newInputData, ...items]);
      setListValue("")
      // return;
    }
  };

  const deleteItem=(index)=>{
    const updatedItems=items.filter((curElem)=>{
      return curElem.id !== index
    })
    setItems(updatedItems)
  }

  const deleteAll=()=>{
    setItems([])

  }

  const editItem=(index)=>{
    const todo_edited = items.find((curElem)=>{
      return curElem.id === index
    })
    setUpdatedList(index)
    setToggleButton(true);
    setListValue(todo_edited.name)
  }


  // local storage
  useEffect(()=>{
    localStorage.setItem("TODO_List", JSON.stringify(items))
  },[items])



  

  return (
    <div className="App">
      <div className="todo-top">
        <img
          src="https://icon-library.com/images/todo-icon/todo-icon-17.jpg"
          alt="todoImage"
        />
        <h3>Todo List</h3>
      </div>
      <div className="todo-add">
        <div className="todo-input">
          <input
            className="todo-input-box"
            placeholder="Add List"
            value={listValue}
            onChange={(event) => setListValue(event.target.value)}
          />
          {toggleButton ? <i className="fas fa-edit" onClick={() => addItem()}></i>:<i className="fas fa-plus" onClick={() => addItem()}></i>}
        </div>
      </div>
      <div className="todo-lists">
        {items.map((curElem, index) => {
          return (
            // <key={index}>
              <div className="todo-input" key={index}>
                <div className="list-added">
                  <h4>{curElem.name}</h4>
                </div>
                <div className="todo-edits" >
                  <i className="fas fa-edit" onClick={()=>editItem(curElem.id)}></i>
                  <i className="fas fa-trash-alt" onClick={()=>deleteItem(curElem.id)}></i>
                </div>
              </div>
            // </>
          );
        })}
      </div>
      <div className="todo-button" onClick={()=>deleteAll()}>
        <h4>Check All</h4>
      </div>
    </div>
  );
}

export default App;
