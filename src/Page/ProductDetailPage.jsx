import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Divider, Image, Layout, Rate, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useLocalStorage } from 'react-use';
import Carousel from '../Components/Carousel';
import { roundHalf } from '../Components/ProductItem';
import MainLayout from '../Layout/MainLayout';
import { userActions } from '../Redux/user';

const { Content } = Layout;
const ProductDetailPage = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const itemId = Number(params.productId);
  const [itemData, setItemData] = useState(null);
  const wishList = useSelector((state) => state.user.wishList);
  const databaseItems = useSelector((state) => state.items.databaseItems);
  const sameCategoryItemIds = databaseItems
    .filter(
      (item) => item?.category === itemData?.category && item?.id !== itemId
    )
    .map((item) => item.id);

  useEffect(() => {
    setItemData(databaseItems.find((item) => item.id === itemId));
  }, [itemId, databaseItems]);

  const handleAddToCart = () => {
    dispatch(userActions.addToCart(itemData));
  };

  const handleAddToWishlist = () => {
    dispatch(userActions.addToWishlist(itemData.id));
  };

  const [recentIds, setRecentIds] = useLocalStorage('recent', [1, 5, 9]);

  useEffect(() => {
    if (itemId !== recentIds[0]) {
      setRecentIds([...new Set([itemId, ...recentIds])].slice(0, 7));
    }
  }, [itemId, recentIds, setRecentIds]);

  const carouselRecentIds = recentIds.filter((id) => id !== itemId);

  return (
    <MainLayout>
      <Content className="my-sm-5 px-sm-5 my-4">
        <Row gutter={{ xs: 0, md: 16 }}>
          <Col xs={24} sm={6} xl={4} className="d-flex justify-content-center">
            <Image src={itemData?.image} alt={itemData?.title}></Image>
          </Col>
          <Col xs={24} sm={18} xl={20}>
            <div
              className="detail__content p-4"
              style={{ background: 'white' }}
            >
              <h1 className="bold mb-5">{itemData?.title}</h1>
              <p className="fs-3">{itemData?.description}</p>
              <div className="d-flex align-items-center flex-column flex-sm-row">
                <Rate
                  className="fs-2 mb-2 mb-sm-0"
                  disabled
                  value={roundHalf(itemData?.rating.rate)}
                  allowHalf
                />
                <p className="ms-3 mb-0 d-inline roboto fs-3 product__rating-count bold">
                  {`${itemData?.rating.count} đánh giá`}
                </p>
              </div>
              <p className="fs-1 price my-3">{itemData?.price}</p>
              <div className="d-flex flex-column flex-sm-row">
                <Button
                  className="mb-4 mb-sm-0 me-sm-4"
                  type="primary"
                  size="large"
                  icon={
                    <FontAwesomeIcon
                      icon="fa-solid fa-cart-plus"
                      size="xl"
                      className="me-3"
                    />
                  }
                  onClick={handleAddToCart}
                >
                  Thêm vào giỏ hàng
                </Button>
                <Button
                  danger
                  onClick={handleAddToWishlist}
                  size="large"
                  icon={
                    <FontAwesomeIcon
                      icon={`fa-${
                        wishList.includes(Number(itemId)) ? 'solid' : 'regular'
                      } fa-heart`}
                      size="xl"
                      className="me-3"
                      style={{ color: '#ff0000' }}
                    />
                  }
                >
                  Yêu thích
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        <Divider />
        <h1 className="mt-5 mb-4 bold">Sản phẩm cùng loại</h1>
        <Carousel itemIds={sameCategoryItemIds} />
        <h1 className="mt-6 mb-4 bold">Sản phẩm vừa xem</h1>
        <Carousel itemIds={carouselRecentIds} />
      </Content>
    </MainLayout>
  );
};

export default ProductDetailPage;
