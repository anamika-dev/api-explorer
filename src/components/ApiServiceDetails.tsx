import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'
import ExploreButton from './ExploreButton'
import { getProviderData } from '../provider.service'

interface ApiServiceDetailsProps {
  onOpenSidebar: () => void
}

const ApiServiceDetails: React.FC<ApiServiceDetailsProps> = ({
  onOpenSidebar,
}) => {
  const { providerName, apiProvider } = useParams<{
    providerName: string
    apiProvider: string
  }>()
  const [apiDetails, setApiDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const abortController = new AbortController()
    const fetchApiDetails = async () => {
      try {
        setLoading(true)
        const response = await getProviderData(`${providerName}`, {
          signal: abortController.signal,
        })
        setApiDetails(response)
        setError(null)
      } catch (error: any) {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted')
        } else {
          setError('Failed to fetch API details')
        }
      } finally {
        setLoading(false)
      }
    }

    if (providerName) {
      fetchApiDetails()
    }

    // Cleanup function to abort the fetch if the component unmounts or providerName changes
    return () => {
      abortController.abort()
    }
  }, [providerName])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  const api = apiDetails?.apis[`${apiProvider}`]

  return (
    <div className="service-details-container">
      <ListGroup>
        {api && (
          <ListGroup.Item>
            <div style={headerStyle}>
              {api.info['x-logo'] && (
                <img
                  src={api.info['x-logo'].url}
                  alt="Logo"
                  style={logoStyle}
                />
              )}
              <h4>{api.info.title || providerName}</h4>
            </div>
            <div className="my-4">
              <h4>Description</h4>
              <div
                dangerouslySetInnerHTML={{
                  __html: api.info.description || 'No description available',
                }}
              />
            </div>

            {api.swaggerUrl && (
              <div className="my-4">
                <h4>Swagger</h4>
                <p>{api.swaggerUrl}</p>
              </div>
            )}

            <div className="my-4">
              <h4>Contact</h4>
              <p>
                <strong>Email: </strong>
                {api?.info?.contact?.email || 'NA'}
              </p>
              <p>
                <strong>Name: </strong>
                {api?.info?.contact?.name || 'NA'}
              </p>
              <p>
                <strong>Url: </strong>
                {api?.info?.contact?.url || 'NA'}
              </p>
            </div>
          </ListGroup.Item>
        )}
      </ListGroup>

      <ExploreButton
        text="Explore More APIs"
        onClick={onOpenSidebar} // Open the sidebar
        className="mt-4 pb-5"
      />
    </div>
  )
}

// Inline styles
const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const logoStyle: React.CSSProperties = {
  width: '100px',
  height: '100px',
  marginRight: '10px',
}

export default ApiServiceDetails
