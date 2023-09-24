import React, {useEffect, useState } from 'react';

// GLOBAL FUNCTIONS
import { formateName} from 'functions.js';
import Sprite from 'core/tools/Sprite';

// MAIN COMPONENT
const Vsd = ({ children, value = children===' '?[]: formateName(children, ' ') }) => {
  //STATE
  const [icon, setIcon] = useState('');
useEffect(() => {
  value.length &&
    (value[0] === value[1]
      ? setIcon({ use: 'success', className: 'text-success' })
      : setIcon({ use: 'warning', className: 'text-danger' }));
}, [])


  return (
    <div className="d-flex align-items-center">
     {value.length ? <Sprite use={icon.use} className={icon.className} />:''}
      <div>
        {value.map((item, i) => (
          <div key={i} className="d-block">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

// EXPORT
export default Vsd;
