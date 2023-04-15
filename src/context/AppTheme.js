import React from 'react'

const AppTheme = React.createContext({
  activeTheme: 'light',
  changeTheme: () => {},
})

export default AppTheme