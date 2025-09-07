import type { ReactNode } from "react"
import { BreadcrumbNav } from "./breadcrumb-nav"
import { BackButton } from "./back-button"
import Image from "next/image"

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
      {/* {showBreadcrumb && <BreadcrumbNav />} */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Image src="/logo.png" alt="Panchal Samaj Logo" width={60} height={60} className="rounded-full" />
          <div>
            <h1 className="text-3xl font-bold text-orange-600">{title}</h1>
            {description && <p className="text-gray-600 mt-1">{description}</p>}
          </div>
        </div>
        {showBack && <BackButton href={backHref} />}

        {children && <div className="flex-shrink-0">{children}</div>}
      </div>
    </div>
  )
}
