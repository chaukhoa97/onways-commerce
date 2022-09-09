import { Button, Divider, Modal, Table, Tooltip } from 'antd';
import _ from 'lodash';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../Redux/user';
import { adminActions } from '../../Redux/admin';

export const handleItemsDetail = (items) => {
  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'data',
      key: 'title & image',
      align: 'center',
      render: (data) => (
        <div className="d-flex align-items-center">
          <img
            src={data.image}
            alt="product image"
            style={{ width: '50px', marginRight: '10px' }}
          />
          <p className="mb-0 ms-2 bold">{data.title}</p>
        </div>
      ),
    },
    {
      title: 'Giá',
      dataIndex: ['data', 'price'],
      key: 'price',
      render: (price) => <p className="price mb-0">{price}</p>,
    },
    {
      title: 'Số lượng',
      dataIndex: ['data', 'count'],
      key: 'count',
    },
  ];
  Modal.info({
    title: 'Chi tiết đơn hàng',
    width: '80%',
    content: (
      <Table
        dataSource={items}
        columns={columns}
        pagination={false}
        scroll={{ x: 300 }}
      />
    ),
  });
};

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.user.orders);
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
      dispatch(userActions.deleteOrder(id));
      dispatch(adminActions.deleteOrder(id));
      setShowDelete(false);
    },
    [dispatch]
  );

  const columns = [
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status) => {
        if (status == 0) {
          return <span style={{ color: '#FF0000' }}>Chờ xác nhận</span>;
        } else if (status == 1) {
          return <span style={{ color: '#2db7f5' }}>Đã xác nhận</span>;
        } else if (status == 2) {
          return <span style={{ color: '#0000FF' }}>Đang giao hàng</span>;
        } else if (status == 3) {
          return <span style={{ color: '#87d068' }}>Hoàn tất</span>;
        }
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
      render: (id) => {
        const status = orders[orders.findIndex((o) => o.id === id)].status;
        return status >= 1 ? (
          <Tooltip title="Bạn không thể hủy những đơn hàng đã được xác nhận">
            <Button danger disabled onClick={handleDeleteButton}>
              Xóa
            </Button>
          </Tooltip>
        ) : (
          <Button danger onClick={() => handleDeleteButton(id)}>
            XÓA
          </Button>
        );
      },
    },
  ];

  return (
    <div className="p-md-4">
      <h1 className="bold" style={{ color: '#3d56b2' }}>
        Đơn hàng của tôi
      </h1>
      <Divider />
      <Table
        columns={columns}
        dataSource={orders}
        pagination={false}
        rowKey="id"
        bordered
        scroll={{ x: 700 }}
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

export default Orders;
