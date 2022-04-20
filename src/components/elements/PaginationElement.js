import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { Box, Pagination, Typography } from '@mui/material';

const PaginationElement = ( {count, maxAdsOnPage} ) => {
  const [page, setPage] = useState(1);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    setPage( Number( searchParams.get("page") ) || 1 )
    setMin( searchParams.get("min") || "" )
    setMax( searchParams.get("max") || "" )
  },[searchParams])


  const handleChange = (event, value) => {
    let url = `
      ${location.pathname} ?
      ${ min ? ( "min=" + min) : ""}
      ${ min && max ? "&" : "" }
      ${ max ? ( "max=" + max) : ""}
      ${ (min || max) && value > 1 ? "&" : "" }
      ${ ( value > 1 ) ? ( "page=" + value) : ""}
    `

    url = url.replace(/\s+/g, '')

    navigate(url);
    window.location.reload();
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
