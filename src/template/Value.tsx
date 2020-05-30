import get from 'lodash/get'
import { useBlockContext } from './context'

interface ValueProps {
  path: string
}

export const Value: React.FC<ValueProps> = ({ path }) => {
  const { data } = useBlockContext()

  return get(data, path)
}
