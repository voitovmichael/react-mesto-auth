import React from 'react';
import logoSuccess from '../images/InfoTooltip/Success.svg';
import logoFail from '../images/InfoTooltip/Fail.svg';
import ImagePopup from './ImagePopup.js';
// import logo from '../images/InfoTooltip/Success.png';
function InfoTooltip (props) {
  const logo = props.success ? logoSuccess : logoFail;
  // debugger;
  return (
    <ImagePopup card={{link: logo, name: props.caption}} isTooltip={true}/>
  )
}

export default InfoTooltip;

// {/* <section className="popup">
//         <button className="popup__close-button" type="reset" aria-label="Close"></button>
//         <figure className="tooltip">
//           <img className="tooltip__img" src={logo} alt={props.alt}/>
//           <figcaption className="tooltip__caption">{props.caption}</figcaption>
//         </figure>
//       </section> */}