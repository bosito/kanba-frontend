import React from 'react';
import {TextInput} from './TextInput';

export function Column({children, title, columnId,  addCard}) {
  return (
    <div className="Column">
      <div className="Column__title">{title}</div>
      {children}
      <TextInput onSubmit={(value) => addCard(columnId, value)} placeholder="Agregar una tarea..." />
    </div>
  );
}
