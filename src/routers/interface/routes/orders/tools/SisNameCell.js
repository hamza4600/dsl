import { formateName } from 'functions'
import React from 'react'
import style from './sisName.module.scss'

const SisNameCell = ({ children,value=formateName(children)||[], className}) => (
    <div className='align-items-center d-flex pl-2'>
      {value.map((name, i) => (
        <div key={i} className={style.name}>{name}</div>
      ))}
    </div>
  );

export default SisNameCell