import CurrencyFormat from 'react-currency-format';

const CurrencyText  = ({ value }) => {
  return(
    <CurrencyFormat 
      value={value} 
      displayType={'text'} 
      thousandSeparator={true} 
      prefix={'₦'} 
      renderText={value => value} 
    />
  )
}

export default CurrencyText;