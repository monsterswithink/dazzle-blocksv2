'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card'
import Link from 'next/link'
import { Button } from '@/ui/button'

export default function AuthErrorContent() {
  const searchParams = useSearchParams()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const error = searchParams.get('error')

    const errors: { [key: string]: string } = {
      Signin: 'Try signing in with a different account.',
      OAuthSignin: 'Try signing in with a different account.',
      OAuthCallback: 'Try signing in with a different account.',
      OAuthCreateAccount: 'Try signing in with a different account.',
      EmailCreateAccount: 'Try signing in with a different account.',
      Callback: 'Try signing in with a different account.',
      OAuthAccountNotLinked: 'To confirm your identity, sign in with the same account you used originally.',
      EmailSignin: 'Check your email address.',
      CredentialsSignin: 'Sign in failed. Check the details you provided are correct.',
      default: 'Unable to sign in.',
    }

    setErrorMessage(error ? (errors[error] || errors.default) : null)
  }, [searchParams])

  if (!errorMessage) return null // Prevent hydration mismatch

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Authentication Error</CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            {errorMessage}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Link href="/profile">
            <Button className="w-full">
              Return to Sign In
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
