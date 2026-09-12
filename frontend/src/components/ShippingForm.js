import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logoCV from '../assets/images/logo_Shop.png';
import { IoCallSharp } from "react-icons/io5";
import '../assets/css/Products.css'

const ShippingForm = ({ addressShips, addAddress, removeAddress, setAddressShips, addAddressDefault }) => {
  const [ isEdit, setIsEdit ] = useState(false);
  const [ isEdit2, setIsEdit2 ] = useState(false);
  const [ isEditNew, setIsEditNew ] = useState(false);
  const [ indexEditAddress, setIndexEditAddress ] = useState('');
  const [ shippingAddress, setShippingAddress ] = useState({
    name: "",
    phone: "",
    city: "",
    district: "",
    ward: "",
    address: ""
  });

  const eidtArrAddress = (index) => {
    setIsEdit2(true);
    setIndexEditAddress(index);
    setShippingAddress(addressShips[index]);
  };

  const handleUpdatedEditAddress = () => {
    let newEditAddress = [...addressShips];
    newEditAddress[indexEditAddress] = shippingAddress;
    setAddressShips(newEditAddress);
    setIndexEditAddress('');
    setIsEdit2(false)
  }
  
  const navigate = useNavigate();
  const handleUpdatedAddressDefault = () => {
    setIsEdit(false)
    setAddressDefault(shippingAddress);
  }

  const shipToCartDefault = () => {
    addAddressDefault(addressDefault);
    navigate('/checkout/cart');
  }
  const addAddressNew = () => {
    addAddress(shippingAddress)
    addAddressDefault(shippingAddress)
    navigate('/checkout/cart')
  }

  const handleUpdatedAddressDefault2 = (index) => {
    const addressDefaultNew = addressShips.filter((a,ind) => ind === index);
    addAddressDefault(addressDefaultNew)
    navigate('/checkout/cart')
  }

  const [addressDefault, setAddressDefault ] = useState({
    name: "Lê Văn Chí",
    phone: "0388749516",
    city: "Đà Nẵng",
    district: "Quận Cẩm Lệ",
    ward: "Phường Khuê Trung",
    address: "54 Nguyễn Hành"
  })

  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  // Lấy danh sách tỉnh/thành phố
  useEffect(() => {
    if (!isEdit) {
      const fetch = async () => {
        const res = await axios.get(`https://provinces.open-api.vn/api/p/`);
        setCities(res.data)
      };
      fetch();
    }
  }, [isEdit]);
  
  // Lấy danh sách quận/huyện khi chọn tỉnh/thành phố
  useEffect(() => {
    if (shippingAddress.city) {
      const selectedCity = cities.find((city) => city.name === shippingAddress.city);    
      const fetch = async () => {
        // List Districts
        const res = await axios.get(`https://provinces.open-api.vn/api/d/`);
        // setDistricts(res.data.filter((p) => p.province_code === selectedCity.code));
        const Districts = res.data;
        setDistricts(Districts.filter((p) => p.province_code === selectedCity.code));    
      };
      fetch();
      
    } else {
      setDistricts([]);
      setWards([]);
    }
  }, [cities, shippingAddress]);

  // Lấy danh sách xã/phường khi chọn quận/huyện
  useEffect(() => {
    if (shippingAddress.district) {
      const selectedDistrict = districts.find(
        (district) => district.name === shippingAddress.district
      );
      const fetch = async () => {
        // List Wards
        const res = await axios.get(`https://provinces.open-api.vn/api/w/`);
        setWards(res.data.filter((w) => w.district_code === selectedDistrict.code))
      }
      fetch();
    } else {
      setWards([]);
    }
  }, [shippingAddress.district, districts]);

  // Xử lý thay đổi thông tin địa chỉ giao hàng
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({...prev, [name]: value}))
  } 

  const backToHome = () => {
    navigate(`/home`);
  }
  return (
    <div className="w-100 h-auto " style={{backgroundColor: '#F5F5FA', fontFamily:'Inter,Helvetica,Arial,sans-serif,Raleway'}}>
      <div>
        <div className="w-100 bg-white d-flex flex-row align-items-center justify-content-center" style={{height: '100px'}}>
          <div className="d-flex flex-row justify-content-between" style={{width:'1220px'}}>
            <div className="d-flex flex-row align-items-center justify-content-center h-75 hoverCursor" onClick={backToHome}>
              <img src={logoCV} alt="logo" width={70}/>
              <div className="border-start border-primary h-50 p- ms-3 ps-3 fs-4 fw-normal" style={{color: '#1AA7FF'}}>Địa chỉ giao hàng</div>
            </div>
            <div className="bg-primary bg-opacity-10 d-flex flex-row align-items-center justify-content-between px-3 rounded-5" style={{width:'230px'}}>
              <div className="bg-primary bg-opacity-75 rounded-5 d-flex align-items-center justify-content-center text-white fs-5" style={{width: '37px', height:'37px'}}>
                <IoCallSharp />
              </div>
              <div className="d-flex flex-column w-75">
                <div className="text-primary text-opacity-75 fw-bold fs-5">0388-749-516</div>
                <div className="text-black-50 fw-medium" style={{fontSize:'13px'}}>8h - 21h, cả T7 & CN</div>
              </div>
            </div>
          </div>
        </div>
        {/* {addressShips.map((a, index) => (
          <div key={index}>
            <div>{a.name}</div>
            <div>{a.phone}</div>
            <div>{a.city}</div>
            <div>{a.district}</div>
            <div>{a.ward}</div>
            <div>{a.address}</div>
          </div>
        ))} */}
      </div>

      <div className="w-75 m-auto mt-3">
        <div className="fw-medium" style={{fontSize: '17px'}}>2. Địa chỉ giao hàng</div>
        <div className="mt-1" style={{fontSize: '15px', fontWeight:'500'}}>Chọn địa chỉ giao hàng có sẵn bên dưới:</div>
      </div>

      <div className="w-75 m-auto mt-3">
        <div className="d-flex flex-wrap row-gap-3 justify-content-between">
          
              <div className="bg-white border-1 border-success p-2 d-flex flex-column ps-3 rounded-1" style={{width:'567px', height: '135px', border: 'dashed', fontFamily: 'inherit'}}>
                <div className="d-flex flex-row justify-content-between ">
                  <div style={{fontSize:'16px', fontWeight: 'bold', fontFamily:'Raleway'}}>{addressDefault.name}</div>
                  <span className="text-success" style={{fontSize:'13px'}}>Mặc định</span>
                </div>
                <div className="d-flex flex-column lh-sm" style={{height: '58px'}}>
                  <span className="d-flex" style={{fontSize:'14px'}}>Địa chỉ: {addressDefault.address}, {addressDefault.ward}, {addressDefault.district}, {addressDefault.city}</span>
                  <span className="d-flex" style={{fontSize:'14px'}}>Việt Nam</span>
                  <span className="d-flex" style={{fontSize:'14px'}}>Điện thoại: {addressDefault.phone}</span>
                </div>
                <p className="d-flex flex-row gap-2 mt-2">
                  <button className="border border-0 p-1 d-flex justify-content-center align-items-center px-3 text-white fw-medium rounded-1" style={{backgroundColor: '#00B6F0', fontSize:'13px'}} onClick={() => shipToCartDefault()}>Giao đến địa chỉ này</button>
                  <button className="border border-secondary-subtle bg-white p-1 d-flex justify-content-center align-items-center px-3 rounded-1" style={{height:'px', fontSize:'14px'}} onClick={() => setIsEdit(true)}>Sửa</button>
                </p>
              </div>

          {addressShips.length > 0 &&
            addressShips.map((a, index) => (
              <div key={index} className="bg-white border-1 border border-secondary-subtle p-2 d-flex flex-column ps-3 rounded-1" style={{width:'567px', height: '135px', fontFamily: 'inherit'}}>
                <div className="d-flex flex-row justify-content-between">
                  <div style={{fontSize:'16px', fontWeight: 'bold', fontFamily:'Raleway'}}>{a.name}</div>
                </div>
                <div className="d-flex flex-column lh-sm" style={{height: '58px'}}>
                  <span className="d-flex" style={{fontSize:'14px'}}>Địa chỉ: {a.address}, {a.ward}, {a.district}, {a.city}</span>
                  <span className="d-flex" style={{fontSize:'14px'}}>Việt Nam</span>
                  <span className="d-flex" style={{fontSize:'14px'}}>Điện thoại: {a.phone}</span>
                </div>
                <p className="d-flex flex-row gap-2 mt-2">
                  <button className="border border-0 p-1 d-flex justify-content-center align-items-center px-3 text-white fw-medium rounded-1" style={{backgroundColor: '#626455', fontSize:'13px'}} onClick={()=> handleUpdatedAddressDefault2(index)}>Giao đến địa chỉ này</button>
                  <button className="border border-secondary-subtle bg-white p-1 d-flex justify-content-center align-items-center px-3 rounded-1" style={{height:'px', fontSize:'14px'}} onClick={() => eidtArrAddress(index)}>Sửa</button>
                  <button className="border border-secondary-subtle bg-white p-1 d-flex justify-content-center align-items-center px-3 rounded-1" style={{height:'px', fontSize:'14px'}} onClick={() => removeAddress(index)}>Xóa</button>
                </p>
              </div>
            ))
          }
        </div>

        <div className="d-flex flex-row gap-1 mt-3" style={{fontSize: '14px'}}>
          <div>Bạn muốn giao hàng đến địa chỉ khác?</div>
          <div className="link-primary hoverCursor" onClick={() => setIsEditNew(true)}> Thêm địa chỉ giao hàng mới</div>
        </div>

        <div>
          {(isEdit || isEditNew) &&
            <div className="w-100 m-auto mt-1 border border-1 d-flex flex-column justify-content-between align-items-center p-2" style={{backgroundColor:'#F7F7F7', height:'463px'}}>
              <div className="d-flex flex-row w-50 justify-content-between align-items-center">
                <label className="fw-semibold" style={{fontSize:'14px', fontFamily:'Raleway'}}>Tên người nhận:</label>
                <input
                  type="text"
                  name="name"
                  value={shippingAddress.name}
                  onChange={handleAddressChange}
                  placeholder="Nhập tên người nhận"
                  required
                  style={{width:'366px', height:'34px', fontSize:'14px', fontFamily:'Raleway',outlineColor: 'blue'}}
                  className="border border-1 rounded-1 p-1 px-2"
                />
              </div>
              <div className="d-flex flex-row w-50 justify-content-between align-items-center">
                <label className="fw-semibold" style={{fontSize:'14px', fontFamily:'Raleway'}}>Số điện thoại:</label>
                <input
                  type="text"
                  name="phone"
                  value={shippingAddress.phone}
                  onChange={handleAddressChange}
                  placeholder="Nhập số điện thoại"
                  required
                  style={{width:'366px', height:'34px', fontSize:'14px', outlineColor: 'blue'}}
                  className="border border-1 rounded-1 p-1 px-2"
                />
              </div>
              <div className="d-flex flex-row w-50 justify-content-between align-items-center">
                <label className="fw-semibold" style={{fontSize:'14px', fontFamily:'Raleway'}}>Tỉnh/Thành phố:</label>
                <select
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleAddressChange}
                  required
                  style={{width:'366px', height:'34px', fontSize:'14px', fontFamily:'Raleway'}}
                  className="border border-1 rounded-1 p-1 px-2"
                  
                >
                  <option value="">Chọn Tỉnh/Thành phố</option>
                  {cities.map((city) => (
                    <option key={city.code} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="d-flex flex-row w-50 justify-content-between align-items-center">
                <label className="fw-semibold" style={{fontSize:'14px', fontFamily:'Raleway'}}>Quận/Huyện:</label>
                <select
                  name="district"
                  value={shippingAddress.district}
                  onChange={handleAddressChange}
                  required
                  style={{width:'366px', height:'34px', fontSize:'14px', fontFamily:'Raleway'}}
                  className="border border-1 rounded-1 p-1 px-2"
                  
                >
                  <option value="">Chọn Quận/Huyện</option>
                  {districts.map((district) => (
                    <option key={district.code} value={district.name}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="d-flex flex-row w-50 justify-content-between align-items-center">
                <label className="fw-semibold" style={{fontSize:'14px', fontFamily:'Raleway'}}>Phường/Xã:</label>
                <select
                  name="ward"
                  value={shippingAddress.ward}
                  onChange={handleAddressChange}
                  required
                  style={{width:'366px', height:'34px', fontSize:'14px', fontFamily:'Raleway'}}
                  className="border border-1 rounded-1 p-1 px-2"
                  
                >
                  <option value="">Chọn Phường/Xã</option>
                  {wards.map((ward) => (
                    <option key={ward.code} value={ward.name}>
                      {ward.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="d-flex flex-row w-50 justify-content-between align-items-center">
                <label className="fw-semibold" style={{fontSize:'14px', fontFamily:'Raleway'}}>Địa chỉ chi tiết:</label>
                <textarea
                  type="textarea"
                  name="address"
                  value={shippingAddress.address}
                  onChange={handleAddressChange}
                  placeholder="Ví dụ: 52, đường Trần Hưng Đạo"
                  required
                  style={{width:'366px', height:'80px', fontSize:'14px', fontFamily:'Raleway', outlineColor: 'blue'}}
                  className="border border-1 rounded-1 p-1 px-2"
                />
              </div>
              <div className="d-flex flex-row justify-content-end w-50 gap-3" style={{height: '38px'}}>
                {isEditNew && !isEdit &&
                <div className="d-flex flex-row justify-content-end w-75 gap-3">
                  <button className="border border-secondary-subtle bg-white p-1 d-flex justify-content-center align-items-center px-3 w-25" style={{fontSize:'14px'}} onClick={() => setIsEditNew(false)}>Huỷ bỏ</button>
                  <button className="border border-secondary p-1 d-flex justify-content-center align-items-center px-3 text-white fw-medium h-100" style={{backgroundColor: '#00B6F0', fontSize:'14px', width:'178px'}} onClick={() => addAddressNew()}>Giao đến địa chỉ này</button>
                </div>  
                }{isEdit && !isEditNew &&
                  <div className="d-flex flex-row justify-content-end w-50 gap-3">
                    <button className="border border-secondary-subtle bg-white p-1 d-flex justify-content-center align-items-center px-3 w-50" style={{fontSize:'14px'}} onClick={() => setIsEdit(false)}>Huỷ bỏ</button>
                    <button className="border border-secondary p-1 d-flex justify-content-center align-items-center px-3 text-white fw-medium h-100 w-50" style={{backgroundColor: '#00B6F0', fontSize:'14px'}} onClick={() => handleUpdatedAddressDefault()}>Cập nhật</button>
                  </div>
                }
              </div>
            </div>
          }
          {/*  */}
          {isEdit2 &&
            // shippingAddress.map((a,index) => (
              <div className="w-100 m-auto mt-1 border border-1 d-flex flex-column justify-content-between align-items-center p-2" style={{backgroundColor:'#F7F7F7', height:'463px'}}>
              <div className="d-flex flex-row w-50 justify-content-between align-items-center">
                <label className="fw-semibold" style={{fontSize:'14px', fontFamily:'Raleway'}}>Tên người nhận:</label>
                <input
                  type="text"
                  name="name"
                  value={shippingAddress.name}
                  onChange={handleAddressChange}
                  placeholder="Nhập tên người nhận"
                  required
                  style={{width:'366px', height:'34px', fontSize:'14px', fontFamily:'Raleway',outlineColor: 'blue'}}
                  className="border border-1 rounded-1 p-1 px-2"
                />
              </div>
              <div className="d-flex flex-row w-50 justify-content-between align-items-center">
                <label className="fw-semibold" style={{fontSize:'14px', fontFamily:'Raleway'}}>Số điện thoại:</label>
                <input
                  type="text"
                  name="phone"
                  value={shippingAddress.phone}
                  onChange={handleAddressChange}
                  placeholder="Nhập số điện thoại"
                  required
                  style={{width:'366px', height:'34px', fontSize:'14px', outlineColor: 'blue'}}
                  className="border border-1 rounded-1 p-1 px-2"
                />
              </div>
              <div className="d-flex flex-row w-50 justify-content-between align-items-center">
                <label className="fw-semibold" style={{fontSize:'14px', fontFamily:'Raleway'}}>Tỉnh/Thành phố:</label>
                <select
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleAddressChange}
                  required
                  style={{width:'366px', height:'34px', fontSize:'14px', fontFamily:'Raleway'}}
                  className="border border-1 rounded-1 p-1 px-2"
                  
                >
                  <option value="">Chọn Tỉnh/Thành phố</option>
                  {cities.map((city) => (
                    <option key={city.code} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="d-flex flex-row w-50 justify-content-between align-items-center">
                <label className="fw-semibold" style={{fontSize:'14px', fontFamily:'Raleway'}}>Quận/Huyện:</label>
                <select
                  name="district"
                  value={shippingAddress.district}
                  onChange={handleAddressChange}
                  required
                  style={{width:'366px', height:'34px', fontSize:'14px', fontFamily:'Raleway'}}
                  className="border border-1 rounded-1 p-1 px-2"
                  
                >
                  <option value="">Chọn Quận/Huyện</option>
                  {districts.map((district) => (
                    <option key={district.code} value={district.name}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="d-flex flex-row w-50 justify-content-between align-items-center">
                <label className="fw-semibold" style={{fontSize:'14px', fontFamily:'Raleway'}}>Phường/Xã:</label>
                <select
                  name="ward"
                  value={shippingAddress.ward}
                  onChange={handleAddressChange}
                  required
                  style={{width:'366px', height:'34px', fontSize:'14px', fontFamily:'Raleway'}}
                  className="border border-1 rounded-1 p-1 px-2"
                  
                >
                  <option value="">Chọn Phường/Xã</option>
                  {wards.map((ward) => (
                    <option key={ward.code} value={ward.name}>
                      {ward.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="d-flex flex-row w-50 justify-content-between align-items-center">
                <label className="fw-semibold" style={{fontSize:'14px', fontFamily:'Raleway'}}>Địa chỉ chi tiết:</label>
                <textarea
                  type="textarea"
                  name="address"
                  value={shippingAddress.address}
                  onChange={handleAddressChange}
                  placeholder="Ví dụ: 52, đường Trần Hưng Đạo"
                  required
                  style={{width:'366px', height:'80px', fontSize:'14px', fontFamily:'Raleway', outlineColor: 'blue'}}
                  className="border border-1 rounded-1 p-1 px-2"
                />
              </div>
              <div className="d-flex flex-row justify-content-end w-50 gap-3" style={{height: '38px'}}>
                <div className="d-flex flex-row justify-content-end w-50 gap-3">
                  <button className="border border-secondary-subtle bg-white p-1 d-flex justify-content-center align-items-center px-3 w-50" style={{fontSize:'14px'}} onClick={() => setIsEdit2(false)}>Huỷ bỏ</button>
                  <button className="border border-secondary p-1 d-flex justify-content-center align-items-center px-3 text-white fw-medium h-100 w-50" style={{backgroundColor: '#00B6F0', fontSize:'14px'}} onClick={() => handleUpdatedEditAddress()}>Cập nhật2</button>
                </div>
              </div>
            </div>
            // ))
            
          }
        </div>
      </div>

      <div className="w-100 d-flex" style={{backgroundColor: '#EBEBF0', height: '160px'}}>
        <div className="d-flex flex-column m-auto" style={{fontSize: '12.5px', fontFamily:'Inter,Helvetica,Arial,sans-serif'}}>
          <div className=" text-secondary">Bằng việc tiến hành Đặt Mua, bạn đồng ý với các Điều kiện Giao dịch chung:</div>
          <div className="d-flex">
            <span className="border-secondary-subtle border-end e-2 pe-2">Quy chế hoạt động</span>
            <span className="border-secondary-subtle border-end e- px-2">Chính sách giải quyết khiếu nại</span>
            <span className="border-secondary-subtle border-end m2 px-2">Chính sách bảo hành</span>
            <span className="border-secondary-subtle border-end me2 px-2">Chính sách bảo mật thanh toán</span>
            <span className=" me2 px-2">Chính sách bảo mật thông tin cá nhân</span>
          </div>
          <div className="text-secondary mt-3">© 2019 - Bản quyền của Công Ty Cổ Phần Ci Vi - Civi.vn</div>
        </div>
      </div>
    </div>
  );
};

export default ShippingForm;