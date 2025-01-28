import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import '@/styles/admin.css'
import Sidebar from '@/components/admin/sidebar'
import Header from '@/components/admin/header'

export default async function Layout({ children }: Readonly<{ children: ReactNode }>) {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("sign-in")
  }

  return (
    <main className='flex min-h-dvh w-full flex-row'>
      <Sidebar session={session} />

      <div className='admin-container'>
        <Header session={session}/>
        {children}
      </div>
    </main>
  )
}
