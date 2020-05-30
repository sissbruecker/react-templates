import { Extend } from '../template/Extend'
import { CheckoutSuccess } from './CheckoutSuccess'
import { Block, Parent } from '../template/Block'
import { useBlockContext } from '../template/context'

const OrderNumberInfo: React.FC = () => {
  const { data } = useBlockContext()
  return (
    <span style={{ color: 'blueviolet' }}>
      Bestellungs-Nr.: {data?.order?.orderId}
    </span>
  )
}

const OrderDeliveryInfo: React.FC = () => {
  const { data } = useBlockContext()
  return (
    <span style={{ color: 'blueviolet' }}>
      Diese wird vermutlich in {data?.order?.deliveryTime} Tagen geliefert.
    </span>
  )
}
const OrderItemDeliveryInfo: React.FC = () => {
  const { data } = useBlockContext()
  return (
    <span style={{ color: 'blueviolet' }}>
      Lieferzeit: {data?.item?.deliveryTime} Tage
    </span>
  )
}

export const CustomCheckoutSuccess: React.FC = () => {
  return (
    <Extend Component={CheckoutSuccess}>
      <Block blockId={'headline'}>
        <h1>Vielen Dank!</h1>
        <OrderNumberInfo />
      </Block>

      <Block blockId={'copy'}>
        <Parent />
        <OrderDeliveryInfo />
        <p style={{ color: 'orangered' }}>
          Aufgrund der aktuellen Krise kann es zu Verzögerungen kommen!
        </p>
      </Block>

      <Block blockId={'order-info'}>
        <Parent />

        <Block blockId={'order-info-title'}>
          <Parent />
          <p style={{ color: 'orangered' }}>
            Bitte beachten Sie auch die individuellen Lieferzeiten.
          </p>
        </Block>

        <Block blockId={'order-item-details'}>
          <Parent />
          <OrderItemDeliveryInfo />
          <br />
        </Block>
      </Block>
    </Extend>
  )
}
