import * as React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import TextField from '@mui/material/TextField';


const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="₦"
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function PriceFieldCompact({ price, setPrice, label }) {

  const handleChange = (event) => {
    setPrice(event.target.value)
  };

  return (
    <TextField
      label={label}
      value={price}
      onChange={handleChange}
      name="price"
      id="price"
      InputProps={{
        inputComponent: NumberFormatCustom,
      }}
      variant="outlined"
      fullWidth
      margin="none"
      size="small"
    />
  );
}
