import { TSToken , TTokensMap, TToken} from "./types"

function count_pair(text: number[]) {
  const pairs: { [key: string] : number } = {}
  
  for(let i = 0 ; i < text.length - 1; i++){
    const key = `${text[i]},${text[i+1]}` 
    if(!pairs[key]) pairs[key] = 0
    pairs[key] += 1
  }
  
  return pairs
}

function get_max_pair(pairs: {[key: string]: number}){
  const pairs_array = Object.entries(pairs).map(a => a).sort((a, b) => a[1] <= b[1] ? 1 : -1)
  return pairs_array[0]
}

function utf8_encode(text: string){
  const encoder = new TextEncoder();
   
  const utf8Array = encoder.encode(text);

  return Array.from(utf8Array);
}


function utf8_decode(tokens: TToken[]){
  const decoder = new TextDecoder()

  return decoder.decode(new Uint8Array(tokens))
}

function merge(tokens: TToken[] , token: TSToken, idx: number){
  const new_tokens: TToken[] = []
  const [first, second] = token.split(',').map(a => parseInt(a))

  let i = 0
  while(i < tokens.length){

    if((i + 1) < tokens.length && ( tokens[i] === first && tokens[i+1] === second )){
      new_tokens.push(idx)
      i += 1
    }
    else{
      new_tokens.push(tokens[i])
    }

    i += 1
  }

  return new_tokens
}

const encoder = (input: string) => {

  if(!input) return {tokens : [], map_tokens : {}}

  let tokens = utf8_encode(input)


  let idx = 257
  const map_tokens: TTokensMap = {}

  while(tokens.length >= 2){  
    const pairs = count_pair(tokens)
    const max_pair = get_max_pair(pairs)
    
    if(max_pair[1] <= 1){
      break;
    }
    map_tokens[idx] = max_pair[0]
  
    // merge
    tokens = merge(tokens, max_pair[0], idx)
    idx++
  }
  return { tokens, map_tokens }
}

const decoder = (tokens: TToken[], map_tokens: TTokensMap) => {
  let _tokens = []
  let current = [...tokens]
  
  while(true){
    let flag = false
    _tokens = [...current]
    current = []

    for(let i = 0; i < _tokens.length; i++){
      if(map_tokens[_tokens[i]]){
        const [first, second] = map_tokens[_tokens[i]].split(',').map(a => parseInt(a))
          
        current.push(first)
        current.push(second)
        
        flag = true
      }
      else{
        current.push(_tokens[i])
      }
    }
    
    if(!flag){
      break;
    }   
  }

  return _tokens
}

const special_caracters: {[key: number] : string} = {
  [utf8_encode(" ")[0]] : ' ',
  [utf8_encode("\n")[0]]: '\n'
}

export const basic_bpe = {
  encoder,
  decoder,
  utf8_decode,
  special_caracters
}