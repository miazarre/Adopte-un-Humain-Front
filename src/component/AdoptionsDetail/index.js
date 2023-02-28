import PropTypes from 'prop-types';
import './styles.scss';

import React from 'react';

const AdoptionsDetail = ({animal_id, form1, form2, form3}) => {
    console.log(animal_id)
    return(
        <>
            <p>{form1}</p>
            
        </>
    )
}

AdoptionsDetail.propTypes = {
    animal_id: PropTypes.number.isRequired,
    form1: PropTypes.string.isRequired,
    form2: PropTypes.string.isRequired,
    form3: PropTypes.string.isRequired,
  };

export default AdoptionsDetail ;