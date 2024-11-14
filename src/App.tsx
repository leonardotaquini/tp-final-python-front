import { useEffect } from 'react'
import './App.css'
import { AppRoutes } from './router/AppRoutes'
import { useChatStore } from './chat/store/chatStore'

function App() {

  const getPDFName = useChatStore((state) => state.getPdfName)
  useEffect(() => {
    getPDFName()
  }, [getPDFName])

  return (
    <>
      <AppRoutes />
    </>
  )
}

export default App
