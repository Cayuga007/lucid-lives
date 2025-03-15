import { Root } from './Root'
import { Section2 } from './Section2'
import { Section3 } from './Section3'
import { BrowserRouter, Routes, Route } from 'react-router'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Root />} />
          <Route path="/Section2" element={<Section2 />} />
          <Route path="/Section3" element={<Section3 />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}