import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import HeaderForm from './components/HeaderForm';
import HomePage from './components/HomePage';
import ResultCategory from './components/ResultCategory';
import ProductsShop from './components/ProductsShop';
import SearchProducts from './components/SearchProducts';
import CartShop from './components/CartShop';
import Checkout from './components/Checkout';
import ShippingForm from './components/ShippingForm';
import FooterForm from './components/FooterForm';
import AdminPage from './Page/AdminPage';
import './App.css';
// import imgXtra from '../imgProducts/imgFreeXtra.png'

function App() {
  const [ cartItems, setCartItems ] = useState([]);
  const [quantityItemInCart, setQuantityItemInCart] = useState(0);
  const [infoAdded, setInfoAdded] = useState(false);
  
  const addCartItems = (product) => {
    setCartItems((prevItem) => {
      const existingItem = prevItem.find((item) => item.id === product.id);
      if (existingItem) {
        updateQuantity(existingItem.id, existingItem.quantity + 1);
        console.log(existingItem);
        
      return prevItem.map((item) => 
        item.id === product.id ? {...item, quantity: item.quantity + 1} : item
      );
    }
    else {
        setQuantityItemInCart(prev => prev + 1);
        return [ ...prevItem, { ...product, quantity: 1 } ];
      }
    })
    setInfoAdded(true);
    localStorage.setItem('product', JSON.stringify([...cartItems, product]));
  };

  // Hàm cập nhật số lượng sản phẩm
  const updateQuantity = (productId, newQuantity) => {
    setCartItems((prevItem) => 
      prevItem.map((item) => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const removeCartItems = (index) => {
    let remove = [...cartItems];
    remove.splice(index, 1);

    localStorage.setItem('product', JSON.stringify(remove));
    setCartItems(remove);
    setQuantityItemInCart(prev => prev - 1);
  }

  // 
  const [ addressShips, setAddressShips ] = useState([]);

  const [ addressShipsDefault, setAddressShipsDefault ] = useState([{
    name: "Lê Văn Chí",
    phone: "0388749516",
    city: "Quảng Nam",
    district: "Huyện Núi Thành",
    ward: "Xã Tam Hiệp",
    address: "Số 1 Phạm Văn Đồng",
  }])
    
  const addAddressDefault = (addressDefaultNew) => {
    setAddressShipsDefault(addressDefaultNew);
  }
  
  // Hàm thêm địa chỉ
  const addAddress = (newAddress) => {
    setAddressShips([...addressShips,newAddress]);
    localStorage.setItem('address', JSON.stringify([...addressShips, newAddress]))
  };

  // Hàm xóa địa chỉ
  const removeAddress = (index) => {
    let removePlace = [...addressShips];
    removePlace.splice(index, 1);
    localStorage.setItem('address', JSON.stringify(removePlace));
    setAddressShips(removePlace);
  };


  return (
    
    <div className="d-flex"  style={{backgroundColor: '#F5F5FA'}}>
      <Router>
        <AppContent
          quantityItemInCart={quantityItemInCart}
          cartItems={cartItems}
          addCartItems={addCartItems}
          removeCartItems={removeCartItems}
          infoAdded={infoAdded}
          setInfoAdded={setInfoAdded}
          updateQuantity={updateQuantity}
          addressShips={addressShips}
          addAddressDefault={addAddressDefault}
          addressShipsDefault={addressShipsDefault}
          addAddress={addAddress}
          removeAddress={removeAddress}
          setAddressShips={setAddressShips}
        />
      </Router>
    </div>
  
  );

}

const AppContent = ({
  quantityItemInCart,
  cartItems,
  addCartItems, 
  removeCartItems, 
  infoAdded, 
  setInfoAdded, 
  updateQuantity, 
  addressShips,
  addressShipsDefault,
  addAddressDefault,
  addAddress,
  removeAddress,
  setAddressShips
}) => {
  // Lấy Location hiện tại của Router
  const location = useLocation();
  const imgXtra = '/imgProducts/imgFreeXtra.png';
  // Kiểm tra nếu URL mà đang ở trang login hoặc signup thì không render HeaderForm
  const renderHeaderForm = location.pathname !== '/' && location.pathname !== '/signup' && location.pathname !== '/checkout/shipping' && location.pathname !== '/checkout/payment' && location.pathname !== '/admin' && location.pathname !== '/admin/manage-users' && location.pathname !== '/admin/manage-products'  && location.pathname !== '/admin/manage-orders';
  const renderXTra = location.pathname !== '/' && location.pathname !== '/signup' && location.pathname && location.pathname !== '/admin' && location.pathname !== '/admin/manage-users' && location.pathname !== '/admin/manage-products' && location.pathname !== '/admin/manage-orders'
  const renderFooterForm = location.pathname !== '/' && location.pathname !== '/signup' && location.pathname !== '/checkout/payment' && location.pathname !== '/checkout/shipping' && location.pathname !== '/admin' && location.pathname !== '/admin/manage-users' && location.pathname !==  '/admin/manage-products' && location.pathname !== '/admin/manage-orders';
  return (

    <div className='d-flex flex-column m-auto w-100 h-auto'>
      {renderXTra &&
        <div className='d-flex flex-row justify-content-center align-items-center position-relative' style={{backgroundColor:'#EFFEF5', zIndex:'2000'}}>
          <div className='text-success fs-6 fw-semibold d-flex me-1 lh-base'>
            Freeship đơn từ 45k, giảm nhiều hơn cùng
          </div>
          <div>
            <img src={imgXtra} alt='XTRA'/>   
          </div>    
        </div>
      }  
        
      {renderHeaderForm &&
        <div className=''>
          <HeaderForm quantityItemInCart={quantityItemInCart} infoAdded={infoAdded} setInfoAdded={setInfoAdded}/>
        </div>   
      }
      <Routes>
        <Route path='/'                 element={<LoginForm/>}></Route>
        <Route path='/signup'           element={<SignupForm/>}></Route>
        <Route path='/home'             element={<HomePage/>}></Route>
        <Route path='/:category'        element={<ResultCategory/>}></Route>
        <Route path='/products/:id'     element={<ProductsShop addCartItems={addCartItems} cartItems={cartItems} setInfoAdded={setInfoAdded} updateQuantity={updateQuantity}/>} ></Route>
        <Route path='/search/'          element={<SearchProducts quantityItemInCart={quantityItemInCart}/>}></Route>
        <Route path='/checkout/cart'    element={<CartShop cartItems={cartItems} removeCartItems={removeCartItems} updateQuantity={updateQuantity} addressShips={addressShips} addressShipsDefault={addressShipsDefault}/>} ></Route>
        <Route path='/checkout/shipping'element={<ShippingForm addressShips={addressShips} addAddress={addAddress} removeAddress={removeAddress} addAddressDefault={addAddressDefault} addressShipsDefault={addressShipsDefault} setAddressShips={setAddressShips}/>}></Route>
        <Route path='/checkout/payment' element={<Checkout addressShipsDefault={addressShipsDefault}/>}></Route>
        <Route path='/admin/*'            element={<AdminPage/>}></Route>
      </Routes>
      {renderFooterForm &&
        <div className=''>
          <FooterForm/>
        </div>
      }
    </div> 

  );

};

export default App;
