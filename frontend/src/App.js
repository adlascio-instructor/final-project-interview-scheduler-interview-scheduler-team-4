import React, { useEffect, useState } from "react";

import "./App.scss";

import DayList from "./components/DayList";
import Appointment from "./components/Appointment";
import daysData from "./components/__mocks__/days.json";
import appointmentsData from "./components/__mocks__/appointments.json";

export default function Application() {
  const [day, setDay] = useState(daysData["Monday"]);
  const [days, setDays] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [interviewers, setInterviewers] = useState([]);

  const getDays = async() => {
    try{
    const res = await fetch("http://localhost:8000/days")
    const data = await res.json()
    setDays(data)
  } catch(error){
    console.log(error.message)
  }
  }

  const getInterviewers = async() => {
    try{
    const res = await fetch("http://localhost:8000/interviewers")
    const data = await res.json()
    setInterviewers(data)
  } catch(error){
    console.log(error.message)
  }
  }

  const getAppointments = async() => {
    try{
    const res = await fetch(`http://localhost:8000/appointments/${day.id}`)
    const data = await res.json()
    setAppointments(data)
  } catch(error){
    console.log(error.message)
  }
  }
  
  useEffect(() => {
    getDays ()
    getInterviewers ()
  }, [])

  useEffect(() => {
    getAppointments ()
  }, [day])

  async function bookInterview(id, interview) {
    const res = await fetch(`http://localhost:8000/interviews`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        student: interview.student, 
        interviewer_id: interview.interviewer.id,
        appointment_id: id
      })
    })
    console.log(res)
    console.log(id, interview);
    getAppointments ()
    const isEdit = appointments[id].interview;
/*     setAppointments((prev) => {
      const appointment = {
        ...prev[id],
        interview: { ...interview },
      };
      const appointments = {
        ...prev,
        [id]: appointment,
      };
      return appointments;
    });
    if (!isEdit) {
      setDays((prev) => {
        const updatedDay = {
          ...prev[day],
          spots: prev[day].spots - 1,
        };
        const days = {
          ...prev,
          [day]: updatedDay,
        };
        return days;
      });
    } */
  }

  async function editInterview(id, student, interviewer_id) {
    console.log(id, student, interviewer_id)
    const res = await fetch(`http://localhost:8000/interviews/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        student, 
        interviewer_id,
      })
    })
    console.log(res)
    getAppointments ()
  }

  async function cancelInterview(id, interviewId) {
    const res = await fetch(`http://localhost:8000/interviews/${interviewId}`, {
      method: "DELETE"
    })
    console.log(res)

    setAppointments((prev) => {
      const index = prev.findIndex((app) => app.id == id)
      const updatedApp = {
        ...prev[index],
        interview:null
      }
      const updatedApps = [...prev]
      updatedApps [index] = updatedApp 
      console.log(updatedApps)
      return updatedApps;
    });
    /* setDays((prev) => {
      const updatedDay = {
        ...prev[day],
        spots: prev[day].spots + 1,
      };
      const days = {
        ...prev,
        [day]: updatedDay,
      };
      return days;
    }); */
  }
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={days} value={day.name} onChange={setDay} />
        </nav>
      </section>
      <section className="schedule">
        {Object.values(appointments).map((appointment) => (
          <Appointment
            key={appointment.id}
            {...appointment}
            bookInterview={(interview) =>
              bookInterview(appointment.id, interview)
            }
            cancelInterview={cancelInterview}
            interviewers ={interviewers}
            editInterview ={editInterview}
          />
        ))}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
