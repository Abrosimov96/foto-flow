import { Fragment } from "react"

const tagsRegex = /(<\d+>[^<>]*<\/\d+>)/
const openCloseTagRegex = /<(\d+)>([^<>]*)<\/(\d+)>/

type TransType = {
  tags?: Record<string, (str: string) => JSX.Element>
  text: string
}

export const Translation = (props: TransType) => {
  return <>{interpolateTags(props)}</>
}

const interpolateTags = ({ tags, text }: TransType) => {
  if (!tags) {
    return text
  }

  const tokens = text.split(tagsRegex)

  return tokens.map(token => {
    const matchResult = openCloseTagRegex.exec(token)

    if (!matchResult) {
      return token
    }

    const [, openTag, content, closeTag] = matchResult

    if (!openTag || !closeTag || openTag !== closeTag) {
      return token
    }

    return <Fragment key={content}>{tags[openTag]?.(content ?? "")}</Fragment>
  })
}
