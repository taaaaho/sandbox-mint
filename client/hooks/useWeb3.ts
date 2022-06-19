import { ethers } from 'ethers'

declare var window: any
// type Props = {
//   window: any
// }

const useWeb3 = (): // props: Props
{
  provider: ethers.providers.Web3Provider
  signer: ethers.providers.JsonRpcSigner
  contract: ethers.Contract
} => {
  // const { window } = props
  // declare var window: any
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')

  // MetaMask requires requesting permission to connect users accounts
  //   await provider.send('eth_requestAccounts', [])

  const signer = provider.getSigner()

  const mintAddress = process.env.MINT_CONTRACT as string
  console.log('mintAddress', mintAddress)
  const mintAbi = [
    'function mint(string memory tokenURI) public returns (uint256)',
    'event Minted(address indexed _from)',
  ]
  const contract = new ethers.Contract(mintAddress, mintAbi, provider)
  return { provider, signer, contract }
}

export default useWeb3
