'use client'

import { useClerk } from '@clerk/nextjs'
import { useEffect } from 'react'

export const SignOutButton = () => {
  const { signOut } = useClerk()

  useEffect(() => {
    signOut()
  }, [signOut])

  return (
    <p>Sign out</p>
  )
}