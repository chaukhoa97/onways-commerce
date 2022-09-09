import {
  Button,
  Col,
  Divider,
  Input,
  message,
  Row,
  Space,
  Select,
  InputNumber,
} from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { itemsActions } from '../Redux/items';

const ProductForm = (props) => {
  const { Option } = Select;
  const databaseItemsCount = useSelector(
    (state) => state.items.databaseItems.length
  );
  const updateMode = props.update || false;
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const dispatch = useDispatch();
  const handleAddItem = (data) => {
    dispatch(
      itemsActions.add({
        ...data,
        id: databaseItemsCount + 1,
        category: data.category,
        rating: {
          rate: 0,
          count: 0,
        },
      })
    );
    props.onCancelForm();
    message.success('Thêm sản phẩm thành công');
  };
  const handleUpdateItem = (data) => {
    dispatch(
      itemsActions.update({
        ...data,
        id: props.id,
        category: data.category,
      })
    );
    props.onCancelForm();
    message.success('Cập nhật sản phẩm thành công');
  };

  return (
    <div className={`bg-white rounded-3 p-5 shadow mx-auto my-5`}>
      <h2 className="bold" style={{ color: '#3d56b2' }}>
        {props.update ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
      </h2>
      <Divider />
      <form
        onSubmit={
          updateMode
            ? handleSubmit(handleUpdateItem)
            : handleSubmit(handleAddItem)
        }
      >
        <Row gutter={[24, 24]}>
          <Col span={24} lg={13}>
            <Controller
              name="title"
              rules={{ required: true }}
              control={control}
              defaultValue={props.title}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Nhập tên sản phẩm"
                  size="large"
                />
              )}
            />
            {errors.title && (
              <p className="error mb-0 ms-3">Bạn chưa nhập tên sản phẩm</p>
            )}
          </Col>

          <Col span={24} md={12} lg={5}>
            <Controller
              name="price"
              rules={{ required: true }}
              control={control}
              defaultValue={props.price}
              render={({ field }) => (
                <InputNumber
                  {...field}
                  style={{ width: '100%' }}
                  min={0}
                  type="number"
                  placeholder="Nhập giá"
                  size="large"
                />
              )}
            />
            {errors.price && (
              <p className="error mb-0 ms-3">Bạn chưa nhập giá của sản phẩm</p>
            )}
          </Col>

          <Col span={24} md={12} lg={6}>
            <Controller
              name="category"
              rules={{ required: true }}
              control={control}
              defaultValue={props.category}
              render={({ field }) => {
                return (
                  <Select
                    {...field}
                    placeholder="Chọn danh mục"
                    size="large"
                    style={{ width: '100%' }}
                  >
                    <Option value="Quần áo nam">Quần áo nam</Option>
                    <Option value="Quần áo nữ">Quần áo nữ</Option>
                    <Option value="Đồ điện tử">Đồ điện tử</Option>
                    <Option value="Trang sức">Trang sức</Option>
                  </Select>
                );
              }}
            />
            {errors.category && (
              <p className="error mb-0 ms-3">Bạn chưa chọn danh mục</p>
            )}
          </Col>

          <Col span={24}>
            <Controller
              name="image"
              rules={{ required: true }}
              control={control}
              defaultValue={props.image}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Nhập đường link ảnh của sản phẩm"
                  size="large"
                />
              )}
            />
            {errors.image && (
              <p className="error mb-0 ms-3">
                Bạn chưa nhập đường link tới ảnh sản phẩm
              </p>
            )}
          </Col>

          <Col span={24}>
            <Controller
              name="description"
              rules={{ required: true }}
              control={control}
              defaultValue={props.description}
              render={({ field }) => (
                <Input.TextArea
                  {...field}
                  defaultValue={props.description}
                  placeholder="Nhập miêu tả sản phẩm"
                  size="large"
                  rows={4}
                />
              )}
            />
            {errors.description && (
              <p className="error mb-0 ms-3">Bạn chưa nhập miêu tả sản phẩm</p>
            )}
          </Col>
        </Row>
        <div className="d-flex justify-content-center mt-4">
          <Space>
            <Button key="buy" size="large" onClick={props.onCancelForm}>
              Hủy
            </Button>
            <Button htmlType="submit" type="primary" key="console" size="large">
              {updateMode ? 'Cập nhật' : 'Thêm'}
            </Button>
          </Space>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
