import { ChatView } from "@/chat/views/ChatView"
import { Home } from "@/chat/views/Home"
import { Route, Routes } from "react-router-dom"

export const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chat' element={<ChatView />} />
    </Routes>
  )
}
