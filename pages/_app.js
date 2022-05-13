import '../styles/globals.css'
import { useState } from 'react'
import Link from 'next/link'
import { css } from '@emotion/css'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { AccountContext } from '../context.js'
import { ownerAddress } from '../config'
import 'easymde/dist/easymde.min.css'

function MyApp({ Component, pageProps }) {
  /* create local state to save account information after signin */
  const [account, setAccount] = useState(null)
  /* web3Modal configuration for enabling wallet access */
  async function getWeb3Modal() {
    const web3Modal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: false,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: { 
            infuraId: process.env.NEXT_PUBLIC_INFURA_ID
          },
        },
      },
    })
    return web3Modal
  }

  /* the connect function uses web3 modal to connect to the user's wallet */
  async function connect() {
    try {
      const web3Modal = await getWeb3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)
      const accounts = await provider.listAccounts()
      setAccount(accounts[0])
    } catch (err) {
      console.log('error:', err)
    }
  }

  return (
    <div>
      <nav className={nav}>
        <div className={header}>
          <Link href="/">
            <a>
              <img
                src='/logo.svg'
                alt="React Logo"
                style={{ width: '50px' }}
              />
            </a>
          </Link>
          <Link href="/">
            <a>
              <div className={titleContainer}>
                <h2 className={title}>HỌC VIỆN KỸ THUẬT MẬT MÃ</h2>
                <p className={description}>ỨNG DỤNG QUẢN LÝ HỒ SƠ SINH VIÊN 4.0</p>
              </div>
            </a>
          </Link>
          {
            !account && (
              <div className={buttonContainer}>
                <button className={buttonStyle} onClick={connect}>KẾT NỐI</button>
              </div>
            )
          }
          {
             (account === ownerAddress) && (<p className={accountInfo}>VAI TRÒ:Quản trị hệ thống - Addr:  {account}</p>)
          }
          {
            account && (account !== ownerAddress ) && <p className={accountInfo}>VAI TRÒ:Người dùng - Addr: {account}</p>
          }
        </div>
        <div className={linkContainer}>
          <Link href="/" >
            <a className={link}>
              Home
            </a>
          </Link>
          <Link href="/quanLyBangCap" >
            <a className={link}>
              QUẢN LÝ VĂN BẰNG, CHỨNG CHỈ
            </a>
          </Link>
          <Link href="/timKiemSinhVien" >
            <a className={link}>
              QUẢN LÝ SINH VIÊN
            </a>
          </Link>
          <Link href="/danhsachnguoidung" >
            <a className={link}>
              QUẢN LÝ NGƯỜI DÙNG
            </a>
          </Link>
          <Link href="/" >
            <a className={link}>
              CẤU HÌNH HỆ THỐNG
            </a>
          </Link>
          {
            /* if the signed in user is the contract owner, we */
            /* show the nav link to create a new post */
            (account === ownerAddress) && (
              <Link href="/create-post">
                <a className={link}>
                  Create Post
                </a>
              </Link>
            )
          }
        </div>
      </nav>
      <div className={container}>
        <AccountContext.Provider value={account}>
          <Component {...pageProps} connect={connect} />
        </AccountContext.Provider>
      </div>
    </div>
  )
}

const accountInfo = css`
  width: 100%;
  display: flex;
  flex: 1;
  justify-content: flex-end;
  font-size: 12px;
`

const container = css`
  padding: 40px;
`

const linkContainer = css`
  padding: 30px 60px;
  background-color: #fafafa;
`

const nav = css`
  background-color: white;
`

const header = css`
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, .075);
  padding: 20px 30px;
`

const description = css`
  margin: 0;
  color: #999999;
`

const titleContainer = css`
  display: flex;
  flex-direction: column;
  padding-left: 15px;
`

const title = css`
  margin-left: 30px;
  font-weight: 500;
  margin: 0;
`

const buttonContainer = css`
  width: 100%;
  display: flex;
  flex: 1;
  justify-content: flex-end;
`

const buttonStyle = css`
  background-color: #fafafa;
  outline: none;
  border: none;
  font-size: 18px;
  padding: 16px 70px;
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 7px 7px rgba(0, 0, 0, .1);
`

const link = css`
  margin: 0px 40px 0px 0px;
  font-size: 16px;
  font-weight: 400;
`

export default MyApp