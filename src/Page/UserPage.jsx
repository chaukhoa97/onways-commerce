import { Col, Layout, Row } from 'antd';
import MainLayout from '../Layout/MainLayout';
import Orders from '../Layout/User/Orders';
import Profile from '../Layout/User/Profile';
import UserSider from '../Layout/User/UserSider';
import Wish from '../Layout/User/Wish';
import Address from '../Layout/User/Address';
import { useParams } from 'react-router-dom';

const UserPage = () => {
  const params = useParams();
  return (
    <MainLayout>
      <Layout.Content>
        <Row>
          <Col xs={24} lg={5}>
            <div className="bg-white p-4 m-4">
              <UserSider></UserSider>
            </div>
          </Col>
          <Col xs={24} lg={19}>
            <div>
              {params.mode === 'profile' && <Profile></Profile>}
              {params.mode === 'address' && <Address></Address>}
              {params.mode === 'orders' && <Orders></Orders>}
              {params.mode === 'wish' && <Wish></Wish>}
            </div>
          </Col>
        </Row>
      </Layout.Content>
    </MainLayout>
  );
};

export default UserPage;
