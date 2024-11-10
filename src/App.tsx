import { RouterProvider } from "react-router-dom"
import { AppRouter } from "./router/Router"

function App() {

  return (
    <>
      <RouterProvider router={AppRouter} />
    </>
  )
}

export default App
