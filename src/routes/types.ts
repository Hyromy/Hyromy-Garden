import { type ReactNode } from "react"

/**
 * Represents a tree structure of paths, where each key can either be a string (representing a path) or another PathTree (representing a nested group of paths).
 */
export type PathTree = {
  [key: string]: string | PathTree
}

type TrimLeadingSlashes<S extends string> = S extends `/${infer Rest}` ? TrimLeadingSlashes<Rest> : S
type TrimTrailingSlashes<S extends string> = S extends `${infer Rest}/` ? TrimTrailingSlashes<Rest> : S

/**
 * A utility type that trims leading and trailing slashes from a string.
 */
export type TrimSlashes<S extends string> = TrimTrailingSlashes<TrimLeadingSlashes<S>>

/**
 * A utility type that joins a base path with a tail path, ensuring proper formatting.
 * 
 * If the tail path is empty, it returns the base path.
 * If the base path is "/", it returns the tail path prefixed with "/".
 * Otherwise, it concatenates the base and tail paths with a "/" separator.
 */
export type JoinPath<Base extends string, Tail extends string> =
  TrimSlashes<Tail> extends ""
    ? Base
    : Base extends "/"
      ? `/${TrimSlashes<Tail>}`
      : `${Base}/${TrimSlashes<Tail>}`

/**
 * Represents a group of routes, where each key can either be a string (representing a path) or another RouteGroup (representing a nested group of routes).
 * 
 * The `root` property represents the base path for the group.
 * The keys in the group represent the child routes.
 */
export type RouteGroup<Base extends string, T extends PathTree> = {
  root: Base
} & {
  [K in keyof T]: T[K] extends string
    ? JoinPath<Base, T[K]>
    : T[K] extends PathTree
      ? RouteGroup<JoinPath<Base, K & string>, T[K]>
      : never
}

/**
 * Represents the resolved paths for a given PathTree, where each key corresponds to a path in the tree.
 */
export type ResolvedPaths<T extends PathTree> = {
  [K in keyof T]: T[K] extends string
    ? JoinPath<"/", T[K]>
    : T[K] extends PathTree
      ? RouteGroup<JoinPath<"/", K & string>, T[K]>
      : never
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
