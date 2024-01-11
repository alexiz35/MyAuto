import { StateMain } from '../../type'

export interface ResponseFolder {
  kind: string
  id: string
  name: string
  mimeType: string
}
export interface GDUserInfo {
  email?: string
  // The user's email address.
  family_name?: string
  // The user's last name.
  gender?: string
  // The user's gender.
  given_name?: string
  // The user's first name.
  hd?: string
  // The hosted domain e.g. example.com if the user is Google apps user.
  id?: string
  // The obfuscated ID of the user.
  link?: string
  // URL of the profile page.
  locale?: string
  // The user's preferred locale.
  name: string
  // The user's full name.
  picture?: string
  // URL of the user's picture image.
  verified_email?: boolean
  // Boolean flag which is true if the email address is verified. Always verified because we only return the user's primary email address.
}
export interface ResponseFindFile {
  kind: 'drive#fileList'
  nextPageToken: string
  incompleteSearch: boolean
  files: [object]
}

// functions for Google authentication
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
// function for GoogleDrive API
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
export const GDCreateFileJson = async (contentJson: object, nameFile: string, parentsId: string, token: string): Promise<string> => {
  const fileContent = JSON.stringify(contentJson)// As a sample, upload a text file.
  const file = new Blob([fileContent], { type: 'application/json' })
  const metadata = {
    name: nameFile, // Filename at Google Drive
    mimeType: 'text/plain', // mimeType at Google Drive
    parents: [parentsId] // Folder ID at Google Drive 1W9dNxbciIAChBzH-di0v4RmNJqVflhq3
  }

  const form = new FormData()
  form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }))
  form.append('file', file)

  const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id', {
    method: 'POST',
    headers: new Headers({ Authorization: 'Bearer ' + token }),
    body: form
  })

  const user = await response.json()
  console.log('createFile', user)
  return user
}
export const GDUpdateFileJson = async (contentJson: object, nameFile: string, parentsId: string, token: string): Promise<string> => {
  const fileContent = JSON.stringify(contentJson)// As a sample, upload a text file.
  const file = new Blob([fileContent], { type: 'application/json' })
  const metadata = {
    name: nameFile, // Filename at Google Drive
    mimeType: 'text/plain', // mimeType at Google Drive
    fileId: parentsId
  }

  const form = new FormData()
  form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }))
  form.append('file', file)

  const response = await fetch('https://www.googleapis.com/upload/drive/v3/files/' + `${parentsId}` + '?uploadType=multipart', {
    method: 'PATCH',
    headers: new Headers({ Authorization: 'Bearer ' + token }),
    body: form
  })

  const user = await response.json()
  console.log('createFile', user)
  return user
}
export const GDFindFile = async (findQuery: string, token: string): Promise<ResponseFindFile> => {
  const response = await fetch(
    'https://www.googleapis.com/drive/v3/files?' + `q=${findQuery}` + '&fields=files',
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  return await response.json()
}
export const GDGetUserInfo = async (token: string, fields?: string): Promise<GDUserInfo | null> => {
  try {
    const fieldsString = fields === undefined ? '' : `?fields=${fields}`
    const response = await fetch(
      'https://www.googleapis.com/userinfo/v2/me' + fieldsString,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    const user = await response.json()
    if (response.ok) {
      console.log('user', user)
      return user
    } else {
      return null
    }
  } catch (error) {
    console.log('Нет связи с Google')
    return null
  }
}
export const GDGetFile = async (fileId: string, token: string): Promise<StateMain | undefined> => {
  try {
    const fieldsString = fileId === undefined ? '' : `/${fileId}`
    const response = await fetch(
      'https://www.googleapis.com/drive/v3/files' + fieldsString + '?alt=media',
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    const contentGetFile = await response.json()
    console.log('GET', contentGetFile)
    return contentGetFile
    /* if (response.ok) {
      console.log('user', user)
      return user
    } else {
      return null
    }
  } catch (error) {
    console.log('Нет связи с Google')
    return null
  }
  return await response.json() */
  } catch (error) {
    console.log('Нет связи с Google')
  }
}
const GDGetList = async (token: string): Promise<void> => {
  const response = await fetch(
    'https://www.googleapis.com/drive/v3/files',
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  )
  const user = await response.json()
  console.log('list', user)
}
// -----------------------------------------------------------------------------------------------------
export const GDDeleteFile = async (folderName: string, token: string): Promise<ResponseFolder> => {
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
