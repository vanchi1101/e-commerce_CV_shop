import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { FaCircleUser } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { BiSearchAlt } from "react-icons/bi";
import { MdOutlineDone } from "react-icons/md";
import { BsFire } from "react-icons/bs";
import { HiMiniCheckBadge } from "react-icons/hi2";
import { FaShippingFast } from "react-icons/fa";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import { GiBoxUnpacking } from "react-icons/gi";
import { CiLogout } from "react-icons/ci";
import logoCV from '../assets/images/logo_Shop.png';
import { dataItemsBig } from "../DataMethFuc/data";
import '../../src/assets/css/Products.css'

const HeaderForm = ( { quantityItemInCart, infoAdded, setInfoAdded } ) => {
    const navigate = useNavigate();  
    const [itemsSearch, setItemsSearch] = useState([]);
    const [ search, setSearch ] = useState('');
    const [ namePlaceHolder, setNamePlaceHolder] = useState('Freeship đơn từ 45k')
    const [isSearching, setIsSearching] = useState(false);
    const [ selectedIndex, setSelectedIndex ] = useState(-1);
    const [ isSignOut, setIsSignOut ] = useState(false);
    
    const handleToCart = () => {
      navigate('/checkout/cart');
      setInfoAdded(false);
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

    const handleSignOut = () => {
      navigate('/')
    }
  
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
      else if (search.length === 0 ) {
        setNamePlaceHolder('Freeship đơn từ 45k');
        setIsSearching(false);
        console.log(5);
        
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
          console.log('hể');
          if (isSearching) {
            setNamePlaceHolder(dataItemsBig[selectedIndex+1].name);
          }
        }
        else if (itemsSearch.length === 0) {
          setNamePlaceHolder(search);
        }
        else {
          setSelectedIndex((prev) => Math.min(prev + 1, 8));
          setSearch(itemsSearch[selectedIndex+1].name)
          console.log(itemsSearch[selectedIndex+1].name);
          
        }
      }
      else if (e.key === 'ArrowUp') {
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
        if (search.length === 0 && selectedIndex > 0) {
          console.log(selectedIndex);
          setNamePlaceHolder(dataItemsBig[selectedIndex-1].name);      
        }else if (search.length > 0 && selectedIndex > 0) {
          setSearch(itemsSearch[selectedIndex-1].name);
        }
      }
      else if (e.key === 'Enter') {
        if (selectedIndex >= 0) {
          // Chuyển hướng đến trang Search và thêm 
          if (search.length > 0 && !isSearching && itemsSearch.length > 0 ) {
            navigate(`/search?q=${itemsSearch[selectedIndex].name}`);
            setIsSearching(true);
            // setSearch('');
            console.log(1);
            
          }
          else {
            // handleClickToSearch(selectedIndex);
            navigate(`/search?q=${namePlaceHolder}`)
            setIsSearching(false)
            // setSearch('');
            console.log(3);
            
          }
        }
        else if (search.length === 0) {
          // setNamePlaceHolder('Freeship đơn từ 45k');
        }
        else {
          navigate(`/search?q=${encodeURIComponent(search)}`);
          setIsSearching(false);
          setSearch('');
          setNamePlaceHolder('Freeship đơn từ 45k');
          console.log(4);
             
        };  
      };
    };
  
    return (
      <div>
        <header className="position-relative border-bottom border-1 bg-white w-100" style={{zIndex:'1000'}}>
          <div className="ContainerRevamp justify-content-between">
            <div className="HomeRevampHeader_HeaderLayout justify-content-between position-relative" style={{zIndex:'1000'}}>
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
                          placeholder={namePlaceHolder}
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
                    <div className="box_Account fs-6 fw-medium w-35 h-75" onClick={() => setIsSignOut(isSignOut ? false : true)}>
                      <FaCircleUser className="icon-TaiKhoan me-1 text-secondary"/>
                      <span className="text-secondary">Tài khoản</span>
                    </div>
                    <div>
                      {!isSignOut &&
                        <div className="d-flex flex-row position-absolute bg-secondary bg-opacity-50 p-2 me-5 rounded gap-2 " style={{top: '40px', right:'50px', cursor:'pointer'}} onClick={handleSignOut}>
                        <div><CiLogout /></div>
                        <div>Đăng xuất</div>
                      </div>
                      }
                    </div>
                    <div className="box_Cart border-start border-2 border-secondary-subtle w-25 h-75 position-relative" onClick={() => handleToCart()}>
                      <div className="me-4 text-center " style={{height: '', width:' 30px'}}>
                        <FiShoppingCart className="position-relative icon-GioHang text-primary fw-semibold"/>
                          <span className="badge rounded-pill bg-danger bage-Cart">
                            {quantityItemInCart}
                          </span>
                      </div>
                    </div>
                    {/*  */}
                    {/* <div className=""> */}
                      {infoAdded &&
                        <div className="position-relative d-flex">
                          <div className="position-absolute bg-white imgArrowCart" style={{right: '45px', top:'20px',width: '14px', height:'15px'}}/>
                          <div class="position-absolute bg-white shadow-lg rounded-2 d-flex flex-column p-2 end-0" style={{width: '272px', height:'103px', top:'-75px', transform: 'translateY(100%)'}}>
                            <div className="d-flex m-2">
                              <div className=" rounded-4 bg-success text-center text-white me-2" style={{width: '20px', height:'20px'}}><MdOutlineDone className="mb-2"/></div>
                              <div className="d-flex text-secondary" style={{fontSize:'15px'}}>Thêm vào giỏ hàng thành công!</div>
                            </div>
                            <div className="btn btn-danger lh-l fw-medium mt-2" onClick={() => handleToCart()}>Xem giỏ hàng và thanh toán</div> 
                          </div>
                        </div>    
                      }
                      {/* </div> */}
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
        <div className="bg-white d-flex justify-content-center align-items-center" style={{height:'45px'}}>
        <a href="/home" className="text-decoration-none d-flex flex-row w-75 justify-content-center align-items-center" style={{marginLeft: ''}}>
          <div className="text-primary me-5 mt-1 fw-semibold " >Cam kết</div>
          <div className="d-flex flex-row w-auto align-items-center mt-1">
            <div className="d-flex justify-content-center flex-row align-items-center me-4 h-25">
              <HiMiniCheckBadge className="mb me-1 fs-5"/>
              <div className="text-dark fw-semibold ">100% hàng thật</div>
            </div>
            <div style={{width:'1px', height: '20px', backgroundColor: '#B2B2B6'}} className="me-4"></div>
            <div className="d-flex justify-content-center flex-row align-items-center me-4">
              <FaShippingFast className="mb- me-1 fs-5"/>
              <div className="text-dark fw-semibold ">Free ship mọi đơn</div>
            </div>
            <div style={{width:'1px', height: '20px', backgroundColor: '#B2B2B6'}} className="me-4"></div>
            <div className="d-flex justify-content-center flex-row align-items-center me-4">
              <MdOutlineCurrencyExchange className="mb- me-1 fs-5"/>
              <div className="text-dark fw-semibold ">Hoàn 200% nếu hàng giả</div>
            </div>
            <div style={{width:'1px', height: '20px', backgroundColor: '#B2B2B6'}} className="me-4"></div>
            <div className="d-flex justify-content-center flex-row align-items-center me-4">
              <GiBoxUnpacking className="mb- me-1 fs-5"/>
              <div className="text-dark fw-semibold ">30 ngày đổi trả</div>
            </div>
          </div>
        </a>
      </div>
        <div>
          {search && !isSearching &&
            <div className="d-flex bg-dark w-100 h-100 position-fixed h-100 top-0 start-0 opacity-75" style={{top: '0', height: '', zIndex: '999'}} onClick={() => setIsSearching(true)}></div>
          }
          {search.length === 0 && isSearching &&
            <div className="d-flex bg-dark w-100 h-100 position-fixed h-100 top-0 start-0 opacity-75" style={{top: '0', height: '', zIndex: '999'}} onClick={() => setIsSearching(false)}></div>
          }
        </div>
      </div>
    );
};

export default HeaderForm;