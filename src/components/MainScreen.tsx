import React from 'react'
import ExploreButton from './ExploreButton'

interface MainScreenProps {
  onOpenSidebar: () => void
}

const MainScreen: React.FC<MainScreenProps> = ({ onOpenSidebar }) => {
  return (
    <div className="fullscreen">
      <ExploreButton
        text="Explore Web APIs"
        onClick={onOpenSidebar}
        className="mt-4"
      />
    </div>
  )
}

export default MainScreen
