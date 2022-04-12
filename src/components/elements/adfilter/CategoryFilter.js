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
                sx={{
                  backgroundColor: subCategory.slug === activeSubCategory.slug ? "#f4f4f4" : ""
                }}
              >
                <Typography 
                  fontSize="small" 
                  fontWeight={ subCategory.slug === activeSubCategory.slug ? "bold" : "" }
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