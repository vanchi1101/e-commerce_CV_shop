import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaRegStarHalfStroke, FaRegStar } from "react-icons/fa6";
import Slider from "react-slick";
import { dataImgCarousel, settings } from "./data";
import { FaCircleUser } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { BiSearchAlt } from "react-icons/bi";
import { BsFire } from "react-icons/bs";
import logoCV from '../assets/images/logo_Shop.png';
import { dataItemsBig } from "../DataMethFuc/data";
import { BsSearch } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";

export const CountDown = () => {
    const targetTime = 2 * 60 * 60 * 1000;
    // Khởi tạo state cho giờ, phút, giây
    const [timeLeft, setTimeLeft] = useState(targetTime);
  
    useEffect(() => {
      // Nếu targetTime là 0 thì dừng đồng hồ
      if (timeLeft <= 0) return;
  
      // Cập nhật đồng hồ mỗi giây
      const intervalId = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 0) {
            clearInterval(intervalId); // Dừng đồng hồ khi hết thời gian
            return 0;
          }
          return prevTime - 1000; // Giảm thời gian đi 1 giây (1000ms)
        });
      }, 1000);
  
      // Dọn dẹp interval khi component bị unmount
      return () => clearInterval(intervalId);
    }, [timeLeft]);
  
    // Tính toán giờ, phút, giây từ thời gian còn lại
    const hours = String(Math.floor(timeLeft / (1000 * 60 * 60))).padStart(2, '0');
    const minutes = String(Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    const seconds = String(Math.floor((timeLeft % (1000 * 60)) / 1000)).padStart(2, '0');
  
    return (
      <div className="bg-white ms-2 mb-2">
        <div className="d-flex flex-row justify-content-center align-items-center">
          <span className="bg-danger text-white fs-6 d-flex justify-content-center align-items-center rounded-2 fw-semibold" style={{width:'27px',height:'27px', fontFamily:'Poppins'}}>{hours} </span>
          <strong className="fs-5 mx-1 text-body-tertiary" style={{transform: 'translateY(-3px)'}}>:</strong>
          <span className="bg-danger text-white fs-6 d-flex justify-content-center align-items-center rounded-2 fw-semibold" style={{width:'27px',height:'27px', fontFamily:'Poppins'}}>{minutes} </span>
          <strong className="fs-5 mx-1 text-body-tertiary" style={{transform: 'translateY(-3px)'}}>:</strong>
          <span className="bg-danger text-white fs-6 d-flex justify-content-center align-items-center rounded-2 fw-semibold" style={{width:'27px',height:'27px', fontFamily:'Poppins'}}>{seconds}</span>
        </div>
      </div>
    );

};

