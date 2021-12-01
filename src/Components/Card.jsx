import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { DragSource, DropTarget } from 'react-dnd';
import cn from 'classnames';
import _ from 'lodash';

const customStyles = {
  content: {
    display: 'flex',
    flexDirection: 'column',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export function Card(props) {
  // console.log(props.modalOpen);

  const [isOpen, setOpenModal] = useState(false);

  useEffect(() => {
    if (props.modalOpen.length > 0) {
      setOpenModal(props.modalOpen[props.index].open);
    }
  }, [props.modalOpen, props.index, props.toggle]);

  return _.flowRight(
    props.connectDragSource,
    props.connectDropTarget
  )(
    <div>
      <div
        className={cn('Card', {
          'Card--dragging': props.isDragging,
          'Card--spacer': props.isSpacer,
        })}
        onClick={() => props.openModal(props.index)}
      >
        <div className="Card__title">{props.title}</div>
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={props.closeModal}
        style={customStyles}
        contentLabel="Modal tareas"
      >
        <div className="Modal__header">
          <h2>Editar la tarea</h2>
          <button onClick={() => props.closeModal(props.index)}>close</button>
        </div>
        <form className="Modal__form">
          <label>Titulo</label>
          <input type="text" value={props.title} name="title" />
          <label>Descripción</label>
          <textarea value={props.description}></textarea>
          <label>Fecha de entrega</label>
          <input type="date" name="due_date" value={props.due_date} />
          <button>Actualizar tarea</button>
        </form>
      </Modal>
    </div>
  );
}

export const DraggableCard = _.flowRight([
  DropTarget(
    'Card',
    {
      hover(props, monitor) {
        const { columnId, columnIndex } = props;
        const draggingItem = monitor.getItem();
        if (draggingItem.id !== props.id) {
          console.log(draggingItem);
          props.moveCard(draggingItem.id, columnId, columnIndex);
        }
      },
    },
    (connect) => ({
      connectDropTarget: connect.dropTarget(),
    })
  ),
  DragSource(
    'Card',
    {
      beginDrag(props) {
        return { id: props.id };
      },

      isDragging(props, monitor) {
        return props.id === monitor.getItem().id;
      },
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    })
  ),
])(Card);
