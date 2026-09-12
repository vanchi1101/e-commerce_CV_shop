import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { FaStar, FaRegStarHalfStroke, FaRegStar } from "react-icons/fa6";
import { dataImgCategory } from "../DataMethFuc/data";
import Slider from "react-slick";
import { settings4, dataItemsBig } from "../DataMethFuc/data";
import { formatPrice } from "../DataMethFuc/CountDown";
import '../assets/css/Products.css'

const ResultCategory = () => {
  const [ itemsCategory, setItemsCategory ] = useState([]);
  const [ itemsSliderCategory, setItemsSliderCategory ] = useState([]);
  const [ nameCategory, setNameCategory ] = useState('');
  const { category } = useParams();
  const navigate = useNavigate();
  console.log(category.replace('-', ' ').toLowerCase());
  console.log(itemsCategory);
  
  const handleClickProducts = (items) => {
    navigate(`/products/${items.id}`);  
  };

  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  
  const searchSliderCategory = (category) => {
    const itemsSearchCategory = dataImgCategory.filter((item) => 
      removeAccents(item.category).toLowerCase() === removeAccents(category.replaceAll('-', ' ').toLowerCase())
    );

    if (itemsSearchCategory) {

      setItemsSliderCategory(itemsSearchCategory)
    };
  };

  const fetchItemCategory = (category) => {
    const itemsCategory = dataItemsBig.filter((item) => 
      removeAccents(item.category).toLowerCase() === category.replaceAll('-', ' ').toLowerCase()
    );
    if (itemsCategory) {
      setItemsCategory(itemsCategory)
    }
  };

  useEffect(() => {
    const nameCate = dataImgCategory.find((item) => 
      removeAccents(item.category).toLowerCase() === category.replaceAll('-', ' ').toLowerCase()
    );
    setNameCategory(nameCate.category);
    console.log(nameCate);
    
    searchSliderCategory(category);
    fetchItemCategory(category);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-100 h-auto">
      <div className="w-100" style={{backgroundColor:'#F5F5FA'}}>
        <main className="w-100 d-flex flex-column gap-3">
          <div className="d-flex mt-2 m-auto" style={{width:'1200px'}}>
            <div className="d-flex flex-row">
              <Link to={-1} className="text-secondary text-opacity-75 text-decoration-none">Trang chủ<IoIosArrowForward /></Link>
              <div className="fw-medium">{nameCategory}</div>
            </div>
          </div>
          {/*  */}
          <div className=" m-auto d-flex flex-column gap-3 mt-2" style={{width:'1200px', height:''}}>
            <div className="bg-white w-100 p-3 rounded-3 fs-4 fw-bold">
              {nameCategory.toUpperCase()}
            </div>
            <div>
              <div>
                <Slider {...settings4}>
                  {itemsSliderCategory.map((item) => (
                    <div className="ms-1">
                      <div className="rounded-3" >
                        <img src={item.image} alt="photos" width={595} className="rounded-3 border border-1"/>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="m-auto" style={{width:'1200px'}}>
            <div className="bg-white p-3 rounded-3">
              <div className="d-flex flex-wrap gap-3"> 
                {itemsCategory.length > 0 &&
                  itemsCategory.map((item) => (
                    <div className="border border-1 rounded-2 overflow-hidden hoverCategory z-0 position-relative" key={item.id}>
                      <div onClick={() => handleClickProducts(item)} className="rounded-2 bg-white" style={{fontFamily: 'Inter,Helvetica,Arial,sans-serif'}}>
                        <div className="d-grid containerImgItem"  >
                          <img src={item.image} alt="photos" style={{width:'278px', height: '278px',}} className="m-auto rounded-top-3"/>
                          <img src={item.imgSP} alt="photos" style={{width:'278px', height: '278px',}} className=""/>
                        </div>
                        <div className="d-flex flex-row ms-2 mt-1">
                          <div className="ms-2 mt-3 lh-base text-danger fw-semibold fs-5">{formatPrice(item.price)}0<sup className="text-decoration-underline">đ</sup></div>
                          <div className="ms-2 mt-3 fw-medium bg-body-secondary p-1 py-2 rounded-3 w-auto d-flex align-items-center justify-content-center" style={{height: '18px', fontSize:'14px'}}>{item.phanTram}
                          </div>
                        </div>
                        <div className="text-secondary d-flex ms-3 mt-2" style={{fontSize:'15px'}}>{item.brand}</div>
                        <p className="text-start d-flex lh-1 mt-1 fw- ms-3" style={{fontSize:'17px'}}>{item.name}</p>
                        <div className="ms-2 d-flex ms-3 mt-2" style={{marginTop: '-15px', fontSize: '11px'}}>
                          {item.vote === 5 &&
                            <div className="text-warning">
                              <FaStar />
                              <FaStar />
                              <FaStar />
                              <FaStar />
                              <FaStar />
                            </div>
                          }  {item.vote === 4.5 &&
                            <div className="text-warning">
                              <FaStar />
                              <FaStar />
                              <FaStar />
                              <FaStar />
                              <FaRegStarHalfStroke />
                            </div>
                          }  {item.vote === 4 &&
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
                            {item.origin && 
                              <p>{item.origin}</p>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>    
  );
}

export default ResultCategory;