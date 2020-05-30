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
  data?: any
}

const BlockContext = createContext<BlockContextData>({ data: {} })

export const BlockContextProvider: React.FC<BlockContextData> = (props) => {
  const { children, ...contextData } = props
  const { data: inheritedData, parent: inheritedParent } = useContext(
    BlockContext
  )

  return (
    <BlockContext.Provider
      value={{
        parent: contextData.parent || inheritedParent,
        data: { ...inheritedData, ...contextData.data },
      }}
    >
      {children}
    </BlockContext.Provider>
  )
}

export const useBlockContext = () => {
  return useContext(BlockContext)
}
