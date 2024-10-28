import { clerkMiddleware } from '@clerk/nextjs/server'

// Apply Clerk middleware to specific routes, but exclude `/api/webhooks/clerk`
export default clerkMiddleware()

export const config = {
  matcher: [
    // Exclude `/`, `/api/webhooks/clerk`, and `/api/webhooks/stripe` from middleware protection
    '/((?!api/webhooks/clerk|api/webhooks/stripe|/).*)',
    '/(api|trpc)(.*)', // Keep this to include all other API routes
  ],
}