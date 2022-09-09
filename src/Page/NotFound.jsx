import MainLayout from '../Layout/MainLayout';

const NotFound = ({}) => {
  return (
    <MainLayout>
      <div className="text-center mt-5 mb-5">
        <h1 className="fs-2 bold">404</h1>
        <h2 className="fs-2">Không tìm thấy trang</h2>
      </div>
    </MainLayout>
  );
};

export default NotFound;
