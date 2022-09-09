import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Divider } from 'antd';
import { useWindowSize } from 'react-use';

const Features = () => {
  const { width } = useWindowSize();

  return (
    <div
      className="features d-flex flex-column flex-lg-row  align-items-center justify-content-center"
      style={{ height: width < 992 ? '300px' : '200px' }}
    >
      <div className="feature d-flex align-items-center">
        <FontAwesomeIcon icon="fa-solid fa-truck" size="3x" className="me-5" />
        <div className="d-flex flex-column ">
          <p className="bold mb-2">MIỄN PHÍ VẬN CHUYỂN</p>
          <p className="fs-3 mb-0">Với đơn hàng từ $100</p>
        </div>
      </div>

      <Divider type={width < 992 ? 'horizontal' : 'vertical'} />

      <div className="feature d-flex align-items-center">
        <FontAwesomeIcon icon="fa-solid fa-coins" size="3x" className="me-5" />
        <div className="d-flex flex-column">
          <p className="bold mb-2">CAM KẾT HOÀN TIỀN</p>
          <p className="fs-3 mb-0">Trong vòng 30 ngày</p>
        </div>
      </div>

      <Divider type={width < 992 ? 'horizontal' : 'vertical'} />

      <div className="feature d-flex align-items-center">
        <FontAwesomeIcon
          icon="fa-solid fa-headset"
          size="3x"
          className="me-5"
        />
        <div className="d-flex flex-column">
          <p className="bold mb-2">HỖ TRỢ 24/7</p>
          <p className="fs-3 mb-0">Mỗi khi bạn cần</p>
        </div>
      </div>
    </div>
  );
};

export default Features;
