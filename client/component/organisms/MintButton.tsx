import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Box, Button, Text, useToast, VStack } from '@chakra-ui/react'
import { ethers } from 'ethers'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import artifact from '../../../artifacts/contracts/mint.sol/NFT.json'

declare var window: any

// eslint-disable-next-line react/display-name
export const MintButton: React.FC = memo(() => {
  const [signer, setSigner] = useState<JsonRpcSigner>()
  const [account, setAccount] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const handleMintClick = async () => {
    mint()
  }
  const initialize = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')

    // MetaMask requires requesting permission to connect users accounts
    const accounts = await provider.send('eth_requestAccounts', [])
    setAccount(accounts[0])

    const signer = provider.getSigner()
    setSigner(signer)

    const mintAddress = process.env.MINT_CONTRACT as string
    const contract = new ethers.Contract(mintAddress, artifact.abi, provider)

    // for network change event
    provider.on('network', (newNetwork, oldNetwork) => {
      if (oldNetwork) {
        alert('Network changed')
        window.location.reload()
      }
    })

    // for Minted event
    const filters = contract.filters['Minted']
    if (filters !== undefined) {
      provider.once('block', () => {
        contract.on(filters(), (author: string) => {
          toast({
            title: 'Mint succeed',
            description: 'Check your NFT',
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
          setIsLoading(false)
        })
      })
    }
  }

  useEffect(() => {
    initialize()
  }, [])

  const mint = async () => {
    setIsLoading(true)

    try {
      // With Event emit
      const mintAddress = process.env.MINT_CONTRACT as string

      // The Contract object
      const contract = new ethers.Contract(mintAddress, artifact.abi, signer)
      const res = await contract.mint(
        'https://gateway.pinata.cloud/ipfs/QmatpzwAQ7R1kME5LnRtgd4yR8b6RLhfkNZ35ZfeJhfnJU'
      )
    } catch (error) {
      setIsLoading(false)
    }
  }
  return (
    <VStack>
      {account && (
        <Text color="white" fontWeight="semibold">
          {account}
        </Text>
      )}
      <Button
        colorScheme="purple"
        _focus={{ outline: 'none' }}
        onClick={handleMintClick}
        isLoading={isLoading}
        disabled={isLoading}
      >
        Mint
      </Button>
    </VStack>
  )
})
