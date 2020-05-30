import React, { ReactElement, ReactNode } from 'react'
import { Block } from './Block'

export interface TemplateRule {
  blockId: string
  apply: (parent: ReactNode) => ReactNode
}

export interface BlockRule {
  blockId: string
  node: ReactNode
}

export interface RuleProps {
  blockId: string
}

export const isRuleComponent = (child: any) => {
  return typeof child === 'object' && [Replace, Append].includes(child.type)
}

export const isBlockComponent = (child: any) => {
  return typeof child === 'object' && child.type === Block
}

export const evaluateRuleComponent = (child: any) => {
  return child.type(child.props)
}

export const evaluateBlockComponent = (child: any): BlockRule => {
  const blockId = child.props.blockId
  return {
    blockId,
    node: child,
  }
}

export const getRulesFromChildren = (children: ReactNode) => {
  return React.Children.toArray(children)
    .filter(isRuleComponent)
    .map(evaluateRuleComponent)
}

export const getBlocksFromChildren = (children: ReactNode) => {
  return React.Children.toArray(children)
    .filter(isBlockComponent)
    .map(evaluateBlockComponent)
}

export const executeRules = (rules: TemplateRule[], children: ReactNode) => {
  return rules.reduce((last, rule) => rule.apply(last), children)
}

export const Replace: React.FC<RuleProps> = ({ blockId, children }) => {
  return {
    blockId,
    apply: () => {
      return <>{children}</>
    },
  } as any
}

export const Append: React.FC<RuleProps> = ({ blockId, children }) => {
  return {
    blockId,
    apply: (parent: ReactElement) => {
      return (
        <>
          {parent}
          {children}
        </>
      )
    },
  } as any
}
