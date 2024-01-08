import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";


// component=====>
import { CartModal } from "./cartModal";

export function InovationProducts() {

  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [cookies, setCookies, removeCookies] = useCookies(['userID']);
  const [cartProduct, setCartProduct] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Create variable for dynamic navigation ===========>
  let navigate = useNavigate();

  // function for load all products at the time of page loading======>
  function loadproduct() {
    axios.get('https://dummyjson.com/products')
      .then(res => {
        setProduct(res.data.products);
      })
  }

  // function for load  Categoty wise product when user changes in select menu=====>
  function loadCategoryProduct(e) {
    // console.log(e.target.value);

    if (e.target.value === "All") {
      axios.get('https://dummyjson.com/products')
        .then(res => {
          setProduct(res.data.products);
        })
    }
    else {
      axios.get(`https://dummyjson.com/products/category/${e.target.value}`)
        .then(res => {
          setProduct(res.data.products);
        })
    }
  }

  // function for loading all categories in select Menu==========>
  function loadCategory() {
    axios.get('https://dummyjson.com/products/categories')
      .then(res => {
        res.data.unshift("All");
        setCategory(res.data);
      });
  }

  // function for when user click logout button======>
  function handleLogout() {
    removeCookies('userID');
    navigate("/");
  }

  // function for Add product in cart ===========>
  function handleAddProduct(e) {
    axios.get(`https://dummyjson.com/products/${e.target.value}`)
      .then(res => {
        var AvailableID = cartProduct.find(product => product.id === res.data.id);

        if (AvailableID == null) {
          cartProduct.push(res.data);
          setCartProduct([...cartProduct]);
        }
        else if (AvailableID.id == res.data.id) {
          alert("Product already added in Cart");
        }
      })
  }

  // function for close Modal ======>
  function handleClose() {
    setShowModal(false);
  }

  // function for filltering by price=====>
  function priceClick(e) {
    axios.get('https://dummyjson.com/products')
      .then((res) => {
        if (e.target.id == "price1") {
          setProduct(res.data.products.filter(val=>val.price>=1&&val.price<=100));
        }
        if (e.target.id == "price2") {
          setProduct(res.data.products.filter(val=>val.price>=101&&val.price<=1000));
        }
        if (e.target.id == "price3") {
          setProduct(res.data.products.filter(val=>val.price>=1001&&val.price<=10000));
        }
      })
  }


  // function for serach product when user give input in search box====>
  function loadCategoryProductOnSearch(e){
    axios.get(`https://dummyjson.com/products/search?q=${e.target.value}`)
    .then(res=>{
        setProduct(res.data.products);
    })
  }

  // function for Mounting==========>
  useEffect(() => {
    if (cookies.userID == null) {
      navigate('/login');
    }
    loadproduct();
    loadCategory();
  }, []);

  return (
    <>

      <div className="bg-slate-800 pt-1">
        <div className="flex justify-center mt-2">
          <select className="rounded-l-lg w-24 bg-yellow-300" onChange={loadCategoryProduct}>
            {
              category.map(category =>
                <option key={category} className="bg-white w-fit ps-2" value={category}>{category.toUpperCase()}</option>
              )
            }
          </select>
          <input className=" p-1 w-96" type="text" placeholder="Search Your Items" onKeyUp={loadCategoryProductOnSearch} />
          <button className="bi bi-search bg-yellow-300 p-2 rounded-r-lg border"></button>
        </div>
        <div className="flex justify-end mt-3">
          <p className="text-white me-2"><i className="bi bi-person text-xl"></i>Welcome!&nbsp;{cookies.userID}</p><button onClick={handleLogout} className="rounded text-2xl bi bi-power text-red-600" title="Logout"></button>
          <button type="button" title="Cart" className="bi bi-cart4 me-2 relative inline-flex items-center p-2 text-xl font-medium text-center text-white rounded-lg focus:ring-1 focus:outline-none focus:ring-blue-300"
            onClick={() => setShowModal(true)}
          >
            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-1 dark:border-gray-900">{cartProduct.length}</div>
          </button>
        </div>
      </div>
      {/* carousel start */}
      <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="resource/images/c4.webp" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="resource/images/c5.webp" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="resource/images/c6.webp" className="d-block w-100" alt="..." />
          </div>
        </div>
        {/* <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button> */}
      </div>
      {/* carousel End */}
      <CartModal onClose={handleClose} visible={showModal} data={cartProduct} />

      <div className="container row mt-3">
        <div className="md:col-2 col-3 border rounded-lg p-2 h-fit" >
          <div>
            <h5 className="text-xl font-semibold">Price</h5>
            <div className="border-1 border-slate-500 rounded-lg mt-2 p-1 font-semibold">
              <input onClick={priceClick} className="text-lg" name="price" type="radio" id="price1" />
              <label htmlFor="price1">Price 0/- to 100/-</label>
            </div>
            <div className="border-1 border-slate-500 rounded-lg mt-2 p-1 font-semibold">
              <input onClick={priceClick} className="text-lg" name="price" type="radio" id="price2" />
              <label htmlFor="price2">Price 101/- to 1000/-</label>
            </div>
            <div className="border-1 border-slate-500 rounded-lg mt-2 p-1 font-semibold">
              <input onClick={priceClick} className="text-lg" name="price" type="radio" id="price3" />
              <label htmlFor="price3">Price 1001/- to 10000/-</label>
            </div>
          </div>
        </div>
        <div className="md:col-10 col-9 flex justify-evenly flex-wrap">
          {
            product.map(item =>
              <div key={item.id} className="border border-gray-500 rounded-md mt-3" style={{ width: "320px", height: "" }}>
                <div>
                  <p className="text-center text-lg font-semibold py-1 ">{item.title}</p>
                </div>
                <div>
                  <Link><img className="mt-2" src={item.thumbnail} alt="pic" style={{ height: "250px", width: "350px", objectFit: "cover" }} /></Link>
                </div>
                <div className="flex justify-around py-2">
                  <p className="font-semibold"><span>&#8377;</span>{item.price}/-</p>
                  <div>
                    <div>
                      <span>Reviews: 4,212</span>
                    </div>
                    <div>
                      Rating:
                      <span className="me-1 text-yellow-500 bi bi-star-fill"></span>
                      <span className="me-1 text-yellow-500 bi bi-star-fill"></span>
                      <span className="me-1 text-yellow-500 bi bi-star-fill"></span>
                      <span className="me-1 bi bi-star"></span>
                      <span className="me-1 bi bi-star"></span>
                    </div>
                  </div>
                </div>
                <div className="p-1">
                  <button key={item.id} value={item.id} onClick={handleAddProduct} className="w-full rounded-lg bg-yellow-500 p-2 bi bi-cart4 font-semibold">Add Cart</button>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}