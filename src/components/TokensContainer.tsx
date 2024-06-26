import { FC, ReactNode } from "react"

interface ITokensContainer {
  title: string,
  children: ReactNode
}

const TokensContainer: FC<ITokensContainer> = ({ title, children }) => {
  return (
    <div className='flex flex-col p-2 bg-slate-50 rounded-lg items-center sm:w-1/2 max-sm:w-full border border-gray-400 hover:border-blue-400'>
      <span className='text-xl'>{ title }</span>
      <div className='w-full whitespace-break-spaces p-2'>
        {
          children
        }
      </div>
    </div>
  )
}

export default TokensContainer