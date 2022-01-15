import React from "react";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { BiUserCircle } from "react-icons/bi";
import "../../assets/css/navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_COUSTOMER_DATA,
  SHOW_LOGIN_POPUP,
} from "../../store/actions/CustomerReducerActions";
import { useHistory } from "react-router-dom";
// import { userLoggedInUtil } from "../../utils/CustomerUtils";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import { CLEAR_SELLER_DATA } from "../../store/actions/SellerReducerActions";

const NavbarComponent = () => {
  const Customer = useSelector((state) => state.CustomerReducer.customer);
  const Seller = useSelector((state) => state.SellerReducer.seller);
  const cartProducts = useSelector((state) => state.CartReducer.cart);
  // const [isUserLoggedIn, setIsUserLoggedIn] = useState();
  const history = useHistory();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   setIsUserLoggedIn(userLoggedInUtil());
  // }, []);

  const customerDetailsFulfilled = (customer) => {
    const isCustomerSignedIn = Object.keys(customer).length > 0;
    return isCustomerSignedIn;
  };

  const handleRedirectToCart = () => {
    if (customerDetailsFulfilled(Customer)) {
      history.push("/cart");
    } else {
      dispatch(SHOW_LOGIN_POPUP());
    }
  };

  const promptUserToSignIn = () => {
    return dispatch(SHOW_LOGIN_POPUP());
  };

  const handleLogOut = () => {
    window.localStorage.removeItem("Authorization");
    window.localStorage.removeItem("customerData");
    window.localStorage.removeItem("sellerData");
    dispatch(CLEAR_COUSTOMER_DATA());
    dispatch(CLEAR_SELLER_DATA());
    history.push("/");
    window.location.reload();
  };
  return (
    <Navbar className="fixed-top navbar_main" collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand>
          <Link className="brand_name" to="/">
            <b>APNI DUKAAN</b>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link
                className="text-decoration-none text-secondary"
                to="/category"
              >
                CATEGORY
              </Link>
            </Nav.Link>
            {/* <Nav.Link href="#pricing">
              <Link
                className="text-decoration-none text-secondary"
                to="/best-rated"
              >
                BEST RATED
              </Link>
            </Nav.Link> */}
          </Nav>
          <Nav>
            <NavDropdown
              title={<BiUserCircle className="cart-icon" size="30" />}
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item>
                <Link
                  style={{ textDecoration: "none" }}
                  className="text-dark"
                  to="/profile"
                >
                  My Profile
                </Link>
              </NavDropdown.Item>
              {!Seller.sellerId ? (
                <NavDropdown.Item>
                  <Link
                    style={{ textDecoration: "none" }}
                    className="text-dark"
                    to="/my-orders"
                  >
                    My Orders
                  </Link>
                </NavDropdown.Item>
              ) : (
                <NavDropdown.Item>
                  <Link
                    style={{ textDecoration: "none" }}
                    className="text-dark"
                    to="/my-products"
                  >
                    My Products
                  </Link>
                </NavDropdown.Item>
              )}

              {/* <NavDropdown.Item>My Wishlist</NavDropdown.Item> */}
              <NavDropdown.Divider />
              <NavDropdown.Item className="text-left text-dark">
                {Customer.customerId || Seller.sellerId ? (
                  <Button
                    onClick={handleLogOut}
                    className="bg-transparent text-dark border-0 w-100"
                  >
                    LOG OUT&nbsp;
                    <FiLogOut />
                  </Button>
                ) : (
                  <Button
                    onClick={promptUserToSignIn}
                    className="bg-transparent text-dark border-0 w-100"
                  >
                    SIGN IN&nbsp;
                    <FiLogIn />
                  </Button>
                )}
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link>
              {!Seller.sellerId ? (
                <button
                  onClick={handleRedirectToCart}
                  className="bg-transparent text-dark border-0"
                >
                  <div className="basket">
                    <FiShoppingCart className="cart-icon" size="30" />
                    {cartProducts.length ? (
                      <span>{cartProducts.length}</span>
                    ) : null}
                  </div>
                </button>
              ) : (
                <Link to="/product-register">
                  <Button className="rounded-0 border-0" variant="dark">
                    ADD PRODUCT
                  </Button>
                </Link>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
