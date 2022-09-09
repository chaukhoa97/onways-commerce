import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Divider, Image, Modal, Space, Table } from 'antd';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductForm from '../../Components/ProductForm';
import { itemsActions } from '../../Redux/items';

const AdminProducts = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const dispatch = useDispatch();
  const databaseItems = useSelector((state) => state.items.databaseItems);
  const [showDelete, setShowDelete] = useState(false);
  const [currentUpdateItemId, setCurrentUpdateItemId] = useState(null);
  const currentUpdateItem = databaseItems.find(
    ({ id }) => id === currentUpdateItemId
  );

  const handleDeleteButton = useCallback((id) => {
    setShowDelete(true);
    setCurrentUpdateItemId(id);
  }, []);

  const handleCancelDelete = useCallback(() => {
    setShowDelete(false);
  }, []);

  const handleUpdateButton = useCallback((id) => {
    setShowUpdateForm(true);
    setCurrentUpdateItemId(id);
  }, []);

  const handleConfirmDelete = useCallback(
    (id) => {
      dispatch(itemsActions.delete(id));
      setShowDelete(false);
    },
    [dispatch]
  );

  const handleCancelUpdate = useCallback(() => {
    setShowUpdateForm(false);
  }, []);

  const onCancelAdd = useCallback(() => {
    setShowAddForm(false);
  }, []);

  const columns = [
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      align: 'center',
      render: (image) => (
        <Image
          src={image}
          alt="product image"
          style={{ width: '50px', marginRight: '10px' }}
        />
      ),
    },
    {
      title: 'Tên',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
    },
    {
      title: 'Loại',
      dataIndex: 'category',
      key: 'category',
      align: 'center',
      width: 115,
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      align: 'center',
      key: 'price',
      render: (price) => <p className="price mb-0">{price}</p>,
    },
    {
      title: 'Thao tác',
      dataIndex: 'id',
      align: 'center',
      key: 'action',
      render: (id) => (
        <Space size="middle" direction="horizontal">
          <Button onClick={() => handleUpdateButton(id)}>SỬA</Button>
          <Button danger onClick={() => handleDeleteButton(id)}>
            XÓA
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-md-4">
      <h1 className="bold" style={{ color: '#3d56b2' }}>
        Quản lý sản phẩm
      </h1>
      <Divider />
      <div className="d-flex justify-content-end mb-4">
        <Button
          size="large"
          type="primary"
          icon={
            <FontAwesomeIcon
              icon="fa-solid fa-plus"
              size="lg"
              className="me-2"
            />
          }
          onClick={() => setShowAddForm(true)}
        >
          Thêm sản phẩm mới
        </Button>
      </div>
      {showAddForm && <ProductForm onCancelForm={onCancelAdd} />}
      <Table
        columns={columns}
        dataSource={databaseItems}
        scroll={{ x: 400 }}
        pagination={{ pageSize: 5 }}
      />
      <Modal
        visible={showDelete}
        title="Xóa sản phẩm"
        footer={[
          <Button key="cancel" onClick={handleCancelDelete}>
            Hủy
          </Button>,
          <Button
            key="confirm"
            type="primary"
            onClick={() => handleConfirmDelete(currentUpdateItemId)}
          >
            Đồng ý
          </Button>,
        ]}
      >
        <p>Bạn có chắc muốn xóa sản phẩm này chứ?</p>
      </Modal>
      <Modal visible={showUpdateForm} width={'100%'} footer={null}>
        <ProductForm
          key={currentUpdateItemId}
          onCancelForm={handleCancelUpdate}
          update={showUpdateForm}
          id={currentUpdateItemId}
          title={currentUpdateItem?.title}
          price={currentUpdateItem?.price}
          description={currentUpdateItem?.description}
          image={currentUpdateItem?.image}
          category={currentUpdateItem?.category}
        />
      </Modal>
    </div>
  );
};

export default AdminProducts;
