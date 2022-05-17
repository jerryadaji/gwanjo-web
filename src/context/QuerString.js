import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
const QueryStringContext = createContext()

const QueryStrings = ({ children }) => {
  const [filterQuery, setFilterQuery] = useState({
    min: '',
    max: '',
    sort: '',
    page: 0,
    isLoaded: false
  })

  const navigate = useNavigate();
  const location = useLocation();

  // Set state from url
  let [searchParams] = useSearchParams()
  useEffect(() => {
    const min = searchParams.get("min") || "";
    const max = searchParams.get("max") || "";
    const sort = searchParams.get("sort") || "";
    const page = searchParams.get("page") || 0;
    
    setFilterQuery(prev => ({
      min: min, 
      max: max,
      sort: sort,
      page: page,
      isLoaded: true
    }))
  },[])

  useEffect(() => {
    if(filterQuery.isLoaded){
      let url =  location.pathname + "?";

      Object.entries(filterQuery).forEach(([key, value]) => {
        if( value && key !== "isLoaded" ){
          url += `${key}=${value}&`
        }
      });

      url = url.slice(0, -1)
      navigate(url);
    }
  }, [filterQuery])

  return(
    <QueryStringContext.Provider value={[filterQuery, setFilterQuery]}>{ children }</QueryStringContext.Provider>
  )
}

export { QueryStringContext, QueryStrings} ;