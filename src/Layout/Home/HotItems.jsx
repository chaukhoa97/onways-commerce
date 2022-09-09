import { useSelector } from 'react-redux';
import Carousel from '../../Components/Carousel';

const HotItems = () => {
  const databaseItems = useSelector((state) => state.items.databaseItems);
  const hotItemsIds = [...databaseItems]
    .sort((a, b) => b.rating.count - a.rating.count)
    .slice(0, 8)
    .map((item) => item.id);
  return (
    <div className="p-5 hot">
      <div className="hot__text">
        <h3 className="text-center mb-5">Top seller tháng này</h3>
        <Carousel itemIds={hotItemsIds} autoplay={true} />
      </div>
    </div>
  );
};

export default HotItems;
