import { Root } from './Root'
import { Section2 } from './Section2'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Root />} />
          <Route path="/Section2" element={<Section2 />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}