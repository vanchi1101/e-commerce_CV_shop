import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import logoCV from '../assets/images/logo_Shop.png';
import { IoCallSharp } from "react-icons/io5";
import imgNow from '../assets/images/shipNow.png'
import { FaBox } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { formatPrice } from "../DataMethFuc/CountDown";

const Checkout = ({ addressShipsDefault }) => {
  const [ isViewDetails, setIsViewDetails ] = useState(false);
  const location = useLocation();
  const { selectedItems } = location.state || { selectedItems: []};
  const [ selectedFee, setSelectedFee ] = useState(25);
  const [ selectedFeeTrasport, setSelectedFeeTrasport ] = useState(35);
  const [ selectedPayment, setSelectedPayment ] = useState('');


  const handleChangeFee = (event) => {
    console.log(parseInt(event.target.value));
    console.log(selectedFeeTrasport);
    if (parseInt(event.target.value) === 15) {
      setSelectedFeeTrasport(18.3);
    }else {
      setSelectedFeeTrasport(35);
    }
    setSelectedFee(parseInt(event.target.value))
        
  }

  const navigate = useNavigate();
  const backToHome = () => {
    navigate('/home');
  };

  const handleViewInfo = () => {
    setIsViewDetails(isViewDetails ? false : true);
  };

  const totalItems = () => {
    return selectedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const discountItems = () => {
    return selectedItems.reduce((total, item) => total + Math.abs(parseInt(item.phanTram)), 0);
  };
  
  const handleChangePayment = (e) => {
    setSelectedPayment(e.target.value);
  };

  const totalQuantityItem = () => {
    return selectedItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="h-auto">
      <div className="d-flex flex-column gap-3 mb-5">
        <div className="w-100 bg-white d-flex flex-row align-items-center justify-content-center" style={{height: '100px'}}>
          <div className="d-flex flex-row justify-content-between" style={{width:'1220px'}}>
            <div className="d-flex flex-row align-items-center justify-content-center h-75 hoverCursor" >
              <img src={logoCV} alt="logo" width={70} onClick={backToHome}/>
              <div className="border-start border-primary h-50 p- ms-3 ps-3 fs-4 fw-medium" style={{color: '#1AA7FF'}}>Thanh toán</div>
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
        {/*  */}
        <div className="w-100">
          <div>
            <div className="d-flex flex-row m-auto gap-4" style={{width: '1270px'}}>
              <div className="d-flex flex-column gap-3" style={{width: '900px'}}>
                <div className="d-flex flex-column gap-2 bg-white p-3 rounded-2">
                  <h5>Chọn hình thức giao hàng</h5>
                  <div className="d-flex flex-column bg-primary bg-opacity-10 gap-4 p-3 rounded-4 w-50 border border-primary border-opacity-50">
                    <label className="d-flex flex-row gap-2 hoverCursor">
                      <input 
                        type="radio" 
                        value={parseInt(25)}
                        checked={selectedFee === 25}
                        onChange={handleChangeFee}
                        style={{width: '20px'}}
                      />
                      <span className="d-flex flex-row justify-content-center align-items-center gap-1" style={{fontSize: '15px', fontFamily:'Roboto'}}>
                        <img src={imgNow} width={40} height={16} alt="now"/>
                        <div>Giao siêu tốc 12h</div> 
                        <div className="bg-white rounded-2 text-success text-opacity-75 fw-medium">-25k</div> 
                      </span>
                    </label>

                    <label className="d-flex flex-row gap-2 hoverCursor">
                      <input 
                        type="radio"
                        value={parseInt(15)} 
                        onChange={handleChangeFee}
                        checked={selectedFee === 15}
                        style={{width: '20px'}}
                      />
                      <span className="d-flex flex-row justify-content-center align-items-center gap-1" style={{fontSize: '15px', fontFamily:'Roboto'}}>
                        <div>Giao tiết kiệm</div>
                        <div className="bg-white rounded-2 text-success text-opacity-75 fw-medium">-15k</div>
                      </span>
                    </label>
                  </div>
                  <div className="d-flex flex-column gap-2 border border-1 rounded-4 p-3 mt-5">
                    {selectedFee === 25 ?
                      (
                        <div className="position-absolute border border-0 bg-white px-2 text-success" style={{top: '365px'}}><FaBox /> Gói: Giao siêu tốc, trước 11h ngày mai</div>
                      ) : (
                        <div className="position-absolute border border-0 bg-white px-2 text-success" style={{top: '365px'}}><FaBox /> Gói: Giao đúng chiều mai, 13h - 18h, 25/11</div>
                      )
                    }
                    
                    <div className="h-auto d-flex flex-column gap-3">
                      {selectedItems.length > 0 &&
                        selectedItems.map((item, index) => (
                          <div key={index} className="">
                            <div className="d-flex flex-row gap-2">
                              <img src={item.image} width={40} height={40} alt="item"/>
                              <div className="text-dark text-opacity-50" style={{fontSize:'15px', fontFamily:'Roboto'}}>
                                <div>{item.name}</div>
                                <div>SL: x{item.quantity}</div>
                              </div>
                              <div className="d-flex align-items-end">
                                <div className="text-danger fw-medium">
                                  {formatPrice(item.price)}0<sup className="text-decoration-underline">đ</sup>
                                </div>  
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-2">
                  <div>
                    <h5>Chọn hình thức thanh toán</h5>
                    <div className="d-flex flex-column gap-3">
                      <label className="d-flex flex-row gap-3 hoverCursor">
                        <input 
                          type="radio" 
                          value={1}
                          checked={selectedPayment === '1'}
                          onChange={handleChangePayment}
                          style={{width: '20px'}}
                        />
                        <span className="d-flex flex-row justify-content-center align-items-center gap-2" style={{fontSize: '15px', fontFamily:'Roboto'}}>
                          <img src='/imgFooter/card8.png' width={32} height={32} alt="now"/>
                          <div className="d-flex flex-column">
                            <div>VNPAY</div> 
                            <div className="">Quét Mã QR từ ứng dụng ngân hàng</div> 
                          </div>
                        </span>
                      </label>

                      <label className="d-flex flex-row gap-3 hoverCursor">
                        <input 
                          type="radio"
                          value={2} 
                          onChange={handleChangePayment}
                          checked={selectedPayment === '2'}
                          style={{width: '20px'}}
                        />
                        <span className="d-flex flex-row justify-content-center align-items-center gap-2" style={{fontSize: '15px', fontFamily:'Roboto'}}>
                          <img src='/imgFooter/card4.png' width={32} height={32} alt="now"/>
                          <div className="d-flex flex-column">
                            <div>Thẻ tín dụng/ Ghi nợ</div> 
                            <div className="d-flex flex-row gap-1">
                              <img src="/imgFooter/card1.png" width={30} height={20} alt="pay"/>
                              <img src="/imgFooter/card2.png" width={30} height={20} alt="pay"/>
                              <img src="/imgFooter/card3.png" width={30} height={20} alt="pay"/>
                              <img src="/imgFooter/card11.png" width={30} height={20} alt="pay"/>
                            </div> 
                          </div>
                        </span>
                      </label>
                      <label className="d-flex flex-row gap-3 hoverCursor">
                        <input 
                          type="radio" 
                          value={3}
                          checked={selectedPayment === '3'}
                          onChange={handleChangePayment}
                          style={{width: '20px'}}
                        />
                        <span className="d-flex flex-row justify-content-center align-items-center gap-2" style={{fontSize: '15px', fontFamily:'Roboto'}}>
                          <img src='/imgFooter/card18.png' width={32} height={32} alt="now"/>
                          <div className="d-flex flex-column">
                            <div>ATM</div> 
                            <div className="">Hỗ trợ Internet Banking</div> 
                          </div>
                        </span>
                      </label>
                      <label className="d-flex flex-row gap-3 hoverCursor">
                        <input 
                          type="radio" 
                          value={4}
                          checked={selectedPayment === '4'}
                          onChange={handleChangePayment}
                          style={{width: '20px'}}
                        />
                        <span className="d-flex flex-row justify-content-center align-items-center gap-2" style={{fontSize: '15px', fontFamily:'Roboto'}}>
                          <img src='/imgFooter/card17.png' width={32} height={32} alt="now"/>
                          <div className="d-flex flex-column">
                            <div className="">Thanh toán tiền mặt</div> 
                          </div>
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-column gap-3" style={{width: '320px'}}>
                <div className="bg-white p-3 rounded-2">
                  <div className="d-flex flex-row w-100 justify-content-between">
                    <div className="text-secondary" style={{fontSize:'18px'}}>Giao tới</div>
                    <Link to={'/checkout/shipping'} className="hoverCursor text-decoration-none text-primary">Thay đổi</Link>
                  </div>
                  <div>
                    {addressShipsDefault.length > 0 ? (
                      addressShipsDefault.map((a) => (
                        <div>
                          <div className="d-flex flex-row">
                            <div className="border-2 border-end pe-2 fw-medium">{a.name}</div>
                            <div className="ms-2 fw-medium">{a.phone}</div>
                          </div>
                          <div className="lh-base text-body-tertiary fw-normal mt-2" style={{fontSize:'14px', fontFamily: 'Roboto'}}>{a.address}, {a.ward}, {a.district}, {a.city}</div>
                        </div>
                      ))
                    ) : (
                      <div>
                        <div className="d-flex flex-row">
                          <div className="border-2 border-end pe-2 fw-medium">{addressShipsDefault.name}</div>
                          <div className="ms-2 fw-medium">{addressShipsDefault.phone}</div>
                        </div>
                        <div className="lh-base text-body-tertiary fw-normal mt-2" style={{fontSize:'14px', fontFamily: 'Roboto'}}>{addressShipsDefault.address}, {addressShipsDefault.ward}, {addressShipsDefault.district}, {addressShipsDefault.city}</div>
                      </div>
                    )} 
                  </div>
                </div>
                <div className="bg-white rounded-2">
                  <div className="d-flex flex-column border-bottom border-1 p-3">
                    <div className="d-flex flex-row justify-content-between align-items-center">
                      <div className="fw-medium" style={{fontSize:'18px'}}>Đơn hàng</div>
                      <Link to={-1} className="hoverCursor text-decoration-none text-primary">Thay đổi</Link>
                    </div> 
                    <div className="d-flex flex-row gap-2">
                      <div className="text-secondary">{totalQuantityItem()} sản phẩm.</div>
                      <div className="d-flex justify-content-center align-items-center">
                        {!isViewDetails ? 
                          (
                          <div onClick={handleViewInfo} className="hoverCursor text-primary" style={{fontSize:'14px'}}> Xem thông tin <IoIosArrowDown /></div>
                          ) : (
                            <div onClick={handleViewInfo} className="hoverCursor text-primary" style={{fontSize:'14px'}}>Thu gọn <IoIosArrowUp /></div>
                          )
                        }
                      </div>
                    </div> 
                  </div>
                  <div>
                    {isViewDetails &&
                      <div className="border-1 border-bottom p-2 ps-3">
                        {selectedItems.map((item, index) => (
                          <div key={index} className="d-flex gap-3 fw-medium text-wrap"style={{fontSize:'13px'}}>
                            <div>{item.quantity} x</div>
                            <div>{item.name}</div>
                            <div className="ms-auto">{formatPrice(item.price)}0<span className="text-decoration-underline ms-1">đ</span></div>
                          </div>
                        ))}
                      </div>  
                    }
                  </div>
                  <div className="d-flex flex-column gap-2 p-3" >
                    <div className="d-flex flex-row justify-content-between">
                      <div className="text-secondary text-opacity-75" style={{fontSize:'15px', fontFamily:'Roboto'}}>Tổng tiền hàng</div>
                      <div style={{fontFamily:'Poppins'}}>{formatPrice(totalItems())}0<span>đ</span></div>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                      <div className="text-secondary text-opacity-75" style={{fontSize:'15px', fontFamily:'Roboto'}}>Phí vận chuyển</div>
                      <div style={{fontFamily:'Poppins'}}>{formatPrice(selectedFeeTrasport)}0<span>đ</span></div>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                      <div className="text-secondary text-opacity-75" style={{fontSize:'15px', fontFamily:'Roboto'}}>Giảm giá trực tiếp</div>
                      <div style={{color: '#42AB56',fontFamily:'Poppins'}}>-{formatPrice(totalItems() * (discountItems()/1000))}0<span>đ</span></div>
                    </div>
                    <div className="d-flex flex-row justify-content-between border-2 border-bottom pb-2">
                      <div className="text-secondary text-opacity-75" style={{fontSize:'15px', fontFamily:'Roboto'}}>Giảm giá vận chuyển</div>
                      <div style={{color: '#42AB56',fontFamily:'Poppins'}}>-{formatPrice(selectedFee)}0<span>đ</span></div>
                    </div>
                    <div className="d-flex flex-column text-wrap mt-2 justify-content-between">
                      <div className="fw-medium" style={{fontSize: '15px'}}>Tổng tiền thanh toán</div>
                      <div className="d-flex flex-column align-items-end" style={{fontFamily: 'Roboto'}}>
                        <span className="text-danger d-flex fw-semibold fs-4">{formatPrice(totalItems() - (totalItems() * (discountItems()/1000)) + (selectedFeeTrasport - selectedFee))}0
                          <span className="ms-1 text-decoration-underline">đ</span>
                        </span>
                        <div style={{color: '#42AB56', fontSize: '15px'}}>Tiết kiệm {formatPrice((totalItems() * (discountItems()/1000)) + selectedFee)}0<span className="ms-1 text-decoration-underline">đ</span></div>
                        <span className="text-secondary text-opacity-75 text-end" style={{fontSize: '13px'}}>(Giá này đã bao gồm thuế GTGT, phí đóng gói, phí vận chuyển và các chi phí phát sinh khác)</span>
                      </div>
                    </div>
                    <button className="w-100 bg-danger bg-opacity py-2 border border-0 text-white rounded-1 mt-3">Đặt hàng</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-100 d-flex mt-5" style={{backgroundColor: '#EBEBF0', height: '160px'}}>
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

export default Checkout;