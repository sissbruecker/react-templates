import {
  BlockContextProvider,
  TemplateContextProvider,
  useBlockContext,
  useBlockOverride,
} from './context'
import React, { ReactNode } from 'react'

export interface BlockRule {
  blockId: string
  node: ReactNode
  nestedBlocks: BlockRule[]
}

export const isBlockComponent = (child: any) => {
  return typeof child === 'object' && child.type === Block
}

export const evaluateBlockComponent = (child: any): BlockRule => {
  const blockId = child.props.blockId
  const { remainingChildren, blocks } = getBlocksFromChildren(
    child.props.children
  )

  return {
    blockId,
    node: React.cloneElement(child, { children: remainingChildren }),
    nestedBlocks: blocks,
  }
}

export const getBlocksFromChildren = (children: ReactNode) => {
  const remainingChildren = []
  const blocks = []

  React.Children.toArray(children).forEach((child) => {
    if (isBlockComponent(child)) {
      blocks.push(evaluateBlockComponent(child))
    } else {
      remainingChildren.push(child)
    }
  })

  return {
    remainingChildren,
    blocks,
  }
}

export interface BlockProps {
  blockId: string
  data?: object
}

export const Block: React.FC<BlockProps> = ({ blockId, data, children }) => {
  const overrideBlock = useBlockOverride(blockId)

  return overrideBlock ? (
    // Override template context with nested set of blocks
    // Otherwise would run into infinite loop since the outer block context
    // would return the same override block again
    <TemplateContextProvider blocks={overrideBlock.nestedBlocks}>
      <BlockContextProvider parent={children} data={data}>
        {overrideBlock.node}
      </BlockContextProvider>
    </TemplateContextProvider>
  ) : (
    <BlockContextProvider data={data}>{children}</BlockContextProvider>
  )
}

export const Parent: React.FC = ({ children }) => {
  const { parent } = useBlockContext()

  return <>{parent || children}</>
}
