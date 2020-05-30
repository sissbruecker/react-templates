import React, { ReactElement, ReactNode } from 'react'

/*
Experiment with individual rules that modify existing blocks instead of overwriting them
Rules here are obsolete with the block override / <Parent/> mechanism
But might be a future option to have rules that manipulate existing DOM in
some custom way, like adding or removing a CSS class, or changing some props
*/

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
