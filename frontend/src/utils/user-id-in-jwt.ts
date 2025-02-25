import cookies from 'js-cookie'

export const userIdInJwt = () => {
  const accessToken = cookies.get('access_token')
  if (!accessToken) return null
  const payload = JSON.parse(atob(accessToken!.split('.')[1]))
  return payload.sub || null
}