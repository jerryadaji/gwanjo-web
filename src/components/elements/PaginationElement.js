import { useContext, useEffect, useState } from 'react';
import { QueryStringContext } from '../../context/QuerString';
import { Box, Pagination } from '@mui/material';

const PaginationElement = ( {count, maxAdsOnPage} ) => {
  const [page, setPage] = useState(1);

  // Get Query String argument from Context
  const [filterQuery, setFilterQuery] = useContext(QueryStringContext)

  useEffect(() => {
    setPage( Number( filterQuery.page ) || 1 )
  },[filterQuery])

  const handleChange = (event, value) => {
    setFilterQuery(prev => ({...prev, page: value}))
  };

  return (
    <Box 
      justifyContent="center"
      display="flex"
      mt={6}
    >
      <Pagination 
        color="primary" 
        count={Math.ceil(count/maxAdsOnPage)} page={page} 
        onChange={handleChange} 
        size="large"
      />
    </Box>
  );
}

export default PaginationElement;
