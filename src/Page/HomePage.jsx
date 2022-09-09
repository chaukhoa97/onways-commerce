import { Divider } from 'antd';
import { useHistory } from 'react-router-dom';
import CountDown from '../Layout/Home/Countdown';
import Discover from '../Layout/Home/Discover';
import Features from '../Layout/Home/Features';
import Hero from '../Layout/Home/Hero';
import HotItems from '../Layout/Home/HotItems';
import MainLayout from '../Layout/MainLayout';

const HomePage = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push('/products');
  };
  return (
    <MainLayout>
      <div className="home">
        <Hero handleClick={handleClick} />
        <Discover handleClick={handleClick} />
        <Divider />
        <HotItems />
        <CountDown handleClick={handleClick} />
        <Features />
      </div>
    </MainLayout>
  );
};

export default HomePage;
