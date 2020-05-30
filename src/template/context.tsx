import { createContext, useContext } from 'react'
import { TemplateRule } from './rules'

interface TemplateContextData {
  rules: TemplateRule[]
}

const TemplateContext = createContext<TemplateContextData>({ rules: [] })

export const TemplateContextProvider: React.FC<{ rules: TemplateRule[] }> = ({
  rules,
  children,
}) => {
  return (
    <TemplateContext.Provider value={{ rules }}>
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
