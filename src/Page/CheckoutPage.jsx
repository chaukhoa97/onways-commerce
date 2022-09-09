import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Divider,
  Layout,
  message,
  PageHeader,
  Radio,
  Result,
  Space,
  Steps,
} from 'antd';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AddressCard from '../Components/AddressCard';
import MainLayout from '../Layout/MainLayout';
import { adminActions } from '../Redux/admin';
import { userActions } from '../Redux/user';
import { CartTable } from './CartPage';

const CheckoutPage = () => {
  const [checkoutDone, setCheckoutDone] = useState(false);
  const localId = useSelector((state) => state.user.localId);
  const email = useSelector((state) => state.user.email);
  const history = useHistory();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.user.cart.items);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const handleAddressSelect = useCallback((address) => {
    setSelectedAddress(address);
  }, []);
  const [selectedPayment, setSelectedPayment] = useState('cash');
  const addresses = useSelector((state) => state.user.addresses);
  const { Step } = Steps;

  const key = 'checkout done';
  const handleCheckout = () => {
    message.loading({ content: 'Đang đặt hàng', key });
    setTimeout(() => {
      message.success({
        content: 'Đặt hàng thành công!',
        duration: 1.5,
        key,
        onClose: () => {
          const time = Date.now();
          dispatch(
            userActions.addToOrder({
              id: localId + time,
              time,
              items: cartItems,
              address: selectedAddress,
              payment: selectedPayment,
              status: 0,
            })
          );
          dispatch(
            adminActions.addToOrder({
              id: localId + time,
              time,
              items: cartItems,
              address: selectedAddress,
              payment: selectedPayment,
              status: 0,
              orderAccount: email,
            })
          );
          setCheckoutDone(true);
        },
      });
    }, 1000);
  };

  const handleAddAddress = () => {
    dispatch(
      userActions.addAddress({
        id: Date.now(),
        name: '',
        address: '',
        phone: '',
      })
    );
  };

  return (
    <MainLayout>
      <Layout.Content className="m-5">
        {checkoutDone ? (
          <>
            <div className="w-75 mx-auto my-5 py-5 d-none d-md-block">
              <Steps current={2} progressDot>
                <Step title="Giỏ hàng" />
                <Step title="Thanh toán" />
                <Step title="Hoàn tất" />
              </Steps>
            </div>
            <Result
              status="success"
              title="Đơn hàng của bạn đã được tiếp nhận!"
              subTitle="Cám ơn bạn đã lựa chọn Onways. Chúng tôi sẽ liên lạc lại với bạn để xác nhận trong thời gian sớm nhất."
              extra={[
                <Button
                  type="primary"
                  key="/products"
                  onClick={() => history.push('/products')}
                  size="large"
                >
                  Tiếp tục mua hàng
                </Button>,
                <Button
                  key="/user/orders"
                  onClick={() => history.push('/user/orders')}
                  size="large"
                >
                  Xem đơn hàng
                </Button>,
              ]}
            />
          </>
        ) : (
          <>
            <PageHeader
              onBack={() => history.push('/cart')}
              title="Trở về giỏ hàng"
            />
            <div className="w-75 mx-auto my-5 pb-5 d-none d-md-block">
              <Steps current={1} progressDot>
                <Step title="Giỏ hàng" />
                <Step title="Thanh toán" />
                <Step title="Hoàn tất" />
              </Steps>
            </div>
            <Divider />
            <div className="checkout__address my-5">
              <div className="d-flex flex-column flex-md-row justify-content-between">
                <h2 className="bold">Chọn địa chỉ giao hàng</h2>
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
                  onClick={handleAddAddress}
                >
                  Thêm địa chỉ mới
                </Button>
              </div>
              {addresses.map((a) => (
                <AddressCard
                  id={a.id}
                  key={a.detail}
                  name={a.name}
                  phone={a.phone}
                  detail={a.detail}
                  edit={a.edit}
                  add={a.add}
                  onAdressSelect={handleAddressSelect}
                  active={selectedAddress?.detail === a?.detail}
                />
              ))}
            </div>
            <Divider />
            <h2 className="bold">Chọn hình thức thanh toán</h2>
            <div className="checkout__payment my-5 bg-white p-5 shadow">
              <Radio.Group
                value={selectedPayment}
                onChange={(e) => setSelectedPayment(e.target.value)}
                size="large"
              >
                <Space direction="vertical">
                  <Radio value="cash">
                    <p className="fs-2">Thanh toán bằng tiền mặt</p>
                  </Radio>
                  <Radio value="card">
                    <p className="fs-2">Thanh toán bằng thẻ tín dụng</p>
                  </Radio>
                  <Radio value="momo">
                    <p className="fs-2 mb-0">Thanh toán bằng Momo</p>
                  </Radio>
                </Space>
              </Radio.Group>
            </div>
            <Divider />
            {selectedAddress?.name && (
              <>
                <h2 className="bold">Xem lại đơn hàng</h2>
                <div className="checkout__payment my-5 bg-white p-5 shadow">
                  <p className="fs-2 bold">
                    Tên người nhận: {selectedAddress?.name}
                  </p>
                  <p className="fs-2">
                    Số điện thoại: {selectedAddress?.phone}{' '}
                  </p>
                  <p className="fs-2">Địa chỉ: {selectedAddress?.detail} </p>
                  <CartTable />
                  <div className="d-flex justify-content-center mt-5">
                    <Button
                      type="primary"
                      size="large"
                      style={{ width: '106px', height: '55px' }}
                      shape="round"
                      onClick={handleCheckout}
                    >
                      Đặt hàng
                    </Button>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </Layout.Content>
    </MainLayout>
  );
};

export default CheckoutPage;
