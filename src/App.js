import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Board } from './Components/Board';
import {getStatus} from './Services/status';
import { addTask as addTaskService } from './Services/tasks';

let _columnId = 0;
let _taskId = 0;

const App = () => {
  const [columns, setColumns] = useState([]);

  let initialColumns = ['En proceso'];

  initialColumns = initialColumns.map((title, i) => ({
    id: _columnId++,
    title,
    tasks: Array.from({ length: 3 }).map(() => ({
      id: ++_taskId,
      title: `Ejemplo de tarea ${_taskId}`,
    })),
  }));

  useEffect(() => {
    const fetchStatus = async () => { 
      const status = await getStatus();
      setColumns(status);
    }

    fetchStatus();
  }, []);

  const addColumn = (title) => {
    const newColumn = {
      id: ++_columnId,
      title,
      tasks: [],
    };
    setColumns([...columns, newColumn]);
  };

  const addTask = async (columnId, title) => {
    try {
      // Construimos la nueva tarea
      const newTask = { title, description: "", due_date: "2021-11-30", user_id: 3, status_id: columnId };
      // Mandamos la solicitud
      const task = await addTaskService(newTask);
      // Agregamos la tarea que acabamos de crear en el sistema
      const taskArray = columns.map((column) => column.id === columnId
        ? { ...column, tasks: [...column.tasks, task] }
        : column
      );
      // Actualizamos el estado
      setColumns(taskArray);
    } catch(error) {
      console.log(error);
    }
  };

  const moveCard = (cardId, destColumnId, destIndex) => {
    let _card;
    let placeTasks = columns.map((column) => {
      const cardIndex = column.tasks.findIndex(
        (card) => card.id === cardId
      );
      // If the card is not present, leave this column alone.
      if (cardIndex === -1) return column;
      _card = column.tasks[cardIndex];
      return {
        ...column,
        tasks: [
          ...column.tasks.slice(0, cardIndex),
          ...column.tasks.slice(cardIndex + 1),
        ],
      };
    })
    // 2) Insert the card into the destination position.
    .map((column) => {
      return column.id !== destColumnId
        ? column
        : {
            ...column,
            tasks: [
              ...column.tasks.slice(0, destIndex),
              _card,
              ...column.tasks.slice(destIndex),
            ],
          };
    });

    setColumns(placeTasks);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Board
        columns={columns}
        moveCard={moveCard}
        addCard={addTask}
        addColumn={addColumn}
      />
    </DndProvider>
  );
}

export default App;
