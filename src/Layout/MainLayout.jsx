import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Layout, Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { adminActions } from '../Redux/admin';
import { authActions } from '../Redux/auth';
import { userActions } from '../Redux/user';

const { Header, Footer } = Layout;

const MainLayout = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.user);
  const isAdmin = user.isAdmin;
  const cartCount = useSelector((store) => store.user.cart.items.length);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleUserClick = () => {
    history.push('/user');
  };
  const handleSignout = () => {
    dispatch(authActions.signOut());
    dispatch(userActions.signout());
    dispatch(adminActions.signOut());
    history.push('/login');
  };
  return (
    <Layout className="min-vh-100">
      <Header>
        <div className="header__logo">
          <NavLink to="/home">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="3023"
              height="547"
              viewBox="0 0 3023 547"
              fill="none"
            >
              <path
                d="M2643.9 8.39999H2545.2C2538.4 8.39999 2535.3 12.2 2533.1 15.2L2427.7 170.7L2322.3 15.3C2320 12.3 2316.2 8.49999 2310.2 8.49999H2211.6C2199.5 8.49999 2193.4 20.6 2199.5 30.5L2367.2 283.9V525C2367.2 533 2373.6 539.4 2381.6 539.4H2471.9C2479.8 539.1 2486.1 532.8 2486.3 525V283L2656.2 30.4C2662.2 20.6 2656.1 8.39999 2643.9 8.39999Z"
                fill="black"
              ></path>
              <path
                d="M2869.3 217C2809.4 192.7 2786.6 171.5 2786.6 143.4C2786.6 122.9 2807.1 104.7 2834.4 104.7C2880.7 104.7 2936 146.4 2942.9 150.2C2949.7 155.5 2963.4 148.7 2968.7 140.3L3007.4 81.9C3010.4 76.6 3012 62.9 3002.8 57.6C2980 40.9 2919.4 0.700012 2840.5 0.700012C2723.7 0.700012 2665.3 76.5 2665.3 151.7C2665.3 242.7 2747.2 293.6 2812.5 319.4C2864.1 339.9 2890.6 364.2 2890.6 396C2890.6 422.5 2868.6 441.5 2838.3 441.5C2788.2 441.5 2733.6 401.3 2730.6 399.8C2725.3 396 2710.9 394.5 2704.8 404.3L2669.2 467.3C2663.1 477.9 2665.4 481 2673 488.5C2690.4 505.9 2745.1 546.9 2843.7 546.9C2955.2 546.9 3022.7 468 3022.7 389.9C3022.6 286.8 2928.5 240.6 2869.3 217Z"
                fill="black"
              ></path>
              <path
                d="M272.3 0.899994C120.6 0.899994 0 123 0 274.7C0 426.4 120.6 547 272.3 547C424 547 545.4 426.4 545.4 274.7C545.4 123 424 0.899994 272.3 0.899994ZM272.3 425.6C189.6 425.6 121.3 357.3 121.3 274.6C121.3 191.2 189.6 122.1 272.3 122.1C355.7 122.1 424 191.1 424 274.6C424 357.4 355.8 425.6 272.3 425.6Z"
                fill="black"
              ></path>
              <path
                d="M2008.9 9.19999C2006.6 4.69999 2001.3 0.899994 1996 0.899994H1988.4C1983.1 0.899994 1977.8 4.69999 1975.5 9.19999L1738.1 519.7C1733.5 529.6 1739.6 539.4 1751 539.4H1834.4C1849.6 539.4 1857.9 530.3 1861.7 521.2L1889 460.6H2095.3L2122.6 520.5C2129.4 534.9 2135.5 539.5 2149.2 539.5H2233.4C2244.8 539.5 2250.8 529.6 2246.3 519.8L2008.9 9.19999ZM1934.6 357.4L1991.5 232.2H1992.3L2049.9 357.4H1934.6Z"
                fill="black"
              ></path>
              <path
                d="M1639.4 536.4L1782.8 26.6C1785.8 16 1779.8 8.39999 1769.2 8.39999H1680.4C1674.3 8.39999 1668.3 13.7 1666.7 19L1601.5 276.2H1598.5L1480.9 9.19999C1479.4 4.69999 1474.8 0.899994 1468 0.899994H1454.3C1448.8 0.999994 1443.7 4.19999 1441.4 9.19999L1323.8 276.2H1320.8L1255.7 19C1254.2 13.7 1248.1 8.39999 1242 8.39999H1153.2C1142.6 8.39999 1136.5 16 1139.5 26.6L1282.9 536.4C1284.6 542.6 1290.2 546.9 1296.6 547H1308.7C1314 547 1319.3 543.2 1321.6 538.7L1459.7 228.4H1462L1600.8 538.7C1603.1 543.2 1608.4 547 1613.7 547H1625.8C1632.2 546.8 1637.7 542.5 1639.4 536.4Z"
                fill="black"
              ></path>
              <path
                d="M1061.3 547C1068.9 547 1075.7 540.9 1075.7 533.3V22.9C1075.4 15 1069.1 8.69999 1061.3 8.49999H970.3C962.3 8.49999 955.9 15 955.9 22.9V292.2H955.1L652.5 0.899994H633.5C625.9 0.899994 619.1 6.99999 619.1 14.5L619.9 525C619.9 532.6 626.7 539.4 634.3 539.4H724.6C732.6 539.4 739 533 739 525V242H739.8L1039.4 543.2C1040.9 544.7 1047 547 1049.3 547H1061.3Z"
                fill="black"
              ></path>
            </svg>
          </NavLink>
        </div>
        <Menu mode="horizontal">
          <Menu.Item key="home">
            <NavLink
              activeClassName="nav-link--active"
              className="mont bold"
              to="/home"
            >
              Trang chủ
            </NavLink>
          </Menu.Item>
          <Menu.Item key="products">
            <NavLink
              activeClassName="nav-link--active"
              className="mont bold"
              to="/products"
            >
              Sản phẩm
            </NavLink>
          </Menu.Item>
          {isAdmin && (
            <Menu.Item key="admin">
              <NavLink
                activeClassName="nav-link--active"
                className="mont bold"
                to="/admin"
              >
                Quản lý
              </NavLink>
            </Menu.Item>
          )}
          {isLoggedIn ? (
            <Menu.SubMenu
              key="user"
              title={user.firstName + ' ' + user.lastName}
              icon={<FontAwesomeIcon icon="fa-solid fa-user-large" />}
              onTitleClick={handleUserClick}
              style={{ marginLeft: 'auto' }}
            >
              <Menu.Item key="profile">
                <NavLink
                  activeClassName="nav-link--active"
                  className="mont bold"
                  to="/user/profile"
                >
                  Tài khoản của tôi
                </NavLink>
              </Menu.Item>
              <Menu.Item key="orders">
                <NavLink
                  activeClassName="nav-link--active"
                  className="mont bold"
                  to="/user/orders"
                >
                  Đơn mua
                </NavLink>
              </Menu.Item>
              <Menu.Item key="wish">
                <NavLink
                  activeClassName="nav-link--active"
                  className="mont bold"
                  to="/user/wish"
                >
                  Yêu thích
                </NavLink>
              </Menu.Item>
              <Menu.Item key="signOut" onClick={handleSignout}>
                <span className="mont bold">Đăng xuất</span>
              </Menu.Item>
            </Menu.SubMenu>
          ) : (
            <Menu.Item key="login" style={{ marginLeft: 'auto' }}>
              <NavLink className="mont bold" to="/login">
                Đăng nhập | Đăng ký
              </NavLink>
            </Menu.Item>
          )}
          <Menu.Item key="cart">
            <NavLink
              className="mont bold"
              to={`${isLoggedIn ? '/cart' : '/login'}`}
            >
              <Badge count={cartCount} size="small">
                <FontAwesomeIcon icon="fa-solid fa-cart-shopping" size="md" />
              </Badge>
            </NavLink>
          </Menu.Item>
        </Menu>
      </Header>
      {props.children}
      <Footer style={{ textAlign: 'center' }}>Onways ©2021</Footer>
    </Layout>
  );
};

export default MainLayout;
