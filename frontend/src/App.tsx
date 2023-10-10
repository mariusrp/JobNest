import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'

import NavigationBar from './components/NavigationBar'
import { NewsProvider } from './NewsContext'
import NewDesignLogin from './pages/LoginPage'
import Practice from './pages/Practice'
import Subheader from './components/SubHeader'

function App() {
  return (
    <NewsProvider>
      <Router>
        <NavigationBar />
        <Subheader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<NewDesignLogin />} />
          <Route path="/practice" element={<Practice />} />
        </Routes>
      </Router>
    </NewsProvider>
  )
}

export default App
