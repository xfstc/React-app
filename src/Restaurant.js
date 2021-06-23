import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Card, CardDeck } from "react-bootstrap";
import Moment from "react-moment";

export default function Restaurant(props) {
  let { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://fast-oasis-56610.herokuapp.com/api/restaurants/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.hasOwnProperty("_id")) setRestaurant(data);
        else setRestaurant(null);
      })
      .catch((err) => console.log(err));
  }, [id]);
  return (
    <>
      {loading === true ? (
        <Card style={{ width: "100%" }}>
          <Card.Header>
            <Card.Text>Loading Restaurant Data...</Card.Text>
          </Card.Header>
        </Card>
      ) : restaurant === null ? (
        <Card.Header>
          <Card.Text>Unable to find Restaurant with id: {id}</Card.Text>
        </Card.Header>
      ) : (
        <>
          <Card>
            <Card.Header>
              <Card.Title>{restaurant.name}</Card.Title>
              <Card.Text>
                {restaurant.address.building} {restaurant.address.street}
              </Card.Text>
            </Card.Header>
          </Card>
          <br />
          <MapContainer
            style={{ height: "400px" }}
            center={[restaurant.address.coord[1], restaurant.address.coord[0]]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker
              position={[
                restaurant.address.coord[1],
                restaurant.address.coord[0],
              ]}
            ></Marker>
          </MapContainer>
          <br />
          <h4>Ratings</h4>
          <hr />
          <CardDeck>
            {restaurant.grades.map((grade, id) => (
              <Card key={id} style={{ width: "18rem" }}>
                <Card.Header>Grade: {grade.grade}</Card.Header>
                <Card.Body>
                  <Card.Text>
                    Completed: <Moment date={grade.date} format="M/DD/YYYY" />
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </CardDeck>
        </>
      )}
    </>
  );
}
