import { Extend } from '../template/Extend'
import { CheckoutSuccess } from './CheckoutSuccess'
import { Block, Parent } from '../template/Block'
import { useBlockContext } from '../template/context'
import { Value } from '../template/Value'

export const CustomCheckoutSuccess: React.FC = () => {
  return (
    <Extend Component={CheckoutSuccess}>
      {/* Fix headline because some SEO guy complained, and add order number */}
      <Block blockId={'headline'}>
        <h1>Vielen Dank!</h1>
        <span style={{ color: 'blueviolet' }}>
          {/* Value can access data that was passed to this or an ancestor block */}
          Bestellungs-Nr.: <Value path={'order.orderId'} />
        </span>
      </Block>

      {/* Add order delivery time and add a hint about current situation */}
      <Block blockId={'copy'}>
        {/* Parent renders the original elements */}
        <Parent />
        <OrderDeliveryInfo />
        <p style={{ color: 'orangered' }}>
          Aufgrund der aktuellen Krise kann es zu Verzögerungen kommen!
        </p>
      </Block>

      {/* Blocks can be nested so that overrides only apply within this block */}
      <Block blockId={'order-info'}>
        <Parent />

        {/* Add hint about individual delivery times */}
        <Block blockId={'order-info-title'}>
          <Parent />
          <p style={{ color: 'orangered' }}>
            Bitte beachten Sie auch die individuellen Lieferzeiten.
          </p>
        </Block>

        {/* Add individual delivery times to order items, affects nested OrderItem component */}
        <Block blockId={'order-item-details'}>
          <Parent />
          <OrderItemDeliveryInfo />
        </Block>
      </Block>
    </Extend>
  )
}

/* Can also extract smaller components to display context data */
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
