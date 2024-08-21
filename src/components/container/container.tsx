import { ComponentPropsWithoutRef } from "react"

import clsx from "clsx"

import s from "./container.module.scss"

export const Container = ({ className, ...restProps }: ComponentPropsWithoutRef<"div">) => {
  return <div className={clsx(s.container, className)} {...restProps} />
}
