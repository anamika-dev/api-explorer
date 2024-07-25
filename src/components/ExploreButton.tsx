import React from 'react'
import { Button } from 'react-bootstrap'

interface ExploreButtonProps {
  variant?: string
  className?: string
  text: string
  onClick: () => void
}

const ExploreButton: React.FC<ExploreButtonProps> = ({
  variant = 'primary',
  className = '',
  text,
  onClick,
}) => {
  return (
    <div className={`text-center ${className}`}>
      <Button variant={variant} onClick={onClick}>
        {text}
      </Button>
    </div>
  )
}

export default ExploreButton
