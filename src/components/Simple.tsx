import { Block, Parent } from '../template/Block'
import { Extend } from '../template/Extend'
import { BlockContextProvider, useBlockContext } from '../template/context'
import { useEffect, useState } from 'react'

const Base: React.FC = () => {
  const [value, setValue] = useState(42)

  useEffect(() => {
    const interval = setInterval(() => setValue(value + 1), 1000)

    return () => clearInterval(interval)
  }, [value])

  return (
    <Block blockId={'root'} data={{ answer: value }}>
      <Block blockId={'inner'}>
        <span>Answer</span>
      </Block>
    </Block>
  )
}

const AnswerValue: React.FC = () => {
  const { data } = useBlockContext()
  return <span>{data?.answer}</span>
}

export const Simple: React.FC = () => {
  return (
    <Extend Component={Base}>
      <Block blockId={'inner'}>
        <Parent />
        <span> is </span>
        <AnswerValue />
      </Block>
    </Extend>
  )
}

const ContextDisplay: React.FC = () => {
  const { data } = useBlockContext()

  return <span>{JSON.stringify(data)}</span>
}

export const ContextTest: React.FC = () => {
  return (
    <BlockContextProvider data={{ a: 'a' }}>
      <BlockContextProvider data={{ b: 'b' }}>
        <ContextDisplay />
      </BlockContextProvider>
    </BlockContextProvider>
  )
}
