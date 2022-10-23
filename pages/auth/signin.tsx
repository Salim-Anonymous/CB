import React from 'react'
import { getProviders, signIn as Login } from 'next-auth/react'
import Header from '../../components/Header';

function signIn({ providers }: {
  providers: { id, name, type, signinUrl }[]
}) {
  return (
    <div className='overflow-y-scroll scrollbar-hide'>
      <Header />
      <div className='flex flex-col items-center
      justify-center min-h-screen py-2 px-14 text-center'>
        <img className='h-60 w-60' src="/image/logo-no-background.svg" alt="Logo" />
        <p className='font-xs italic'>
          An app to manage club activities
        </p>
        <div className="mt-20">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button className="p-3 bg-blue-600 rounded-lg text-white" onClick={() => Login(provider.id,{callbackUrl:"/"})}>
                Sign in with College {provider.name} account
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
//ts-ignore
export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: { providers }
  }
}

export default signIn
