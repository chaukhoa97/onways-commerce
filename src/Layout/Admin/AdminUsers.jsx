import { Button, Divider, Modal, Table } from 'antd';
import _ from 'lodash';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminActions } from '../../Redux/admin';

const AdminUsers = () => {
  const dispatch = useDispatch();
  const [showDelete, setshowDelete] = useState();
  const [deleteUserId, setDeleteUserId] = useState();

  const handleDeleteButton = useCallback((id) => {
    setshowDelete(true);
    setDeleteUserId(id);
  }, []);

  const handleCancelDelete = useCallback(() => {
    setshowDelete(false);
  }, []);

  const handleConfirmDelete = useCallback(
    (id) => {
      dispatch(adminActions.deleteUser(id));
      setshowDelete(false);
    },
    [dispatch]
  );

  const calcOrderSpent = (orders = []) => {
    if (!Array.isArray(orders)) return 0;
    return orders.map((order) => {
      return order.items.reduce((acc, item) => {
        return acc + item.data.price * item.data.count;
      }, 0);
    });
  };

  const calcUserSpent = (spents = []) => {
    if (!Array.isArray(spents)) return 0;
    return _.round(
      spents.reduce((acc, spent) => {
        return acc + spent;
      }, 0),
      2
    );
  };

  const users = [
    ...useSelector((state) => state.admin.users).filter(
      (user) => user.isAdmin === false
    ),
  ];
  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
    },
    {
      title: 'Tên',
      dataIndex: 'firstName',
      key: 'firstName',
      align: 'center',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center',
    },
    {
      title: 'Tiền đã mua',
      dataIndex: 'orders',
      key: 'totalSpent',
      align: 'center',
      sorter: (a, b) =>
        calcUserSpent(calcOrderSpent(a.orders)) -
        calcUserSpent(calcOrderSpent(b.orders)),
      render: (orders) => {
        return (
          <p className="price mb-0">{calcUserSpent(calcOrderSpent(orders))}</p>
        );
      },
    },
    {
      title: 'Thao tác',
      dataIndex: 'id',
      key: 'delete',
      align: 'center',
      render: (id) => (
        <Button onClick={() => handleDeleteButton(id)} danger>
          XÓA
        </Button>
      ),
    },
  ];
  return (
    <div className="p-md-4">
      <h1 className="bold" style={{ color: '#3d56b2' }}>
        Quản lý khách hàng
      </h1>
      <Divider />
      <Table
        columns={columns}
        dataSource={users}
        bordered
        scroll={{ x: 500 }}
      />
      <Modal
        visible={showDelete}
        title="Xóa đơn hàng"
        footer={[
          <Button key="cancel" onClick={handleCancelDelete}>
            Hủy
          </Button>,
          <Button
            key="confirm"
            type="primary"
            onClick={() => handleConfirmDelete(deleteUserId)}
          >
            Đồng ý
          </Button>,
        ]}
      >
        <p>Bạn có chắc muốn xóa khách hàng này chứ?</p>
      </Modal>
    </div>
  );
};

export default AdminUsers;
