import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>LoginPage</h1>} />
        <Route path="/register" element={<h1>RegisterPage</h1>} />
        <Route path="/tires" element={<h1>tiresPage</h1>} />
        <Route path="/add-tire" element={<h1>AddTirePage</h1>} />
        <Route path="/tire/:id" element={<h1>tirePage</h1>} />
        <Route path="/profile" element={<h1>ProfilePage</h1>} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
