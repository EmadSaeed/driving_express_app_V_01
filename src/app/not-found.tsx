import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function NotFound() {
  return (
    <section className='h-[90vh] w-full grid place-items-center'>
        <div className='text-center'>
            <h1 className='text-[5rem] font-bold leading-tight'>404</h1>
            <p className='-translate-y-5'>Page not found</p>
            <Link href="/" className='bg-white px-3 py-1 hover:scale-[1.03] transition-all duration-200 rounded-lg text-black font-medium flex items-center gap-2'>Go back to Home <ArrowRight /></Link>
        </div>
    </section>
  )
}

export default NotFound