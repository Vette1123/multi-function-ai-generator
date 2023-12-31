'use client'

import { Montserrat } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const font = Montserrat({ weight: '600', subsets: ['latin'] })

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth()

  return (
    <nav className="flex h-24 items-center justify-between border-b border-gray-800 bg-transparent p-4">
      <Link href="/" className="flex items-center">
        <div className="relative mr-4 h-8 w-8">
          <Image fill alt="Logo" src="/assets/logo.png" />
        </div>
        <h1 className={cn('text-2xl font-bold text-white', font.className)}>
          Sadge AI
        </h1>
      </Link>
      <div className="flex items-center gap-x-2">
        <Link href={isSignedIn ? '/dashboard' : '/register'}>
          <Button variant="premium" className="rounded-full">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  )
}
