import React, { useEffect, useState } from "react";

import "./App.scss";

import DayList from "./components/DayList";
import Appointment from "./components/Appointment";
 
/* import daysData from "./components/__mocks__/days.json";
import appointmentsData from "./components/__mocks__/appointments.json"; */

export default function Application() {
  const [day, setDay] = useState(daysData["Monday"]);
  const [days, setDays] = useState(daysData);
  const [appointments, setAppointments] = useState(appointmentsData);

  const getDays = async() => {
    try{
    const res = await fetch("http://localhost:8000/days")
    const data = await res.json()
    setDays(data)
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
  }, [])

  useEffect(() => {
    getAppointments ()
  }, [day])

  function bookInterview(id, interview) {
    console.log(id, interview);
    const isEdit = appointments[id].interview;
    setAppointments((prev) => {
      const appointment = {
        ...prev[id],
        interview: { ...interview },
      };
      const appointments = {
        ...prev,
        [id]: appointment,
      };

/* socket for sending appointments needs communication */

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
    }
  }


  function cancelInterview(id) {
    fetch("http://localhost:8000/deleteAppointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        appointment_id: id,
      }),
    });

    setAppointments((prev) => {
      const updatedAppointment = {
        ...prev[id],
        interview: null,
      };
      const appointments = {
        ...prev,
        [id]: updatedAppointment,
      };

/* socket? */

      return appointments;
    });

    setDays((prev) => {
      const updatedDay = {
        ...prev[day],
        spots: prev[day].spots + 1,
      };
      const days = {
        ...prev,
        [day]: updatedDay,
      };
      return days;
    });
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
          <DayList days={days} value={day} onChange={setDay} />
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
          />
        ))}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
