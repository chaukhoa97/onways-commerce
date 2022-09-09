import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Rate } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { userActions } from '../Redux/user';

export function roundHalf(num) {
  return Math.round(num * 2) / 2;
}

const ProductItem = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleAddToCart = () => {
    dispatch(userActions.addToCart(props));
  };
  const handleAddToWishlist = () => {
    dispatch(userActions.addToWishlist(props.id));
  };
  const wishList = useSelector((state) => state.user.wishList);

  return (
    <Card
      hoverable
      cover={
        <img
          className="product__image p-4"
          src={props.image}
          alt={props.title}
          onClick={() => history.push(`/products/${props.id}`)}
        />
      }
      actions={[
        <div className="w-100" key="wish" onClick={handleAddToWishlist}>
          <FontAwesomeIcon
            icon={`fa-${
              wishList.includes(props.id) ? 'solid' : 'regular'
            } fa-heart`}
            key="heart"
            size="xl"
            style={{ color: '#ff0000' }}
          />
        </div>,
        <div className="w-100" key="add" onClick={handleAddToCart}>
          <FontAwesomeIcon
            icon="fa-solid fa-cart-plus"
            size="xl"
            style={{ color: '#5c7aea' }}
          />
        </div>,
      ]}
    >
      <div className="product__title">
        <h4 className="bold fs-3">{props.title}</h4>
      </div>
      <div className="d-flex align-items-center mt-1">
        <Rate
          className="fs-4"
          disabled
          value={roundHalf(props.rating.rate)}
          allowHalf
        />
        <p className="ms-2 mb-0 d-inline roboto fs-4 product__rating-count">
          {`(${props.rating.count})`}
        </p>
      </div>
      <p className="fs-2 price mt-3 mb-0">{props.price}</p>
    </Card>
  );
};

export default ProductItem;
