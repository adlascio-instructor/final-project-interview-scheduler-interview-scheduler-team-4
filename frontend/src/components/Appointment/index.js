import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Confirm from "./Confirm";

import "./styles.scss";

const Appointment = (props) => {
  const [add, setAdd] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  
  
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    setEdit(false);
    props.bookInterview(interview);
  }

  /*
  const interviewers = [
    { id: 1, name: "Shawn Mendez", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
    { id: 2, name: "Christina Aguilera", avatar: "https://i.imgur.com/T2WwVfS.png" },
    { id: 3, name: "Sam Smith", avatar: "https://i.imgur.com/FK8V841.jpg" },
    { id: 4, name: "Billie Eilish", avatar: "https://i.imgur.com/twYrpay.jpg" },
    { id: 5, name: "David Guetta", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  ]; */

  return (
    <article className="appointment">
      <Header time={props.time} />
      {props.interview ? (
        isDeleting ? (
          <Confirm
            message={"Are you sure you want to delete?"}
            onCancel={() => setIsDeleting(false)}
            onConfirm={() => {
              props.cancelInterview(props.id);
              setIsDeleting(false);
            }}
          />
        ) : edit ? (
          <Form
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            interviewers={interviewers}
            appointment_id={props.id}
            onSave={save}
            onCancel={() => setEdit(false)}
          />
        ) : (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            interviewers={interviewers}
            onEdit={() => setEdit(true)}
            onDelete={() => setIsDeleting(true)}
          />
        )
      ) : add ? (
        <Form
          interviewers={interviewers}
          onSave={save}
          onCancel={() => setAdd(false)}
        />
      ) : (
        <Empty onAdd={() => setAdd(true)} />
      )}
    </article>
  );
};

export default Appointment;
