import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Navigation from './Navbar';
import Home from './Home.js'
import Create from './Create.js'
import MyListedItems from './MyListedItems.js'
import MyPurchases from './MyPurchases.js'
import BuyTokens from './BuyTokens';
import MarketplaceAbi from '../contractsData/Marketplace.json'
import MarketplaceAddress from '../contractsData/Marketplace-address.json'
import NFTAbi from '../contractsData/NFT.json'
import NFTAddress from '../contractsData/NFT-address.json'
import FTAbi from '../contractsData/FT.json'
import FTAddress from '../contractsData/FT-address.json'
import { useState } from 'react'
import { ethers } from "ethers"
import { Spinner } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

function App() {
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState(null)
  const [nft, setNFT] = useState({})
  const [marketplace, setMarketplace] = useState({})
  const [ft, setFt] = useState({});
  // MetaMask Login/Connect
  const web3Handler = async () => {
    try {
      console.log(window.ethereum);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0])
      // Get provider from Metamask
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      // Set signer
      const signer = provider.getSigner()

      window.ethereum.on('chainChanged', (chainId) => {
        window.location.reload();
      })

      window.ethereum.on('accountsChanged', async function (accounts) {
        setAccount(accounts[0])
        await web3Handler()
      })
      loadContracts(signer)
    } catch (err) {
      console.log(err);
      toast("Error connecting to wallet!")
    }
  }

  const loadContracts = async (signer) => {
    try {
      // Get deployed copies of contracts
      const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer)
      setMarketplace(marketplace)
      const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer)
      setNFT(nft)
      const ft = new ethers.Contract(FTAddress.address, FTAbi.abi, signer)
      setFt(ft);
      setLoading(false)
    } catch (err) {
      console.log(err);
      toast("Error cloading contracts!")
    }
  }

  console.log(marketplace, nft, ft);

  return (
    <BrowserRouter>
      <div className="App">
        <>
          <Navigation web3Handler={web3Handler} account={account} />
        </>
        <ToastContainer />
        <div>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
              <Spinner animation="border" style={{ display: 'flex' }} />
              <p className='mx-3 my-0'>Awaiting Metamask Connection...</p>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={
                <Home marketplace={marketplace} nft={nft} ft={ft}/>
              } />
              <Route path="/create" element={
                <Create marketplace={marketplace} nft={nft} ft={ft}/>
              } />
              <Route path="/my-listed-items" element={
                <MyListedItems marketplace={marketplace} nft={nft} ft={ft} account={account} />
              } />
              <Route path="/my-purchases" element={
                <MyPurchases marketplace={marketplace} nft={nft} ft={ft} account={account} />
              } />
              <Route path="/buy-tokens" element={
                <BuyTokens ft={ft} account={account}/>
              } />
            </Routes>
          )}
        </div>
      </div>
    </BrowserRouter>

  );
}

export default App;
