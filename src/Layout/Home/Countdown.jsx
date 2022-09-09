import { Statistic } from 'antd';

const deadline = new Date('2022-12-25T00:00:00').getTime();
const Countdown = (props) => {
  return (
    <div className="countdown mt-5">
      <div className="d-flex flex-column justify-content-center align-items-center countdown__content">
        <h3 className="bold">
          Chào Giáng Sinh bằng đợt giảm giá lớn nhất trong năm
        </h3>
        <Statistic.Countdown
          value={deadline}
          valueStyle={{ color: '#F40101', fontSize: '36px' }}
          format="DD ngày HH giờ mm phút ss giây"
        />
        <div className="btn btn-dark btn-lg mt-4" onClick={props.handleClick}>
          XEM TRƯỚC
        </div>
      </div>
    </div>
  );
};

export default Countdown;
