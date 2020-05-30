import { useTemplateRules } from './context'
import { executeRules } from './rules'

export interface BlockProps {
  blockId: string
}

export const Block: React.FC<BlockProps> = ({ blockId, children }) => {
  const rules = useTemplateRules(blockId)
  const modifiedChildren = executeRules(rules, children)
  return <>{modifiedChildren}</>
}
