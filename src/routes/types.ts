import { type ReactNode } from "react"

/**
 * A utility type that checks for unique values in an object.
 */
export type CheckUniqueValues<T extends Record<string, string>> = {
  [K in keyof T]: T[K] extends T[Exclude<keyof T, K>]
    ? never
    : T[K]
}

/**
 * Represents a route in the application.
 */
export type AppRoute = {
  /** The path for the route. */
  path?: string
  
  /** The nested routes for this route. */
  children?: AppRoute[]

  /**
   * The component to render when the route is matched.
   * 
   * If is skipped, the route will be a group of routes.
   * 
   * If element and children are set, the element works as Outlet component for the children.
   */
  element?: ReactNode

  /**
   * Indicates if the route is an index.
   * 
   * If is true, the route will be rendered by default, skipping its path.
   */
  index?: boolean
}
