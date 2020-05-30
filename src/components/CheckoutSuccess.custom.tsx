import { Extend } from '../template/Extend'
import { CheckoutSuccess } from './CheckoutSuccess'
import { Append, Replace } from '../template/rules'

export const CustomCheckoutSuccess: React.FC = () => {
  return (
    <Extend Component={CheckoutSuccess}>
      <Replace blockId={'headline'}>
        <h1>Vielen Dank!</h1>
      </Replace>
      <Append blockId={'headline'}>
        <span>Order Id: 42345</span>
      </Append>

      <Append blockId={'copy'}>
        <p>
          <span>Blaue Hose</span>
          <br />
          <span>Art.-Nummer: 123</span>
          <br />
        </p>
      </Append>
    </Extend>
  )
}
