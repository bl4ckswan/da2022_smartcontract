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
  contractAddress
} from '../config'

import Quanlyvanbang_smartcontract from '../artifacts/contracts/BangDaiHoc.sol/BangDaiHoc.json'

import Blog from '../artifacts/contracts/Blog.sol/Blog.json'

/* define the ipfs endpoint */
const client = create('https://ipfs.infura.io:5001/api/v0')

/* configure the markdown editor to be client-side import */
const SimpleMDE = dynamic(
  () => import('react-simplemde-editor'),
  { ssr: false }
)

const initialState = { title: '', content: '' }

function userManagement() {
  /* configure initial state to be used in the component */
  const [post, setPost] = useState(initialState)
  const [image, setImage] = useState(null)
  const [loaded, setLoaded] = useState(false)

  const fileRef = useRef(null)
  const { title, content } = post
  const router = useRouter()
  async function Getinfo(){
  console.log("test Getinfo");
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(contractAddress, Quanlyvanbang_smartcontract.abi, provider)
    const data = await contract.DanhsachnguoidungHeThong();
    console.log("\n Danh sách người dùng:"+data);
  }  
  else {
    console.log("no windows define");
  }  
} 

  return (
    <>
      <div className={container}>
        <div className={userForm}>
          <Row className={formHeader}>
            <Col>Thêm người dùng</Col>
          </Row>
          <Form className={formContent}>
            <Form.Group>
              <Form.Label>Địa chỉ</Form.Label>
              <Col>
                <Form.Control className={inputText} type="text" />
              </Col>
            </Form.Group>
            <Form.Group>
              <Form.Label>Tên người dùng</Form.Label>
              <Col>
                <Form.Control className={inputText} type="text" />
              </Col>
            </Form.Group>
            <Row>
              <Col>
                <Button variant="primary" type="submit">
                  Lưu
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
        <div className={userForm}>
          <Row className={formHeader}>
            <Col>Sửa thông tin người dùng</Col>
          </Row>
          <Form className={formContent}>
            <Form.Group>
              <Form.Label>Địa chỉ</Form.Label>
              <Col>
                <Form.Control className={inputText} type="text" />
              </Col>
            </Form.Group>
            <Form.Group>
              <Form.Label>Tên người dùng</Form.Label>
              <Col>
                <Form.Control className={inputText} type="text" />
              </Col>
            </Form.Group>
            <Form.Group className={checkBox}>
              <Col>
                <Form.Check type="checkbox" />
              </Col>
              <Form.Label>Quyền admin</Form.Label>
            </Form.Group>
            <Row>
              <Col>
                <Button variant="primary" type="submit">
                  Lưu
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
        <div className={userForm}>
          <Row className={formHeader}>
            <Col>THÔNG TIN NGƯỜI DÙNG ĐANG ĐĂNG NHẬP</Col>
          </Row>
          <Form className={formContent}>
            <Form.Group>
              <Form.Label>ĐỊA CHỈ</Form.Label>
              <Col></Col>
            </Form.Group>
            <Form.Group>
              <Form.Label>TÊN NGƯỜI DÙNG</Form.Label>
              <Col></Col>
            </Form.Group>
          </Form>
        </div>
        <button
          className={button}
          type='button'
          onClick={Getinfo}
        >LẤY THÔNG TIN NGƯỜI DÙNG
      </button>
      <button
          className={button_danhsachnguoidung}
          type='button'
        ><Link href={`/danhsachnguoidung`}>DANH SÁCH NGƯỜI DÙNG</Link>
      </button>
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

export default userManagement