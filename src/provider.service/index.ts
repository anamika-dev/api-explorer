export const getProviderData = async (
  providerName: string,
  options: { signal: AbortSignal; cache?: RequestCache },
) => {
  const { signal, cache = 'no-store' } = options
  const cacheBuster = new Date().getTime()
  const response = await fetch(
    `https://api.apis.guru/v2/${providerName}.json?_=${cacheBuster}`,
    { signal, cache },
  )
  const data = await response.json()
  return data
}

export const getAllProviders = async () => {
  const response = await fetch('https://api.apis.guru/v2/providers.json')
  const data = await response.json()
  return data.data ?? []
}
