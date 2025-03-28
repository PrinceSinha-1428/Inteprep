"use client"

import { signOut } from '@/lib/actions/auth.action'
import { redirect } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {
    useEffect(() => {
        const handleSignout = async () => {
            await signOut()
            redirect('/sign-in')
        }
        handleSignout();
    },[])
  return (
    <div className='flex items-center justify-center'>
        <h1 className='text-4xl font-bold '>Thanks for visiting inteprep</h1>
    </div>
  )
}

export default page
