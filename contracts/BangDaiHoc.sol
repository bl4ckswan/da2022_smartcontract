// SPDX-License-Identifier: GPL-3.0
import "@openzeppelin/contracts/access/Ownable.sol";
pragma solidity ^0.8.0;

contract BangDaiHoc is Ownable {

    //Định nghĩa người dùng:
    // Dia chi nguoi dung
    // Ho va ten Nguoi dung
    // Admin hay khong
    struct NguoiDung {
        address DiaChi;
        string Ten;
        bool Admin;
    } 
    mapping (address => NguoiDung) _tblNguoiDung;

    //liet ke tai khoan tren he thong
    uint public totalUser = 0;
    mapping (uint => address) _dsAddressHeThong;
    // Map IDs with Approvers address
    mapping (address => bool) private _approvers;

    // Create onlyApprover modifier
    modifier onlyApprover() {
        require(_approvers[_msgSender()] == true || _msgSender() == owner(), "Caller is not the Approver");
        _;
    }

    // Set Approver
    function setApprovers(address approverAddress) public onlyOwner {
        _approvers[approverAddress] = true;
    }

    // Remove Approver
    function removeApprovers(address approverAddress) public onlyOwner {
        _approvers[approverAddress] = false;
    }

    function isApprover(address addressToCheck) public view returns(bool){
        return _approvers[addressToCheck];
    }
    
    //constructor:
    // Khoi tao nguoi dung Owner Smartcontract lam Admin. Dung dau danh sach
    constructor () public {
        _tblNguoiDung [msg.sender] = NguoiDung(msg.sender, "Admin", true);
        _dsAddressHeThong [Counter] = msg.sender;
    }

    //Hàm kiểm tra chuỗi rỗng:
    function ChuoiRong (string memory Chuoi) pure public returns (bool) {
        bytes memory _value = bytes (Chuoi);
        if (_value.length == 0)
            return true;
        return false;
    }

    //Hàm kiểm tra người dùng đã tồn tại:
    function NguoiDungTonTai (address diaChi) private returns (bool) {
        if(!ChuoiRong (_tblNguoiDung [diaChi].Ten)) {
            return true;
        }
        return false;
    }

    //Hàm thêm người dùng:
    function ThemNguoiDung (address diaChi,string memory ten) public {
        //Kiểm tra là admin:
        require (_tblNguoiDung[msg.sender].Admin);
        //Kiểm tra tồn tại người dùng:
        require (!NguoiDungTonTai(diaChi));
        //Thêm người dùng:
        require (!ChuoiRong(ten));

        // Tang bo dem
        totalUser += 1;
        // Thuc hien them nguoi vao he thong
        _tblNguoiDung [diaChi] = NguoiDung (diaChi, ten, false);
        _dsAddressHeThong[totalUser] = diaChi;
    }

    //Hàm chỉnh sửa người dùng:
    function ChinhSuaNguoiDung (address diaChi, string memory ten, bool admin) public {
        //Kiểm tra admin:
        require (_tblNguoiDung [msg.sender].Admin);
        //Kiểm tra tài khoản chỉnh sửa tồn tại:
        require (NguoiDungTonTai (diaChi));
        //Tên không được để trống:
        require (!ChuoiRong (ten));
        _tblNguoiDung [diaChi].Ten = ten;
        _tblNguoiDung [diaChi].Admin = admin;
    }

    //Hàm tìm người dùng:
    function TimNguoiDung (address diaChi) public view returns (address diachi, string memory ten, bool ketqua) {
        NguoiDung memory ketQua = _tblNguoiDung [diaChi];
        return (ketQua.DiaChi,ketQua.Ten, ketQua.Admin);
    }

    //Danh sach nguoi dung
    function DanhsachnguoidungHeThong() public view onlyOwner returns (NguoiDung[] memory){
        NguoiDung[] memory dsNguoidung = new NguoiDung[](totalUser);
        for (uint i = 0; i <= totalUser; i++){
            NguoiDung storage currentItem = _tblNguoiDung[_dsAddressHeThong[i]];
            dsNguoidung[i] = currentItem;
        }
        return dsNguoidung;
    }
   
   

    //Định nghĩa sinh viên:
    struct SinhVien {
        string MaSV;
        string TenSV;
        string NgaySinh;
        string GioiTinh;
        string NoiSinh;
        string DanToc;
        string QuocTich;
        string Lop;
    }
    mapping (string => SinhVien) tblSinhVien;
    uint public TotalSV = 0;
    mapping (uint => string) dsSinhVien;

    //Hàm kiểm tra sinh viên tồn tại:
    function SinhVienTonTai (string memory maSV) private returns (bool) {
        if(!ChuoiRong (tblSinhVien [maSV].MaSV))
            return true;
        return false;
    }

    //Hàm thêm sinh viên:
    function ThemSinhVien (
        string memory maSV,
        string memory tenSV,
        string memory ngaySinh,
        string memory gioiTinh,
        string memory noiSinh,
        string memory danToc,
        string memory quocTich,
        string memory lop
    ) public onlyApprover {
        //Kiểm tra sinh viên đã có chưa:
        require (!SinhVienTonTai (maSV));
        //Kiểm tra người nhập đã đăng ký:
        require (NguoiDungTonTai (msg.sender));
        TotalSV += 1;
        dsSinhVien[TotalSV] = maSV;
        tblSinhVien [maSV] = SinhVien (
            maSV, 
            tenSV,
            ngaySinh, 
            gioiTinh, 
            noiSinh, 
            danToc, 
            quocTich, 
            lop);
    }

    //Hàm chỉnh sửa sinh viên:
    function ChinhSuaSinhVien (
        string memory maSV,
        string memory tenSV,
        string memory ngaySinh,
        string memory gioiTinh,
        string memory noiSinh,
        string memory danToc,
        string memory quocTich,
        string memory lop
    ) public onlyApprover {
    //Kiểm tra sinh viên đã có chưa:
    require (SinhVienTonTai (maSV));
    //Kiểm tra người nhập đã đăng ký:
    require (NguoiDungTonTai (msg.sender));
    tblSinhVien [maSV].TenSV = tenSV;
    tblSinhVien [maSV].NgaySinh = ngaySinh;
    tblSinhVien [maSV].GioiTinh = gioiTinh;
    tblSinhVien [maSV].NoiSinh = noiSinh;
    tblSinhVien [maSV].DanToc = danToc;
    tblSinhVien [maSV].QuocTich = quocTich;
    tblSinhVien [maSV].Lop = lop;
    }

    //Hàm tìm sinh viên:
    function TimSinhVien (string memory _masv) public view returns (
        string memory MaSV,
        string memory TenSV,
        string memory NgaySinh,
        string memory GioiTinh
    ) {
    SinhVien memory ketQua = tblSinhVien [_masv];
    return (
        ketQua.MaSV,
        ketQua.TenSV,
        ketQua.NgaySinh,
        ketQua.GioiTinh
    );
    }

    //Hàm tìm sinh viên chi tiết:
    function ChiTietSinhVien (string memory _masv) public returns (
        string memory NoiSinh,
        string memory DanToc,
        string memory QuocTich,
        string memory Lop
    ) {
        SinhVien storage ketQua = tblSinhVien [_masv];
        return (
            ketQua.NoiSinh,
            ketQua.DanToc,
            ketQua.QuocTich,
            ketQua.Lop
        );
    }

    // //Cau truc cua doi tuong bang cap:
    // struct Bang {
    //     string MaSV;
    //     string SoHieu;
    //     string TenSV;
    //     string NgaySinh;
    //     string NamTotNghiep;
    //     string XepLoai;
    //     string HinhThuDaoTao;
    //     string NgayCap;
    //     string SoVaoSo;
    //     uint BlockNumber;
    // }

    // //So lan chinh sua bang:
    //     struct LanChinhSuaBang {
    //     uint SoLan;
    // }

    // //Index bang:
    // uint index = 0;
    // mapping (string => LanChinhSuaBang) tblLanChinhSuaBang;
    // mapping (string => mapping (uint => Bang)) tblBang;
    // mapping (uint => string) public tblThuTu; 

    // //Thêm bằng cấp:
    // function ThemBang (
    //     string memory maSV,
    //     string memory soHieu,
    //     string memory tenSV,
    //     string memory ngaySinh,
    //     string memory namTotNghiep,
    //     string memory xepLoai,
    //     string memory hinhThucDaoTao,
    //     string memory ngayCap,
    //     string memory soVaoSo
    // ) public {
    //     //Kiểm tra sinh viên tồn tại:
    //     require (SinhVienTonTai (maSV));
    //     //Kiểm tra người nhập đã đăng ký:
    //     require (NguoiDungTonTai (msg.sender));
    //     //Nhap thong tin bang cap:
    //     tblBang [maSV][tblLanChinhSuaBang
    //     [maSV].SoLan++] = Bang (
    //         maSV,
    //         soHieu,
    //         tenSV,
    //         ngaySinh,
    //         namTotNghiep,
    //         xepLoai,
    //         hinhThucDaoTao,
    //         ngayCap,
    //         soVaoSo,
    //         block.number
    //     );
    //     tblThuTu [index] = maSV;
    //     index++;
    // }

    // //Xuat thong tin 1 bang dua tren ma sinh vien:
    // function TimBang (string memory maTimKiem, uint soLan) public returns (
    //     string memory MaSV,
    //     string memory SoHieu,
    //     string memory TenSV,
    //     string memory NgaySinh
    // ) {
    //     Bang storage ketQua = tblBang [maTimKiem][soLan];
    //     return (
    //         ketQua.MaSV,
    //         ketQua.SoHieu,
    //         ketQua.TenSV,
    //         ketQua.NgaySinh
    //     );
    // }

    // function ChiTietBang (string memory maTimKiem, uint soLan) public returns (
    //     string memory NamTotNghiep,
    //     string memory XepLoai,
    //     string memory HinhThuDaoTao,
    //     string memory NgayCap,
    //     string memory SoVaoSo,
    //     uint BlockNumber
    // ) {
    // Bang storage ketQua = tblBang [maTimKiem][soLan];
    // return (
    //     ketQua.NamTotNghiep,
    //     ketQua.XepLoai,
    //     ketQua.HinhThuDaoTao,
    //     ketQua.NgayCap,
    //     ketQua.SoVaoSo,
    //     ketQua.BlockNumber
    //     );
    // }

    // //Ham so sanh hai chuoi bang nhau:
    // function ChuoiBangNhau (string memory chuoi1, string memory chuoi2) pure private returns (bool) {
    //     bytes memory _chuoi1 = bytes (chuoi1);
    //     bytes memory _chuoi2 = bytes (chuoi2);
    //     return keccak256 (_chuoi1) == keccak256
    //     (_chuoi2);
    // }

    // //Kiem tra mot so hieu bang co ton tai khong:
    // function TimBangSoHieu (string memory maTimKiem) public returns (string memory MaSV) {
    //     uint i = index;
    //     while (index >= 0) {
    //         if (ChuoiBangNhau (tblBang [tblThuTu[i]] [tblLanChinhSuaBang[tblThuTu[i]].SoLan-1].SoHieu, maTimKiem)) {
    //             return tblBang [tblThuTu[i]][tblLanChinhSuaBang[tblThuTu[i]].SoLan-1].MaSV;
    //         }
    //         i--;
    //     }
    // }

    // //Xuat so lan chinh sua cua 1 bang cap:
    // function TimSoLan (string memory _index) public returns (uint soLan) {
    //     return tblLanChinhSuaBang [_index].SoLan;
    // }
}