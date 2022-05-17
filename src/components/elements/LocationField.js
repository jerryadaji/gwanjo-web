import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import locationsData from '../../data/locationsData';

export default function Locationfield({ savedLocation, updateLocation }) {

  // Read from database
  const options = locationsData;

  const [value, setValue] = useState(options[0]);

  useEffect(() => {
    updateLocation(value)
  }, [value, updateLocation])

  // Set saved location
  useEffect(() => {
    if(savedLocation){
      if(savedLocation.state && savedLocation.region ){
        const getLocation = options.filter((option) => option.id === savedLocation.region)
        setValue(getLocation[0])
      }
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
