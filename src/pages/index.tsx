import { Button, DatePicker, IconArrowDown, Input } from '@teamlead.incubator/ui-kit'
import { Inter } from 'next/font/google'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Foto Flow</title>
        <meta content={'Generated by create next app'} name={'description'} />
        <meta content={'width=device-width, initial-scale=1'} name={'viewport'} />
      </Head>
      <main>
        <DatePicker onSelect={() => {}}></DatePicker>
        <Button>aaa</Button>
        <IconArrowDown style={{ color: 'black' }} />
        <Input />
      </main>
    </>
  )
}
