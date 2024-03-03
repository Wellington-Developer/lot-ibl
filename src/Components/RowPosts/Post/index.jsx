import { Link } from 'react-router-dom';
import { InfoContent } from './InfoContent';
import './styles.css';
import { FiMapPin } from 'react-icons/fi'

export const Post = ({ id, status, title, price, locale, qt_bath, qt_room, size, img }) => {
  let color = "green";
  if(status && status == "Locado") {
    color = "red" 
  } else {
    color = "green"
  }
  return (
    <>
      {
        id && (
          <Link to={`/post/${id}`}>
            <div className="post-container__home">
              {
                title && price && locale && qt_bath && qt_room && size && (
                  <div className="post-content__home">
                    <div className="photo-content__post">
                      <img src={img} />
                      {
                        status && <div className="status">
                        <h1 style={{color: color}}>{status}</h1>
                        </div>
                      }
                    </div>
                    <div className="info-content__post">
                      <InfoContent text="area" info={size}/>
                      <InfoContent text="bath" info={qt_bath}/>
                      <InfoContent text="room" info={qt_room}/>
                    </div>
                    <div className="locale-content__post">
                      <p>
                        <FiMapPin />
                        {locale}
                      </p>
                    </div>
                    <div className="title-content__post">
                      <h1>{title}</h1>
                    </div>
                    <div className="price-content__post">
                      <h1>R$ {Number(price).toLocaleString('pt-br', {style: 'decimal'})}</h1>
                    </div>
                  </div>
                )
              }
            </div>
          </Link>
        )
      }
    </>
  )
}