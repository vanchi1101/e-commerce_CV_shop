import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dataItemsBig } from "../DataMethFuc/data";
import '../assets/css/Products.css'
import { formatPrice } from "../DataMethFuc/CountDown";
import { settings3 } from "../DataMethFuc/data";
import Slider from "react-slick";
import { FaStar, FaRegStarHalfStroke, FaRegStar } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { IoMdRemove } from "react-icons/io";
import logoVC from '../assets/images/logo_Shop.png';
import tickXanh from '../assets/images/tickXanh.png'

const ProductsShop = ( { addCartItems, setInfoAdded, updateQuantity } ) => {
  const { id } = useParams();
  let [ quantity, setQuantity ] = useState(1);
  const navigate = useNavigate();
  const product = dataItemsBig.find((p) => p.id === parseInt(id));
  
  
  // hàm khi click thì thêm vào giỏ hàng
  const handleAddItemToCart = () => {
    addCartItems(product);
    updateQuantity(product.id, quantity);
  };

  const handleBlurInfo = () => {
    setInfoAdded(false);
  };

  const handleClickProducts = (items) => {
    navigate(`/products/${items.id}`);  
  };

  const itemsSame = dataItemsBig.filter((p) => p.category === product.category);

  const handleToCheckout = () => {
    const selectedItems = [{...product, quantity: quantity}]
    navigate('/checkout/payment', { state: { selectedItems }})
  }
  // ---------------

  return (
    <div className="ProductsCSS">
      <div className='w-100 h-100' style={{backgroundColor:'#F5F5FA'}} onDoubleClick={handleBlurInfo}>
        <div className="">
          {/* Header */}
          <div>
          </div> 
          <main className="mt-3">
            <div className=" m-auto" style={{width:'1392px'}}>
              <div className="h-100" style={{backgroundColor: '#F5F5FA'}}>
                <div class="d-flex flex-row justify-content-between">
                  {/*  */}
                  <div className="itemsProduct">
                    <div class=" bg-white py-3 rounded-3" style={{width:'400px'}}>
                      <div className="d-flex m-auto rounded-2 border border-1 overflow-hidden" style={{width:'368px', height:'369px'}}>
                        <img src={product.image} alt='đf'></img>
                      </div>
                    </div>
                  </div>
                  {/*  */}
                    <div class="h-auto" style={{width:'585px', backgroundColor:'#F5F5FA'}}>
                      <div className="w-100 bg-white p-3 rounded-3">
                        <div className=" d-flex flex-column" style={{fontFamily:'Poppins'}}>
                          {Math.abs(parseInt(product.phanTram)) < 30 &&
                            <div className="d-flex justify-content-start w-auto" style={{height:'20px'}}>
                              <div>
                                <img src="/imgProducts/icon1.png" alt="" style={{width:'90px', height:'20px'}}/>
                              </div>
                              <div>
                                <img src="/imgProducts/icon.png" alt="" style={{width:'100px', height:'20px'}}/>
                              </div>
                              <div>
                                <img src="/imgProducts/icon2.png" alt="" style={{width:'90px', height:'20px'}}/>
                              </div>
                            </div>
                          } {Math.abs(parseInt(product.phanTram)) >= 30 &&
                            <div className="d-flex justify-content-start w-auto" style={{height:'20px'}}>
                              <div>
                                <img src="/imgProducts/icon.png" alt="" style={{width:'100px', height:'20px'}}/>
                              </div>
                              <div>
                                <img src="/imgProducts/icon2.png" alt="" style={{width:'90px', height:'20px'}}/>
                              </div>
                            </div>
                          }
                          <div className="d-flex fs-4 fw-medium mt-3" style={{fontFamily:'Poppins'}}>
                            {product.name}
                          </div>
                          <div>
                            {product.vote && 
                              <div>
                                {product.vote === 5 &&
                                  <div className="d-flex mb-3">
                                    <div className="text-dark fs-6 fw-semibold">{product.vote}</div>
                                    <div className="text-warning ms-2  d-flex justify-content-center align-items-center">
                                      <FaStar />
                                      <FaStar />
                                      <FaStar />
                                      <FaStar />
                                      <FaStar />
                                    </div>
                                  </div>
                               }{product.vote === 4.5 &&
                                  <div className="d-flex mb-3">
                                    <div className="text-dark fs-6 fw-semibold">{product.vote}</div>
                                    <div className="text-warning ms-2  d-flex justify-content-center align-items-center">
                                      <FaStar />
                                      <FaStar />
                                      <FaStar />
                                      <FaStar />
                                      <FaRegStarHalfStroke />
                                    </div>
                                  </div>
                               }{product.vote === 4 &&
                                  <div className="d-flex mb-3">
                                    <div className="text-dark fs-6 fw-semibold">{product.vote}</div>
                                    <div className="text-warning ms-2  d-flex justify-content-center align-items-center">
                                      <FaStar />
                                      <FaStar />
                                      <FaStar />
                                      <FaStar />
                                      <FaRegStar />
                                    </div>
                                  </div>
                                }
                              </div>
                            }
                          </div>
                          <div className="d-flex ">
                            <div className="d-flex">
                              <div className="text-danger fw-semibold fs-4">{formatPrice(product.price)}
                                <sup className="mt-3 text-decoration-underline">đ</sup>
                              </div>
                              {product.phanTram &&
                                <div className="w-50 h-50 px-1 fw-medium bg-body-secondary text-center rounded-2 mt-2 ms-3" style={{fontSize:'12px'}}>
                                  {product.phanTram}
                                </div>
                              }  
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Sản phẩm tương tự */}
                      <div className="w-auto bg-white px-2 py-3 rounded-3 mt-4">
                        <div className="d-flex fs-5 fw-semibold ms-3 mb-2">Sản phẩm tương tự</div>
                        <Slider {...settings3}>
                          {itemsSame.map((d) => (
                            <div className="d-flex flex-column bg-white">
                              <div key={d.id} onClick={() => handleClickProducts(d)} className="m-auto border border-1 rounded-2 bg-white TopDealHover" style={{width:'177px', height: '345px'}}>
                                <div className="border-1 border-bottom"  >
                                  <img src={d.image} alt="photos" style={{width:'175px', height: '175px'}} className="m-auto rounded-top-3"/>
                                  <img src={d.imgSP} alt="photos" style={{width:'175px', height: '175px'}} className="position-absolute top-0 mt z-1"/>
                                </div>
                                <p className="text-start d-flex lh-1 mt-3 fw-semibold ms-2">{d.name}</p>
                                <div className="ms-2 d-flex" style={{marginTop: '-15px'}}>
                                  {d.vote === 5 &&
                                    <div className="text-warning">
                                      <FaStar />
                                      <FaStar />
                                      <FaStar />
                                      <FaStar />
                                      <FaStar />
                                    </div>
                                  }  {d.vote === 4.5 &&
                                    <div className="text-warning">
                                      <FaStar />
                                      <FaStar />
                                      <FaStar />
                                      <FaStar />
                                      <FaRegStarHalfStroke />
                                    </div>
                                  }  {d.vote === 4 &&
                                    <div className="text-warning">
                                      <FaStar />
                                      <FaStar />
                                      <FaStar />
                                      <FaStar />
                                      <FaRegStar />
                                    </div>
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
                  {/*  */}
                    <div class="p-3 bg-white rounded-3" style={{width:'360px', height:'500px'}}>
                      <div className="d-flex flex-column justify-content-between h-100 m-auto">
                        <div className="w-50 h-auto d-flex flex-row p-2">
                          <img src={logoVC} alt="logoVC" style={{width:'60px', height:'60px'}}/>
                          <div className=" mt-3 d-flex flex-column">
                            <span className="fs-4 fw-semibold fst-italic text-secondary-emphasis d-flex">Shop</span>
                            <div>
                              <img src={tickXanh} alt="offical" className="w-75 h-100 d-flex"/>
                            </div>
                          </div>
                        </div>
                        <hr className=""/>
                        <div className="d-flex flex-column ms-2">
                          <div className="d-flex fs-6 fw-bold mb-2" style={{fontFamily:'inherit'}}>Số lượng</div>
                          <div>
                            <div className="ButtonQuantity d-flex w-auto align-items-center" style={{ height: '32px',}}>
                              {quantity > 1 &&
                                <div className="border border-dark-subtle rounded-2 hover fs-5 text-light-emphasis d-flex justify-content-center align-items-center" style={{ width: '33px', height: '32px' }} onClick={(e) => setQuantity((quantity === 1 ? quantity += 0 : quantity -= 1))}><IoMdRemove /></div>
                              }
                              {quantity === 1 &&
                                <div className="border border-light-subtle rounded-2 text-body-tertiary fs-5 d-flex justify-content-center align-items-center" disabled style={{ width: '33px', height: '32px' }}><IoMdRemove /></div>
                              }
                              <div className="m-2 border border-secondary rounded-2 h-100 d-flex justify-content-center align-items-center" style={{width: '39px', fontFamily:'Poppins'}}>{quantity}</div>
                              <div className="border border-dark-subtle rounded-2 hover fs-5 text-light-emphasis d-flex justify-content-center align-items-center" style={{ width: '33px', height: '32px'}} onClick={(e) => setQuantity(quantity += 1)}><FiPlus/></div>
                            </div>
                          </div>
                        </div>
                        <div className="ms-2">
                          <div className="d-flex fs-5 lh-base fw-semibold mb-3">Tạm tính</div>
                          <div className="fw-semibold fs-3 d-flex">{formatPrice((product.price * quantity))}<sup className="mt-4 text-decoration-underline">đ</sup></div>
                        </div>
                        <div className="d-flex flex-column h-25 justify-content-around">
                          <div className="btn btn-danger lh-lg fw-medium" onClick={handleToCheckout}>Mua ngay</div>
                          <div className="btn btn-outline-primary bg-white text-primary lh-lg fw-medium" onClick={() => handleAddItemToCart()}>Thêm vào giỏ hàng</div>
                        </div>
                      </div>
                    </div>
                  {/* </div> */}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );

}

export default ProductsShop;