import { Button, Col, Input, Row, Space, Select } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { userActions } from '../../Redux/user';

const Edit = (props) => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = (data) => {
    dispatch(userActions.updateProfile({ ...data }));
    props.onConfirm();
  };

  return (
    <div className="bg-white p-4 m-4 shadow">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col span={24} md={12}>
            <div className="d-flex flex-column flex-md-row align-items-center p-3">
              <p className="fs-2 mb-0 me-3 bold">Tên: </p>
              <Controller
                name="firstName"
                rules={{ required: true }}
                control={control}
                defaultValue={props.firstName}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Nhập tên của người nhận"
                    size="large"
                  />
                )}
              />
            </div>
            {errors.firstName && (
              <p className="error mb-0 ms-3">Bạn chưa nhập tên</p>
            )}
          </Col>
          <Col span={24} md={12}>
            <div className="d-flex flex-column flex-md-row align-items-center p-3">
              <p className="fs-2 mb-0 me-3 bold">Họ: </p>
              <Controller
                name="lastName"
                rules={{ required: true }}
                control={control}
                defaultValue={props.lastName}
                render={({ field }) => (
                  <Input {...field} placeholder="Nhập họ" size="large" />
                )}
              />
            </div>
            {errors.lastName && (
              <p className="error mb-0 ms-3">Bạn chưa nhập họ</p>
            )}
          </Col>
          <Col span={24} md={12}>
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
          <Col span={24} md={12}>
            <div className=" d-flex flex-column flex-md-row align-items-center p-3">
              <p className="fs-2 mb-0 me-3 bold">
                <nobr>Giới tính:</nobr>
              </p>
              <Controller
                name="gender"
                rules={{ required: true }}
                control={control}
                defaultValue={props.gender}
                render={({ field }) => (
                  <Select {...field} style={{ width: 150 }}>
                    <Option value="male">Nam</Option>
                    <Option value="female">Nữ</Option>
                    <Option value="others">Khác</Option>
                  </Select>
                )}
              />
            </div>
            {errors.gender && (
              <p className="error mb-0 ms-3">Hãy chọn giới tính của bạn</p>
            )}
          </Col>
        </Row>
        <div className="d-flex justify-content-center mt-4">
          <Space>
            <Button size="large" onClick={props.onCancel}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit" size="large">
              Xác nhận
            </Button>
          </Space>
        </div>
      </form>
    </div>
  );
};

export default Edit;
