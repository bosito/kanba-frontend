import React from 'react';
import LoadinGif from '../Images/loading.gif';

const Loading = () => {
  return (<div className="container">
  <img src={LoadinGif} alt="cargando..." />
</div>)
}

export default Loading;