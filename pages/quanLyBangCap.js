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
  
  export default function findStudentById() {
    return (
      <>
        <div>
          <Row className={searchInput}>
            <InputGroup>
              <InputGroup.Text>SỐ HIỆU BẰNG: </InputGroup.Text>
              <FormControl />
              <Button>TÌM KIẾM</Button>
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
  