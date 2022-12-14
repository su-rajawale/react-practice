import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

function Column({ column, tasks }) {
  return (
    <div className="uboard-column">
      <div className="uboard-heading">
        <p>{column.title}</p>
      </div>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div className="uboard-body" ref={provided.innerRef}  {...provided.droppableProps}>
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                {(provided) => (
                  <div
                    className="uboard-item"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <p>{task.content}</p>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Column;
