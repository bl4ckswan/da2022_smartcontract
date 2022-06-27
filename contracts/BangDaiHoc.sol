// SPDX-License-Identifier: GPL-3.0
import "@openzeppelin/contracts/access/Ownable.sol";
pragma solidity ^0.8.0;

contract BangDaiHoc is Ownable {

    //Định nghĩa người dùng:
    // Dia chi nguoi dung
    // Ho va ten Nguoi dung
    // Admin hay khong
    struct NguoiDung {
        uint id;
        address DiaChi;
        string Ten;
        string hashinfo;
        uint Role; // 0 is admin / 1 is quan ly sinh vien / 2 is quan ly van bang / 3 nguoi dung 
    } 
    mapping (address => NguoiDung) _tblNguoiDung;

    //liet ke tai khoan tren he thong
    uint public totalUser = 1;
    mapping (uint => address) _dsAddressHeThong;
    

    //constructor:
    // Khoi tao nguoi dung Owner Smartcontract lam Admin. Dung dau danh sach
    constructor () public {
        _tblNguoiDung [msg.sender] = NguoiDung(0,msg.sender, "SUPERADMIN","", 777);
      
        _dsAddressHeThong [0] = msg.sender;
      




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
    function ThemNguoiDung (address diaChi,string memory ten, string memory hashinfo) public {
        //Kiểm tra là admin:
        require (_tblNguoiDung[msg.sender].Role == 777);
        //Kiểm tra tồn tại người dùng:
        require (!NguoiDungTonTai(diaChi));
        //Thêm người dùng:
        require (!ChuoiRong(ten));

        // Tang bo dem
        // Thuc hien them nguoi vao he thong
        _tblNguoiDung [diaChi] = NguoiDung (totalUser,diaChi, ten,hashinfo, 3); // mặc định là người dùng bình thường
        _dsAddressHeThong[totalUser] = diaChi;
        totalUser += 1;

    }

    //Hàm chỉnh sửa người dùng:
    function ChinhSuaNguoiDung (address diaChi, string memory ten, string memory hashinfo, uint Role) public {
        //Kiểm tra admin:
        require (_tblNguoiDung [msg.sender].Role == 777);
        //Kiểm tra tài khoản chỉnh sửa tồn tại:
        require (NguoiDungTonTai (diaChi));
        //Tên không được để trống:
        require (!ChuoiRong (ten));
        _tblNguoiDung [diaChi].Ten = ten;
        _tblNguoiDung [diaChi].Role = Role;
        _tblNguoiDung [diaChi].hashinfo = hashinfo;
    }

    //Hàm tìm người dùng:
    function TimNguoiDung (address diaChi) public view returns (address diachi, string memory ten,string memory hashinfo, uint role) {
        NguoiDung memory ketQua = _tblNguoiDung [diaChi];
        return (ketQua.DiaChi,ketQua.Ten, ketQua.hashinfo, ketQua.Role);
    }

    //Danh sach nguoi dung
    function DanhsachnguoidungHeThong() public view returns (NguoiDung[] memory){
        NguoiDung[] memory dsNguoidung = new NguoiDung[](totalUser);
        for (uint i = 0; i < totalUser; i++){
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
        string Hashinfo; // chứa link ảnh
        address Owneraddr; // địa chỉ ví 
        uint Secretkey; // key de doc
    }
    mapping (string => SinhVien) tblSinhVien;
    uint public totalSV = 0;
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
        string memory lop,
        string memory hashinfo,
        address owneraddr,
        uint secretkey
    ) public {
        //Kiểm tra sinh viên đã có chưa:
        require (!SinhVienTonTai (maSV));
        //Kiểm tra người nhập đã đăng ký:
        require (NguoiDungTonTai (msg.sender));
        require (_tblNguoiDung [msg.sender].Role == 1 || _tblNguoiDung [msg.sender].Role == 777);

        tblSinhVien [maSV] = SinhVien (
            maSV, 
            tenSV,
            ngaySinh, 
            gioiTinh, 
            noiSinh, 
            danToc, 
            quocTich, 
            lop,
            hashinfo,
            owneraddr,
            secretkey
            );
        //Sinh vien tinh từ 1        
        dsSinhVien[totalSV] = maSV;
        totalSV += 1;
        
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
        string memory lop,
        string memory hashinfo,
        address owneraddr,
        uint secretkey
    ) public {
    //Kiểm tra sinh viên đã có chưa:
    require (SinhVienTonTai (maSV));
    //Kiểm tra người nhập đã đăng ký:
    require (NguoiDungTonTai (msg.sender));
    require (_tblNguoiDung [msg.sender].Role == 1 || _tblNguoiDung [msg.sender].Role == 777);

    tblSinhVien [maSV].TenSV = tenSV;
    tblSinhVien [maSV].NgaySinh = ngaySinh;
    tblSinhVien [maSV].GioiTinh = gioiTinh;
    tblSinhVien [maSV].NoiSinh = noiSinh;
    tblSinhVien [maSV].DanToc = danToc;
    tblSinhVien [maSV].QuocTich = quocTich;
    tblSinhVien [maSV].Lop = lop;
    tblSinhVien [maSV].Hashinfo = hashinfo;
    tblSinhVien [maSV].Owneraddr = owneraddr;
    tblSinhVien [maSV].Secretkey = secretkey;
    }

    //Hàm tìm sinh viên:
    function TimSinhVien (string memory _masv) public view returns (
        string memory MaSV,
        string memory TenSV,
        string memory NgaySinh,
        string memory GioiTinh,
        string memory NoiSinh,
        string memory DanToc,
        string memory QuocTich,
        string memory Lop,
        string memory Hashinfo,
        address Owneraddr,
        uint Secretkey
    ) {
    
    require (_tblNguoiDung [msg.sender].Role == 1 || _tblNguoiDung [msg.sender].Role == 777);
    SinhVien memory ketQua = tblSinhVien [_masv];
    return (
        ketQua.MaSV,
        ketQua.TenSV,
        ketQua.NgaySinh,
        ketQua.GioiTinh,
        ketQua.NoiSinh,
        ketQua.DanToc,
        ketQua.QuocTich,
        ketQua.Lop,
        ketQua.Hashinfo,
        ketQua.Owneraddr,
        ketQua.Secretkey      
    );
    }
    

    //Hàm tìm sinh viên chi tiết voi secret key
    function TimSinhVien_withsecret (string memory _masv, uint secret) public view returns (
        string memory MaSV,
        string memory TenSV,
        string memory NgaySinh,
        string memory GioiTinh,
        string memory NoiSinh,
        string memory DanToc,
        string memory QuocTich,
        string memory Lop,
        string memory Hashinfo,
        address Owneraddr,
        uint Secretkey
    ) {
    
    require (tblSinhVien [_masv].Secretkey == secret );

    SinhVien memory ketQua = tblSinhVien [_masv];
    return (
        ketQua.MaSV,
        ketQua.TenSV,
        ketQua.NgaySinh,
        ketQua.GioiTinh,
        ketQua.NoiSinh,
        ketQua.DanToc,
        ketQua.QuocTich,
        ketQua.Lop,
        ketQua.Hashinfo,
        ketQua.Owneraddr,
        ketQua.Secretkey      
    );
    }

    // ham thiet lap secret
    function Setsecretkey_qlsv(string memory _masv, uint secret) public returns (bool) {
        require (_tblNguoiDung [msg.sender].Role == 1 || _tblNguoiDung [msg.sender].Role == 777 || tblSinhVien [_masv].Owneraddr == msg.sender );
        tblSinhVien [_masv].Secretkey = secret;
        return true;
    }
    function Danhsachsinhvien() public view returns (SinhVien[] memory){
        require (_tblNguoiDung [msg.sender].Role == 1 || _tblNguoiDung [msg.sender].Role == 777);
        require(totalSV != 0);
        SinhVien[] memory dsSinhvien = new SinhVien[](totalSV);
        for (uint i = 0; i < totalSV; i++){
            SinhVien storage currentItem = tblSinhVien[dsSinhVien[i]];
            dsSinhvien[i] = currentItem;
        }
        return dsSinhvien;
    }

    //Cau truc cua doi tuong bang cap:
    struct Bang {
        string MaSV;
        string SoHieu;
        // string TenSV; lấy từ dữ liệu sinh viên
        // string NgaySinh;
        string NamTotNghiep;
        string XepLoai;
        string HinhThuDaoTao;
        string NgayCap;
        string SoVaoSo;
        string hashpoint; // điểm của sinh viên trong trường
        address owneraddress; // địa chỉ ví của sinh viên
        uint secretkey; // mã số bí mật để truy cập
    }

    

    //Index bang:
    uint public totalBang = 0;
    mapping (string => uint) tblLanChinhSuaBang;
    mapping (string => Bang) tblBang;
    mapping (uint => string) public tblThuTu; 

    //Thêm bằng cấp:
    function ThemBang (
        string memory maSV,
        string memory SoHieu,
        string memory namTotNghiep,
        string memory xepLoai,
        string memory hinhThucDaoTao,
        string memory ngayCap,
        string memory soVaoSo,
        string memory hashpoint,
        address owneraddress,
        uint secretkey
    ) public {
        //Kiểm tra sinh viên tồn tại:
        require (SinhVienTonTai (maSV));
        //Kiểm tra người nhập đã đăng ký:
        require (NguoiDungTonTai (msg.sender));

        //kiểm tra quyền người dùng
        require (_tblNguoiDung [msg.sender].Role == 2 || _tblNguoiDung [msg.sender].Role == 777);

        //Nhap thong tin bang cap:
        tblBang [SoHieu] = Bang (
            maSV,
            SoHieu,
            namTotNghiep,
            xepLoai,
            hinhThucDaoTao,
            ngayCap,
            soVaoSo,
            hashpoint,
            owneraddress,
            secretkey
        );
        tblThuTu [totalBang] = maSV;
        totalBang++;
    }

    function BangTonTai (string memory SoHieu) private returns (bool) {
        if(!ChuoiRong (tblBang[SoHieu].MaSV))
            return true;
        return false;
    }
    //Thêm bằng cấp:
    function ChinhsuaBang (
        string memory maSV,
        string memory SoHieu,
        string memory namTotNghiep,
        string memory xepLoai,
        string memory hinhThucDaoTao,
        string memory ngayCap,
        string memory soVaoSo,
        string memory hashpoint,
        address owneraddress,
        uint secretkey
    ) public {
        //Kiểm tra sinh viên tồn tại:
        require (BangTonTai(SoHieu));
        //Kiểm tra người nhập đã đăng ký:
        require (NguoiDungTonTai (msg.sender));

        //kiểm tra quyền người dùng
        require (_tblNguoiDung [msg.sender].Role == 2 || _tblNguoiDung [msg.sender].Role == 777);

        //Nhap thong tin bang cap:
        tblBang [SoHieu].NamTotNghiep = namTotNghiep;
        tblBang [SoHieu].XepLoai = xepLoai;
        tblBang [SoHieu].HinhThuDaoTao = hinhThucDaoTao;
        tblBang [SoHieu].NgayCap = ngayCap;
        tblBang [SoHieu].SoVaoSo = soVaoSo;
        tblBang [SoHieu].hashpoint = hashpoint;
        tblBang [SoHieu].owneraddress = owneraddress;
        tblBang [SoHieu].secretkey = secretkey;
    }


    
    function TimBang (string memory _SoHieu) public view returns (
        string memory maSV,
        string memory sohieu,
        string memory namTotNghiep,
        string memory xepLoai,
        string memory hinhThucDaoTao,
        string memory ngayCap,
        string memory soVaoSo,
        string memory hashpoint,
        string memory ten, 
        string memory ngaysinh
    ) {  
        
        // Kiem tra role nguoi dung
        require (_tblNguoiDung [msg.sender].Role == 2 || _tblNguoiDung [msg.sender].Role == 777);

       
        // lay thong tin ve bang
        Bang memory kqBang = tblBang[_SoHieu];
        SinhVien memory ketQua = tblSinhVien [kqBang.MaSV];
    return (
        kqBang.MaSV,
        kqBang.SoHieu,
        kqBang.NamTotNghiep,
        kqBang.XepLoai,
        kqBang.HinhThuDaoTao,
        kqBang.NgayCap,
        kqBang.SoVaoSo,
        kqBang.hashpoint,
        ketQua.TenSV,
        ketQua.NgaySinh
    );
    }

    function TimBang_withsecretkey (string memory _SoHieu, uint secretkey) public view returns (
        string memory maSV,
        string memory sohieu,
        string memory namTotNghiep,
        string memory xepLoai,
        string memory hinhThucDaoTao,
        string memory ngayCap,
        string memory soVaoSo,
        string memory hashpoint,
        string memory ten, 
        string memory ngaysinh
    ) {  
        
        // Kiem tra role nguoi dung
        require (tblBang[_SoHieu].secretkey == secretkey);

       
        // lay thong tin ve bang
        Bang memory kqBang = tblBang[_SoHieu];
        SinhVien memory ketQua = tblSinhVien [kqBang.MaSV];
    return (
        kqBang.MaSV,
        kqBang.SoHieu,
        kqBang.NamTotNghiep,
        kqBang.XepLoai,
        kqBang.HinhThuDaoTao,
        kqBang.NgayCap,
        kqBang.SoVaoSo,
        kqBang.hashpoint,
        ketQua.TenSV,
        ketQua.NgaySinh
    );
    }
     // ham thiet lap secret
    function Setsecretkey_qlvb(string memory _sohieu, uint secret) public returns(bool)  {
        require (_tblNguoiDung [msg.sender].Role == 2 || _tblNguoiDung [msg.sender].Role == 777 || tblBang [_sohieu].owneraddress == msg.sender );
        tblBang [_sohieu].secretkey = secret;
        return true;
    }
  
}