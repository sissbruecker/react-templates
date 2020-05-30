import { createContext, ReactNode, useContext } from 'react'
import { BlockRule } from './Block'

interface TemplateContextData {
  blocks: BlockRule[]
}

const TemplateContext = createContext<TemplateContextData>({
  blocks: [],
})

export const TemplateContextProvider: React.FC<{
  blocks: BlockRule[]
}> = ({ blocks, children }) => {
  return (
    <TemplateContext.Provider value={{ blocks }}>
      {children}
    </TemplateContext.Provider>
  )
}

export const useTemplateContext = () => {
  return useContext(TemplateContext)
}

export const useBlockOverride = (blockId: string) => {
  const { blocks } = useContext(TemplateContext)
  return blocks.find((block) => block.blockId === blockId)
}

interface BlockContextData {
  parent?: ReactNode
}

const BlockContext = createContext<BlockContextData>({})

export const BlockContextProvider: React.FC<BlockContextData> = (props) => {
  const { children, ...contextData } = props
  return (
    <BlockContext.Provider value={contextData}>
      {children}
    </BlockContext.Provider>
  )
}

export const useBlockContext = () => {
  return useContext(BlockContext)
}
