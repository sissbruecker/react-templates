import React from 'react'
import { TemplateContextProvider } from './context'
import { getRulesFromChildren } from './rules'
import { ReactComponentLike } from 'prop-types'

export interface ExtendProps {
  Component: ReactComponentLike
}

export const Extend: React.FC<ExtendProps> = (props) => {
  const { Component, children, ...componentProps } = props
  const rules = getRulesFromChildren(children)

  return (
    <TemplateContextProvider rules={rules}>
      <Component {...componentProps} />
    </TemplateContextProvider>
  )
}
