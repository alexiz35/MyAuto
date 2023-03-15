
interface ResponseFolder {
  kind: string
  id: string
  name: string
  mimeType: string
}

export const deleteGoogleAuth = async (token: string): Promise<boolean> => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      token
    })
  }

  const response = await fetch('https://oauth2.googleapis.com/revoke', requestOptions)
  return response.ok
}

export const getRefreshToken = async (refreshToken: string): Promise<string> => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: '192692660431-ap31mf2uvvm1livb9lucg4h5lkpo3au5.apps.googleusercontent.com',
      client_secret: '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',
      refresh_token: refreshToken,
      grant_type: 'refresh_token'
    })
  }

  const response = await fetch('https://oauth2.googleapis.com/token', requestOptions)
  const token = await response.json()
  return token.access_token
}

export const GDCreateFolder = async (folderName: string, token: string): Promise<ResponseFolder> => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder'
    })
  }
  const response = await fetch(
    'https://www.googleapis.com/drive/v3/files',
    requestOptions
  )
  return await response.json()
}
