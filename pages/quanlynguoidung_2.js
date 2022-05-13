import { Row, Form, Col, Button, Collapse } from "react-bootstrap";
import "easymde/dist/easymde.min.css";
import { css } from "@emotion/css";
import { useContext } from 'react'
import dynamic from 'next/dynamic'
import { ethers } from 'ethers';
import { AccountContext } from '../context'
/* import contract address and contract owner address */
import {
  contractAddress
} from '../config'

import Quanlyvanbang_smartcontract from '../artifacts/contracts/BangDaiHoc.sol/BangDaiHoc.json'


export default function userManagement() {

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
      </div>
    </>
  );
}
// export async function getServerSideProps() {
//   /* here we check to see the current environment variable */
//   /* and render a provider based on the environment we're in */
  
//   // let provider
//   // if (process.env.ENVIRONMENT === 'local') {
//   //   provider = new ethers.providers.JsonRpcProvider()
//   // } else if (process.env.ENVIRONMENT === 'testnet') {
//   //   provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.matic.today')
//   // } else {
//   //   provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/')
//   // }
//   if (typeof window.ethereum !== 'undefined') {
//     const provider = new ethers.providers.Web3Provider(window.ethereum)
//   }

//   // const contract = new ethers.Contract(contractAddress, Blog.abi, provider)
//   // const data = await contract.fetchPosts()
//   // return {
//   //   props: {
//   //     posts: JSON.parse(JSON.stringify(data))
//   //   }
//   // }
//   const contract = new ethers.Contract(contractAddress, Quanlyvanbang_smartcontract.abi, provider)
//   const data = await contract.DanhsachnguoidungHeThong();
//   console.log("quanlyNguoiDung"+data);
//   return {
//     props: {
//       posts: 'huydiet'
//     }
//   }
// }

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
