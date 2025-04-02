import { Link } from 'react-router-dom';
import Rating from './Rating';
import Currency from './Currency';

function Book(props) {
    const data = props.data || {}; 
    const images = data.images || []; 

    return(
      <Link 
        to={'book/' + (data.id || '')} 
        className="container w-100 card mt-1 border-0 text-decoration-none shadow" 
      >
        {/* Hình ảnh sách */}
        {images.length > 0 && images[0].base_url ? (
          <img 
            src={images[0].base_url} 
            className="card-img-top" 
            alt={data.name || 'No name'} 
            height={180}
          />
        ) : (
          <div style={{height: '180px', backgroundColor: '#f0f0f0'}} className="d-flex align-items-center justify-content-center">
            No Image
          </div>
        )}

        <div className="mt-2 card-body">
            {/* Tiêu đề */}
            <h6 className="fw-normal card-title" style={{fontSize:'1rem'}}>
              {data.name || 'No title'}
            </h6>

            <div className="card-subtitle" style={{fontSize:'0.75rem'}}>
                {/* Đánh giá sao */}
                <span className='border-end pe-1'>
                  <Rating st={data.rating_average || 0} />
                </span>
                {/* Đã bán */}
                <span className='text-secondary fw-light ps-1'>
                  {data.quantity_sold ? data.quantity_sold.text : '0 sold'}
                </span>
            </div>
        </div>
        {/* Giá tiền */}
        <p className="card-text fw-medium fs-4 ms-3 mb-4"  style={{ fontSize: '1.25rem' }}>
          <Currency val={data.list_price || 0} />
        </p>
        {/* Footer */}
        <div className="card-footer bg-white text-center text-body-secondary">
          Giao siêu tốc 2h
        </div>
      </Link>
    );
}

export default Book;
