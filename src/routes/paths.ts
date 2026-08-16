import type { PathTree, ResolvedPaths } from "./types"

export const PATHS = createPaths({
  index: "",
})

/**
 * Creates a path tree with resolved paths.
 * 
 * @param paths The path tree to resolve.
 * @returns The resolved path tree.
 */
function createPaths<const T extends PathTree>(paths: T): ResolvedPaths<T> {
  const result: PathTree = {}

  for (const key in paths) {
    const value = paths[key]
    if (typeof value == "string") {
      result[key] = joinPath("/", value)
    } else {
      result[key] = resolveGroup(joinPath("/", key), value)
    }
  }

  collectPaths(result, new Set<string>())

  return result as ResolvedPaths<T>
}

/**
 * Joins a base path with a tail path, ensuring proper formatting.
 * 
 * @param base The base path.
 * @param tail The tail path.
 * @returns The joined path.
 */
function joinPath(base: string, tail: string): string {
  const segment = trimSlashes(tail)
  if (segment == "") return base
  if (base == "/") return `/${segment}`
  return `${base}/${segment}`
}

/**
 * Removes leading and trailing slashes from a string.
 * 
 * @param value 
 * @returns 
 */
function trimSlashes(value: string): string {
  return value.replace(/^\/+/, "").replace(/\/+$/, "")
}

/**
 * Resolves a group of routes based on a base path and a set of child paths.
 * 
 * @param base The base path.
 * @param children The child paths.
 * @returns The resolved group of routes.
 */
function resolveGroup(base: string, children: PathTree): PathTree {
  const result: PathTree = { root: base }

  for (const key in children) {
    const value = children[key]
    if (typeof value == "string") {
      result[key] = joinPath(base, value)
    } else {
      result[key] = resolveGroup(joinPath(base, key), value)
    }
  }

  return result
}

/**
 * Collects all the paths from a path tree and checks for duplicates.
 * 
 * @param tree The path tree to collect paths from.
 * @param seen The set of seen paths.
 */
function collectPaths(tree: PathTree, seen: Set<string>): void {
  for (const key in tree) {
    const value = tree[key]
    if (typeof value == "string") {
      if (seen.has(value)) {
        throw new Error(`Duplicate path detected: "${value}"`)
      }
      seen.add(value)
    } else {
      collectPaths(value, seen)
    }
  }
}
