import "./thumbnail.scss"

const Thumbnail = ({background, isSelected, onClick}) => {
  return(
    <div
      className={"thumbnail " + (isSelected ? "active" : "")}
      onClick={onClick}
    >
      <span style={{ backgroundImage: "url("+background+")" }}></span>
    </div>
  )
}

export default Thumbnail;