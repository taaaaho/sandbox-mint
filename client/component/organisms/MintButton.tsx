import { memo, useEffect, useMemo, useState } from 'react'
import { Button, useToast } from '@chakra-ui/react'
import { ethers } from 'ethers'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'

declare var window: any

export const MintButton: React.FC = memo(() => {
  const [signer, setSigner] = useState<JsonRpcSigner>()
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const handleMintClick = async () => {
    mint()
  }
  const initialize = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    // setProvider(provider)

    // MetaMask requires requesting permission to connect users accounts
    await provider.send('eth_requestAccounts', [])

    const signer = provider.getSigner()
    setSigner(signer)

    const mintAddress = process.env.MINT_CONTRACT as string
    console.log('mintAddress', mintAddress)
    const mintAbi = [
      'function mint(string memory tokenURI) public returns (uint256)',
      'event Minted(address indexed _from)',
    ]
    const mintContract = new ethers.Contract(mintAddress, mintAbi, provider)

    // for network change event
    provider.on('network', (newNetwork, oldNetwork) => {
      if (oldNetwork) {
        alert('Network changed')
        window.location.reload()
      }
    })

    // for Minted event
    const filters = mintContract.filters['Minted']
    if (filters !== undefined) {
      console.log('filters', filters)
      provider.once('block', () => {
        mintContract.on(filters(), (author: string) => {
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
      // Mint Contract Address
      // const mintAddress = '0x69f676aFb6dB39354bEED3F41A1024AE9ed92Bc6'

      // With Event emit
      const mintAddress = process.env.MINT_CONTRACT as string

      const mintAbi = [
        'function mint(string memory tokenURI) public returns (uint256)',
      ]

      // The Contract object
      const mintContract = new ethers.Contract(mintAddress, mintAbi, signer)
      const res = await mintContract.mint(
        'https://gateway.pinata.cloud/ipfs/QmYVAdcTgam4gNyUvKs2Ry8U2S9WGhkJYREPUCGA9upBWA'
      )
    } catch (error) {
      setIsLoading(false)
    }
  }
  return (
    <Button
      colorScheme="purple"
      _focus={{ outline: 'none' }}
      onClick={handleMintClick}
      isLoading={isLoading}
      disabled={isLoading}
    >
      Mint
    </Button>
  )
})
