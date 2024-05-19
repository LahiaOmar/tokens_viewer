import { FC } from "react"

interface ITokenizerSelector {
  onChange: (value: string) => void
}

const TokenizerSelector: FC<ITokenizerSelector> = ({
  onChange
}) => {
  
  return (
    <>
      <label htmlFor='tokenizer_selector'>Tokenizer version</label>
      <select 
        id='tokenizer_selector' 
        className='p-2 border border-gray-400 rounded-lg'
        onChange={({ target: { value }}) =>  onChange(value)}>
        <option selected> Choose a Tokenizer</option>
        <option value="basic">BPE - Basic Implementation</option>
      </select>
    </>
  )
}

export default TokenizerSelector

