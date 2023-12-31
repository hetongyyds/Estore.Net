import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useStoreContext } from "./StoreContext";

const midLinks = [
    {title:'catalog',path:'/catalog'},
    {title:'about',path:'/about'},
    {title:'contact',path:'/contact'},
    
]

const rightLinks = [
    {title:'login',path:'/login'},
    {title:'register',path:'/register'},
  
]



interface Props{
    darkMode:boolean;
    handleThemeChange: () => void;
}


export default function Header({darkMode,handleThemeChange}:Props){

    const{basket} = useStoreContext();

    const itemCount = basket?.items.reduce((sum,item) => sum + item.quantityInCart,0)
    
    return(
        <AppBar position="static" sx={{mb:4}}>
            <Toolbar sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>

                <Box display='flex' alignContent='center'>
                    <Typography variant="h6" component={NavLink} to='/' sx={{color:'inherit',textDecoration:'none'}}>RESTORE</Typography>
                    <Switch checked={darkMode} onChange={handleThemeChange}></Switch>

                </Box>
                
                
                <List sx={{display:'flex'}}>
                    {midLinks.map(({title,path}) => (
                        <ListItem component={NavLink} to={path} key={path} sx={{color:'inherit',typography:'h6',
                        
                        '&:hover':{
                            color:'secondary.main'
                        },
                        '&.active':{
                            color:'text.secondary'
                        }
                        }}>

                        {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>


                <Box display='flex' alignContent='center'>
                    <IconButton component={Link} to='/basket' size='large' edge = 'start' color = 'inherit' sx={{mr:2}}>
                        <Badge badgeContent={itemCount} color='secondary'>
                            <ShoppingCart>
                                
                            </ShoppingCart>
                        </Badge>
                    </IconButton>

                    <List sx={{display:'flex'}}>
                        {rightLinks.map(({title,path}) => (
                            <ListItem component={NavLink} to={path} key={path} sx={{color:'inherit',typography:'h6',
                            '&:hover':{
                                color:'secondary.main'
                            },
                            '&.active':{
                                color:'text.secondary'
                            }
                            }}>

                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>

                </Box>

                
            </Toolbar>
        </AppBar>

    )
}