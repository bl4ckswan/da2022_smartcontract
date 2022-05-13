import {
  Row,
  InputGroup,
  Col,
  Button,
  FormControl,
  Table,
} from "react-bootstrap";
import "easymde/dist/easymde.min.css";
import { css } from "@emotion/css";
import { ethers } from 'ethers'
import { create } from 'ipfs-http-client'

/* import contract address and contract owner address */
import {
  contractAddress
} from '../config'

import Quanlyvanbang_smartcontract from '../artifacts/contracts/BangDaiHoc.sol/BangDaiHoc.json'
export default function findStudentById() {
  async function Getinfo(){
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(contractAddress, Quanlyvanbang_smartcontract.abi, provider)
      const data = await contract.DanhsachnguoidungHeThong();
      console.log("\n timkiemsinhvien:"+data);
    }    
  }
  return (
    <>
      <div>
        <Row className={searchInput}>
          <InputGroup>
            <InputGroup.Text>Mã Sinh Viên</InputGroup.Text>
            <FormControl />
            <button onClick={Getinfo}> TÌM KIẾM</button>
          </InputGroup>
        </Row>
        <Row className={contentForm}>
          <Col className={tableForm}>
            <Table className={table}>
              <thead className={tableHeader}>
                <tr>
                  <th>THÔNG TIN SINH VIÊN:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>MÃ SINH VIÊN:</td>
                </tr>
                <tr>
                  <td>TÊN SINH VIÊN:</td>
                </tr>
                <tr>
                  <td>NGÀY SINH:</td>
                </tr>
                <tr>
                  <td>GIỚI TÍNH:</td>
                </tr>
                <tr>
                  <td>NƠI SINH:</td>
                </tr>
                <tr>
                  <td>DÂN TỘC:</td>
                </tr>
                <tr>
                  <td>QUỐC TỊCH:</td>
                </tr>
                <tr>
                  <td>LỚP:</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    </>
  );
}



const searchInput = css`
  display: flex;
  justify-content: center;
  
  
  
`;

const contentForm = css`
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
`;

const tableForm = css`
  border: 1px solid black;
`;

const table = css`
  width: 800px;
`;

const tableHeader = css`
  background-color: #3399ff;
  color: #fff;
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