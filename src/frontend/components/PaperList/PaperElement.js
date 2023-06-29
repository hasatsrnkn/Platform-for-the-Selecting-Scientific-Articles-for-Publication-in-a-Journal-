import { useRouter } from "next/router";
import { Button, Col, Row, Popover, OverlayTrigger } from "react-bootstrap";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { API_GET_PAPER } from "../../pages/api/api";

const PaperElement = (props) => {
  const token = useSelector((state) => state.auth.token);
  const router = useRouter();

  const downloadHandler = (event) => {
    event.preventDefault();
    console.log(API_GET_PAPER + props.id);
    fetch(API_GET_PAPER + props.id, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/pdf",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.blob();
        } else {
          return res.blob().then((data) => {
            let errorMessage = "Authentication failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.message;
            }
            alert(data.message);
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const url = window.URL.createObjectURL(data);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "paper.pdf");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        console.log("POST request was successful!");
      })
      .catch((err) => {
        console.error("Error occurred during POST request:", err);
      });
  };

  return (
    <tr>
      <td></td>
      <td>{props.id}</td>
      <td>{props.title}</td>
      <td>{props.authors}</td>
      <td>{props.doi}</td>
      <td>{props.pmid}</td>
      <td>{props.journalName}</td>
      <td>{props.journalIssue}</td>
      <td>
        <OverlayTrigger
          trigger="click"
          key="left"
          placement="left"
          overlay={
            <Popover id={`popover-positioned-left`} >
              <Popover.Header as="h3">{`Abstract`}</Popover.Header>
              <Popover.Body>
                <strong>{props.abstract}</strong>
              </Popover.Body>
            </Popover>
          }
        >
          <Button variant="secondary">See Abstract</Button>
        </OverlayTrigger>
      </td>
      <td>
      <Link href={`/papers/reviews/${props.id}`} passHref legacyBehavior>
        <Button>See Reviews</Button>
        </Link>
      </td>
      <td>
        <Button variant="success" onClick={downloadHandler}>
          Download Paper
        </Button>
      </td>
    </tr>
  );
};

export default PaperElement;
