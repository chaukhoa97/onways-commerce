import { Button, Divider, Modal, Table, Select } from 'antd';
import _ from 'lodash';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminActions } from '../../Redux/admin';
import { handleItemsDetail } from '../User/Orders';

const AdminOrders = () => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.admin.orders);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const handleDeleteButton = useCallback((id) => {
    setShowDelete(true);
    setDeleteItemId(id);
  }, []);

  const handleCancelDelete = useCallback(() => {
    setShowDelete(false);
  }, []);

  const handleConfirmDelete = useCallback(
    (id) => {
      dispatch(adminActions.deleteOrder(id));
      setShowDelete(false);
    },
    [dispatch]
  );

  const handleStatus = useCallback(
    (value, id) => {
      dispatch(adminActions.updateOrder({ status: value, id }));
    },
    [dispatch]
  );

  const columns = [
    {
      title: 'Trạng thái',
      dataIndex: 'id',
      key: 'status',
      align: 'center',
      render: (id) => {
        const status = orders[orders.findIndex((o) => o.id === id)].status;
        const options = [
          {
            value: '0',
            label: 'Chờ xác nhận',
          },
          {
            value: '1',
            label: 'Đã xác nhận',
          },
          {
            value: '2',
            label: 'Đang giao hàng',
          },
          {
            value: '3',
            label: 'Hoàn tất',
          },
        ];
        return (
          <Select
            style={{ width: '100%' }}
            defaultValue={
              options[_.findIndex(options, (o) => o.value == status)].label
            }
            onChange={(value) => handleStatus(value, id)}
          >
            {options.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        );
      },
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'time',
      key: 'time',
      align: 'center',
      render: (time) => {
        return new Date(time).toLocaleString();
      },
    },
    {
      title: 'Tài khoản đặt',
      dataIndex: 'orderAccount',
      key: 'orderAccount',
      align: 'center',
    },
    {
      title: 'Người nhận',
      dataIndex: 'address',
      key: 'receiver',
      align: 'center',
      render: (address) => {
        return (
          <>
            <p className="bold">{address.name}</p>
            <p>{address.phone}</p>
            <p>{address.detail}</p>
          </>
        );
      },
    },
    {
      title: 'Số tiền',
      dataIndex: 'items',
      key: 'total',
      align: 'center',
      render: (items) => (
        <p className="mb-0 bold" style={{ color: '#3d56b2' }}>
          {_.round(
            _.sumBy(items, (item) => item.data.price),
            2
          )}
        </p>
      ),
    },
    {
      title: 'Cách thanh toán',
      dataIndex: 'payment',
      key: 'payment',
      align: 'center',
      render: (payment) => {
        if (payment === 'cash') {
          return 'Tiền mặt';
        }
        if (payment === 'card') {
          return 'Thẻ tín dụng';
        }
        if (payment === 'momo') {
          return 'Momo';
        }
      },
    },
    {
      title: 'Chi tiết',
      dataIndex: 'items',
      key: 'order detail',
      align: 'center',
      render: (items) => (
        <Button onClick={() => handleItemsDetail(items)}>XEM</Button>
      ),
    },
    {
      title: 'Thao tác',
      dataIndex: 'id',
      key: 'delete',
      align: 'center',
      render: (id) => (
        <Button danger onClick={() => handleDeleteButton(id)}>
          XÓA
        </Button>
      ),
    },
  ];

  return (
    <div className="p-md-4">
      <h1 className="bold" style={{ color: '#3d56b2' }}>
        Quản lý đơn hàng
      </h1>
      <Divider />
      <Table
        columns={columns}
        dataSource={orders}
        bordered
        scroll={{ x: 1000 }}
        pagination={{ pageSize: 4 }}
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
            onClick={() => handleConfirmDelete(deleteItemId)}
          >
            Đồng ý
          </Button>,
        ]}
      >
        <p>Bạn có chắc muốn xóa đơn hàng chứ?</p>
      </Modal>
    </div>
  );
};

export default AdminOrders;
