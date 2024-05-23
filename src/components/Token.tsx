import { FC, ReactNode } from "react"
import { TToken } from "../Tokenizer/types"

interface ITokenViewer { 
  token : TToken,
  format: 'encoded' | 'decoded', 
  hovredToken: TToken | null,
  tokenStrColor: {str: string, color: string},
  setHovredToken: (token: TToken | null) => void
}

const TokenViewer: FC<ITokenViewer> = ({ token, format, hovredToken, tokenStrColor, setHovredToken }) => {
  let stringValue = '', colorStyle = '', style = {}
  const { str = '', color = '' } = tokenStrColor || { str: '', color: ''}
  
  switch(format){
    case 'decoded': {
      stringValue = str
      colorStyle = color

      style = {
        backgroundColor: hovredToken && token !== hovredToken ? '' : colorStyle
      }

      break;
    }
    case 'encoded' : {
      stringValue = str
      colorStyle = color

      style = {
        color: hovredToken && token !== hovredToken ? '' : colorStyle
      }
      break;
    }
  }
  
  const Container = ( { children }:  { children : ReactNode} ) => {
    
    return (
      <span 
      className="text-lg hover:cursor-pointer" 
      style={style} 
      onMouseEnter={() => setHovredToken(token)} 
      onMouseLeave={() => setHovredToken(null)} 
      onBlur={() => setHovredToken(null)}
      data-token={token}>
      { children }
    </span>     
    )
  }

  const renderStringValue = (str: string) => {
    return str.split('\n').map((cur, index) => {
      if(index === 0){
        return <Container>{ cur }</Container>
      }
      
      return [<br />, <Container>{cur}</Container>]
    })

  }
  return (
    <>
      {
        format === 'decoded' 
        ? renderStringValue(stringValue) 
        : <Container>{`${token} `}</Container>
      }
    </>     
  )
}

export default TokenViewer