import { useEffect, useState } from 'react';
import { Grid } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import categoriesData from '../../data/categoriesData';

const categories = categoriesData;

const CategorySelector = (props) => {
  const [category, setCategory] = useState( props.category ? props.category: categories[0].slug );
  const [categoryList, setCategoryList] = useState(categories);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [subCategory, setSubCategory] = useState("");

  // Listen and update subcategory list
  useEffect(() => {
    const getCategory = categoryList.filter( categoryListItem => categoryListItem.slug === category )

    setSubCategoryList(getCategory[0].subCategories)
    
    if(props.subCategory && subCategory === "" ){
      setSubCategory( props.subCategory )
    } else if( getCategory[0].subCategories.length > 0 ){
      setSubCategory( getCategory[0].subCategories[0].slug )
    } else {
      setSubCategory("")
    }

    //setSubCategory( (props.subCategory && subCategory === "" ) ? props.subCategory : getCategory[0].subCategories[0].slug)

  },[category])

  // listen and update parent form state
  useEffect(() => {
    props.setCategory(category)
    props.setSubCategory(subCategory)
  },[subCategory])


  return(
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="category">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            value={category}
            label="Category"
            onChange={e => setCategory(e.target.value)}          
          >
            {
              categoryList.map( (category, index) => <MenuItem index={index} key={category.slug} value={category.slug}>{ category.title }</MenuItem>  )
            }
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        { subCategoryList &&
        <FormControl fullWidth margin="normal">
          <InputLabel id="sub-category-label">More Categories</InputLabel>
          <Select
            labelId="sub-category-label"
            id="sub-category"
            value={subCategory}
            label="Sub Category"
            onChange={e => setSubCategory(e.target.value)}  
            disabled={ (subCategoryList.length > 0) ? false : true }        
          >
            {
              subCategoryList.map( category => <MenuItem key={category.slug} value={category.slug}>{ category.title }</MenuItem>  )
            }
          </Select>
        </FormControl>
        }
      </Grid>
    </Grid>
   
  )
}
export default CategorySelector;