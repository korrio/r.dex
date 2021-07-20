import React, { useState } from 'react'
import { ThemeProvider as SCThemeProvider } from 'styled-components'
import { light, dark } from 'the-vonder-uikit'

const CACHE_KEY = 'IS_DARK'

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextType>({ isDark: true, toggleTheme: () => null })

const themes = {
  light: {
    ...light,
    colors: {
      ...light.colors,
      primary: '#c9b370',
      secondary: '#0f293a',
      textB: '#c9b370',
      button: '#c9b370',
      background: '#fefdfd',
      borderColor: '#c9b370'
    },
  },
  dark: {
    ...dark,
    colors: {
      ...dark.colors,
      primary: '#c9b370',
      secondary: '#0f293a',
      textB: '#828282',
      button: '#c9b370',
      background: '#0f293a',
      borderColor: '#c9b370'
    },
  },
}

const ThemeContextProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const isDarkUserSetting = localStorage.getItem(CACHE_KEY)
    return isDarkUserSetting ? JSON.parse(isDarkUserSetting) : false
  })

  const toggleTheme = () => {
    setIsDark((prevState) => {
      localStorage.setItem(CACHE_KEY, JSON.stringify(!prevState))
      return !prevState
    })
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <SCThemeProvider theme={isDark ? themes.dark : themes.light}>{children}</SCThemeProvider>
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeContextProvider }
