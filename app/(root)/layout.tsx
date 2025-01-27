import Header from '@/components/header';
import { ReactNode } from 'react';

export default async function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {

  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        <Header />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
}
