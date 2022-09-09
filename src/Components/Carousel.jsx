import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import ProductItem from './ProductItem';

const Carousel = (props) => {
  const settings = {
    slidesToShow: 4,
    slidesToScroll: 4,
    dots: true,
    speed: 500,
    initialSlide: 0,
    arrows: false,
    infinite: props.itemIds.length > 4,
    autoplay: props.autoplay || false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: props.itemIds.length > 3,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: props.itemIds.length > 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const databaseItems = useSelector((state) => state.items.databaseItems);
  const carouselItems = databaseItems.filter((item) =>
    props.itemIds.includes(item.id)
  );

  return (
    <div>
      <Slider {...settings}>
        {carouselItems.map((i) => (
          <ProductItem
            key={i.id}
            id={i.id}
            title={i.title}
            price={i.price}
            image={i.image}
            rating={i.rating}
          ></ProductItem>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
