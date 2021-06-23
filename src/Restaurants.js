import { useLocation, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import queryString from "query-string";
import { Card, Table, Pagination } from "react-bootstrap";

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 10;
  let location = useLocation();
  let history = useHistory();
  let query = queryString.parse(location.search).borough;

  useEffect(() => {
    let url = query
      ? `http://fast-oasis-56610.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}&borough=${query}`
      : `http://fast-oasis-56610.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => setRestaurants(data))
      .catch((err) => console.log(err));
  }, [query, page]);

  function previousPage() {
    if (page > 0) setPage((prev) => prev - 1);
  }

  function nextPage() {
    setPage((prev) => prev + 1);
  }

  return (
    <div>
      {restaurants !== null && restaurants.length !== 0 && (
        <div>
          <Card style={{ width: "100%" }}>
            <Card.Header>
              <Card.Title>Restaurant List</Card.Title>
              <Card.Text>
                Full of restaurants. Optionally sorted by Borough
              </Card.Text>
            </Card.Header>
          </Card>
          <br />
        </div>
      )}
      {restaurants === null ? (
        <Card style={{ width: "100%" }}>
          <Card.Header>
            <Card.Text>Loading Restaurants...</Card.Text>
          </Card.Header>
        </Card>
      ) : restaurants.length === 0 ? (
        <Card style={{ width: "100%" }}>
          <Card.Header>
            <Card.Text>No Restaurants Found </Card.Text>
          </Card.Header>
        </Card>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>borough</th>
              <th>Cuisine</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant, _id) => (
              <tr
                key={_id}
                onClick={() => {
                  history.push(`/restaurant/${restaurant._id}`);
                }}
              >
                <td>{restaurant.name}</td>
                <td>
                  {restaurant.address.building} {restaurant.address.street}
                </td>
                <td>{restaurant.borough}</td>
                <td>{restaurant.cuisine}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {restaurants !== null && restaurants.length !== 0 && (
        <Pagination>
          <Pagination.Prev onClick={previousPage} />
          <Pagination.Item>{page}</Pagination.Item>
          <Pagination.Next onClick={nextPage} />
        </Pagination>
      )}
    </div>
  );
}
