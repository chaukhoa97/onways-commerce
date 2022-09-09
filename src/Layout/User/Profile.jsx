import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Descriptions, Space, Spin } from 'antd';
import _ from 'lodash';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Edit from './Edit';

function Profile() {
  const user = useSelector((state) => state.user);
  const orders = user.orders;
  const [isEdit, setIsEdit] = useState(false);
  const handleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  const orderItems = orders.map((order) => {
    return order.items.reduce((acc, item) => {
      return acc + item.data.count;
    }, 0);
  });

  const totalItems = orderItems.reduce((acc, item) => {
    return acc + item;
  }, 0);

  const orderSpents = orders.map((order) => {
    return order.items.reduce((acc, item) => {
      return acc + item.data.price * item.data.count;
    }, 0);
  });

  const totalSpent = _.round(
    orderSpents.reduce((acc, item) => {
      return acc + item;
    }, 0),
    2
  );

  const genderLabels = {
    male: 'Nam',
    female: 'Nữ',
    others: 'Khác',
  };

  return user.localId.length === 0 ? (
    <div className="d-flex justify-content-center">
      <Spin size="large" />
    </div>
  ) : !isEdit ? (
    <div className="bg-white p-4 m-4 shadow">
      <Space direction="vertical" size="large">
        <Descriptions title="Thông tin người dùng">
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
          <Descriptions.Item label="Tên">{user.firstName}</Descriptions.Item>
          <Descriptions.Item label="Họ">{user.lastName}</Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">
            {user.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Giới tính">
            {_.get(genderLabels, `${user.gender}`)}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions title="Thống kê" bordered layout="vertical">
          <Descriptions.Item label="Tổng số đơn hàng">
            {user.orders.length}
          </Descriptions.Item>
          <Descriptions.Item label="Tổng số tiền đã chi">
            ${totalSpent}
          </Descriptions.Item>
          <Descriptions.Item label="Số món hàng đã mua">
            {totalItems}
          </Descriptions.Item>
        </Descriptions>
        <div className="d-flex justify-content-center">
          <Button
            size="large"
            type="primary"
            onClick={() => handleEdit()}
            icon={
              <FontAwesomeIcon
                icon="fa-solid fa-user-pen"
                size="md"
                className="me-2"
              />
            }
          >
            Cập nhật thông tin
          </Button>
        </div>
      </Space>
    </div>
  ) : (
    <Edit
      onCancel={() => {
        setIsEdit(false);
      }}
      onConfirm={handleEdit}
      firstName={user.firstName}
      lastName={user.lastName}
      phone={user.phone}
      gender={user.gender}
    ></Edit>
  );
}

export default Profile;
