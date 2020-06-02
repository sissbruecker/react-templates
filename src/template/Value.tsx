import genericGet from 'lodash/get'
import { useBlockContext } from './context'

interface ValueProps<TContext> {
  get: string | ((context: TContext) => any)
}

export const Value = <TContext extends any>({ get }: ValueProps<TContext>) => {
  const { data } = useBlockContext()

  if (typeof get === 'string') return genericGet(data, get)

  return get(data) || null
}
