import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import locationsData from '../../data/locationsData';

export default function Locationfield({ savedLocation, updateLocation }) {

  // Read from database
  const options = locationsData;

  const [value, setValue] = React.useState(options[0]);

  React.useEffect(() => {
    updateLocation(value)
  }, [value, updateLocation])

  // Set saved location
  React.useEffect(() => {
    if(savedLocation){

      const getLocation = options.filter((option) => option.id === savedLocation.id)
      setValue(savedLocation)
    }
  }, [])

  return (
    <Autocomplete
      id="location"
      options={options.sort((a, b) => -b.state.localeCompare(a.state))}
      groupBy={(option) => option.state}
      getOptionLabel={(option) => option.region}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}

      renderInput={(params) => <TextField {...params} fullWidth label="Location" margin="normal" required />}
    />
  );
}
