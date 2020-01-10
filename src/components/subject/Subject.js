import React from "react";
import Aux from "../../hoc/Auxiliary";
import { Button } from "react-bootstrap";

const redirectToUpdate = (id, history) => {
  history.push("/updateSubject/" + id);
};

const redirectToDelete = (id, history) => {
  history.push("/deleteSubject/" + id);
};

const Subject = props => {
  const moment = require("moment");
  return (
    <Aux>
      <tr>
        <td>{props.subject.Id}</td>
        <td>{props.subject.Description}</td>
        <td>{props.subject.CoursesNo}</td>
        <td>
          {" "}
          {props.subject.CreatedOn != null
            ? moment(props.subject.CreatedOn).format("DD/MM/YYYY")
            : null}
        </td>
        <td>
          {props.subject.ModifiedOn != null
            ? moment(props.subject.ModifiedOn).format("DD/MM/YYYY")
            : null}
        </td>
        <td>
          <Button
            variant="outline-info"
            onClick={() => redirectToUpdate(props.subject.Id, props.history)}
          >
            Update
          </Button>
        </td>
        <td>
          <Button
            variant="outline-danger"
            onClick={() => redirectToDelete(props.subject.Id, props.history)}
          >
            Delete
          </Button>
        </td>
      </tr>
    </Aux>
  );
};

export default Subject;
