"use client"

import {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastViewport,
  ToastClose,
} from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"
import { AnimatePresence, motion } from "framer-motion"
import clsx from "clsx"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <>
      <ToastViewport className="z-[100] fixed bottom-4 right-4 flex flex-col gap-3 w-[360px] max-w-full" />

      <div className="fixed bottom-4 right-4 z-[99] flex flex-col gap-3 w-[360px] max-w-full">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <Toast
                {...toast}
                open={toast.open}
                onOpenChange={(open) => {
                  if (!open) toast.onOpenChange?.(open)
                }}
                className={clsx(
                  "relative flex w-full items-start gap-3 rounded-md border px-4 py-3 shadow-lg transition-all",
                  toast.variant === "destructive"
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border border-zinc-200 bg-white text-zinc-900"
                )}
              >
                <div className="flex flex-col space-y-1 text-sm">
                  {toast.title && (
                    <ToastTitle className="font-medium leading-snug text-base">
                      {toast.title}
                    </ToastTitle>
                  )}
                  {toast.description && (
                    <ToastDescription className="text-sm text-muted-foreground">
                      {toast.description}
                    </ToastDescription>
                  )}
                </div>

                <ToastClose className="absolute right-2 top-2 text-zinc-400 hover:text-zinc-600" />
              </Toast>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  )
}
