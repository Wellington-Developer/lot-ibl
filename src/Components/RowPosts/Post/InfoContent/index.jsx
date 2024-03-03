import './styles.css';
import { TbResize, TbBath, TbBed } from 'react-icons/tb'

export const InfoContent = ({text, info}) => {
  return (
    <div className="info-content">
      {
        text == "area" && <TbResize />
      }
      {
        text == "bath" && <TbBath />
      }
      {
        text == "room" && <TbBed />
      }
      <h1>{info}</h1>
    </div>
  )
}