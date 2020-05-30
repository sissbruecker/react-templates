import {
  BlockContextProvider,
  TemplateContextProvider,
  useBlockContext,
  useBlockOverride,
  useTemplateRules,
} from './context'
import { executeRules, getBlocksFromChildren } from './rules'

export interface BlockProps {
  blockId: string
}

export const Block: React.FC<BlockProps> = ({ blockId, children }) => {
  // const rules = useTemplateRules(blockId)
  // const modifiedChildren = executeRules(rules, children)
  const overrideBlock = useBlockOverride(blockId)
  const subBlocks = getBlocksFromChildren(children)

  return overrideBlock ? (
    // Override template context with new set of blocks
    // Otherwise would run into infinite loop since the outer block context
    // would return the same override blocks again
    <TemplateContextProvider rules={[]} blocks={subBlocks}>
      {/* Provide override block with extra data */}
      <BlockContextProvider parent={children}>
        {overrideBlock.node}
      </BlockContextProvider>
    </TemplateContextProvider>
  ) : (
    <>{children}</>
  )
}

export const Parent: React.FC = ({ children }) => {
  const { parent } = useBlockContext()

  return <>{parent || children}</>
}
