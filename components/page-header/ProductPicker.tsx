import { useRouter } from 'next/router'

import { Link } from 'components/Link'
import { useMainContext } from 'components/context/MainContext'
import { LinkExternalIcon } from '@primer/octicons-react'
import { Picker } from 'components/ui/Picker'
import { useTranslation } from 'components/hooks/useTranslation'

export const ProductPicker = () => {
  const router = useRouter()
  const { activeProducts, currentProduct } = useMainContext()
  const { t } = useTranslation('picker')

  return (
    <Picker
      variant="inline"
      data-testid="product-picker"
      data-current-product-path={currentProduct?.href}
      defaultText={t('product_picker_default_text')}
      options={activeProducts.map((product) => ({
        text: product.name,
        selected: product.name === currentProduct?.name,
        item: (
          <Link href={`${product.external ? '' : `/${router.locale}`}${product.href}`}>
            {product.name}
            {product.external && (
              <span className="ml-1">
                <LinkExternalIcon size="small" />
              </span>
            )}
          </Link>
        ),
      }))}
    />
  )
}
