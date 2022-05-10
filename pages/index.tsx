import { Center, Text, VStack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { MintButton } from '../component/organisms/MintButton'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>MINT Sandbox App</title>
        <meta name="description" content="Mint site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Center verticalAlign="center" h="100vh">
        <VStack>
          <Text>This is Rinkeby Testnet NFT mint page</Text>
          <Text>You can receive NFT by free</Text>
          <MintButton />
        </VStack>
      </Center>
    </>
  )
}

export default Home
