import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu } from 'antd';
import { useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useWindowSize } from 'react-use';

const AdminSider = () => {
  const history = useHistory();
  const { width } = useWindowSize();
  const params = useParams();
  const handleKeyChange = useCallback(
    (e) => {
      history.push(`/admin/${e.key}`);
    },
    [history]
  );
  const menuMode = width > 992 ? 'inline' : 'horizontal';

  return (
    <Menu mode={menuMode} selectedKeys={params.mode} onClick={handleKeyChange}>
      <Menu.Item
        key="orders"
        icon={<FontAwesomeIcon icon="fa-solid fa-truck" />}
      >
        <span>Đơn hàng</span>
      </Menu.Item>
      <Menu.Item
        key="users"
        icon={<FontAwesomeIcon icon="fa-solid fa-users" />}
      >
        <span>Khách hàng</span>
      </Menu.Item>
      <Menu.Item
        key="products"
        icon={<FontAwesomeIcon icon="fa-solid fa-shirt" />}
      >
        <span>Sản phẩm</span>
      </Menu.Item>
    </Menu>
  );
};

export default AdminSider;
