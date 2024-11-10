import { RouterProvider } from "react-router-dom"
import { AppRouter } from "./router/Router"
import { SidebarProvider } from "./context/SidebarContext"

function App() {

  return (
    <>
      <SidebarProvider>
        <RouterProvider router={AppRouter} />
      </SidebarProvider>
    </>
  )
}

export default App
