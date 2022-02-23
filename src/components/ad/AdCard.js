import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Ad = ({data}) => {
  return(
    <Col xs={3}>
      <Card className="p-4">
        <p><Link to={"/ad/"+data.id}>{data.title}</Link></p>
        <div>{data.description}</div>
      </Card>
    </Col>
  )
}
export default Ad;