import Image from 'next/image';
import { ReactNode } from 'react';

export default async function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {

  return (
    <main className="auth-container">
      <section className="auth-form">
        <div className="auth-box">
          <div className="flex flex-row gap-3">
            <Image
              src={'/icons/logo.svg'}
              width={37}
              height={37}
              alt="Logo"
              className="size-auto"
            />
            <h1 className="text-2xl font-semibold text-white">BookWise</h1>
          </div>

          <div className="">{children}</div>
        </div>
      </section>

      <section className="auth-illustration">
        <Image
          src={'/images/auth-illustration.png'}
          width={1000}
          height={1000}
          alt="Illustration"
          className="size-full object-cover"
          priority
        />
      </section>
    </main>
  );
}
