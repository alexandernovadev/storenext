export const parseCookies = (cookieHeader: string) => {
  const cookies: { [key: string]: string } = {}
  const items = cookieHeader.split(';')

  items.forEach((item) => {
    const [key, value] = item.split('=')
    cookies[key.trim()] = decodeURIComponent(value.trim())
  })

  return cookies
}
