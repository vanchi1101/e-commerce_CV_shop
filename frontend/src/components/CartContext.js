// import React, { createContext, useState, useContext} from "react";

// const CartContext = createContext();

// // Tạo Provider để bao quanh ứng dụng
// export const CartProvider = ({ children }) => {
//     const [quantityItemInCart, setQuantityItemInCart] = useState(0);

//     const addCartItems = (product) => {
//         setQuantityItemInCart((prev) => prev + 1);
//     }

//     return (
//         <CartContext.Provider value={{ quantityItemInCart, addCartItems}}>
//             {children}
//         </CartContext.Provider>
//     )
// };

// // Custom hook để sử dụng context
// export const useCart = () => {
//     return useContext(CartContext)
// }