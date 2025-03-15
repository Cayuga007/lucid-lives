import { Root } from './Root'
import { Section1 } from './Section1'
import { Section3 } from './Section3'
import { Section1 } from './Section1'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Root />} />
          <Route path="/Section1" element={<Section1 />} />
          <Route path="/Section3" element={<Section3 />} />
          <Route path="/Section1" element={<Section1 />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}