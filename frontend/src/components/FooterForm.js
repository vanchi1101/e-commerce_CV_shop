import React, { useState } from "react";
import { TiDelete } from "react-icons/ti";

const FooterForm = () => {
  const [ facebook, setFacebook ] = useState(false);
  const [ instagram, setInstagram ] = useState(false);
  const [ zalo, setZalo ] = useState(false);
  const [ email, setEmail ] = useState(false);


  return (
    <footer className="w-100 h-100">
      <div className="w-100 h-100 bg-white d-flex flex-column justify-content-center align-items-center mt-3">
        <div className="d-flex flex-row h-auto justify-content-between mt-3" style={{width: '1270px'}}>
          <div className="d-flex flex-column text-secondary" style={{width: '268px',height: '308px'}}>
            <h6 className="text-dark" style={{fontSize:'17px'}}>Hỗ trợ khách hàng</h6>
            <p className="">
              Hotline:
              <a className="text-dark link-secondary link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover fw-medium" href="tel:0388 749 516"> 0388-749-516</a><br/>
              <span className="fw-medium" style={{fontSize: '13px'}}>(1000 đ/phút, 8-21h kể cả T7, CN)</span>
            </p>
            <a className="link-secondary link-opacity-50 link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover fw-medium mb-1 text-body-secondary" href="#lele" style={{fontSize:'13px'}}>Các câu hỏi thường gặp</a>
            <a className="link-secondary link-opacity-50 link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover fw-medium mb-1 text-body-secondary" href="#lele" style={{fontSize:'13px'}}>Gửi yêu cầu hỗ trợ</a>
            <a className="link-secondary link-opacity-50 link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover fw-medium mb-1 text-body-secondary" href="#lele" style={{fontSize:'13px'}}>Hướng dẫn đặt hàng</a>
            <a className="link-secondary link-opacity-50 link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover fw-medium mb-1 text-body-secondary" href="#lele" style={{fontSize:'13px'}}>Phương thức vận chuyển</a>
            <a className="link-secondary link-opacity-50 link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover fw-medium mb-1 text-body-secondary" href="#lele" style={{fontSize:'13px'}}>Chính sách kiểm hàng</a>
            <a className="link-secondary link-opacity-50 link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover fw-medium mb-1 text-body-secondary" href="#lele" style={{fontSize:'13px'}}>Chính sách đổi trả</a>
            <a className="link-secondary link-opacity-50 link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover fw-medium mb-1 text-body-secondary" href="#lele" style={{fontSize:'13px'}}>Hướng dẫn trả góp</a>
            <a className="link-secondary link-opacity-50 link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover fw-medium mb-1 text-body-secondary" href="#lele" style={{fontSize:'13px'}}>Chính sách hàng nhập khẩu</a>
            <p className="fw-medium" style={{fontSize:'13px'}}>
              Hỗ trợ khách hàng: 
              <a className="link-secondary link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover fw-medium" href="#dfd" style={{fontSize:'13px'}}> hotro@civi.vn</a>
            </p>
          </div>
          <div className=" d-flex flex-column" style={{width: '226px',height: '308px'}}>
            <h6 style={{fontSize:'17px'}}>Về CiVi Shop</h6>
            <a className="link-secondary link-opacity-50 link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover fw-medium mb-1 text-body-secondary" href="#lele" style={{fontSize:'13px'}}>Giới thiệu CiVi</a>
            <a className="link-secondary link-opacity-50 link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover fw-medium mb-1 text-body-secondary" href="#lele" style={{fontSize:'13px'}}>CiVi Blog</a>
            <a className="link-secondary link-opacity-50 link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover fw-medium mb-1 text-body-secondary" href="#lele" style={{fontSize:'13px'}}>Tuyển dụng</a>
            <a className="link-secondary link-opacity-50 link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover fw-medium mb-1 text-body-secondary" href="#lele" style={{fontSize:'13px'}}>Chính sách bảo mật thanh toán</a>
            <a className="link-secondary link-opacity-50 link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover fw-medium mb-1 text-body-secondary" href="#lele" style={{fontSize:'13px'}}>Chính sách bảo mật thông tin cá nhân</a>
            <a className="link-secondary link-opacity-50 link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover fw-medium mb-1 text-body-secondary" href="#lele" style={{fontSize:'13px'}}>Chính sách giải quyết khiếu nại</a>
            <a className="link-secondary link-opacity-50 link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover fw-medium mb-1 text-body-secondary" href="#lele" style={{fontSize:'13px'}}>Điều khoản sử dụng</a>
            <a className="link-secondary link-opacity-50 link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover fw-medium mb-1 text-body-secondary" href="#lele" style={{fontSize:'13px'}}>Giới thiệu CiVi Coin</a>
            <a className="link-secondary link-opacity-50 link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover fw-medium mb-1 text-body-secondary" href="#lele" style={{fontSize:'13px'}}>Tiếp thị liên kết cùng CiVi</a>
            <a className="link-secondary link-opacity-50 link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover fw-medium mb-1 text-body-secondary" href="#lele" style={{fontSize:'13px'}}>Bán hàng doanh nghiệp</a>
            <a className="link-secondary link-opacity-50 link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover fw-medium mb-1 text-body-secondary" href="#lele" style={{fontSize:'13px'}}>Điều kiện vận chuyển</a>
          </div>
          <div className=" d-flex flex-column" style={{width: '226px',height: '308px'}}>
            <h6 style={{fontSize:'17px'}}>Hợp tác và liên kết</h6>
            <a className="link-secondary link-opacity-50 link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover fw-medium mb-1 text-body-secondary" href="#lele" style={{fontSize:'13px'}}>Quy chế hoạt động Sàn GDTMĐT</a>
            <a className="link-secondary link-opacity-50 link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover fw-medium mb-1 text-body-secondary" href="#lele" style={{fontSize:'13px'}}>Bán hàng cùng Tiki</a>
            <h5 className="mt-4">Chứng nhận bởi</h5>
            <div className="d-flex flex-row mt-2" style={{width: '226px',height: '32px'}}>
                <img src="/imgFooter/cn1.png" alt="chứng nhận" style={{width: '32px'}}/>
                <img src="/imgFooter/cn2.png" className="mx-2" alt="chứng nhận" style={{width: '85px'}}/>
                <img src="/imgFooter/cn3.png" alt="chứng nhận" style={{width: '32px'}}/>
            </div>
          </div>
          <div className="d-flex flex-column" style={{width: '226px',height: '308px'}}>
            <h6 style={{fontSize:'17px'}}>Phương thức thanh toán</h6>
            <p className="d-flex flex-wrap justify-content-between mt-3 gap-2" style={{width:'200px', height:'180px'}}>
              <span>
                <img src="/imgFooter/card1.png" alt="credit" style={{width: '32px'}}/>
              </span>
              <span>
                <img src="/imgFooter/card2.png" alt="credit" style={{width: '32px'}}/>
              </span>
              <span>
                <img src="/imgFooter/card3.png" alt="credit"style={{width: '32px'}}/>
              </span>
              <span>
                <img src="/imgFooter/card4.png" alt="credit" style={{width: '32px'}}/>
              </span>
              <span>
                <img src="/imgFooter/card5.png" alt="credit" style={{width: '32px'}}/>
              </span>
              <span>
                <img src="/imgFooter/card6.png" alt="credit" style={{width: '32px'}}/>
              </span>
              <span>
                <img src="/imgFooter/card7.png" alt="credit" style={{width: '32px'}}/>
              </span>
              <span>
                <img src="/imgFooter/card8.png" alt="credit" style={{width: '32px'}}/>
              </span>
              <span>
                <img src="/imgFooter/card9.png" alt="credit" style={{width: '32px'}}/>
              </span>
              <span>
                <img src="/imgFooter/card10.png" alt="credit" style={{width: '32px'}}/>
              </span>
              <span>
                <img src="/imgFooter/card11.png" alt="credit" style={{width: '32px'}}/>
              </span>
              <span>
                <img src="/imgFooter/card12.png" alt="credit" style={{width: '32px'}}/>
              </span>
              <span>
                <img src="/imgFooter/card13.png" alt="credit" style={{width: '32px'}}/>
              </span>
              <span>
                <img src="/imgFooter/card14.png" alt="credit" style={{width: '32px'}}/>
              </span>
              <span>
                <img src="/imgFooter/card15.png" alt="credit" style={{width: '32px'}}/>
              </span>
              <span>
                <img src="/imgFooter/card16.png" alt="credit" style={{width: '32px'}}/>
              </span>
            </p>
          </div>
          <div style={{width: '226px',height: '308px'}}>
            <h6 style={{fontSize:'17px'}}>Kết nối với chúng tôi</h6>
            <div className="d-flex flex-row justify-content-between mt-4" style={{width: '155px'}}>
              <div onClick={() => setFacebook(instagram || zalo || email ? (setInstagram(false) || setZalo(false) || setEmail(false)) && true : true)}>
                <img src="/imgFooter/contact1.png" alt="contact" width={32}/>
              </div>
              <div onClick={() => setInstagram(facebook || zalo || email ? (setFacebook(false) || setZalo(false) || setEmail(false)) && true : true)}>
                <img src="/imgFooter/contact2.png" alt="contact" width={32}/>
              </div>
              <div onClick={() => setZalo(facebook || instagram || email? (setFacebook(false) || setInstagram(false) || setEmail(false)) && true : true)}>
                <img src="/imgFooter/contact3.png" alt="contact" width={32}/>
              </div>
              <div onClick={() => setEmail(facebook || instagram || zalo ? (setFacebook(false) || setInstagram(false) || setZalo(false)) && true : true)}>
                <img src="/imgFooter/contact4.png" alt="contact" width={32}/>
              </div>
            </div>
            <div>
              {facebook &&
                <div className="position-absolute z-1 bg-primary d-flex flex-column rounded-2 p-1 shadow mt-1" style={{width:'245px', backgroundColor: '#028FE3'}}>
                  <div className="d-flex w-100 justify-content-between text-white">
                    <div className="d-flex ms-2 fw-medium mt-2">Contact Facebook</div>
                    <div className="d-flex fs-2 btn" onClick={() => setFacebook(false)}><TiDelete /></div>
                  </div>
                  <div>
                    <img src="/imgFooter/fbContact.png" alt="QR" width={200}/>
                  </div>
                </div>
              }{instagram &&
                <div className="position-absolute z-1 d-flex flex-column rounded-2 p-1 shadow mt-1" style={{width:'245px', backgroundImage: 'linear-gradient(to bottom left,#515BD4, #9537B0, #DD2A7B, #FAAD4F)'}}>
                  <div className="d-flex w-100 justify-content-between text-white">
                    <div className="d-flex ms-2 fw-medium mt-2">Contact Instagram</div>
                    <div className="d-flex fs-2 btn" onClick={() => setInstagram(false)}><TiDelete /></div>
                  </div>
                  <div>
                    <img src="/imgFooter/igContact.png" alt="QR" width={200}/>
                  </div>
                </div>
              }{zalo &&
                <div className="position-absolute z-1 d-flex flex-column rounded-2 p-1 shadow mt-1" style={{width:'245px', backgroundColor: '#028FE3'}}>
                  <div className="d-flex w-100 justify-content-between text-white">
                    <div className="d-flex ms-2 fw-medium mt-2">Contact Zalo</div>
                    <div className="d-flex fs-2 btn" onClick={() => setZalo(false)}><TiDelete /></div>
                  </div>
                  <div>
                    <img src="/imgFooter/zlContact.png" alt="QR" width={200}/>
                  </div>
                </div>
              }{email &&
                <div className="position-absolute z-1 d-flex flex-column rounded-2 p-1 shadow mt-1" style={{width:'245px', backgroundImage: 'linear-gradient(red, yellow, green, blue',}}>
                  <div className="d-flex w-100 justify-content-between text-white">
                    <div className="d-flex ms-2 fw-medium mt-2">Contact Email</div>
                    <div className="d-flex fs-2 btn" onClick={() => setEmail(false)}><TiDelete /></div>
                  </div>
                  <div>
                    <img src="/imgFooter/ggContact.png" alt="QR" width={200}/>
                  </div>
                </div>
              }
            </div>
            <h6 className="mt-4" style={{fontSize:'17px'}}>Tải ứng dụng trên điện thoại</h6>
            <div className="mt-3 d-flex flex-r justify-content-between" style={{width: '220px'}}>
              <img src="/imgFooter/download1.png" alt="download" width={84}/>
              <div className="d-flex flex-column justify-content-between">
                <img src="/imgFooter/download2.png" alt="download" width={122}/>
                <img src="/imgFooter/download3.png" alt="download" width={122}/>
              </div>
            </div>
          </div>
        </div>
        <hr className="bg-secondary" style={{width: '1270px', height:'1.5px'}}></hr>
        <div className="d-flex h-50" style={{width:'1270px'}}>
          <div>
            <h5 style={{fontSize:'18px'}}>Công ty TNHH CI VI</h5>
            <div className="d-flex flex-column" style={{height:''}}>
              <div className="fw-medium text-secondary" style={{fontSize: '13px'}}>Tòa nhà số 54 đường Nguyễn Hành, Phường Khuê Trung, Quận Cẩm Lệ, Thành phố Đà Nẵng</div>
              <div className="fw-medium text-secondary" style={{fontSize: '13px'}}>Giấy chứng nhận đăng ký doanh nghiệp số 0309532909 do Sở Kế Hoạch và Đầu Tư Thành phố Đà Nẵng cấp lần đầu vào ngày 06/01/2020.</div>
              <div className="fw-medium text-secondary" style={{fontSize: '13px'}}>
                Hotline:
                <a className="text-primary link-primary link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover fw-medium" href="tel:0388 749 516"> 0388-749-516</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </footer>
  );
};

export default FooterForm;