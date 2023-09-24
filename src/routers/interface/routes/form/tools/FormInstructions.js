import Sprite from 'core/tools/Sprite';
import React from 'react'
//STYLE
import style from './formInstructions.module.scss'

const FormInstructions = ({children, value, className, ...props}) => {
    console.log(children);
  return (
    <div className={style.container}>
     {children ? <div className='d-flex'> <Sprite className={style.icon} use="view" /> View</div>: <div>None</div>}
    </div>
  );
}

export default FormInstructions