const express = require('express');
const router = express.Router();

let dataUsers = [
  {username: 'nguyenvanA', password: '1234567'},
  {username: 'levanchi', password: 'vanchi123'},
];

let dataAdmin = [
  {adminname: 'admin', password: '12345678'},
  {adminname: 'admin2', password: '87654321'},
]

  // API lấy tất cả các sản phẩm
  router.get('/manage-admin', (req, res) => {
    res.json(dataAdmin);
    // res.json(dataUsers);
  });
  
  // API Login
  router.post('/', (req, res) => {
    const { username, password } = req.body;
    
    const user = dataUsers.find((u) =>
      u.username === username && u.password === password
    )
    console.log(user);
    const admin = dataAdmin.find((ad) => 
      ad.adminname === username && ad.password === password
    )

    if (user) {
      return res.status(200).json({message: 'Login thành công!'});
    }else if (admin) {
      return res.status(201).json({message: 'Login thành công!'})
    }
    else {
      return res.status(400).json({message: 'Sai tài khoản hoặc mật khẩu'});
    }
  
  });

  // API Signup
  router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    console.log(username.length);

    if (username.length > 16) {
      return res.status(401).json({message: 'Username ít nhất 16 kí tự'})
    } else if (password.length < 8) {
      return res.status(402).json({message: 'Password nhiều hơn 8 kí tự'})
    }else {
      const newUsers = req.body;
      dataUsers.push(newUsers);
      return res.status(201).json({message: 'Signup thành công'})
    }

  });
 
module.exports = router;