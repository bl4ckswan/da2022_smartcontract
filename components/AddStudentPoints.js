import { Row, Col, Table, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";

function AddStudentPoints() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <>
      <h3 className="text-center mb-4">Thêm bảng điểm sinh viên</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Table bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Môn học</th>
              <th>Số TC</th>
              <th>Điểm số</th>
              <th>Điểm chữ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Công nghệ mạng máy tính (Mạng máy tính)</td>
              <td>
                <input
                  type="number"
                  {...register("TCCNMMT")}
                  className="w-75"
                />
              </td>
              <td>
                <input
                  type="number"
                  {...register("NumberCNMMT")}
                  className="w-75"
                />
              </td>
              <td>
                <input {...register("PointCNMMT")} className="w-75" />
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Quản trị mạng máy tính</td>
              <td>
                <input
                  type="number"
                  {...register("TCQTMMT")}
                  className="w-75"
                />
              </td>
              <td>
                <input
                  type="number"
                  {...register("NumberQTMMT")}
                  className="w-75"
                />
              </td>
              <td>
                <input {...register("PointQTMMT")} className="w-75" />
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Tiếng Anh 3</td>
              <td>
                <input
                  type="number"
                  {...register("TCEnglish")}
                  className="w-75"
                />
              </td>
              <td>
                <input
                  type="number"
                  {...register("NumberEnglish")}
                  className="w-75"
                />
              </td>
              <td>
                <input {...register("PointEnglish")} className="w-75" />
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>Tiếng Anh chuyên ngành (CNTT)</td>
              <td>
                <input
                  type="number"
                  {...register("TCITEnglish")}
                  className="w-75"
                />
              </td>
              <td>
                <input
                  type="number"
                  {...register("NumberITEnglish")}
                  className="w-75"
                />
              </td>
              <td>
                <input {...register("PointITEnglish")} className="w-75" />
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>Toán xác suất thống kê</td>
              <td>
                <input
                  type="number"
                  {...register("TCTXSTK")}
                  className="w-75"
                />
              </td>
              <td>
                <input
                  type="number"
                  {...register("NumberTXSTK")}
                  className="w-75"
                />
              </td>
              <td>
                <input {...register("PointTXSTK")} className="w-75" />
              </td>
            </tr>
            <tr>
              <td>6</td>
              <td>Chương trình dịch</td>
              <td>
                <input type="number" {...register("TCCTD")} className="w-75" />
              </td>
              <td>
                <input
                  type="number"
                  {...register("NumberCTD")}
                  className="w-75"
                />
              </td>
              <td>
                <input {...register("PointCTD")} className="w-75" />
              </td>
            </tr>
            <tr>
              <td>7</td>
              <td>Công nghệ phần mềm nhúng</td>
              <td>
                <input
                  type="number"
                  {...register("TCCNPMN")}
                  className="w-75"
                />
              </td>
              <td>
                <input
                  type="number"
                  {...register("NumberCNPMN")}
                  className="w-75"
                />
              </td>
              <td>
                <input {...register("PointCNPMN")} className="w-75" />
              </td>
            </tr>
            <tr>
              <td>8</td>
              <td>Công nghệ phần mềm</td>
              <td>
                <input type="number" {...register("TCCNPM")} className="w-75" />
              </td>
              <td>
                <input
                  type="number"
                  {...register("NumberCNPM")}
                  className="w-75"
                />
              </td>
              <td>
                <input {...register("PointCNPM")} className="w-75" />
              </td>
            </tr>
            <tr>
              <td>9</td>
              <td>Toán cao cấp A1</td>
              <td>
                <input
                  type="number"
                  {...register("TCTCCA1")}
                  className="w-75"
                />
              </td>
              <td>
                <input
                  type="number"
                  {...register("NumberTCCA1")}
                  className="w-75"
                />
              </td>
              <td>
                <input {...register("PointTCCA1")} className="w-75" />
              </td>
            </tr>
            <tr>
              <td>10</td>
              <td>Cơ sở an toàn và bảo mật thông tin </td>
              <td>
                <input
                  type="number"
                  {...register("TCCSBMTT")}
                  className="w-75"
                />
              </td>
              <td>
                <input
                  type="number"
                  {...register("NumberCSBMTT")}
                  className="w-75"
                />
              </td>
              <td>
                <input {...register("PointCSBMTT")} className="w-75" />
              </td>
            </tr>
            <tr>
              <td>11</td>
              <td>Cơ sở lý thuyết truyền tin</td>
              <td>
                <input
                  type="number"
                  {...register("TCCSLTTT")}
                  className="w-75"
                />
              </td>
              <td>
                <input
                  type="number"
                  {...register("NumberCSLTTT")}
                  className="w-75"
                />
              </td>
              <td>
                <input {...register("PointCSLTTT")} className="w-75" />
              </td>
            </tr>
            <tr>
              <td>12</td>
              <td>Cấu trúc dữ liệu và giải thuật</td>
              <td>
                <input
                  type="number"
                  {...register("TCCTDLVGT")}
                  className="w-75"
                />
              </td>
              <td>
                <input
                  type="number"
                  {...register("NumberCTDLVGT")}
                  className="w-75"
                />
              </td>
              <td>
                <input {...register("PointCTDLVGT")} className="w-75" />
              </td>
            </tr>
            <tr>
              <td>13</td>
              <td>Hệ thống viễn thông</td>
              <td>
                <input type="number" {...register("TCHTVT")} className="w-75" />
              </td>
              <td>
                <input
                  type="number"
                  {...register("NumberHTVT")}
                  className="w-75"
                />
              </td>
              <td>
                <input {...register("PointHTVT")} className="w-75" />
              </td>
            </tr>
            <tr>
              <td>14</td>
              <td>Hệ quản trị cơ sở dữ liệu</td>
              <td>
                <input
                  type="number"
                  {...register("TCHTQTDL")}
                  className="w-75"
                />
              </td>
              <td>
                <input
                  type="number"
                  {...register("NumberHTQTDL")}
                  className="w-75"
                />
              </td>
              <td>
                <input {...register("PointHTQTDL")} className="w-75" />
              </td>
            </tr>
            <tr>
              <td>14</td>
              <td>Hệ thống thông tin di động</td>
              <td>
                <input
                  type="number"
                  {...register("TCHTTTDD")}
                  className="w-75"
                />
              </td>
              <td>
                <input
                  type="number"
                  {...register("NumberHTTTDD")}
                  className="w-75"
                />
              </td>
              <td>
                <input {...register("PointHTTTDD")} className="w-75" />
              </td>
            </tr>
            <tr>
              <td>15</td>
              <td>Hệ điều hành nhúng thời gian thực</td>
              <td>
                <input
                  type="number"
                  {...register("TCHDHTGT")}
                  className="w-75"
                />
              </td>
              <td>
                <input
                  type="number"
                  {...register("NumberHDHTGT")}
                  className="w-75"
                />
              </td>
              <td>
                <input {...register("PointHDHTGT")} className="w-75" />
              </td>
            </tr>
            <tr>
              <td>16</td>
              <td>Kiến trúc máy tính</td>
              <td>
                <input type="number" {...register("TCKTMT")} className="w-75" />
              </td>
              <td>
                <input
                  type="number"
                  {...register("NumberKTMT")}
                  className="w-75"
                />
              </td>
              <td>
                <input {...register("PointKTMT")} className="w-75" />
              </td>
            </tr>
            <tr>
              <td>17</td>
              <td>Kiểm thử phần mềm nhúng</td>
              <td>
                <input type="number" {...register("TCKTPN")} className="w-75" />
              </td>
              <td>
                <input
                  type="number"
                  {...register("NumberKTPN")}
                  className="w-75"
                />
              </td>
              <td>
                <input {...register("PointKTPN")} className="w-75" />
              </td>
            </tr>
            <tr>
              <td>17</td>
              <td>Kỹ thuật truyền số liệu</td>
              <td>
                <input
                  type="number"
                  {...register("TCKTTSL")}
                  className="w-75"
                />
              </td>
              <td>
                <input
                  type="number"
                  {...register("NumberKTTSL")}
                  className="w-75"
                />
              </td>
              <td>
                <input {...register("PointKTTSL")} className="w-75" />
              </td>
            </tr>
          </tbody>
        </Table>
        <input className="mt-2" type="submit" />
      </form>
    </>
  );
}

export default AddStudentPoints;
