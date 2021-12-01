import React, {useEffect} from 'react';

import {Column} from './Column';
import {DraggableCard} from './Card';
import {TextInput} from './TextInput';
import BackgroundImage from '../Images/board-background.jpg';

export function Board({columns, moveCard, addCard, addColumn}) {
  const [modalTasks, setOpenModal] = React.useState([]);
  const [toggle, setToggle] = React.useState(false);

  function openModal(i) {
    modalTasks[i] = {open: true};
    setToggle(true);
    setOpenModal(modalTasks);
  }

  function closeModal(i) {
    console.log("cerrando el modal");
    modalTasks[i] = {open: false};
    setToggle(false);
    setOpenModal(modalTasks);
  }

  useEffect(() => {
    let modal = [];
    columns.map( column => {
      const modalsArr = column.tasks.map( () => ({ open: false }));
      modal = [...modal, ...modalsArr];
    });
    setOpenModal(modal);
  }, [columns]);

  return (
    <div className="Board" style={{'background': `url(${BackgroundImage})`}}>
      {columns.map(column => { 
        return (
      
        <Column
          key={column.id}
          title={column.name}
          columnId={column.id}
          addCard={addCard}
        >

          {
          column.tasks
            .map((card, index) => {              
              return (<DraggableCard
                key={card.id}
                id={card.id}
                index={index}
                columnId={column.id}
                columnIndex={index}
                title={card.title}
                due_date={card.due_date}
                description={card.description}
                moveCard={moveCard}
                openModal={openModal}
                closeModal={closeModal}
                modalOpen={modalTasks}
                toggle={toggle}
              />);
            }
              
            )}
          
          {column.tasks.length === 0 && (
            <DraggableCard
              isSpacer
              moveCard={cardId => moveCard(cardId, column.id, 0)}
            />
          )}
        </Column>
      )})}
      <div className="Column">
        <TextInput onSubmit={addColumn} placeholder="Agregar una columna..." />
      </div>
    </div>
  );
}
