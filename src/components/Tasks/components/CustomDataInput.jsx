import React from 'react';
import PropTypes from 'prop-types';

const CustomDataInput = React.forwardRef(({ value, onClick }, ref) => (
  <button className="custom-datepicker-input" onClick={onClick} ref={ref}>
    {value}
  </button>
));

CustomDataInput.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
};

export default CustomDataInput;