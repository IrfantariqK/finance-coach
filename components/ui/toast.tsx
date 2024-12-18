"use client"

import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ToastProps {
  title?: string
  description?: string
  variant?: 'default' | 'destructive'
}

export function Toast({ title, description, variant = 'default' }: ToastProps) {
  return (
    <ToastPrimitives.Root>
      {title && <ToastPrimitives.Title>{title}</ToastPrimitives.Title>}
      {description && (
        <ToastPrimitives.Description>{description}</ToastPrimitives.Description>
      )}
    </ToastPrimitives.Root>
  )
}
