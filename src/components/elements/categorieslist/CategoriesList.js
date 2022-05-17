import { useState } from "react";

import { Accordion, AccordionDetails, AccordionSummary, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import ListItemIcon from '@mui/material/ListItemIcon';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import categoriesData from "../../../data/categoriesData";
import CategoryIcon from "./CategoryIcon";

const CategoriesList = () => {
  const [ expanded, setExpanded ] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return(
    <>
    {
      categoriesData.map( category => {
        return (
          <Accordion 
            expanded={expanded === category.slug + "-panel"} 
            key={category.slug}
            onChange={handleChange(category.slug + "-panel")}
            sx={{m: 0}}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              slug={category + "-panel1bh-header"}
            >
              <ListItemIcon>
                <CategoryIcon categoryId={category.slug}/>
              </ListItemIcon>
              <Typography color="primary">
                {category.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{p: 0}}>
              {
                category.subCategories.map( subCategory => {
                  return(
                    <ListItem key={subCategory.slug} disableGutters disablePadding>
                      <ListItemButton component="a" href={ "/" + subCategory.slug}>
                        <ListItemText inset primary={subCategory.title} />
                      </ListItemButton>
                    </ListItem>
                  )
                })
              }
            </AccordionDetails>
          </Accordion>
        )
      })
    }      
    </>
  )
}

export default CategoriesList;