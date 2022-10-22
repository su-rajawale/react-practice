// import fruits from "./Nesteds";
// import { choice, remove } from './helper'
import { useState } from 'react';
// import { useReducer } from 'react'
import React from 'react';
import './Nested.css'
import Nestable from 'react-nestable';
import 'react-nestable/dist/styles/index.css';
import {
  AiOutlineDrag,
  AiFillCaretRight,
  AiFillCaretDown
} from "react-icons/ai";

// function reducer (state, action) {

//   switch(action.type) {
//     case 'increment':
//     return state + 1;
//     case 'decrement':
//     return state - 1
//     default :
//     throw new Error('Something went wrong');
//   }
// }

const styles = {
  position: "relative",
  background: "WhiteSmoke",
  display: "flex"
};
const cssCenter = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};
const handlerStyles = {
  width: "2rem",
  height: "100%",
  cursor: "pointer",

  borderRight: "1px solid Gainsboro"
};

const items = [
  {
    id: 0,
    text: "Lot A",

    children: [
      {
        id: 4,
        text: "Ouvrage",

        children: [
          {
            id: 12,
            text: "Une ressource",
            amount: 1
          },
          {
            id: 13,
            text: "La main d'œuvre",
            amount: 1
          }
        ]
      }
    ]
  },

  {
    id: 3,
    text: "Lot B",

    children: [
      {
        id: 1,
        text: "Super Ouvrage",

        children: [
          {
            id: "2-1",
            text: "Ressource 1",
            amount: 1
          },
          {
            id: "2-2",
            text: "Ouvrage",

            children: [
              { id: "toto", text: "Ressource truc", amount: 1 },
              { id: "toto2", text: "Ressource autre", amount: 1 }
            ]
          }
        ]
      }
    ]
  }
];

const renderItem = (props) => {
  const { item, index, collapseIcon, handler } = props;

  return (
    <div
      style={{ ...styles, fontWeight: item.children.length ? "700" : "400" }}
    >
      {handler}
      {collapseIcon}
      <div style={{ ...cssCenter, color: "LightSlateGray", width: "3rem" }}>
        {index + 1}
      </div>

      <div
        style={{
          padding: ".5rem",
          flex: 1
        }}
      >
        {item.text}
      </div>
      <div
        style={{
          padding: ".5rem",
          width: "4rem"
        }}
      >
        123 €
      </div>
    </div>
  );
};

function Nested() {

  const [collapseAll, setCollapseAll] = useState(false);

  const Handler = () => {
    return (
      <div style={{ ...cssCenter, ...handlerStyles }}>
        <AiOutlineDrag />
      </div>
    );
  };
  const Collapser = ({ isCollapsed }) => {
    return (
      <div style={{ ...cssCenter, ...handlerStyles }}>
        {isCollapsed ? <AiFillCaretRight /> : <AiFillCaretDown />}
      </div>
    );
  };

  // const [count,setCount] = useState(0)
  // const [state, dispach] = useReducer(reducer,0)

  return (
    <div>
      {/* <button onClick={()=> {setCount(count + 1)}}>Add</button>
      <span>{ count }</span> */}

      {/* <span>Count: {state}</span>
      <button onClick={()=> dispach({type: 'increment'})}>+</button>
      <button onClick={()=> dispach({type: 'decrement'})}>-</button> */}

      <div className="table">
        <header style={{ marginBottom: "2rem" }}>
          <h1>Prestations</h1>
          <button onClick={() => setCollapseAll(!collapseAll)}>
            {collapseAll ? "expand all" : "collapse all"}
          </button>
        </header>
        <Nestable
          items={items}
          renderItem={renderItem}
          handler={<Handler />}
          renderCollapseIcon={({ isCollapsed }) => (
            <Collapser isCollapsed={isCollapsed} />
          )}
          collapsed={collapseAll}
        />
      </div>

    </div>

  )
}

export default Nested;