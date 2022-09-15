import { useEffect, useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { copy, defaultLanguage, Language } from '../global/localization'
import { GlobalContext } from '../global/contexts'
import { LandingPage } from '../pages'
import { View } from '../global/types'

import './app.scss'

function App() {
  const [language] = useState<Language>(defaultLanguage)
  const [siteCopy, setCopy] = useState<typeof copy[Language]>(copy[language])

  const defaultView = window.innerWidth < 720 ? View.mobile : View.desktop
  const [view, setView] = useState(defaultView)

  useEffect(() => {
    setCopy(copy[language])
  }, [language])

  window.addEventListener('resize', () => {
    setView(window.innerWidth < 720 ? View.mobile : View.desktop)

    // fix viewport position after small to large screen resize
    if (window.innerWidth >= 720) window.scroll(0, 0)
  })

  return (
    <GlobalContext.Provider value={{ language, copy: siteCopy, view }}>
      <HashRouter>
        <Routes>
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </HashRouter>
    </GlobalContext.Provider>
  )
}

export default App
