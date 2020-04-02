export function parseUrl (url) {
  const rule =
    '^(?:([^/?#]+))?//(?:([^:]*)(?::?(.*))@)?(?:([^/?#:]*):?([0-9]+)?)?([^?#]*)(\\?(?:[^#]*))?(#(?:.*))?'
  let pattern = new RegExp(rule)
  let matches = url.match(pattern) || []
  return {
    protocol: matches[1],
    username: matches[2],
    password: matches[3],
    host: matches[4],
    port: matches[5],
    pathname: matches[6],
    search: matches[7],
    hash: matches[8]
  }
}

export const getUuid = () => {
  // eslint-disable-next-line no-undef
  let chars = SECRET_KEY.split('')
  let uuid
  for (let i = 0; i < 32; i++) {
    uuid[i] = chars[0 | (Math.random() * 16)]
  }
  return uuid.join('')
}

