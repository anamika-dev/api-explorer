import React from 'react'
import { Spinner } from 'react-bootstrap'
import styled from 'styled-components'

const LoaderOverlay: React.FC = () => {
  return (
    <Overlay>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Overlay>
  )
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  color: #fff;
`

export default LoaderOverlay
