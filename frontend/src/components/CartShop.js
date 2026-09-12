import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../assets/css/Products.css';
import { GoTrash } from "react-icons/go";
import { LiaShippingFastSolid } from "react-icons/lia";
import { IoMdRemove } from "react-icons/io";
import { FiPlus } from "react-icons/fi";
import { IoWarningOutline } from "react-icons/io5";
import { StartBon, StartBonNam, StartNam } from "../DataMethFuc/CountDown";
import imgCart from '../assets/images/imgCart.png'
import { settings2, dataItemsBig } from "../DataMethFuc/data";
import Slider from "react-slick";
import { formatPrice } from "../DataMethFuc/CountDown";


const CartShop = ({ cartItems, removeCartItems, addressShipsDefault}) => {
  const [ isCheckRemove, setIsCheckRemove] = useState(false);
  const [ isCheckRemove2, setIsCheckRemove2] = useState(false);
  const [ indexItem, setIndexItem ] = useState('');
  const [ itemRemoveMoney, setItemRemoveMoney ] = useState('');
  const [ checkedItems, setCheckedItems ] = useState([]);
  const [ quantities, setQuantities ] = useState(() => 
    cartItems.reduce((acc, item) => ({ ...acc, [item.id]:1}), {})  
  );
  const navigate = useNavigate();

  const handleRemoveProduct = (item, index) => {
    setIsCheckRemove(true);
    setIndexItem(index);
    setItemRemoveMoney(item)
    console.log(item);
  };
  
  const handleWillRemoveProduct = () => {
    setIsCheckRemove2(true);
    if (isCheckRemove2) {
      removeCartItems(indexItem);
      setIsCheckRemove(false);
      handleChangeCheckProduct(itemRemoveMoney);
    };
  };
  
  const handleClickProducts = (items) => {
    navigate(`/products/${items.id}`);  
  };
  
  const productBanChay = dataItemsBig.filter(product => product.category.toLowerCase() === 'tủ lạnh');

  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => 
      prev.includes(id)
     ? prev.filter((itemId) => itemId !== id)// Bỏ id nếu đã được chọn
    : [...prev, id]// Thêm id nếu chưa được chọn
    );
  };

  const updateQuantity = (id, delta) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max(1, (prevQuantities[id] || 1) + delta), // Đảm bảo số lượng >= 1
    }));
  };

  const calculateTotal = () => {
    return cartItems
      .filter((item) => checkedItems.includes(item.id))
      .reduce((total, item) => total + item.price * (quantities[item.id] || 1), 0);
  };

  // hàm check để tính tổng các sản phẩm 
  const handleChangeCheckProduct = (product) => {
    // setSelectedProducts((prevProduct) => {
    //   const productCheck = prevProduct.some((p) => p.id === product.id);
    //   if (productCheck) {
    //     // setInvalidQuantity(true);
    //     return prevProduct.filter((p) => p.id !== product.id);
    //   }
    //   else {
    //     // setInvalidQuantity(true);
    //     return [...prevProduct, product];
    //   }
    // })
  };

  // Hàm tính tổng giảm giá
  const totalPercent = () => {
    return cartItems
      .filter((item) => checkedItems.includes(item.id))
      .reduce((total, item) => total + Math.abs(parseInt(item.phanTram)), 0);
  };

  const handleToCheckout = () => {
    const selectedItems = cartItems
      .filter((item) => checkedItems.includes(item.id))
      .map((item) => ({
        ...item,
        quantity: quantities[item.id] || 1,
      }));
    navigate('/checkout/payment', { state: { selectedItems }});
  }

  return (
    <div className="w-100 h-auto" style={{backgroundColor:'#F5F5FA'}}>
      <div className="">
        <div className="d-flex flex-column">
          <div className="ms-5 mt-2 p-3 fs-5 fw-semibold">GIỎ HÀNG</div>
          {/*  */}
          <div className="w-100 d-flex justify-content-center align-items-center" style={{backgroundColor:'#F5F5FA', height: 'auto'}}>
            {cartItems.length === 0 &&
              <div>
                {/*  */}
                <div className=" bg-white rounded-2" style={{width: '1300px', height: '300px'}}>
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <img src={imgCart} alt="cart" className="mt-3" style={{width: '200px'}}/>
                    <div className="mb-3 mt-2" style={{fontFamily:'Mulish'}}>
                      <div className="lh-base fw-bold d-flex justify-content-center align-items-center" style={{fontSize:'19px'}}>Giỏ hàng trống</div>
                      <div>Bạn tham khảo thêm các sản phẩm được ViCi gợi ý bên dưới nhé!</div>
                    </div>
                  </div>
                </div>
                {/* Sản phẩm bán chạy */}
                <div className="mt-3 bg-white rounded-2" style={{width: '1300px', height: 'auto', fontFamily:'Mulish'}}>
                  <div className="d-flex ms-4 pt-2 fs-5 fw-semibold">Sản phẩm bán chạy</div>
                  <div className="CarouselQuickLink bg-white p-3 rounded-3">
                      <Slider {...settings2}>
                        {productBanChay.map((d) => (
                          <div className="d-flex flex-column bg-white">
                            <div key={d.id} onClick={() => handleClickProducts(d)} className="hoverStyle m-auto border border-1 rounded-2 bg-white overflow-hidden TopDealHover" style={{width:'202px', height: '360px'}}>
                              <div className=""  >
                                <img src={d.image} alt="photos" style={{width:'207px', height: '207px'}} className="m-auto rounded-top-3"/>
                                <img src={d.imgSP} alt="photos" style={{width:'207px', height: '207px'}} className="position-absolute top-0 mt z-1"/>
                              </div>
                              <p className="text-start d-flex lh-1 mt-3 ms-2">{d.name}</p>
                              <div className="ms-2 d-flex" style={{marginTop: '-15px'}}>
                                {d.vote === 5 &&
                                  <StartNam/>
                                }  
                                {d.vote === 4.5 &&
                                  <StartBonNam/>
                                }  
                                {d.vote === 4 &&
                                  <StartBon/>
                                }
                              </div>
                              <div className="d-flex flex-column">
                                <div className="d-flex">
                                  <div className="ms-2 mt-2 text-danger fw-bold fs-6">{formatPrice(d.price)} <sup className="text-decoration-underline">đ</sup></div>
                                </div>
                                <div>
                                  {d.phanTram &&
                                    <div className="ms-2 mt-1 fw-bold bg-secondary-subtle rounded-2 w-25 d-flex align-items-center justify-content-center" style={{height: '18px', fontSize:'14px'}}>{d.phanTram}
                                    </div>
                                  }
                                </div>
                                <div className="d-flex text-secondary ms-2"style={{fontSize: '12px'}}> 
                                  {d.origin && 
                                    <p>{d.origin}</p>
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </Slider>
                  </div>
                </div>
                {/* Sản phẩm bạn quan tâm */}
                <div className="mt-3 bg-white rounded-2" style={{width: '1300px', height: 'auto', fontFamily:'Mulish'}}>
                  <div className="d-flex ms-4 pt-2 fs-5 fw-semibold">Sản phẩm bạn quan tâm</div>
                  <div className="CarouselQuickLink bg-white p-3 rounded-3">
                      <Slider {...settings2}>
                        {dataItemsBig.map((d) => (
                          <div className="d-flex flex-column bg-white">
                            <div key={d.id} onClick={() => handleClickProducts(d)} className="hoverStyle m-auto border border-1 rounded-2 bg-white overflow-hidden TopDealHover" style={{width:'202px', height: '360px'}}>
                              <div className=""  >
                                <img src={d.image} alt="photos" style={{width:'207px', height: '207px'}} className="m-auto rounded-top-3"/>
                                <img src={d.imgSP} alt="photos" style={{width:'207px', height: '207px'}} className="position-absolute top-0 mt z-1"/>
                              </div>
                              <p className="text-start d-flex lh-1 mt-3 ms-2">{d.name}</p>
                              <div className="ms-2 d-flex" style={{marginTop: '-15px'}}>
                                {d.vote === 5 &&
                                  <StartNam/>
                                }  
                                {d.vote === 4.5 &&
                                  <StartBonNam/>
                                }  
                                {d.vote === 4 &&
                                  <StartBon/>
                                }
                              </div>
                              <div className="d-flex flex-column">
                                <div className="d-flex">
                                  <div className="ms-2 mt-2 text-danger fw-bold fs-6">{formatPrice(d.price)} <sup className="text-decoration-underline">đ</sup></div>
                                </div>
                                <div>
                                  {d.phanTram &&
                                    <div className="ms-2 mt-1 fw-bold bg-secondary-subtle rounded-2 w-25 d-flex align-items-center justify-content-center" style={{height: '18px', fontSize:'14px'}}>{d.phanTram}
                                    </div>
                                  }
                                </div>
                                <div className="d-flex text-secondary ms-2"style={{fontSize: '12px'}}> 
                                  {d.origin && 
                                    <p>{d.origin}</p>
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </Slider>
                  </div>
                </div>
              </div>  
            }
            {cartItems.length > 0 &&
            <div className="h-75 d-flex justify-content-between align-items-cente" style={{width: '1392px'}}>
              <div className="h-50 d-flex flex-column gap-3 rounded-1 p-2" style={{width: '1061px'}}>
                <div className="d-flex justify-content-center align-items-center p-2 bg-white rounded">
                  <label className=" d-flex ms-2" style={{width:'560px'}}>
                    <input type="checkbox" className="d-none"/>
                    <span className="custom-checkbox me-2 "> </span>Tất cả ({cartItems.length} sản phẩm)
                  </label>
                  <span className="d-flex mx-2 text-secondary" style={{width:'300px'}}>Đơn giá</span>
                  <span className="d-flex mx-2 text-secondary" style={{width:'250px'}}>Số lượng</span>
                  <span className="d-flex mx-2 text-secondary" style={{width:'230px'}}>Thành tiền</span>
                  <span className="w-auto me-1 d-flex">
                    <GoTrash />
                  </span>
                </div>    
                <div>
                  <div className="bg-white rounded d-flex flex-column gap-2">
                    {cartItems.length > 0 &&
                      cartItems.map((item, index) => (
                        <div key={item.id} className="d-flex flex-row justify-content-center align-items-center py-2">
                          <div className="d-flex" style={{width:'550px'}}>
                            <label className="d-flex justify-content-center align-items-center ms-2">
                              <input type="checkbox" className="d-none"
                                onChange={() => handleCheckboxChange(item.id)}
                                checked={checkedItems.includes(item.id)}
                              />
                              <span className="custom-checkbox me-2 ms-2"> </span>
                            </label>
                            <div className="d-flex justify-content-center align-items-center">
                              <img src={item.image} alt="items" style={{width:'80px', height:'80px'}}></img>
                            </div>
                            <div className="d-flex flex-column">
                              <div className="d-flex">{item.name}</div>
                              <div className="d-flex flex-row">
                                <LiaShippingFastSolid className="d-flex me-2 mt-1"/>
                                <div>Giao thứ 7/11</div>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex flex-column " style={{width:'300px'}}>
                          <div className="text-danger fw-medium">{formatPrice(item.price)}0<sup className=" mt-2">đ</sup></div>
                          <div className="" style={{fontSize:'12px'}}>Giá chưa được áp dụng khuyến mãi</div>
                        </div>
                        <div className="d-flex" style={{width: '250px'}}>
                          <div className="">
                            <div className="ButtonQuantity overflow-hidden d-flex align-items-center border border-1 rounded-1 border-secondary-subtle" style={{width: 'auto', height: '29px'}}>
                              <div className="border-end border-dark-subtle hover fs-5 text-light-emphasis d-flex justify-content-center align-items-center" style={{ width: '28px', height: '29px' }} onClick={() => updateQuantity(item.id, - 1)} disabled={(quantities[item.id] || 1) <= 1}><IoMdRemove /></div>
                              <div className="m-2  border-secondary h-auto d-flex justify-content-center align-items-center" style={{width: '24px', fontFamily:'Poppins'}}>{quantities[item.id] || item.quantity}</div>
                              <button className="d-block border-start border-dark-subtle hover fs-5 text-light-emphasis d-flex justify-content-center align-items-center bg-white" style={{ width: '28px', height: '29px', border: 'none'}} onClick={() => updateQuantity(item.id, 1)}><FiPlus/></button>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex text-danger fw-medium" style={{width:'215px'}}>{formatPrice(item.price * quantities[item.id] || item.price)}0<sup className=" mt-2">đ</sup></div>
                        <div className="d-flex w-auto p-2 me-1 hoverCursor text-secondary" onClick={() => handleRemoveProduct(item ,index)}><GoTrash/></div>
                      </div>
                      ))
                    }
                  </div>
                </div>
              </div>
              {/*  */}
              <div className="h-auto rounded-3 d-flex flex-column mt-2 gap-3" style={{width: '320px'}}>
                <div className="bg-white p-3 rounded-2" style={{height:'136px'}}>
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
                {calculateTotal() > 0 ? (
                  <div className="bg-white w-100 p-3 rounded-1">
                    <div className="d-flex flex-row w-100 justify-content-between">
                      <div className="text-dark text-opacity-50 fw-medium" style={{fontSize: '15px', fontFamily: 'Roboto'}}>Tổng tiền hàng</div>
                      <div className="" style={{fontFamily:'Roboto' }}>{formatPrice(calculateTotal())}0<sup className="mt-3 text-decoration-underline">đ</sup></div>
                    </div>
                    <div className="d-flex flex-row w-100 justify-content-between border-1 pb-2 mt-2 border-bottom">
                      <div className="text-body-tertiary fw-medium" style={{fontSize: '15px', fontFamily: 'Roboto'}}>Giảm giá trực tiếp</div>
                      <div style={{color : '#42AB56'}}>-{formatPrice(calculateTotal() * (totalPercent()/1000))}0<sup className="mt-3 text-decoration-underline">đ</sup></div>
                    </div>
                    <div className="d-flex flex-row text-wrap mt-2 justify-content-between">
                      <div className="fw-medium" style={{fontSize: '15px'}}>Tổng tiền thanh toán</div>
                      <div className="d-flex flex-column mt-3 align-items-end" style={{fontFamily: 'Roboto'}}>
                        <span className="text-danger d-flex fw-semibold fs-4">{formatPrice((calculateTotal()) - (calculateTotal() * (totalPercent() /1000)))}0
                          <sup className="mt-3 text-decoration-underline">đ</sup>
                        </span>
                        <div style={{color: '#42AB56', fontSize: '15px'}}>Tiết kiệm {formatPrice(calculateTotal() * (totalPercent()/1000))}0<sup className="mt-3 text-decoration-underline">đ</sup></div>
                      </div>
                    </div>
                    <button className="w-100 bg-danger bg-opacity py-2 border border-0 text-white rounded-1 mt-3" onClick={handleToCheckout}>Mua Hàng ({checkedItems.length})</button>
                  </div>
                ) : (
                  <div className="bg-white w-100 p-3 rounded-1">
                    <div className="d-flex flex-row w-100 justify-content-between">
                      <div className="text-secondary">Tạm tính</div>
                      <div>0<sup className="mt-3 text-decoration-underline">đ</sup></div>
                    </div>
                    <div className="d-flex flex-row w-100 justify-content-between border-1 pb-2 mt-2 border-bottom">
                      <div className="text-secondary">Giảm giá</div>
                      <div>0<sup className="mt-3 text-decoration-underline">đ</sup></div>
                    </div>
                    <div className="d-flex flex-row text-wrap mt-2">
                      <div className="fw-medium" style={{fontSize: '15px'}}>Tổng tiền thanh toán</div>
                      <div className="text-danger text-end fw-medium text-opacity-75">Vui lòng chọn sản phẩm</div>
                    </div>
                    <button className="w-100 bg-danger bg-opacity py-2 border border-0 text-white rounded-1 mt-3">Mua Hàng (0)</button>
                  </div>
                )}
              </div>
            </div> 
            }
            <div></div>
          </div>
        </div>
      </div>
      {isCheckRemove &&
        <div>
          <div className="position-fixed top-0 vh-100 w-100 bg-dark bg-opacity-75 overflow-hidden" style={{zIndex: '2000'}}>
            <div className="position-relative m-auto bg-white rounded-2 overflow-hidden" style={{width:'320px', top: '40%'}}>
              <div className="modal_header d-flex flex-row align-items-center p-3">
                  <div className="d-flex justify-content-center align-items-center fs-4 me-3" style={{color: 'rgb(215, 142, 31)'}}><IoWarningOutline /></div>
                  <div className="fs-6 fw-semibold">Xoá sản phẩm</div>
              </div>
              <div className="d-flex w-75 ms-5">
                  <div className="text-wrap">Bạn có muốn xóa sản phẩm đang chọn?</div>
              </div>
              <div className="d-flex flex-row-reverse m-3">
                  <button className="p-1 px-2 rounded-1 btn btn-primary" onClick={() => setIsCheckRemove(false)}>Hủy</button>
                  <button className="p-1 px-2 rounded-1 btn me-2 border border-primary text-primary" onClick={() => handleWillRemoveProduct()}>Xác nhận</button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default CartShop;