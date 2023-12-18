import { useEffect, useState } from "react"
import { Product } from "./products";
import Catalog from "./Catalog";
import { Container, CssBaseline, ThemeProvider, Typography, createTheme, getCircularProgressUtilityClass } from "@mui/material";
import Header from "./Header";





function App() {
  const [darkMode,setDarkMode] = useState(false);
  
  const paletteType = darkMode ? 'dark' :'light'
  
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
          <Catalog></Catalog>

        </Container>
      
      
    </ThemeProvider>
  )
}

export default App
