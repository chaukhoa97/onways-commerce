import { Avatar, Divider } from 'antd';
import { useWindowSize } from 'react-use';

const Discover = (props) => {
  const { width } = useWindowSize();
  const data = [
    {
      src: 'https://i.etsystatic.com/10204022/r/il/18e97e/2550873428/il_300x300.2550873428_rvbc.jpg',
      category: 'Dành tặng cô ấy',
    },
    {
      src: 'https://i.etsystatic.com/15334835/r/il/8e0c8e/1317664005/il_300x300.1317664005_2mc4.jpg',
      category: 'Quà cho các chàng',
    },
    {
      src: 'https://i.etsystatic.com/13997563/r/il/ef7df2/2419373042/il_300x300.2419373042_htae.jpg',
      category: 'Vì con của bạn',
    },
    {
      src: 'https://i.etsystatic.com/6862623/r/il/ae2960/2094794887/il_300x300.2094794887_2sdq.jpg',
      category: 'Chăm sóc mái ấm',
    },
  ];
  return (
    <div className="p-4">
      <h3 className="text-center mb-5">Khám phá ngay!</h3>
      <div className="d-flex justify-content-around align-items-center discover flex-column flex-md-row">
        {data.map((item) => (
          <div
            className="discover__item d-flex flex-column align-items-center"
            key={item.category}
            onClick={props.handleClick}
          >
            <Avatar
              key={item.category}
              src={item.src}
              size={{ xs: 180, md: 120, lg: 150, xl: 200, xxl: 230 }}
            />
            <span className="mt-4 text-center" style={{ fontSize: '20px' }}>
              {item.category}
            </span>
            <Divider className={width > 767 && 'd-none'} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Discover;
