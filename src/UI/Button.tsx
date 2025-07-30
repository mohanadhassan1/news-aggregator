"use client"
import { cn } from '@/lib';
import React from 'react'
import Loading from "@/components/LoadingSpinner"

interface IButtonProps {
  variant?: "default" | "secondary" | "outline" | "ghost" | "link" | "destructive" | "success" | "warning" | "info",
  className?: string,
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
  text?: string,
  disabled?: boolean,
  icon?: React.ReactNode,
  containerStyle?: string,
  iconSeparator?: boolean | undefined
  separatorStyle?: string,
  content?: React.ReactNode,
  loading?: boolean,
  textStyle?: string,
  type: "submit" | "button"
}

const Button = ({
  variant = 'default',
  className,
  onClick,
  text,
  disabled = false,
  icon,
  containerStyle,
  iconSeparator = false,
  separatorStyle,
  content,
  loading,
  textStyle,
  type
}: IButtonProps) => {

  // Get button styles based on variant
  const getButtonStyles = () => {
    switch(variant) {
      case 'default':
        return 'bg-primary text-neutral-white hover:bg-primary-medium active:bg-primary-dark';
      case 'secondary':
        return 'bg-secondary text-neutral-white hover:bg-secondary-light active:bg-secondary-dark';
      case 'outline':
        return 'border border-primary bg-neutral-white text-primary hover:bg-primary-light hover:text-primary-dark';
      case 'ghost':
        return 'hover:bg-neutral-gray-100 hover:text-neutral-gray-900';
      case 'link':
        return 'text-primary underline-offset-4 hover:underline bg-transparent shadow-none';
      case 'destructive':
        return 'bg-error text-neutral-white hover:bg-error-dark active:bg-error-dark';
      case 'success':
        return 'bg-success text-neutral-white hover:bg-success-dark active:bg-success-dark';
      case 'warning':
        return 'bg-warning text-neutral-white hover:bg-warning-dark active:bg-warning-dark';
      case 'info':
        return 'bg-info text-neutral-white hover:bg-info-dark active:bg-info-dark';
      default:
        return 'bg-primary text-neutral-white hover:bg-primary-medium active:bg-primary-dark';
    }
  }

  // Get separator styles based on variant
  const getSeparatorStyles = () => {
    switch(variant) {
      case 'default':
        return 'bg-neutral-white';
      case 'secondary':
        return 'bg-neutral-white';
      case 'outline':
        return 'bg-primary';
      case 'ghost':
        return 'bg-neutral-gray-400';
      case 'destructive':
        return 'bg-neutral-white';
      case 'success':
        return 'bg-neutral-white';
      case 'warning':
        return 'bg-neutral-white';
      case 'info':
        return 'bg-neutral-white';
      default:
        return 'bg-neutral-white';
    }
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn('flex flex-row items-center justify-center gap-2 rounded-lg px-6 py-2 w-fit shadow-sm',
        getButtonStyles(),
        disabled && 'opacity-50 cursor-not-allowed',
        containerStyle)}>
      {icon ?? <></>}
      {iconSeparator && <div className={cn('h-[40px] bg-black w-[1px]', getSeparatorStyles(), separatorStyle)} />}
      {loading ? (
        <Loading />
      ) : (
        <p
          className={cn(`rounded-lg text-[12px] sm:text-[16px] font-[400] text-nowrap`, className, textStyle)}
        >
          {content ?? text}
        </p>
      )}
    </button>
  )
}

export default Button