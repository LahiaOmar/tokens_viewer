type TToken = number
type TSToken = string
type TTokensMap = {[key: string] : string}

const BPE_IMPLEMENTATION = ['basic'] as const

type TBPE_TYPES = typeof BPE_IMPLEMENTATION[number]


export type {
  TToken,
  TSToken,
  TBPE_TYPES,
  TTokensMap,
}

export {
  BPE_IMPLEMENTATION
}