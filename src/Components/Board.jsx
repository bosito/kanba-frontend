import React from 'react';

import {Column} from './Column';
import {DraggableCard} from './Card';
import {TextInput} from './TextInput';
import BackgroundImage from '../Images/board-background.jpg';

export function Board({columns, moveCard, addCard, addColumn}) {
  return (
    <div className="Board" style={{'background': `url(${BackgroundImage})`}}>
      {columns.map(column => (
        <Column
          key={column.id}
          title={column.name}
          columnId={column.id}
          addCard={addCard}
        >
          {column.tasks
            .map((card, index) => (
              <DraggableCard
                key={card.id}
                id={card.id}
                columnId={column.id}
                columnIndex={index}
                title={card.title}
                moveCard={moveCard}
              />
            ))}
          {column.tasks.length === 0 && (
            <DraggableCard
              isSpacer
              moveCard={cardId => moveCard(cardId, column.id, 0)}
            />
          )}
        </Column>
      ))}
      <div className="Column">
        <TextInput onSubmit={addColumn} placeholder="Agregar una columna..." />
      </div>
    </div>
  );
}
