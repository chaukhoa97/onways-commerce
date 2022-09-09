import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu } from 'antd';
import { useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useWindowSize } from 'react-use';

const UserSider = () => {
  const history = useHistory();
  const { width } = useWindowSize();
  const params = useParams();
  const handleKeyChange = useCallback(
    (e) => {
      history.push(`/user/${e.key}`);
    },
    [history]
  );
  const menuMode = width > 992 ? 'inline' : 'horizontal';

  return (
    <Menu
      mode={menuMode}
      selectedKeys={[params.mode]}
      onClick={handleKeyChange}
    >
      <Menu.Item
        key="profile"
        icon={<FontAwesomeIcon icon="fa-solid fa-user" />}
      >
        <span>Thông tin</span>
      </Menu.Item>
      <Menu.Item
        key="address"
        icon={<FontAwesomeIcon icon="fa-solid fa-map-location-dot" />}
      >
        <span>Địa chỉ</span>
      </Menu.Item>
      <Menu.Item
        key="orders"
        icon={<FontAwesomeIcon icon="fa-solid fa-cart-shopping" />}
      >
        <span>Đơn hàng</span>
      </Menu.Item>
      <Menu.Item key="wish" icon={<FontAwesomeIcon icon="fa-solid fa-heart" />}>
        <span>Yêu thích</span>
      </Menu.Item>
    </Menu>
  );
};

export default UserSider;
