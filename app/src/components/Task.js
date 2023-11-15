import React from "react";
import './Task.css';
import { useState, useRef } from "react"

export default function Task() {
  const [inputdata, setinputdata] = useState("")
  const [arr, setarr] = useState([]);
  const changediv = useRef([])
  const ch = useRef([])
  const [desc, setdesc] = useState("")
  const [date, setdate] = useState("")
  const addData = () => {
    if (!inputdata) {
      alert("please fill the input box")
    } else if (!desc) {
      alert("please fill the input box")
    } else if (!date) {
      alert("Please select date")
    }
    else {
      const dataObj = {
        id: new Date().getTime(), name: inputdata,
        desc: desc, date: date
      }
      setarr([...arr, dataObj])
      setinputdata("");
      setdesc("");
      setdate("");
    }
  }
  const deleteItam = (index) => {
    const result = arr.filter((item) => {
      return item.id !== index
    })
    setarr(result)
  }
  const changeColor = (e, index) => {
    if (ch.current[index].checked && e.target.value == index) {
      changediv.current[index].style.textDecoration = "line-through"
    }
    else {
      changediv.current[index].style.textDecoration = "none"
    }
  }
  return (
    <div className="container">
      <div>
        <h1 style={{ fontSize: 'xxx-large', fontFamily: 'Times New Roman, Times, serif', color: 'darkblue',fontWeight:'bolder' }}>To Do List</h1>
        <div className="addData">
          <div className="leftside">
            <div>
              <label className="text">Description</label><br />
              <input type="text" placeholder="Add Description..."
                value={inputdata} className="input"
                onChange={(e) => setinputdata(e.target.value)}></input>
              <div>
                <label className="text">Task</label><br />
                <input type="text" value={desc} placeholder="Add Task"
                  onChange={(e) => setdesc(e.target.value)} className="input"
                ></input>
              </div>
            </div>
            <div>
              <div>
                <label className="text">Date</label><br />
                <input type="date" value={date}
                  onChange={(e) => setdate(e.target.value)} className="input"
                ></input>
              </div><br />
              <button onClick={addData} className="button">ADD +</button>
            </div>
          </div>
        </div>
        <div>
          {changediv && ch && arr.map((curEle) => {
            console.log(curEle.id)
            return (
              <ol ref={(ref) => (changediv.current[curEle.id] = ref)} className="items" key={curEle.id} style={{ border: new Date(curEle.date) < new Date() ? '3px solid red' : '3px solid green' }}>
                <div><label className="label">Description:</label>&nbsp;&nbsp;{curEle.name}</div>
                <div><label className="label">Task:</label>&nbsp;&nbsp; {curEle.desc}</div>
                <div><label className="label">Date:</label>&nbsp;&nbsp;{curEle.date}</div>
                <div><label className="label">Check:</label><input type="checkbox" value={curEle.id} ref={(ref) => (ch.current[curEle.id] = ref)} onClick={(e) => changeColor(e, curEle.id)}></input></div>
                <button className="button1" onClick={() => deleteItam(curEle.id)}>Delete</button>
              </ol>
            )
          })}
        </div>
      </div>
    </div>
  )
}