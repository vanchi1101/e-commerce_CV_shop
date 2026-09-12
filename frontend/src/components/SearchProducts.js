import React, { useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../assets/css/Products.css';
import { dataItemsBig } from "../DataMethFuc/data";
import { FaStar, FaRegStarHalfStroke, FaRegStar } from "react-icons/fa6";
import { formatPrice } from "../DataMethFuc/CountDown";

const SearchProducts = ({ quantityItemInCart }) => {
  const location =  useLocation();
  const [ searchP, setSearchP ] = useState('');
  const [ productSearch, setProductSearch ] = useState([]);
  const [ productSearch2, setProductSearch2 ] = useState([]);
  const [ productSearch3, setProductSearch3 ] = useState([]);
  const navigate = useNavigate();

  const handleClickProducts = (items) => {
    navigate(`/products/${items.id}`);  
  };

  function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  // Hàm lọc sản phẩm dựa trên search
  const searchBySearch = (queryName) => {
    const queryNoDau = removeAccents(queryName);
    
    if (queryName.trim() === '') {
      return [];
    }
    const products = dataItemsBig.filter((product) => 
      removeAccents(product.name).toLowerCase().includes(queryNoDau.toLowerCase())
    );
    
    if (products.length > 0) {
      const itemsTemp = products.find(p => p.id);
      const items = dataItemsBig.filter((p) => p.category === itemsTemp.category) ;
      const items3 = dataItemsBig.filter((_,index) => index < 20);
      setProductSearch(products)
      setProductSearch2(items);
      setProductSearch3(items3);
    }
    else {
      setProductSearch(dataItemsBig);
    }

  };

  // Lấy kết quả tìm kiếm từ URL và tìm kiếm sản phẩm
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('q') || '';
    setSearchP(searchQuery);
    searchBySearch(searchQuery);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  
  return (
    <div className="h-auto " style={{width:'1519px'}}>
      <div className='w-100' style={{backgroundColor:'#F5F5FA'}}>
        <main>
          <div className="d-flex ms-5 mt-2">
            <div>Kết quả tìm kiếm "{searchP}"</div>
          </div>
          {/*  */}
          <div className="w-100 mt-2 d-flex justify-content-center align-items-center " style={{height:'2370px', width: '1150px'}}>
            <div className="d-flex" style={{width:'1200px', height:'2360px'}}>
              <div className="search-results d-flex flex-wrap justify-content-center align-items-center overflow-hidden p-2" style={{height:'2330px'}}>
                {productSearch.length > 0  &&
                  productSearch.map((product) => (
                    <div key={product.id} className="product-item overflow-hidden bg-white rounded-2 TopDealHover m-2"style={{width:'278px', height: '450px'}}>
                      <div onClick={() => handleClickProducts(product)} className="rounded-2 bg-white" style={{fontFamily: 'Poppins'}}>
                        <div className="d-grid containerImgItem"  >
                          <img src={product.image} alt="photos" style={{width:'278px', height: '278px',}} className="m-auto rounded-top-3"/>
                          <img src={product.imgSP} alt="photos" style={{width:'278px', height: '278px',}} className=""/>
                        </div>
                        <div className="d-flex flex-row ms-2 mt-1">
                          <div className="ms-2 mt-3 lh-base text-danger fw-semibold fs-5">{formatPrice(product.price)} <sup className="text-decoration-underline">đ</sup></div>
                          <div className="ms-2 mt-3 fw-medium bg-body-secondary p-1 py-2 rounded-3 w-auto d-flex align-items-center justify-content-center" style={{height: '18px', fontSize:'14px'}}>{product.phanTram}
                          </div>
                        </div>
                        <div className="text-secondary d-flex ms-3 mt-2" style={{fontSize:'15px'}}>{product.brand}</div>
                        <p className="text-start d-flex lh-1 mt-1 fw- ms-3" style={{fontSize:'17px'}}>{product.name}</p>
                        <div className="ms-2 d-flex ms-3 mt-2" style={{marginTop: '-15px', fontSize: '11px'}}>
                          {product.vote === 5 &&
                            <div className="text-warning">
                              <FaStar />
                              <FaStar />
                              <FaStar />
                              <FaStar />
                              <FaStar />
                            </div>
                          }  {product.vote === 4.5 &&
                            <div className="text-warning">
                              <FaStar />
                              <FaStar />
                              <FaStar />
                              <FaStar />
                              <FaRegStarHalfStroke />
                            </div>
                          }  {product.vote === 4 &&
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
                          <div className="d-flex text-secondary ms-3"style={{fontSize: '12px'}}> 
                            {product.origin && 
                              <p>{product.origin}</p>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                {productSearch2.map((product) => (
                  <div key={product.id} className="product-item overflow-hidden bg-white rounded-2 mb-2 TopDealHover m-2"style={{width:'278px', height: '450px'}}>
                    <div onClick={() => handleClickProducts(product)} className="m-auto rounded-2 bg-white" style={{fontFamily: 'Poppins'}}>
                      <div className="d-grid containerImgItem" >
                        <img src={product.image} alt="photos" style={{width:'278px', height: '278px'}} className="m-auto rounded-top-3"/>
                        <img src={product.imgSP} alt="photos" style={{width:'278px', height: '278px'}} className=""/>
                      </div>
                      <div className="d-flex flex-row ms-2 mt-1 d-">
                        <div className="ms-2 mt-3 lh-base text-danger fw-semibold fs-5">{formatPrice(product.price)} <sup className="text-decoration-underline">đ</sup></div>
                        <div className="ms-2 mt-3 fw-medium bg-body-secondary p-1 py-2 rounded-3 w-auto d-flex align-items-center justify-content-center" style={{height: '18px', fontSize:'14px'}}>{product.phanTram}
                        </div>
                      </div>
                      <div className="text-secondary d-flex ms-3 mt-2" style={{fontSize:'15px'}}>{product.brand}</div>
                      <p className="text-start d-flex lh-1 mt-1 fw- ms-3" style={{fontSize:'17px'}}>{product.name}</p>
                      <div className="ms-2 d-flex ms-3 mt-2" style={{marginTop: '-15px', fontSize: '11px'}}>
                        {product.vote === 5 &&
                          <div className="text-warning">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                          </div>
                        }  {product.vote === 4.5 &&
                          <div className="text-warning">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaRegStarHalfStroke />
                          </div>
                        }  {product.vote === 4 &&
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
                        <div className="d-flex text-secondary ms-3"style={{fontSize: '12px'}}> 
                          {product.origin && 
                            <p>{product.origin}</p>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {productSearch3.map((product) => (
                  <div key={product.id} className="product-item overflow-hidden bg-white rounded-2 mb-2 TopDealHover m-2"style={{width:'278px', height: '450px'}}>
                    <div onClick={() => handleClickProducts(product)} className="m-auto rounded-2 bg-white" style={{fontFamily: 'Poppins'}}>
                      <div className="d-grid containerImgItem" >
                        <img src={product.image} alt="photos" style={{width:'278px', height: '278px'}} className="m-auto rounded-top-3"/>
                        <img src={product.imgSP} alt="photos" style={{width:'278px', height: '278px'}} className=""/>
                      </div>
                      <div className="d-flex flex-row ms-2 mt-1 d-">
                        <div className="ms-2 mt-3 lh-base text-danger fw-semibold fs-5">{formatPrice(product.price)} <sup className="text-decoration-underline">đ</sup></div>
                        <div className="ms-2 mt-3 fw-medium bg-body-secondary p-1 py-2 rounded-3 w-auto d-flex align-items-center justify-content-center" style={{height: '18px', fontSize:'14px'}}>{product.phanTram}
                        </div>
                      </div>
                      <div className="text-secondary d-flex ms-3 mt-2" style={{fontSize:'15px'}}>{product.brand}</div>
                      <p className="text-start d-flex lh-1 mt-1 fw- ms-3" style={{fontSize:'17px', fontFamily: 'Poppins'}}>{product.name}</p>
                      <div className="ms-2 d-flex ms-3 mt-2" style={{marginTop: '-15px', fontSize: '11px'}}>
                        {product.vote === 5 &&
                          <div className="text-warning">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                          </div>
                        }  {product.vote === 4.5 &&
                          <div className="text-warning">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaRegStarHalfStroke />
                          </div>
                        }  {product.vote === 4 &&
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
                        <div className="d-flex text-secondary ms-3"style={{fontSize: '12px'}}> 
                          {product.origin && 
                            <p>{product.origin}</p>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SearchProducts;