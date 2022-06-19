import { Box, Text } from '@chakra-ui/react'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'

declare var window: any

export const Metamask: React.FC = () => {
  // Metamask connect check
  const [metaMaskFlag, setMetaMaskFlag] = useState(false)
  const [account, setAccount] = useState(null)
  useEffect(() => {
    const tmpFlag = window.ethereum && window.ethereum.isMetaMask
    setMetaMaskFlag(tmpFlag)

    connectMetamask()
  }, [])

  const connectMetamask = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')

    // MetaMask requires requesting permission to connect users accounts
    const accounts = await provider.send('eth_requestAccounts', [])
    setAccount(accounts[0])
  }

  return (
    <Box>
      {metaMaskFlag ? (
        account ? (
          <Box textAlign="center">
            <Text color="white" fontWeight="semibold">
              This is Rinkeby Testnet NFT mint page
            </Text>
            <Text color="white" fontWeight="semibold">
              You can receive NFT by free
            </Text>
            <Text color="white" fontWeight="semibold">
              {account}
            </Text>
          </Box>
        ) : (
          <Text color="white" fontWeight="semibold">
            Please connect metamask
          </Text>
        )
      ) : (
        <Text color="white" fontWeight="semibold">
          Install Metamask for NFT Mint
        </Text>
      )}
    </Box>
  )
}
