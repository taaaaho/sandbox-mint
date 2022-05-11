import { Box, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

declare var window: any

export const Metamask: React.FC = () => {
  // Metamask connect check
  const [metaMaskFlag, setMetaMaskFlag] = useState(false)
  useEffect(() => {
    const tmpFlag = window.ethereum && window.ethereum.isMetaMask
    setMetaMaskFlag(tmpFlag)
  }, [])
  return (
    <Box>
      {metaMaskFlag ? (
        <Box>
          <Text color="white" fontWeight="semibold">
            This is Rinkeby Testnet NFT mint page
          </Text>
          <Text color="white" fontWeight="semibold">
            You can receive NFT by free
          </Text>
        </Box>
      ) : (
        <Text color="white" fontWeight="semibold">
          Install Metamask for NFT Mint
        </Text>
      )}
    </Box>
  )
}
