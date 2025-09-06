import type { ReactNode } from "react"
import { BreadcrumbNav } from "./breadcrumb-nav"
import { BackButton } from "./back-button"

interface PageHeaderProps {
  title: string
  description?: string
  showBack?: boolean
  backHref?: string
  children?: ReactNode
  showBreadcrumb?: boolean
}

export function PageHeader({
  title,
  description,
  showBack = false,
  backHref,
  children,
  showBreadcrumb = true,
}: PageHeaderProps) {
  return (
    <div className="mb-6">
      {showBreadcrumb && <BreadcrumbNav />}
      {showBack && <BackButton href={backHref} />}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          {description && <p className="text-gray-600 text-sm sm:text-base">{description}</p>}
        </div>
        {children && <div className="flex-shrink-0">{children}</div>}
      </div>
    </div>
  )
}
