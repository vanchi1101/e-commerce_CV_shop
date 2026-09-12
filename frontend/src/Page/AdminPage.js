import React, { useState } from "react";
import {Routes, Route, useNavigate, useLocation } from "react-router-dom";
import logo from '../assets/images/logo_Shop.png';
import imgAdmin from '../assets/images/imgAdmin.png';
import ManageUsers from "./ManageUsers";
import ManageProducts from "./ManageProducts";
import ManageOrders from "./ManageOrders";
import { FaUsers } from "react-icons/fa";
import { FaList } from "react-icons/fa6";
import { BsCalendar2CheckFill } from "react-icons/bs";
import { FaFileCircleQuestion } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import '../assets/css/Products.css'

const AdminPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [ isScreen, setIsScreen ] = useState(false);
  
  const handleManageInAdmin = (path) => {
    if (path === 'user') {
      navigate('manage-users');
    }else if (path === 'product') {
      navigate('manage-products');
    }else if (path === 'order') {
      navigate('manage-orders');
    }else if (path === 'admin') {
      navigate('/admin');
    }
  }

  const handleClickAdmin = () => {
    setIsScreen(isScreen ? false : true);
  }

  const handleSignOut = () => {
    navigate('/');
  };

  return (
    <div>
      <div className="w-100 bg-white h-auto">
        <div className="d-flex flex-row justify-content-between py-2" style={{backgroundImage: 'linear-gradient(to right, #00d4ff , #090979)'}}>
          <div className="ms-4 round" onClick={() => handleManageInAdmin('admin')}>
            <img src={logo} width={60} height={60} alt="logo"/>
          </div>
          <div className="d-flex overflow-hidden align-items-center me-5" onClick={handleClickAdmin}>
            <img src={imgAdmin} width={35} height={35} className="rounded-4" alt="admin"/>
          </div>
        </div>
        <div>
          {isScreen &&
            <div className="d-flex flex-row position-absolute bg-white p-2 me-5 rounded gap-2 " style={{top: '20px', right:'50px', cursor:'pointer'}} onClick={handleSignOut}>
              <div><CiLogout /></div>
              <div>Đăng xuất</div>
            </div>
          }
        </div>
        <div className="d-flex flex-row w-100">
          <div className="bg-primary border-end bg-opacity-25 d-flex flex-column gap-4 align-items-start p-3 pt-5" style={{width:'250px', height: '710px'}}>
            <div onClick={() => handleManageInAdmin('user')} className={`d-flex flex-row align-items-center gap-3 ps-3 w-100 py-2 rounded-2 hoverCursor ${location.pathname === '/admin/manage-users' ? 'bg-primary text-white' : ''}`} >
              <div className="d-flex"><FaUsers /></div>
              <div className="d-flex justify-content-center fw-medium">Quản lý người dùng</div>
            </div>
            <div onClick={() => handleManageInAdmin('product')} className={`d-flex flex-row align-items-center gap-3 ps-3 w-100 py-2 rounded-2 hoverCursor ${location.pathname === '/admin/manage-products' ? 'bg-primary text-white' : ''}`} >
              <div className="d-flex"><FaList/></div>
              <div className="d-flex justify-content-center fw-medium">Quản lý sản phẩm</div>
            </div>
            <div onClick={() => handleManageInAdmin('order')} className={`d-flex flex-row align-items-center gap-3 ps-3 w-100 py-2 rounded-2 hoverCursor ${location.pathname === '/admin/manage-orders' ? 'bg-primary text-white' : ''}`} >
              <div className="d-flex"><BsCalendar2CheckFill /></div>
              <div className="d-flex justify-content-center fw-medium">Quản lý đặt hàng</div>
            </div>
          </div>

          <div className="bg-white d-flex" style={{width: '1285px'}}>
            {location.pathname === '/admin' &&
              <div className="m-auto text-secondary text-opacity-75" style={{fontSize: '120px'}}><FaFileCircleQuestion /></div>
            }
            <Routes >
              {location.pathname === '/admin/manage-users' && 
                <Route path="manage-users" element={<ManageUsers/>}></Route>
              }{location.pathname === '/admin/manage-products' &&
                <Route path="manage-products" element={<ManageProducts/>}></Route>
              }{location.pathname === '/admin/manage-orders' &&
                <Route path="manage-orders" element={<ManageOrders/>}></Route>
              }
            </Routes>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default AdminPage;