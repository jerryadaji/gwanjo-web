import CurrencyFormat from 'react-currency-format';

const NumberText  = ({ value }) => {
  return(
    <CurrencyFormat 
      value={value} 
      displayType={'text'} 
      thousandSeparator={true} 
      renderText={value => value} 
    />
  )
}

export default NumberText;