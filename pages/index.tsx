import { Button, Center, Text, VStack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  const handleMintClick = () => {
    alert('clicked !')
  }
  return (
    <>
      <Head>
        <title>MINT Sandbox App</title>
        <meta name="description" content="Mint site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Center verticalAlign="center" h="100vh">
        <VStack>
          <Text>This is testnet NFT mint sandbox page.</Text>
          <Text>You can receive free NFT.</Text>
          <Button
            colorScheme="purple"
            _focus={{ outline: 'none' }}
            onClick={handleMintClick}
          >
            Mint
          </Button>
        </VStack>
      </Center>
    </>
  )
}

export default Home
