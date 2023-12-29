import { useEffect, useState } from "react"

import { Container, CssBaseline, ThemeProvider, createTheme} from "@mui/material";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useStoreContext } from "./StoreContext";
import { getCookie } from "./util";
import agent from "./agent";





function App() {
  const {setBasket} = useStoreContext();
  const[loading,setLoading] = useState(true);

  useEffect(() =>{
    const buyerId = getCookie('buyerId');
    if(buyerId){
      agent.Basket.get()
      .then(basket => setBasket(basket))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
    }
  },[setBasket])
  
  const [darkMode,setDarkMode] = useState(false);
  
  const paletteType = darkMode ? 'dark' :'light';
  
  const theme = createTheme({
    palette:{
      mode: paletteType,
      background:{
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })
  
  function handleThemeChange(){
    setDarkMode(!darkMode)
  }

  
  return (
    <ThemeProvider theme={theme}>
      
        <CssBaseline></CssBaseline>
        <Header darkMode = {darkMode} handleThemeChange = {handleThemeChange}></Header>
        <Container>
          <Outlet></Outlet>

        </Container>
      
      
    </ThemeProvider>
  )
}

export default App
