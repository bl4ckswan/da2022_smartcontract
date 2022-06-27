import { Row, Col, Button, Container, Form } from "react-bootstrap";
import { useState, useRef, useEffect } from "react"; // new
import { useForm } from "react-hook-form";
import { create } from "ipfs-http-client";

/* define the ipfs endpoint */
const client = create("https://ipfs.infura.io:5001/api/v0");

function AddStudentInfo() {
  const [studentInfo, setStudentInfo] = useState({
    studentCode: "",
    studentName: "",
    studentBirth: "",
    studentGender: "",
    studentPlaceOfBirth: "",
    studentEthnic: "",
    studentNation: "",
    studentClass: "",
    imagePath: "",
    owneraddress:""
  });

  const [image, setImage] = useState(null);
  const fileRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 500);
  }, []);

  function uploadImage() {
    /* trigger handleFileChange handler of hidden file input */
    fileRef.current.click();
  }

  async function handleUploadImage(e) {
    const uploadedImage = e.target.files[0];
    if (!uploadedImage) return;
    const imageLink = await client.add(uploadedImage);
    setStudentInfo((state) => ({ ...studentInfo, imagePath: imageLink.path }));
    setImage(uploadedImage);
  }

  async function createStudentInfo() {
    
  }

  return (
    <>
      <Container>
        <Row className="mb-3">
          <h3 className="text-center">Thêm thông tin sinh viên</h3>
        </Row>
        <Row className="border p-3">
          <Col xs={3} className="d-flex justify-content-end align-items-center border">
            {image && (<Image src={URL.createObjectURL(image)} />)}
          </Col>

          <Col>
            <Form.Group className="mb-2">
              <Form.Label>MÃ SINH VIÊN</Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  value={studentInfo.studentCode}
                  onChange={(e) =>
                    setStudentInfo({
                      ...studentInfo,
                      studentCode: e.target.value,
                    })
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>TÊN SINH VIÊN</Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  value={studentInfo.studentName}
                  onChange={(e) =>
                    setStudentInfo({
                      ...studentInfo,
                      studentName: e.target.value,
                    })
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>NGÀY SINH</Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  value={studentInfo.studentBirth}
                  onChange={(e) =>
                    setStudentInfo({
                      ...studentInfo,
                      studentBirth: e.target.value,
                    })
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>GIỚI TÍNH</Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  value={studentInfo.studentGender}
                  onChange={(e) =>
                    setStudentInfo({
                      ...studentInfo,
                      studentGender: e.target.value,
                    })
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>NƠI SINH</Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  value={studentInfo.studentPlaceOfBirth}
                  onChange={(e) =>
                    setStudentInfo({
                      ...studentInfo,
                      studentPlaceOfBirth: e.target.value,
                    })
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>DÂN TỘC</Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  value={studentInfo.studentEthnic}
                  onChange={(e) =>
                    setStudentInfo({
                      ...studentInfo,
                      studentEthnic: e.target.value,
                    })
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>QUỐC TỊCH</Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  value={studentInfo.studentNation}
                  onChange={(e) =>
                    setStudentInfo({
                      ...studentInfo,
                      studentNation: e.target.value,
                    })
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>LỚP</Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  value={studentInfo.studentClass}
                  onChange={(e) =>
                    setStudentInfo({
                      ...studentInfo,
                      studentClass: e.target.value,
                    })
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>ĐỊA CHỈ VÍ</Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  value={studentInfo.studentClass}
                  onChange={(e) =>
                    setStudentInfo({
                      ...studentInfo,
                      studentClass: e.target.value,
                    })
                  }
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Button variant="info" type="submit" onClick={uploadImage}>
              Thêm Ảnh
            </Button>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button variant="info" type="submit" onClick={createStudentInfo}>
              Lưu thông tin
            </Button>
          </Col>
        </Row>
        <input
          id="selectImage"
          className="d-none"
          type="file"
          onChange={handleUploadImage}
          ref={fileRef}
        />
      </Container>
    </>
  );
}

export default AddStudentInfo;