export const HeadersForm = ({ cartItems }) => {
  const navigate = useNavigate();
  const [itemsSearch, setItemsSearch] = useState([]);
  
  const [ search, setSearch ] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [ selectedIndex, setSelectedIndex ] = useState(-1);
  
  console.log(cartItems);
  // console.log(itemsInCart.length);
  
  const handleToCart = () => {
    navigate('/checkout/cart')
  }

  const handleInputChange = (query) => {
    const queryNoDau = removeAccents(query);
    setIsSearching(true)
    setSearch(query);
    setSelectedIndex(-1);
    if (queryNoDau) {
      // Tìm sản phẩm với tên gần giống
      const productItemSearch = dataItemsBig.filter((product) => 
        removeAccents(product.name).toLocaleLowerCase().includes(queryNoDau.toLocaleLowerCase())
      ); 
      setItemsSearch(productItemSearch);
      setIsSearching(false);
    }
    else {
      setItemsSearch([]);
    };
  };

  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  const handleClickToHome = () => {
    navigate('/home');
  };

  const handleClickToSearch = (index) => {

    if (search.length > 0 && !isSearching && itemsSearch.length > 0 ) {
      navigate(`/search?q=${itemsSearch[index].name}`);
      setIsSearching(true);
    }
    else {
      navigate(`/search?q=${dataItemsBig[index].name}`);
      setIsSearching(false)
    };
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      if (search.length === 0) {
        
        setSelectedIndex((prev) => Math.min(prev + 1, 9 && 14));
      }else {
        setSelectedIndex((prev) => Math.min(prev + 1, 8));

      }
    }
    else if (e.key === 'ArrowUp') {
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    }
    else if (e.key === 'Enter') {
      if (selectedIndex >= 0) {
        // Chuyển hướng đến trang Search và thêm 
        if (search.length > 0 && !isSearching && itemsSearch.length > 0 ) {
          navigate(`/search?q=${itemsSearch[selectedIndex].name}`);
          setIsSearching(true);
          console.log(isSearching);
        }else {
          handleClickToSearch(selectedIndex);
          setIsSearching(false)
          console.log(isSearching);
        }
      }
      else {
        navigate(`/search?q=${encodeURIComponent(search)}`);
        setIsSearching(true)      
      };  
    };
  };

  return (
    <>
      <header className="border-bottom border-1 bg-white w-100%">
        <div className="ContainerRevamp justify-content-between">
          <div className="HomeRevampHeader_HeaderLayout justify-content-between">
            <div onClick={handleClickToHome} className="logo_Shop">
              <img src={logoCV} alt="logo" style={{width: '70px'}}></img>
            </div>
            <div className="HomeRevampHeader_SearchContainerStyled">
              <div className="box-Search justify-content-between">
                <div className="input_Search d-flex flex-column" >
                  <div className="box-Homeinput d-flex flex-column">
                    <div className="box-inputHome" >
                      <BsSearch className="icon-Search"/>
                      <input 
                        placeholder="Tìm sản phẩm"
                        value={search}
                        onChange={(e) => handleInputChange(e.target.value)}
                        onKeyDown={handleKeyDown}
                      ></input>
                      <button onClick={() => handleClickToSearch(selectedIndex)}>Tìm kiếm</button>
                    </div>
                    {/*  */}
                    <div>
                      {search.length > 0 && !isSearching && itemsSearch.length > 0 &&
                        <div className="position-absolute overflow-hidden shadow rounded" style={{height:'auto', maxHeight: '365px'}}>
                          <div className="h-100 bg-white position-relative z-3 border border-1 shadow rounded d-flex flex-column justify-content-start" style={{width:'884px'}}>
                            {itemsSearch.map((item, index) => (
                              <div key={item.id} onClick={() => handleClickToSearch(index)} className={`d-flex flex-row p-1 ps-3 text-secondary ${selectedIndex === index ? 'bg-info-subtle' : ''}`} style={{height: '40px'}}>
                                <div className="me-2 fs-5">
                                  <BiSearchAlt />
                                </div>
                                <div className="d-flex justify-content-start align-items-center" >{item.name}</div>
                              </div>
                            )) }
                          </div>
                        </div>
                      } {search.length === 0 && isSearching && 
                          <div className={"position-absolute overflow-hidden shadow rounded"} style={{height:'615px'}}>
                            <div className="h-100 bg-white position-relative z-3 border border-1 shadow rounded d-flex flex-column justify-content-start " style={{width:'884px'}}>
                            <div className="d-flex flex-row ms-3 p-1 mt-1">
                              <div className=" text-danger d-flex align-items-center justify-content-center"><BsFire /></div>
                              <div className="fw-semibold lh-base mx-3">Tìm kiếm phổ biến</div>
                              <div className=" text-danger d-flex align-items-center justify-content-center"><BsFire /></div>
                            </div>
                              {dataItemsBig.map((item, index) => (
                                <div key={item.id} onClick={() => handleClickToSearch(index)} className={`d-flex flex-row p-1 ps-3 text-secondary ${selectedIndex === index ? 'bg-info-subtle' : ''}`} style={{height: '40px'}}>
                                  <div className="me-2 fs-5">
                                    <BiSearchAlt />
                                  </div>
                                  <div className="d-flex justify-content-start align-items-center" >{item.name}</div>
                                </div>
                              )) }
                            </div>
                          </div>
                      } 
                    </div>
                  </div>
                </div>
                <div className="Userstyle__RootRevamp">
                  <div className="page_Icon fs-6 fw-medium w-35 h-75">
                    <AiFillHome className="icon-Homehome me-1"/>
                    <a href="/home">Trang chủ</a>
                  </div>
                  <div className="box_Account fs-6 fw-medium w-35 h-75">
                    <FaCircleUser className="icon-TaiKhoan me-1 text-secondary"/>
                    <span className="text-secondary">Tài khoản</span>
                  </div>
                  <div className="box_Cart border-start border-2 border-secondary-subtle w-25 h-75" onClick={() => handleToCart()}>
                    <div className="me-4">
                      <FiShoppingCart className="position-relative icon-GioHang text-primary fw-semibold"/>
                        <span className="badge rounded-pill bg-danger bage-Cart">
                          0
                          <span className="visually-hidden">unread messages</span>
                        </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-75 h-auto mt-2">
                <div className="d-flex justify-content-between w-50">
                  <a className="text-decoration-none text-secondary" href="/home">điện thoại</a>
                  <a className="text-decoration-none text-secondary" href="/home">máy tính</a>
                  <a className="text-decoration-none text-secondary" href="/home">thực phẩm</a>
                  <a className="text-decoration-none text-secondary" href="/home">đồ gia dụng</a>
                  <a className="text-decoration-none text-secondary" href="/home">quần áo</a>
                  <a className="text-decoration-none text-secondary" href="/home">sách</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {search && !isSearching &&
        <div className="d-flex h-100 bg-dark w-100 position-absolute z-2 opacity-75" style={{top: ''}} onClick={() => setIsSearching(true)}></div>
      }
      {search.length === 0 && isSearching &&
        <div className="d-flex h-100 bg-dark w-100 position-absolute z-2 opacity-75" style={{top: ''}} onClick={() => setIsSearching(false)}></div>
      }
    </>
  );
};

