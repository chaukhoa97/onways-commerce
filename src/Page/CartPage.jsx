import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, InputNumber, Layout, Space, Steps, Table } from 'antd';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import { userActions } from '../Redux/user';

const CartPage = () => {
  const { Step } = Steps;

  return (
    <MainLayout>
      <Layout.Content className="m-5">
        <div className="w-75 mx-auto mb-5 pb-5 d-none d-md-block">
          <Steps current={0} progressDot>
            <Step title="Giỏ hàng" />
            <Step title="Thanh toán" />
            <Step title="Hoàn tất" />
          </Steps>
        </div>
        <CartTable showCheckout />
      </Layout.Content>
    </MainLayout>
  );
};

export const CartTable = (props) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.user.cart.items);

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'data',
      key: 'title & image',
      align: 'center',
      render: (data) => (
        <Link
          to={`/products/${data.id}`}
          className="bold"
          style={{ color: '#3d56b2' }}
        >
          <div className="d-flex align-items-center">
            <img
              src={data.image}
              alt="product image"
              style={{ width: '50px', marginRight: '10px' }}
            />
            <p className="mb-0 ms-2">{data.title}</p>
          </div>
        </Link>
      ),
    },
    {
      title: 'Đơn giá',
      dataIndex: 'data',
      align: 'center',
      key: 'price',
      render: (data) => <p className="mb-0">${data.price}</p>,
    },
    {
      title: 'Số lượng',
      dataIndex: 'data',
      align: 'center',
      key: 'count',
      render: (data) => (
        <InputNumber
          min={1}
          defaultValue={data.count}
          onChange={(value) => {
            dispatch(
              userActions.changeCartCount({ id: data.id, count: value })
            );
          }}
        />
      ),
    },
    {
      title: 'Tổng cộng',
      dataIndex: 'data',
      align: 'center',
      key: 'total',
      render: (data) => (
        <p className="mb-0 bold" style={{ color: '#3d56b2' }}>
          ${_.round(data.count * data.price, 2)}
        </p>
      ),
    },
    {
      dataIndex: 'data',
      title: 'Thao tác',
      key: 'action',
      align: 'center',
      render: (data) => (
        <FontAwesomeIcon
          icon="fa-solid fa-trash"
          size="xl"
          onClick={() => dispatch(userActions.removeFromCart({ id: data.id }))}
          style={{ cursor: 'pointer' }}
        />
      ),
    },
  ];

  const total = _.round(
    cartItems
      .map((item) => item.data.price * item.data.count)
      .reduce((a, b) => a + b, 0),
    2
  );

  return (
    <>
      <Table
        columns={columns}
        dataSource={cartItems}
        pagination={false}
        bordered
        scroll={{ x: 320 }}
      />
      {cartItems.length > 0 && (
        <div className="cart-footer">
          <Space
            size="large"
            className="d-flex justify-content-between flex-column flex-md-row"
          >
            <div>
              <h2 className="mb-0">
                Tổng thanh toán:{' '}
                <span className="mont bold price">{total}</span>
              </h2>
            </div>
            {props.showCheckout && (
              <div className="me-5">
                <Link to="/checkout">
                  <Button
                    icon={
                      <FontAwesomeIcon icon="shopping-cart" className="me-2" />
                    }
                    type="primary"
                    size="large"
                  >
                    <span>Thanh toán</span>
                  </Button>
                </Link>
              </div>
            )}
          </Space>
        </div>
      )}
    </>
  );
};

export default CartPage;
