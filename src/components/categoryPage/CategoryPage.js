import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import categoriesData from "../../data/categoriesData";
import Loader from "../Loader";
import PageNotFound from "../PageNotFound";


import AdList from "../ad/AdList";
import AppLayout from "../layout/AppLayout";
import CategoryFilter from "../elements/adfilter/CategoryFilter";

import { Box, Breadcrumbs, Grid, Link, Typography } from '@mui/material';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import PriceFilter from "../elements/adfilter/PriceFilter";


const CategoryPage = () => {
  const [ found, setFound ] = useState("checkin");
  const [ category, setCategory ] = useState("");
  const [ subCategory, setSubCategory ] = useState("");


  // Get Category ID from URL
  let { categorySlug } = useParams();

  useEffect(() => {
    const findCategory = []
    const findSubcategory = []

    categoriesData.forEach( category => {
      category.subCategories.forEach( subCategory => {
        if( subCategory.slug === categorySlug ){
          findCategory.push(category)
          findSubcategory.push(subCategory)
        }
      })
    })

    setCategory(findCategory[0])
    setSubCategory(findSubcategory[0])

    if( findSubcategory.length > 0 ){
      setFound(true)
    } else {
      setFound(false)
    }
  },[])

  if( found === false ){
    return <PageNotFound/>
  } else if( found === "checking" ){
    return <Loader/>
  } else {
    return(
      <AppLayout hasBreadcrumb={true}>
        <Box mb={2}>
          <Breadcrumbs
            aria-label="breadcrumb"
            separator={<NavigateNextIcon fontSize="small" />}
          >
            <Link underline="hover" color="inherit" href="/" variant="caption">Home</Link>
            <Typography color="text.primary" variant="caption">{category.title}</Typography>
            <Typography color="text.primary" variant="caption">{subCategory.title}</Typography>
          </Breadcrumbs>
        </Box>
        <Typography variant="h5" mb={2} component="h1">{subCategory.title} in Nigeria</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            { category && <CategoryFilter activeSubCategory={subCategory} category={category} /> }
            { category && <PriceFilter activeSubCategory={subCategory} category={category} /> }
          </Grid>
          <Grid item xs={12} md={9}>
            {subCategory &&
              <AdList 
                hasQuery={true}
                subCategory={subCategory.slug}
              />
            }
          </Grid>
        </Grid>
      </AppLayout>
    )
  }
}

export default CategoryPage;