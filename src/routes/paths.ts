import type { CheckUniqueValues } from "./types"

const createPaths = <T extends Record<string, string>>(paths: T & CheckUniqueValues<T>) => paths

export const PATHS = createPaths({
  index: "/",
} as const)
