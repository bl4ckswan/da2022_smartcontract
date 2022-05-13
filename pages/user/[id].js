import { Row, Form, Col, Button, Collapse } from "react-bootstrap";
import { useState, useRef, useEffect } from 'react' // new

import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { css } from '@emotion/css'
import { ethers } from 'ethers'
import { create } from 'ipfs-http-client'
import Link from 'next/link'


/* import contract address and contract owner address */
import {
  contractAddress, ownerAddress
} from '../../config'
import Quanlyvanbang_smartcontract from '../../artifacts/contracts/BangDaiHoc.sol/BangDaiHoc.json'


/* define the ipfs endpoint */
const client = create('https://ipfs.infura.io:5001/api/v0')

/* configure the markdown editor to be client-side import */
const SimpleMDE = dynamic(
  () => import('react-simplemde-editor'),
  { ssr: false }
)

const initialState = { title: '', content: '' }

function UserInfomation() {
  const [datauser, setdatauser] = useState({"address":"","username":"","isAdmin":false})
  const router = useRouter()
  const { id } = router.query
  if (router.isFallback) {
    return <div>Loading...</div>
  } 
  useEffect(() => {
    GetUserinfo()
  }, [id])
  async function GetUserinfo() {
    /* we first fetch the individual post by ipfs hash from the network */
    if (!id) return
    let provider
    if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'local') {
      provider = new ethers.providers.JsonRpcProvider()
    } else if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'testnet') {
      provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.matic.today')
    } else {
      provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/')
    }
    const contract = new ethers.Contract(contractAddress, Quanlyvanbang_smartcontract.abi, provider)
    const val = await contract.TimNguoiDung(id)
    console.log("Lay thong tin nguoi dung:",val);
    const data={"address":"","username":"","isAdmin":false}
    data.address = val[0]
    data.username = val[1]
    data.isAdmin = val[2]
    console.log(data)
    setdatauser(data)

    console.log(datauser)

  }
  
  const handleData = (e) => {
    e.preventDefault()
    setdatauser
    console.log(e)
  }
  // const [dataValues, setDataValues] = useState({
  //   userName: ""
  // })
  // const hanldeData = (e) => {
  //   setDataValues({
  //     ...dataValues,
  //     [e.target.name]: e.target.value
  //   })
  // }
  // console.log(dataValues);

  return (
    <>
      <div className={container}>
        <div className={userForm}>
          <Row className={formHeader}>
            <Col>THÔNG TIN NGƯỜI DÙNG</Col>
          </Row>
          <Form className={formContent} onSubmit={handleData}>
            <Form.Group>
              <Form.Label>ĐỊA CHỈ VÍ</Form.Label>
              <Col>
                <Form.Control className={inputText} type="text" value={datauser.address}/>
              </Col>
            </Form.Group>
            <Form.Group>
              <Form.Label>TÊN NGƯỜI DÙNG</Form.Label>
              <Col>
                <Form.Control name='userName' className={inputText} type="text" value={datauser.username} />
              </Col>
            </Form.Group>
            <Form.Group>
              <Form.Label>ADMIN</Form.Label>
              <Col>
                <Form.Control className={inputText} type="text" value={datauser.isAdmin} />
              </Col>
            </Form.Group>
            <Row>
              <Col>
                <Button variant="primary" type="submit" >
                  Lưu thông tin
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      
           
    

    </>
  );
}


const container = css`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const userForm = css`
  border: 1px solid black;
  margin-bottom: 20px;
  width: 70%;
`;

const formHeader = css`
  background-color: #3399ff;
  color: #fff;
  padding: 12px;
`;

const formContent = css`
  padding: 12px;
`;

const inputText = css`
  width: 100%;
`;

const checkBox = css`
  display: flex;
  justify-content: end;
`;

const button = css`
  width: 50%;
  background-color:  #3399ff;
  outline: none;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  margin-right: 10px;
  font-size: 18px;
  padding: 16px 70px;
  box-shadow: 7px 7px rgba(0, 0, 0, .1);
`
const button_danhsachnguoidung = css`
  width: 50%;
  background-color:#ffe6f7  ;
  outline: none;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  margin-right: 10px;
  font-size: 18px;
  padding: 16px 70px;
  box-shadow: 7px 7px rgba(0, 0, 0, .1);
`

export default UserInfomation