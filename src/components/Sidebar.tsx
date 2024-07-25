import React, { useEffect, useState } from 'react'
import { Offcanvas, Accordion, ListGroup } from 'react-bootstrap'
import styled from 'styled-components'
import { getProviderData } from '../provider.service'
import { useNavigate } from 'react-router'
import LoaderOverlay from './LoaderOverlay'

interface SidebarProps {
  providers: string[]
  show: boolean
  onClose: () => void
  onSelectProvider: () => void
}

const Sidebar: React.FC<SidebarProps> = ({
  providers,
  show,
  onClose,
  onSelectProvider,
}) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [providerDetails, setProviderDetails] = useState<any>(null)
  const [abortController, setAbortController] =
    useState<AbortController | null>(null)

  const getProviderDetails = async (providerName: string) => {
    if (abortController) {
      abortController.abort()
    }
    const newAbortController = new AbortController()
    setAbortController(newAbortController)

    const response = await getProviderData(providerName, {
      signal: newAbortController.signal,
    })
    setProviderDetails(response)
    setLoading(false)
  }

  useEffect(() => {
    return () => {
      if (abortController) {
        abortController.abort()
      }
    }
  }, [abortController])

  return (
    <>
      {loading && <LoaderOverlay />}
      <StyledOffcanvas show={show} onHide={onClose} placement="end">
        <Offcanvas.Header closeButton>
          <Title>Select Providers</Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Accordion>
            <StyledListGroup variant="flush">
              {providers.map((provider) => (
                <Accordion.Item
                  eventKey={provider}
                  key={provider}
                  onClick={() => {
                    setLoading(true)
                    setProviderDetails(null)
                    getProviderDetails(provider)
                  }}
                >
                  <Accordion.Header>
                    <ProviderItem>{provider}</ProviderItem>
                  </Accordion.Header>
                  <Accordion.Body>
                    <ProviderItemBody>
                      {providerDetails &&
                        Object.keys(providerDetails?.apis ?? {}).map(
                          (apiKey) => {
                            const api = providerDetails?.apis[apiKey]
                            return (
                              <div
                                style={headerStyle}
                                key={apiKey}
                                onClick={() => {
                                  onSelectProvider()
                                  navigate(`/details/${provider}/${apiKey}`)
                                }}
                              >
                                {api.info['x-logo'] && (
                                  <img
                                    src={api.info['x-logo'].url}
                                    alt="Logo"
                                    style={logoStyle}
                                  />
                                )}
                                <span className="text-sm">
                                  {api.info.title ?? provider}
                                </span>
                              </div>
                            )
                          },
                        )}
                    </ProviderItemBody>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </StyledListGroup>
          </Accordion>
        </Offcanvas.Body>
      </StyledOffcanvas>
    </>
  )
}

// Inline styles
const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  // borderBottom: '1px solid #000',
  margin: '1px 0px',
}

const logoStyle: React.CSSProperties = {
  width: '20px',
  height: '20px',
  marginRight: '10px',
}

// Styled components
const StyledOffcanvas = styled(Offcanvas)`
  background-color: #3f5f7a;
  color: white;

  .offcanvas-body {
    padding: 20px;
    background: #3f5f7a;
  }

  .accordion {
    border-radius: 0px;
  }

  .offcanvas-header {
    border-bottom: 1px solid #ffffff33;
  }

  .offcanvas-title {
    text-align: center;
  }
`

const StyledListGroup = styled(ListGroup)`
  .accordion-item {
    background: #3f5f7a !important;
    border: none;

    > h2 > button {
      background: #3f5f7a !important;
      color: #fff;
      padding: 5px 0px;

      &:not(.collapsed) {
        background: #232323 !important;
      }
    }
  }

  .accordion-button:not(.collapsed) {
    background: #232323;
  }

  .accordion-button:focus {
    box-shadow: none;
  }
  .accordion-button::after {
    background-image: url('data:image/svg+xml,<svg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27 fill=%27none%27%20stroke=%27%23ffffff%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27><path%20d=%27M2%205L8%2011L14%205%27/></svg>');
  }

  .accordion-item:first-of-type {
    border-radius: 0px !important;
  }

  .accordion-body {
    padding: 0px;
  }

  .accordion-collapse {
    max-height: 70vh;
    overflow-y: auto;
  }
`

const Title = styled.h5`
  text-align: center;
  color: white;
`

const ProviderItem = styled.div`
  cursor: pointer;
  padding: 0.5rem;
`

const ProviderItemBody = styled.div`
  color: #ffffff;
  cursor: pointer;
  padding: 0.5rem 1rem;
  background: #232323;
`

export default Sidebar
