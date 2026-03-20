import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const [active, setActive] = useState("");
  const [totalProducts, setTotalProducts] = useState(0);
  const [ordersToday, setOrdersToday] = useState(0);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {

    const token = localStorage.getItem("jwt");

  
    fetch("http://localhost:5454/api/sellers/products", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("SELLER PRODUCT " , data)
        setTotalProducts(data.length);
      })
      .catch((err) => console.error(err));


    
    fetch("http://localhost:5454/api/orders/user", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {

        console.log("Orders:", data);

        const today = new Date().toISOString().split("T")[0];

        
        const todayOrders = data.filter((order:any) =>
          order.orderDate.startsWith(today)
        );

        setOrdersToday(todayOrders.length);


        const revenue = data
          .filter((order:any) => order.paymentStatus === "COMPLETED")
          .reduce(
            (sum:number, order:any) => sum + order.totalSellingPrice,
            0
          );

        setTotalRevenue(revenue);


        const sortedOrders = [...data].sort(
          (a:any, b:any) =>
            new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
        );

        setRecentOrders(sortedOrders.slice(0, 3));

      })
      .catch((err) => console.error(err));

  }, []);


  const handleNavigate = (route:any, button:any) => {
    setActive(button);
    navigate(route);
  };


  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      {/* ===================== PAGE TITLE ===================== */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          Seller Dashboard
        </h1>
        <p className="text-gray-500 text-sm">
          Overview of your store performance
        </p>
      </div>


      {/* ===================== STATS ===================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white p-6 rounded-lg border hover:shadow-md transition">
          <p className="text-sm text-gray-500">Total Products</p>
          <h2 className="text-3xl font-bold mt-2 text-gray-800">
            {totalProducts}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-lg border hover:shadow-md transition">
          <p className="text-sm text-gray-500">Orders Today</p>
          <h2 className="text-3xl font-bold mt-2 text-gray-800">
            {ordersToday}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-lg border hover:shadow-md transition">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <h2 className="text-3xl font-bold mt-2 text-gray-800">
            ₹{totalRevenue}
          </h2>
        </div>

      </div>


      {/* ===================== QUICK ACTIONS ===================== */}
      <div className="bg-white border rounded-lg p-6 mb-10">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Quick Actions
        </h2>

        <div className="flex gap-4 flex-wrap">

          <button
            onClick={() => handleNavigate("/seller/add-product", "add")}
            className={`px-5 py-2 rounded-md ${
              active === "add"
                ? "bg-black text-white"
                : "border hover:bg-gray-100"
            }`}
          >
            Add Product
          </button>

          <button
            onClick={() => handleNavigate("/seller/orders", "orders")}
            className={`px-5 py-2 rounded-md ${
              active === "orders"
                ? "bg-black text-white"
                : "border hover:bg-gray-100"
            }`}
          >
            View Orders
          </button>

          <button
            onClick={() => handleNavigate("/seller/products", "products")}
            className={`px-5 py-2 rounded-md ${
              active === "products"
                ? "bg-black text-white"
                : "border hover:bg-gray-100"
            }`}
          >
            Manage Products
          </button>

        </div>
      </div>


      {/* ===================== RECENT ACTIVITY ===================== */}
      <div className="bg-white border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Activity
        </h2>

        <div className="space-y-4 text-sm text-gray-600">

          {recentOrders.map((order) => (
            <div key={order.id} className="flex justify-between border-b pb-2">

              <span>
                Order #{order.id} placed
              </span>

              <span className="text-gray-400">
                {new Date(order.orderDate).toLocaleString()}
              </span>

            </div>
          ))}

        </div>
      </div>

    </div>
  );
}

export default Dashboard;