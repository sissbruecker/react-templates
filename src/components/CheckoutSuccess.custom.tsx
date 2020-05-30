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
      {/* Fix headline because some SEO guy complained, and add order number */}
      <Block blockId={'headline'}>
        <h1>Vielen Dank!</h1>
        <OrderNumberInfo />
      </Block>

      {/* Add order delivery time and add a hint about current situation */}
      <Block blockId={'copy'}>
        <Parent />
        <OrderDeliveryInfo />
        <p style={{ color: 'orangered' }}>
          Aufgrund der aktuellen Krise kann es zu Verzögerungen kommen!
        </p>
      </Block>

      <Block blockId={'order-info'}>
        <Parent />

        {/* Add hint about individual delivery times */}
        <Block blockId={'order-info-title'}>
          <Parent />
          <p style={{ color: 'orangered' }}>
            Bitte beachten Sie auch die individuellen Lieferzeiten.
          </p>
        </Block>

        {/* Add individual delivery times to order items */}
        <Block blockId={'order-item-details'}>
          <Parent />
          <OrderItemDeliveryInfo />
        </Block>
      </Block>
    </Extend>
  )
}
