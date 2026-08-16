import { BrowserRouter, Routes } from "react-router-dom"
import { Suspense } from "react"
import { renderRoutes, availableRoutes } from "./routes/routes"

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {renderRoutes(availableRoutes)}
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
