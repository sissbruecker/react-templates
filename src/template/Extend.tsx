import React from 'react'
import { TemplateContextProvider } from './context'
import { ReactComponentLike } from 'prop-types'
import { getBlocksFromChildren } from './Block'

export interface ExtendProps {
  Component: ReactComponentLike
}

export const Extend: React.FC<ExtendProps> = (props) => {
  const { Component, children, ...componentProps } = props
  const { blocks } = getBlocksFromChildren(children)

  return (
    <TemplateContextProvider blocks={blocks}>
      <Component {...componentProps} />
    </TemplateContextProvider>
  )
}
