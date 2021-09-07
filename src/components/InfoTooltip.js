import React from 'react';
import ImagePopup from './ImagePopup.js';
function InfoTooltip (props) {
  return (
      <ImagePopup card={props.succsessObj.image ? {link: props.succsessObj.image, name: props.succsessObj.caption} : null} 
        isTooltip={true} 
        onClose={props.onClose}
      />
  )
}

export default InfoTooltip;