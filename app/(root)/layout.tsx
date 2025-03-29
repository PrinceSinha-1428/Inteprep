
import { Button } from '@/components/ui/button'
import { isAuthenticated, signOut } from '@/lib/actions/auth.action'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

const RootLayout = async ({children}:{children:ReactNode}) => {
  const isUserAuthenticated = await isAuthenticated();
  if(!isUserAuthenticated) redirect('/sign-in');
  return (
    <div className='root-layout relative '>
      <nav>
        <Link href={'/'} className='flex items-center gap-2 relative'>
          <Image src={'/logo.svg'} alt='logo' height={32} width={38} />
          <h2 className='text-primary-100'>Inteprep</h2>
        </Link>
      </nav>
      <Button className='bg-red-500 rounded-full text-white hover:bg-red-600 transition-all duration-200 cursor-pointer absolute top-0 right-4 '>
            <Link href={'/signout'} >Sign out</Link>
      </Button>
      {children}
    </div>
  )
}

export default RootLayout
