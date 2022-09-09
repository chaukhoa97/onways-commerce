import { Col, Row } from 'antd';

const Hero = (props) => {
  return (
    <div className="hero" style={{ flexGrow: 1 }}>
      <Row>
        <Col xs={24} md={12}>
          <div className="hero__left">
            <div className="hero__content">
              <h1>Gentlemen</h1>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Recusandae ex omnis officia beatae, eius distinctio.
              </p>
              <div className="d-flex justify-content-center">
                <button
                  type="button"
                  className="btn btn-light btn-lg me-3"
                  onClick={props.handleClick}
                >
                  XEM BỘ SƯU TẬP
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light btn-lg"
                  onClick={props.handleClick}
                >
                  TÌM HIỂU THÊM
                </button>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div className="hero__right">
            <div className="hero__content">
              <h1>Ladies</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                euismod, nisl eget consectetur consectetur, nisi nisl.
              </p>
              <div className="d-flex justify-content-center">
                <button
                  type="button"
                  className="btn btn-light btn-lg me-3"
                  onClick={props.handleClick}
                >
                  XEM BỘ SƯU TẬP
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light btn-lg"
                  onClick={props.handleClick}
                >
                  TÌM HIỂU THÊM
                </button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Hero;
