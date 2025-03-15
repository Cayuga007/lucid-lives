import { Root } from './Root'
import { Section3 } from './Section3'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Root />} />
          <Route path="/Section3" element={<Section3 />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}