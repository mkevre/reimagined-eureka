import { useRouter } from 'next/router'
import cx from 'classnames'
import { useState, useEffect } from 'react'
import { ChevronDownIcon } from '@primer/octicons-react'

import { Link } from 'components/Link'
import { ProductTreeNode, useMainContext } from 'components/context/MainContext'
import { AllProductsLink } from 'components/product/AllProductsLink'

export const SidebarProduct = () => {
  const router = useRouter()
  const { currentProductTree } = useMainContext()
  useEffect(() => {
    const activeArticle = document.querySelector('.sidebar-article.active')
    // Setting to the top doesn't give enough context of surrounding categories
    activeArticle?.scrollIntoView({ block: 'center' })
    // scrollIntoView affects some articles that are very low in the sidebar
    // The content scrolls down a bit. This sets the article content back up top
    window?.scrollTo(0, 0)
  }, [])

  if (!currentProductTree) {
    return null
  }

  const productTitle = currentProductTree.renderedShortTitle || currentProductTree.renderedFullTitle
  const routePath = `/${router.locale}${router.asPath.split('?')[0]}` // remove query string
  const hasExactCategory = currentProductTree.childPages.find(({ href }) =>
    routePath.includes(href)
  )
  return (
    <>
      <AllProductsLink />

      {!currentProductTree.page.hidden && (
        <>
          <li title="" className="sidebar-product mb-2">
            <Link
              href={currentProductTree.href}
              className="pl-4 pr-5 pb-1 f4 color-text-primary no-underline"
            >
              {productTitle}
            </Link>
          </li>

          <li>
            <ul className="sidebar-categories list-style-none">
              {currentProductTree.childPages.map((childPage, i) => {
                const isStandaloneCategory = childPage.page.documentType === 'article'

                const childTitle = childPage.renderedShortTitle || childPage.renderedFullTitle

                const isActive = routePath.includes(`${childPage.href}/`)
                const isCurrent = routePath === childPage.href
                const defaultOpen = hasExactCategory ? isActive || isCurrent : false
                return (
                  <li
                    key={childPage.href + i}
                    className={cx(
                      'sidebar-category py-1',
                      isActive && 'active',
                      isCurrent && 'is-current-page',
                      isStandaloneCategory && 'standalone-category'
                    )}
                  >
                    {isStandaloneCategory ? (
                      <Link
                        href={childPage.href}
                        className="pl-4 pr-2 py-2 d-block flex-auto mr-3 color-text-primary no-underline text-bold"
                      >
                        {childTitle}
                      </Link>
                    ) : (
                      <CollapsibleSection
                        defaultOpen={defaultOpen}
                        routePath={routePath}
                        title={childTitle}
                        page={childPage}
                      />
                    )}
                  </li>
                )
              })}
            </ul>
          </li>
        </>
      )}
    </>
  )
}

type SectionProps = {
  routePath: string
  page: ProductTreeNode
  title: string
  defaultOpen: boolean
}
const CollapsibleSection = (props: SectionProps) => {
  const { routePath, defaultOpen, title, page } = props
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <details open={defaultOpen} onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)}>
      <summary>
        <div className="d-flex flex-justify-between">
          <div className="pl-4 pr-1 py-2 f6 text-uppercase d-block flex-auto mr-3 color-text-primary no-underline text-bold">
            {title}
          </div>
          <span style={{ marginTop: 7 }} className="flex-shrink-0 pr-3">
            <ChevronDownIcon className={cx('opacity-60', isOpen && 'rotate-180')} />
          </span>
        </div>
      </summary>

      {
        <>
          {/* <!-- some categories have maptopics with child articles --> */}
          {page.childPages[0]?.page.documentType === 'mapTopic' ? (
            <ul className="sidebar-topics list-style-none position-relative">
              {page.childPages.map((childPage, i) => {
                const childTitle = childPage.renderedShortTitle || childPage.renderedFullTitle

                const isActive = routePath.includes(childPage.href)
                const isCurrent = routePath === childPage.href

                return (
                  <li
                    key={childPage.href + i}
                    className={cx(
                      'sidebar-maptopic',
                      isActive && 'active',
                      isCurrent && 'is-current-page'
                    )}
                  >
                    <details open={isActive} onToggle={(e) => e.stopPropagation()}>
                      <summary>
                        <div className={cx('pl-4 pr-5 py-2 no-underline')}>{childTitle}</div>
                      </summary>
                      <ul className="sidebar-articles my-2">
                        {childPage.childPages.map((grandchildPage, i, arr) => {
                          const grandchildTitle =
                            grandchildPage.renderedShortTitle || grandchildPage.renderedFullTitle
                          const isLast = i === arr.length - 1
                          const isActive = routePath === grandchildPage.href
                          return (
                            <li
                              key={grandchildPage.href + i}
                              className={cx('sidebar-article', isActive && 'active')}
                            >
                              <Link
                                href={grandchildPage.href}
                                className={cx(
                                  'pl-6 pr-5 py-1 no-underline',
                                  isLast && 'pb-2',
                                  isActive && 'color-text-link'
                                )}
                              >
                                {grandchildTitle}
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    </details>
                  </li>
                )
              })}
            </ul>
          ) : page.childPages[0]?.page.documentType === 'article' ? (
            <ul className="sidebar-articles list-style-none">
              {/* <!-- some categories have no maptopics, only articles --> */}
              {page.childPages.map((childPage, i, arr) => {
                const childTitle = childPage.renderedShortTitle || childPage.renderedFullTitle
                const isLast = i === arr.length - 1

                const isActive = routePath.includes(childPage.href)
                const isCurrent = routePath === childPage.href
                return (
                  <li
                    key={childPage.href + i}
                    className={cx(
                      'sidebar-article',
                      isActive && 'active',
                      isCurrent && 'is-current-page'
                    )}
                  >
                    <Link
                      href={childPage.href}
                      className={cx(
                        'pl-6 pr-5 py-1 no-underline',
                        isLast && 'pb-2',
                        isActive && 'color-text-link'
                      )}
                    >
                      {childTitle}
                    </Link>
                  </li>
                )
              })}
            </ul>
          ) : null}
        </>
      }
    </details>
  )
}
