import { FC } from "react"
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

  return (
    <span 
      className="text-lg hover:cursor-pointer" 
      style={style} 
      onMouseEnter={() => setHovredToken(token)} 
      onMouseLeave={() => setHovredToken(null)} 
      onBlur={() => setHovredToken(null)}
      data-token={token}>
      { format === 'decoded' ? stringValue : `${token} ` }
    </span>       
  )
}

export default TokenViewer