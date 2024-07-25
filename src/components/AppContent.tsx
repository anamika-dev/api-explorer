import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainScreen from './MainScreen'
import ApiServiceDetails from './ApiServiceDetails'
import Sidebar from './Sidebar'
import { getAllProviders } from '../provider.service'
import LoaderOverlay from './LoaderOverlay'

const AppContent: React.FC = () => {
  const [loading, setLoading] = useState(false)

  const [showSidebar, setShowSidebar] = useState(false)
  const [providers, setProviders] = useState<string[]>([])

  const handleShowSidebar = () => setShowSidebar(true)
  const handleCloseSidebar = () => setShowSidebar(false)

  useEffect(() => {
    const fetchProviders = async () => {
      setLoading(true)
      try {
        const response = await getAllProviders()
        setProviders(response)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching providers:', error)
        setLoading(false)
      }
    }

    fetchProviders()
  }, [])

  return (
    <>
      {loading && <LoaderOverlay />}
      <div className="App">
        <Sidebar
          providers={providers}
          show={showSidebar}
          onClose={handleCloseSidebar}
          onSelectProvider={() => {
            handleCloseSidebar()
          }}
        />
        <Routes>
          <Route
            path="/"
            element={<MainScreen onOpenSidebar={handleShowSidebar} />}
          />
          <Route
            path="/details/:providerName/:apiProvider"
            element={<ApiServiceDetails onOpenSidebar={handleShowSidebar} />}
          />
        </Routes>
      </div>
    </>
  )
}

export default AppContent
