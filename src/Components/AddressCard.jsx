import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Input, Row, Space } from 'antd';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { userActions } from '../Redux/user';

const AddressCard = (props) => {
  const [editMode, setEditMode] = useState(props.edit || false);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = (data) => {
    dispatch(userActions.updateAddress({ ...data, id: props.id }));
    setEditMode(false);
  };

  const onCancel = () => {
    if (props.add) {
      dispatch(userActions.removeAddress(props.id));
    }
    setEditMode(false);
  };

  const AddressForm = () => {
    return (
      <div
        className={`address-card bg-white rounded-3 p-4 shadow w-100 mx-auto my-5`}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col span={24} md={13}>
              <div className="d-flex flex-column flex-md-row align-items-center p-3">
                <p className="fs-2 mb-0 me-3 bold">Tên: </p>
                <Controller
                  name="name"
                  rules={{ required: true }}
                  control={control}
                  defaultValue={props.name}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Nhập tên của người nhận"
                      size="large"
                    />
                  )}
                />
              </div>
              {errors.name && (
                <p className="error mb-0 ms-3">Bạn chưa nhập tên</p>
              )}
            </Col>
            <Col span={24} md={11}>
              <div className=" d-flex flex-column flex-md-row align-items-center p-3">
                <p className="fs-2 mb-0 me-3 bold">
                  <nobr>Số điện thoại:</nobr>
                </p>
                <Controller
                  name="phone"
                  rules={{ required: true, pattern: /^[0-9]{10,11}$/ }}
                  control={control}
                  defaultValue={props.phone}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="tel"
                      placeholder="Nhập số điện thoại"
                      size="large"
                    />
                  )}
                />
              </div>
              {errors.phone && (
                <p className="error mb-0 ms-3">Số điện thoại không hợp lệ</p>
              )}
            </Col>
          </Row>
          <div className="d-flex flex-column flex-md-row align-items-center">
            <p className="fs-2 mb-0 me-3 bold p-3">
              <nobr>Địa chỉ:</nobr>
            </p>
            <Controller
              name="detail"
              rules={{ required: true }}
              control={control}
              defaultValue={props.detail}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Nhập địa chỉ của người nhận"
                  size="large"
                />
              )}
            />
          </div>
          {errors.detail && (
            <p className="error mb-0 ms-3">Bạn chưa nhập địa chỉ</p>
          )}
          <div className="d-flex justify-content-center mt-4">
            <Space>
              <Button key="buy" size="large" onClick={onCancel}>
                Hủy
              </Button>
              <Button
                htmlType="submit"
                type="primary"
                key="console"
                size="large"
              >
                Xác nhận
              </Button>
            </Space>
          </div>
        </form>
      </div>
    );
  };

  return editMode ? (
    <AddressForm active={editMode} />
  ) : (
    <div
      className={`address-card bg-white rounded-3 p-4 shadow w-100 mx-auto my-5 ${
        props.active && 'address-card--active'
      }`}
      onClick={props.onAdressSelect && (() => props.onAdressSelect(props))}
    >
      <div className="d-flex justify-content-between align-items-center mb-5">
        <p className="fs-2 mb-0 bold">{props.name}</p>
        <Space size="large">
          <FontAwesomeIcon
            icon="fa-solid fa-pen"
            size="xl"
            onClick={() => setEditMode(true)}
          />
          <FontAwesomeIcon
            icon="fa-solid fa-trash"
            size="xl"
            onClick={() => dispatch(userActions.removeAddress(props.id))}
          />
        </Space>
      </div>
      <p className="fs-3 mb-1">{props.phone}</p>
      <p className="fs-3">{props.detail}</p>
    </div>
  );
};

export default AddressCard;
