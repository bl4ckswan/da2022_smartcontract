import { useForm } from "react-hook-form";
import { Row, Col } from "react-bootstrap";

function ModifyUser() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <Row className="justify-content-center">
          <Col xs={4} className="border p-4">
            <h1>Sửa thông tin người dùng</h1>
            <div>
              <span>Địa chỉ</span>
              <input {...register("address")} className="d-block w-100 mt-1" />
            </div>
            <div className="mt-2">
              <span>Tên người dùng</span>
              <input {...register("userName")} className="d-block w-100 mt-1" />
            </div>
            <div className="mt-2 d-flex justify-content-end align-items-center">
              <input {...register("admin")} type="radio" value="true"/>
              <span>Quyền admin</span>
            </div>
            <input className="mt-2" type="submit" />
          </Col>
        </Row>
      </form>
    </>
  );
}

export default ModifyUser;
