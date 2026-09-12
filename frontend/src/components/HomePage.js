import React from "react";
import { useNavigate } from "react-router-dom";
import '../assets/css/Home.css';
import Slider from "react-slick";
import { BiSolidLike } from "react-icons/bi";
import { BsDot } from "react-icons/bs";
import { FaStar, FaRegStarHalfStroke, FaRegStar } from "react-icons/fa6";
import { dataProducts, settings2, dataItemsBig} from "../DataMethFuc/data";
import { CountDown } from "../DataMethFuc/CountDown";
import { Carousel } from "../DataMethFuc/CountDown";
import { formatPrice } from "../DataMethFuc/CountDown";
import { dataCategory } from "../DataMethFuc/data";

const HomePage = () => {
  const navigate = useNavigate();

  const handleClickProducts = (items) => {
    navigate(`/products/${items.id}`);  
  };

  const handleToCategory = (pathCategory) => {
    navigate(`/${pathCategory}`)
  }

  return (
    <div className="Home">
      {/* MAIN */}
      <main>
        <div className="Containers-Home mt-4">
          <div className="containers-Home">
            {/* Side Bar */}
            <div className="SideBar-home position-sticky">
              <div className="SideBar-danhMuc bg-white rounded-4 pb-4 px-2 d-flex flex-column">
                <div className="my-1 mb-2 fs-5 fw-semibold ms-1">Danh mục</div>
                
                <div>
                  {dataCategory.map((category) => (
                    <div key={category.id} onClick={() => handleToCategory(category.path)} className="tungDanhMuc boder boder-2 m-auto btn btn-light">
                    <div>
                      <div className="d-flex text-decoration-none flex-row gap-2">
                        <div className="img-danhMuc d-flex m">
                          <img src={category.img} alt='img'></img>
                        </div>
                        <div className="lh-1 fs-6 fw-semibold text-dark m-auto">{category.name}</div>
                      </div>
                    </div>
                  </div>
                  ))
                  }
                </div>
              </div>
              <div className="SideBar-tienIch"></div>
            </div>
            {/* Widget */}
            <div className="Widget-home">
              {/* Carousel */}
              <Carousel/>
              {/* ContainerWidget1 */}
              <div className="w-100 h-auto bg-white py-3 rounded-3 mt-3">
                <div style={{width:'1106px', height: '95.6px'}} className="bg-white m-auto d-flex justify-content-between">
                  <div style={{width:'100px', height: '95.6px'}} className="bg-white d-flex ">
                    <a className="m-auto text-decoration-none" href="#lele">
                      <div className="quickLink">
                        <img src="/imageQuickLink/topDeal.png" alt="img"></img>
                      </div>
                      <div className="fs-6 fw-semibold mt-1 text-danger">TOP DEAL</div>
                    </a>
                  </div>
                  
                  <div style={{width:'100px', height: '95.6px'}} className="bg-white d-flex ">
                    <a className="m-auto text-decoration-none" href="#lele">
                      <div className="quickLink">
                        <img src="/imageQuickLink/Trading.png" alt="img"></img>
                      </div>
                      <div className="fs-6 fw-semibold mt-1 text-dark">Trading</div>
                    </a>
                  </div>
                  
                  <div style={{width:'100px', height: '95.6px'}} className="bg-white d-flex ">
                    <a className="m-auto text-decoration-none" href="#lele">
                      <div className="quickLink">
                        <img src="/imageQuickLink/quickLink3.png" alt="img"></img>
                      </div>
                      <div className="fs-6 fw-semibold mt-1 text-dark">Đồ chơi</div>
                    </a>
                  </div>
                  
                  <div style={{width:'100px', height: '95.6px'}} className="bg-white d-flex ">
                    <a className="m-auto text-decoration-none" href="#lele">
                      <div className="quickLink">
                        <img src="/imageQuickLink/quickLink4.png" alt="img"></img>
                      </div>
                      <div className="fs-6 fw-semibold mt-1 text-dark">Giày, Dép</div>
                    </a>
                  </div>
                  
                  <div style={{width:'100px', height: '95.6px'}} className="bg-white d-flex ">
                    <a className="m-auto text-decoration-none" href="#lele">
                      <div className="quickLink">
                        <img src="/imageQuickLink/quickLink5.png" alt="img"></img>
                      </div>
                      <div className="fs-6 fw-semibold mt-1 text-dark">Túi, balo</div>
                    </a>
                  </div>

                  <div style={{width:'100px', height: '95.6px'}} className="bg-white d-flex ">
                    <a className="m-auto text-decoration-none" href="#lele">
                      <div className="quickLink">
                        <img src="/imageQuickLink/quickLink6.png" alt="img"></img>
                      </div>
                      <div className="fs-6 fw-semibold mt-1 text-dark">Áo & quần</div>
                    </a>
                  </div>

                  <div style={{width:'100px', height: '95.6px'}} className="bg-white d-flex ">
                    <a className="m-auto text-decoration-none" href="#lele">
                      <div className="quickLink">
                        <img src="/imageQuickLink/quickLink7.png" alt="img"></img>
                      </div>
                      <div className="fs-6 fw-semibold mt-1 text-dark">Nhà sách</div>
                    </a>
                  </div>

                  <div style={{width:'100px', height: '95.6px'}} className="bg-white d-flex ">
                    <a className="m-auto text-decoration-none" href="#lele">
                      <div className="quickLink">
                        <img src="/imageQuickLink/quickLink8.png" alt="img"></img>
                      </div>
                      <div className="fs-6 fw-semibold mt-1 text-dark">Smartphone</div>
                    </a>
                  </div>

                  <div style={{width:'100px', height: '95.6px'}} className="bg-white d-flex ">
                    <a className="m-auto text-decoration-none" href="#lele">
                      <div className="quickLink">
                        <img src="/imageQuickLink/quickLink9.png" alt="img"></img>
                      </div>
                      <div className="fs-6 fw-semibold mt-1 text-dark">Nghiện bếp</div>
                    </a>
                  </div>

                  <div style={{width:'100px', height: '95.6px'}} className="bg-white d-flex ">
                    <a className="m-auto text-decoration-none" href="#lele">
                      <div className="quickLink">
                        <img src="/imageQuickLink/quickLink10.png" alt="img"></img>
                      </div>
                      <div className="fs-6 fw-semibold mt-1 text-dark">Mỹ phẩm</div>
                    </a>
                  </div>
                  
                </div>
              </div>
              {/* Container Products Top Deal */}
              <div style={{width:'1138px', height:'421px'}} className="bg-white rounded-3 mt-3 d-flex flex-column">
                <div className="d-flex mx-4 mt-3">
                  <div>
                    <BiSolidLike className="text-danger fs-4"/>
                  </div>
                  <div className="text-danger fw-bold mt-1 ms-2" style={{fontFamily: 'inherit'}}>TOP DEAL<BsDot className="fs-4 mb-1 text-danger"/>SIÊU HỜI</div>
                </div>
                <div>
                  <div className="CarouselQuickLink bg-white p-3 rounded-3">
                    <Slider {...settings2}>
                      {dataItemsBig.map((d) => (
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
              </div>
              {/* Container Flash Sale */}
              <div style={{width:'1138px', height:'275px', cursor:'pointer'}} className="bg-white rounded-3 mt-3 d-flex flex-column">
                <div className="d-flex mx-4 mt-3">
                  <div className="text-dark fw-semibold fs-5 mt-1 ms-2 d-flex" style={{fontFamily: 'inherit'}}>Flash Sale  
                    <CountDown/>              
                  </div>
                </div>
                <div>
                  <div className="CarouselQuickLink bg-white mt-1 rounded-4">
                    <Slider {...settings2}>
                      {dataProducts.map((d) => (
                        <div key={d.id} className="d-flex flex-column bg-white rounded-2">
                          <div className="m-auto  bg-white" style={{width:'171px', height: '227px'}}>
                            <div className="" >
                              <img src={d.image} alt="photos" style={{width:'169px', height: '169px'}} className="m-auto"/>
                              <div className="text-danger p-1 bg-danger-subtle ms-2 mt-1 fw-bold rounded-1 top-0 d-flex align-items-center justify-content-center position-absolute" style={{fontSize:'13px'}}>-{d.flashDown}%</div>
                            </div>
                            <div className="d-flex flex-column">
                              <div className="d-flex m-auto">
                                <div className="ms-2 mt-2 text-danger fw-bold fs-5">{formatPrice(d.price)} <sup className="text-decoration-underline">đ</sup></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
    
  );

};

export default HomePage;