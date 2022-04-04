import noImage from "../../../../images/icons/no_image.png"
import "./thumbnail.scss"

const Thumbnail = ({background, isSelected, onClick}) => {
  return(
    <div
      className={"thumbnail " + (isSelected ? "active" : "")}
      onClick={onClick}
    >
      <span style={{ backgroundImage: "url('"+ ( (background) ? background : noImage ) +"')" }}></span>
    </div>
  )
}

export default Thumbnail;