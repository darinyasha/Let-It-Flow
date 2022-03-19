import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Calendar from 'react-awesome-calendar';
import "./Profile.css";
import axios from 'axios';
import Remind from './../Remind/Remind'

export default function Profile(props) {

  const { user: {userData: { user }} } = useSelector(state => state)

  const [title, setTitle] = useState()

  const [events, setEvents] = useState()


    useEffect(() => {
      axios(`http://localhost:4000/profile/${user.id}`)
      .then(({data}) => {
        setEvents(data)
      })
    }, [])

  function handleSubmit(event) {
    event.preventDefault();

  	const payload = {
			date: event.target.date.value,
			title: event.target.title.value,
      user_id: user.id,
		};

    axios.post('http://localhost:4000/profile/event', payload)
    .catch(console.error());
    setTitle('')
	};

  const newEvents = events?.map((event) => {
    event.color = '#fd3153';
    event.from = event.date;
    event.to = event.date;
    return event
  })
 


  return (
    <div className="container divider">
      <div className="wrapper">
        <div>
          <h2>Привет, {user.first_name} {user.last_name}</h2>
          <div>
            <h3>Контакты</h3>
            <p>{user.email}</p>
            <p>{user.phone}</p>
          </div>
          <p>В своем личном кабинете ты можешь отметить дни, в которые ты бы хотел получать букеты цветов</p>
          <form onSubmit={handleSubmit}>
            <div className="card-input">
              <label className="card-input__label">Выберите дату</label>
              <input type="date" name="date" id="" className="card-input__input" />
            </div>
            <div className="card-input">
              <label className="card-input__label">Какое событие</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="card-input__input"  type="text" name="title" required />
            </div>
            <button className="btn">Записать дату</button>
          </form>
        </div>
        <div className="calendar">
        <Calendar events={newEvents} />
        </div>
      </div>
    </div>
  );
}
