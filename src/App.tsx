import { useEffect, useState } from 'react'
import './App.css'
import { generateRandomColor } from './utils'
import TokensContainer from './components/TokensContainer'
import TokenizerSelector from './components/ToknizerSelector'
import Footer from './components/Footer'
import { TToken, TTokensMap } from './Tokenizer/types'
import { basic_bpe } from './Tokenizer/basic_bpe'
import TokenViewer from './components/Token'

function App() {
  const [content, setContent] = useState('')
  const [tokens, setTokens] = useState<TToken[]>([])
  const [mapTokens, setMapTokens] = useState<TTokensMap>({})
  const [tokenStrColor, setTokenStrColor] = useState<{
    [key: string] : {str: string, color: string}
  }>({})
  const [hovredToken, setHovredToken] = useState<number | null>(null)
  const [tokenizerSelected, setTokenizerSelected] = useState('')

  const bpe_used = () => {
    switch(tokenizerSelected){
      case 'basic' : {
        return basic_bpe
      }

      default:
        return basic_bpe
    }
  }

 useEffect(() => {
  if(!tokenizerSelected) return
  
  const { encoder } = bpe_used()
  const { tokens: _tokens, map_tokens } = encoder(content) 
  
  setTokens(_tokens)
  setMapTokens(map_tokens)
 }, [content, tokenizerSelected])

 useEffect(() => {
  const map_token_string: {[key: string] : {str: string, color: string}} = {}
  const { utf8_decode, decoder } = bpe_used()

  tokens.forEach(token => {
    let str = ''
    const color = generateRandomColor()
    str = utf8_decode(decoder([token], mapTokens))

    if(!map_token_string[token]){
      map_token_string[token] = {
        str, color
      }
    }
  })

  setTokenStrColor(map_token_string)
 }, [mapTokens])


  const textAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  return (
    <div className='flex flex-col items-center justify-between min-h-screen'>
      <div className='flex w-full max-w-7xl space-y-5 flex-col justify-center font-mono'>
        <span className='text-center text-3xl p-2'>Tokenizer Token Viewer</span>
        <div className='flex flex-col space-y-5'>
          <div className='flex p-5 sm:space-x-4 max-sm:space-y-4 max-sm:flex-col'>
            <div className='flex sm:w-1/2 max-sm:w-full justify-center items-center border hover:border-blue-400'>
              <textarea className='p-4 min-h-96 resize-y w-full h-full whitespace-nowrap shadow-sm border bg-slate-50 border-gray-400' 
                value={content} 
                onChange={textAreaChange}
                placeholder='Insert some text/code ...' />
            </div>
            <div className='sm:w-1/2 max-sm:w-full items-center justify-center space-y-4'>
              <div className='flex flex-col space-y-4 border border-gray-400 hover:border-blue-400 p-4 bg-slate-50 rounded-lg'>
                <TokenizerSelector onChange={(name) => setTokenizerSelected(name)} />
              </div>
              <div className='border p-4 rounded-lg border-gray-400 hover:border-blue-400 w-full shadow-sm bg-slate-50'>
                <div>Input length : { content.length }</div>
                <div>Tokens length : { tokens.length  }</div>
              </div>
            </div>
          </div>
          <div className='flex p-5 sm:space-x-4 max-sm:space-y-4 max-sm:flex-col'>
            <TokensContainer title='Tokens Mapping'>
              {
                tokens.map(token => <TokenViewer tokenStrColor={tokenStrColor[token]} setHovredToken={setHovredToken} token={token} format='decoded' hovredToken={hovredToken} />)
              }
            </TokensContainer>
            <TokensContainer title='Tokens'>
              {
                tokens.map(token => <TokenViewer tokenStrColor={tokenStrColor[token]} setHovredToken={setHovredToken} token={token} format='encoded' hovredToken={hovredToken} />)
              }
            </TokensContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App
