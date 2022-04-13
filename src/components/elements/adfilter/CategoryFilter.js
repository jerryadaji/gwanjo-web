import { List, ListItem, ListItemButton, ListSubheader, Typography } from '@mui/material';

const CategoryFilter = ({ category, activeSubCategory }) => {
  return (
    <List
      sx={{ 
        bgcolor: 'background.paper', 
        overflow: "scroll"
      }}
    >
      <ListItem>
        <Typography 
          color="disable" 
          fontSize="small"
          fontWeight="medium"
        >
          {category.title}
        </Typography>
      </ListItem>
      {
        category.subCategories.map( subCategory => {
          return (
            <ListItem 
              key={subCategory.slug} 
              disableGutters disablePadding
              autoFocus={ subCategory.slug === activeSubCategory.slug ? true : false }
            >
              <ListItemButton 
                component="a" 
                href={ "/" + subCategory.slug}
              >
                <Typography 
                  fontSize="small" 
                  fontWeight={ subCategory.slug === activeSubCategory.slug ? "bold" : "" }
                  color={ subCategory.slug === activeSubCategory.slug ? "primary" : "" }
                  pl={2}
                >
                  {subCategory.title}
                </Typography>
              </ListItemButton>
            </ListItem>
          )
        })
      }
     
    </List>
  );
}

export default CategoryFilter;