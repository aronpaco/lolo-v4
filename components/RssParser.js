import Parser from '@postlight/parser'
import FetchData from './FetchData'
const url = `https://www.theverge.com/tech`;

const RssParser = () => {
  const result = Parser.parse(url)
  console.log({result})
  return 0
}

export default RssParser