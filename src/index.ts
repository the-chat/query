type Config = Record<string, string>

// search: x=1&y=2&z=afdsf
const configFromSearch = (search: string) =>
  search
    .split("&")
    .map((keyVal) => keyVal.split("="))
    .reduce((config, [key, val]) => ({...config, [key]: val}), {})

// return: x=1&y=2&z=afdsf
const searchFromConfig = (config: Config) =>
  Object.entries(config)
    .reduce((search, [key, val]) => search + "&" + key + "=" + val, "")
    .slice(1)

const getQuery = (url: string) => {
  const [, search] = url.split("?")

  if (search) return configFromSearch(search)
  return {}
}

const setQuery = (
  url: string,
  config: Config | ((startConfig: Config) => Config)
) => {
  const [path] = url.split("?")
  const startConfig = getQuery(url)

  return (
    path +
    "?" +
    (typeof config == "function"
      ? searchFromConfig(config(startConfig))
      : searchFromConfig({...startConfig, ...config}))
  )
}

export {getQuery, setQuery}
