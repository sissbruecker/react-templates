import React, { ReactElement, ReactNode } from 'react'

export interface TemplateRule {
  blockId: string
  apply: (parent: ReactNode) => ReactNode
}

export interface RuleProps {
  blockId: string
}

export const isRuleComponent = (child: any) => {
  return typeof child === 'object' && [Replace, Append].includes(child.type)
}

export const evaluateRuleComponent = (child: any) => {
  return child.type(child.props)
}

export const getRulesFromChildren = (children: ReactNode) => {
  return React.Children.toArray(children)
    .filter(isRuleComponent)
    .map(evaluateRuleComponent)
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
