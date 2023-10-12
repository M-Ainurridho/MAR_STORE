export const dummy = [
   {
      id: 1,
      name: "Asus ROG X1-IU",
      brand: "asus",
      category: "computers",
      sub_category: "laptop",
      image: "laptop1.jpg",
      price: "85000000",
      stock: 10,
      discount: 2,
   },
   {
      id: 2,
      name: "Alienware ZS-252",
      brand: "dell",
      category: "computers",
      sub_category: "laptop",
      image: "laptop2.jpg",
      price: "45000000",
      stock: 25,
      discount: 5,
   },
   {
      id: 3,
      name: "Axioo D-123",
      brand: "axioo",
      category: "computers",
      sub_category: "laptop",
      image: "laptop3.jpg",
      price: "2500000",
      stock: 50,
      discount: 0,
   },
   {
      id: 4,
      name: "Omen FX-351",
      brand: "hp",
      category: "computers",
      sub_category: "laptop",
      image: "laptop4.jpg",
      price: "20500000",
      stock: 29,
      discount: 10,
   },
   {
      id: 5,
      name: "Xiaomi A-17",
      brand: "xiaomi",
      category: "computers",
      sub_category: "smartphone",
      image: "smartphone1.jpg",
      price: "2000000",
      stock: 99,
      discount: 0,
   },
   {
      id: 6,
      name: "Asus Z-20",
      brand: "asus",
      category: "computers",
      sub_category: "smartphone",
      image: "smartphone2.jpg",
      price: "3000000",
      stock: 99,
      discount: 13,
   },
   {
      id: 7,
      name: "Iphone 14 Pro Max",
      brand: "apple",
      category: "computers",
      sub_category: "smartphone",
      image: "smartphone3.jpg",
      price: "16000000",
      stock: 99,
      discount: 5,
   },
   {
      id: 8,
      name: "Itel XS-11",
      brand: "itel",
      category: "computers",
      sub_category: "smartphone",
      image: "smartphone4.jpg",
      price: "1500000",
      stock: 99,
      discount: 0,
   },
];

// export const menus = {
//    Admin: ["Dashboard", "Products", "Payments"],
//    Menu: ["Menu Management", "Submenu Management"],
// };

export const menus = {
   Administrator: [
      {
         name: "Dashboard",
         icon: "bx bxs-dashboard",
         link: "/admin",
      },
      {
         name: "Payments",
         icon: "bx bxs-credit-card",
         link: "/admin/payment",
      },
      {
         name: "Profile",
         icon: "bx bxs-user",
         link: "/admin/profile",
      },
      {
         name: "Change Password",
         icon: "bx bxs-key",
         link: "/admin/changepassword",
      },
   ],
   Menu: [
      {
         name: "Menu Management",
         icon: "bx bxs-folder",
         link: "/admin/menu_management",
      },
      {
         name: "Submenu Management",
         icon: "bx bxs-folder-open",
         link: "/admin/submenu",
      },
   ],
   "": [
      {
         name: "Log out",
         icon: "bx bx-power-off",
         link: "/auth/signout",
      },
   ],
};