import { useForm } from "react-hook-form";
import { Row, Form, Col, Button, Collapse } from "react-bootstrap";

function AddNewUser() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row className="justify-content-center">
          <Col xs={4} className="border p-4">
            <h1>Thêm người dùng</h1>
            <div>
              <span>Địa chỉ</span>
              <input {...register("address")} className="d-block w-100 mt-2" />
            </div>
            <div className="mt-2">
              <span>Tên người dùng</span>
              <input {...register("userName")} className="d-block w-100 mt-2" />
            </div>
            <input className="mt-2" type="submit" />
          </Col>
        </Row>
      </form>
    </>
  );
}

export default AddNewUser;
