import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import './styles.css';
import { useState } from "react";
import { FaCircleArrowLeft, FaCircleArrowRight  } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";


export const GalleryImages = ({images}) => {
  const [ data, setData ] = useState({image: '', i: 0})
  const viewImage = (image, i) => {
    setData({image, i})
  }

  const GoToTop = () => {
    window.scrollTo(0, 0);
  }


  const actionPhoto = (action) => {
    let i = data.i;
    
    if(action == "next") {
      setData({image: images[i + 1], i: i + 1})
      if(data.i == (images.length -1)) {
        setData({image: images[0], i: 0})
      }
    } if(action == "prev") {
      setData({image: images[i - 1], i: i - 1})
    }
  }

  return (
    <>
      {
        data.image && (
          <div className="img-opened">
            <div className="close"
              onClick={() => {
                setData({image: '', i: 0})
              }}>
              <IoIosClose />
            </div>
            <div className="button-control" onClick={() => {
              actionPhoto('prev')}}><FaCircleArrowLeft /></div>
                <img src={data.image} />
            <div className="button-control" onClick={() => {
              actionPhoto('next')}}><FaCircleArrowRight /></div>
          </div>
        )
      }

      {
        !data.image && (
          <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}} style={{background: 'white'}}>
            <Masonry gutter="20px">
              {images.map((image, i) => (
                <img
                  key={i}
                  src={image}
                  style={{width: "100%", display: "block"}}
                  alt=""
                  onClick={() => {
                    viewImage(image, i)
                    GoToTop()
                  }}
                />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        )
      }
    </>
  )
}