import { useState } from "react";

import "./App.css";
import Icon from "./components/Icon";

import "bootstrap/dist/css/bootstrap.css";
import { Card, CardBody, Container, Button, Col, Row } from "reactstrap";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const itemArray = new Array(9).fill("empty");

function App() {
  const [isCross, setIsCross] = useState(false);
  const [winMessage, setWinMessage] = useState("");

  const reloadGame = () => {
    setIsCross(false);
    setWinMessage("");
    itemArray.fill("empty");
  };

  const checkIsWinner = () => {
    if (
      (itemArray[0] === itemArray[1] &&
        itemArray[1] === itemArray[2] &&
        itemArray[2] !== "empty") ||
      (itemArray[3] === itemArray[4] &&
        itemArray[4] === itemArray[5] &&
        itemArray[5] !== "empty") ||
      (itemArray[6] === itemArray[7] &&
        itemArray[7] === itemArray[8] &&
        itemArray[8] !== "empty") ||
      (itemArray[0] === itemArray[3] &&
        itemArray[3] === itemArray[6] &&
        itemArray[6] !== "empty") ||
      (itemArray[1] === itemArray[4] &&
        itemArray[4] === itemArray[7] &&
        itemArray[7] !== "empty") ||
      (itemArray[2] === itemArray[5] &&
        itemArray[5] === itemArray[8] &&
        itemArray[8] !== "empty") ||
      (itemArray[0] === itemArray[4] &&
        itemArray[4] === itemArray[8] &&
        itemArray[8] !== "empty") ||
      (itemArray[6] === itemArray[4] &&
        itemArray[4] === itemArray[2] &&
        itemArray[2] !== "empty")
    )
      setWinMessage(`${isCross ? "Cross" : "Circle"} wins!`);
  };

  const checkIfDraw = () => {
    return itemArray.every((item) => item !== "empty");
  };

  const changeItem = (itemNumber) => {
    if (winMessage) return toast(winMessage, { type: "success" });

    if (itemArray[itemNumber] === "empty") {
      itemArray[itemNumber] = isCross ? "cross" : "circle";
      setIsCross(!isCross);
      checkIsWinner();
      if (checkIfDraw()) {
        setWinMessage("Match drawn");
        return toast("Match drawn", { type: "info" });
      }
    } else return toast("Already filled", { type: "error" });
  };

  return (
    <Container className="p-5">
      <ToastContainer position="bottom-center" />
      <Row>
        <Col md={6} className="offset-md-3">
          {winMessage ? (
            <div className="mb-2 mt-2 ">
              <h1 className="text-primary text-uppercase text-center">
                {winMessage}
              </h1>
              <Button color="success" block onClick={reloadGame}>
                Reload Game
              </Button>
            </div>
          ) : (
            <h1 className="text-primary text-warning text-center">
              {isCross ? "Cross" : "Circle"} turns
            </h1>
          )}
          <div className="grid">
            {itemArray.map((item, index) => (
              <Card
                key={index}
                color="warning"
                onClick={() => changeItem(index)}
              >
                <CardBody className="box">
                  <Icon name={item} />
                </CardBody>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