export const Carousel = () => {
  return (
    <div className="Carousel bg-white p-3 rounded-4">
      <Slider {...settings}>
        {dataImgCarousel.map((d) => (
          <div className="d-flex ms-1">
            <div className="m-1 rounded-3"  >
              <img src={d.img} alt="photos" style={{width:'540px', height: '306px'}} className="rounded-4 border border-1"/>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export const formatPrice = (n) => {
  return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
};

export const StartNam = () =>  {
  return (
    <div className="text-warning" >
      <FaStar style={{width: '12px', height: '10px'}}/>
      <FaStar style={{width: '12px', height: '10px'}}/>
      <FaStar style={{width: '12px', height: '10px'}}/>
      <FaStar style={{width: '12px', height: '10px'}}/>
      <FaStar style={{width: '12px', height: '10px'}}/>
    </div>
  )
};

export const StartBonNam = () =>  {
  return (
    <div className="text-warning">
      <FaStar style={{width: '12px', height: '10px'}}/>
      <FaStar style={{width: '12px', height: '10px'}}/>
      <FaStar style={{width: '12px', height: '10px'}}/>
      <FaStar style={{width: '12px', height: '10px'}}/>
      <FaRegStarHalfStroke style={{width: '12px', height: '10px'}}/>
    </div>
  )
};

export const StartBon = () =>  {
  return (
    <div className="text-warning">
      <FaStar style={{width: '12px', height: '10px'}}/>
      <FaStar style={{width: '12px', height: '10px'}}/>
      <FaStar style={{width: '12px', height: '10px'}}/>
      <FaStar style={{width: '12px', height: '10px'}}/>
      <FaRegStar style={{width: '12px', height: '10px'}}/>
    </div>
  )
}