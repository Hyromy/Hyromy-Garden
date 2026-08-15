import { lazy } from "react"
import type { AppRoute } from "./types"
import { PATHS } from "./paths"
import { Route } from "react-router-dom"

const NotFound = lazy(() => import("../pages/NotFound"))
const Index = lazy(() => import("../pages/Index"))

/**
 * Defines the available routes in the application.
 * 
 * @example
 * ```tsx
 * const appsRoutes: AppRoute[] = [
 *   // flat routes
 *   { path: "/",        element: <Index />   },
 *   { path: "/profile", element: <Profile /> },
 * 
 *   // layout routes
 *   {
 *     path: "/dashboard",
 *     element: <DashboardLayout />,
 *     children: [
 *       { index: true,     element: <Module1 /> },
 *       { path: "module2", element: <Module2 /> },
 *     ]
 *   },
 * 
 *   // group routes
 *   {
 *     path: "/games",
 *     children: [
 *       { path: "snake",  element: <Snake />  },
 *       { path: "tetris", element: <Tetris /> },
 *     ]
 *   }
 * ]
 * 
 * // "/"        => Index
 * // "/profile" => Profile
 * 
 * // "/dashboard"         => DashboardLayout + Module1
 * // "/dashboard/module2" => DashboardLayout + Module2
 * 
 * // "/games"        => void
 * // "/games/snake"  => Snake
 * // "/games/tetris" => Tetris
 * ```
 */
export const availableRoutes: AppRoute[] = [
  {
    path: PATHS.index,
    element: <Index />
  },
  {
    path: "*",
    element: <NotFound />
  }
]

/**
 * Renders the routes based on the provided route configuration.
 * 
 * @param routes The array of route configurations to render.
 * @returns The rendered routes.
 */
export const renderRoutes = (routes: AppRoute[]) => (
  routes.map((route, index) => {
    if (route.index) {
      return (
        <Route
          key={index}
          index
          element={route.element}
        />
      )
    }

    return (
      <Route
        key={index}
        path={route.path}
        element={route.element}
      >
        {route.children && renderRoutes(route.children)}
      </Route>
    )
  })
)
