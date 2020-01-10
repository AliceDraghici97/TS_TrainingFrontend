import React from "react";
import Aux from "../../hoc/Auxiliary";
import { Button } from "react-bootstrap";

const redirectToUpdate2 = (id, history) => {
  history.push("/updateStudent2/" + id);
};

const redirectToDelete = (id, history) => {
  history.push("/deletestudent/" + id);
};

const Student = props => {
  const moment = require("moment");
  return (
    <Aux>
      <tr>
        <td>{props.student.Id}</td>
        <td>{props.student.Name}</td>
        <td>{props.student.Surname}</td>
        <td>{props.student.PhoneNo}</td>
        <td>
          {" "}
          {props.student.CreatedOn != null
            ? moment(props.student.CreatedOn).format("DD/MM/YYYY")
            : null}
        </td>
        <td>
          {props.student.ModifiedOn != null
            ? moment(props.student.ModifiedOn).format("DD/MM/YYYY")
            : null}
        </td>
        <td>
          <Button
            variant="outline-danger"
            onClick={() => redirectToUpdate2(props.student.Id, props.history)}
          >
            Update
          </Button>
        </td>
        <td>
          <Button
            variant="outline-danger"
            onClick={() => redirectToDelete(props.student.Id, props.history)}
          >
            Delete
          </Button>
        </td>
        <td></td>
      </tr>
    </Aux>
  );
};

export default Student;
