import cx from 'classnames'
import dayjs from 'dayjs'

import { Link } from 'components/Link'
import { ArrowRightIcon } from '@primer/octicons-react'
import { FeaturedLink } from 'components/context/ProductLandingContext'
import { TruncateLines } from 'components/TruncateLines'

type Props = {
  title?: string
  viewAllHref?: string
  articles: Array<FeaturedLink>
  variant?: 'compact' | 'spaced'
  titleVariant?: 'large' | 'default'
}
export const ArticleList = ({
  title,
  viewAllHref,
  articles,
  variant = 'compact',
  titleVariant = 'default',
}: Props) => {
  return (
    <>
      {title && (
        <div className="mb-4 d-flex flex-items-baseline">
          <h3
            className={cx(
              titleVariant === 'large'
                ? 'f4 text-normal text-mono text-uppercase'
                : 'f5 text-normal text-mono underline-dashed color-text-secondary'
            )}
          >
            {title}
          </h3>
          {viewAllHref && (
            <Link href={viewAllHref} className="ml-4">
              View all <ArrowRightIcon size={14} className="v-align-middle" />
            </Link>
          )}
        </div>
      )}

      <ul className="list-style-none" data-testid="article-list">
        {articles.map((link) => {
          return (
            <li key={link.href} className={cx(variant === 'compact' && 'border-top')}>
              <Link
                href={link.href}
                className="link-with-intro Bump-link--hover no-underline d-block py-3"
              >
                <h4 className="link-with-intro-title">
                  <span dangerouslySetInnerHTML={{ __html: link.title }} />
                  <span className="Bump-link-symbol">→</span>
                </h4>
                {!link.hideIntro && link.intro && (
                  <TruncateLines
                    as="p"
                    maxLines={variant === 'spaced' ? 6 : 2}
                    className="link-with-intro-intro color-text-secondary mb-0 mt-1"
                  >
                    <span dangerouslySetInnerHTML={{ __html: link.intro }} />
                  </TruncateLines>
                )}
                {link.date && (
                  <time
                    className="tooltipped tooltipped-n color-text-tertiary text-mono mt-1"
                    aria-label={dayjs(link.date).format('LLL')}
                  >
                    {dayjs(link.date).format('MMMM DD')}
                  </time>
                )}
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}
