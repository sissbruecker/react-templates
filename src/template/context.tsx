import { createContext, ReactNode, useContext } from 'react'
import { BlockRule, TemplateRule } from './rules'

interface TemplateContextData {
  rules: TemplateRule[]
  blocks: BlockRule[]
}

const TemplateContext = createContext<TemplateContextData>({
  rules: [],
  blocks: [],
})

export const TemplateContextProvider: React.FC<{
  rules: TemplateRule[]
  blocks: BlockRule[]
}> = ({ rules, blocks, children }) => {
  return (
    <TemplateContext.Provider value={{ rules, blocks }}>
      {children}
    </TemplateContext.Provider>
  )
}

export const useTemplateContext = () => {
  return useContext(TemplateContext)
}

export const useTemplateRules = (blockId: string) => {
  const { rules } = useContext(TemplateContext)
  return rules.filter((rule) => rule.blockId === blockId)
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
