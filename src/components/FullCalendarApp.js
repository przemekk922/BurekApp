import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import styled from "styled-components";
import { useState, useEffect } from "react";


const StyledCalendar = styled.div`
  width: 80%;
  height: 200px;
  margin: 50px auto;
`;
  const SCOPES =
  "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar";
  const API_KEY = "AIzaSyDOd8dwFCTPMlsdtuZUqTeBnN5si2ivVrc";
  const CLIENT_ID = "760511214126-kuj6qhghrgctggpdge4b90auqrcs7id2.apps.googleusercontent.com";
  
export const FullCalendarApp = () => {
  const [events, setEvents] = useState(null);

  
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = "https://apis.google.com/js/api.js";
    
    document.body.appendChild(script);
    
    script.addEventListener("load", () => {
      if (window.gapi) handleClientLoad();
    });
  }, []);
  
  const handleClientLoad = () => {
    window.gapi.load("client:auth2", initClient);
  };

  const openSignInPopup = () => {
    window.gapi.auth2.authorize(
      { client_id: CLIENT_ID, scope: SCOPES },
      (res) => {
        if (res) {
          if (res.access_token)
            localStorage.setItem("access_token", res.access_token);

          // Load calendar events after authentication
          window.gapi.client.load("calendar", "v3", listUpcomingEvents);
        }
      }
    );
  };

  const initClient = () => {
    if (!localStorage.getItem("access_token")) {
      openSignInPopup();
    } else {
      // Get events if access token is found without sign in popup
      fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?key=${API_KEY}&orderBy=startTime&singleEvents=true`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
        .then((res) => {
          // Check if unauthorized status code is return open sign in popup
          if (res.status !== 401) {
            return res.json();
          } else {
            localStorage.removeItem("access_token");

            openSignInPopup();
          }
        })
        .then((data) => {
          if (data?.items) {
            setEvents(formatEvents(data.items));
          }
        });
    }
  };

  const listUpcomingEvents = () => {
    window.gapi.client.calendar.events
      .list({
        // Fetch events from user's primary calendar
        calendarId: "primary",
        showDeleted: true,
        singleEvents: true,
      })
      .then(function (response) {
        let events = response.result.items;

        if (events.length > 0) {
          setEvents(formatEvents(events));
        }
      });
  };

  const formatEvents = (list) => {
    return list.map((item) => ({
      title: item.summary,
      start: item.start.dateTime || item.start.date,
      end: item.end.dateTime || item.end.date,
    }));
  };
  
  return (
    <StyledCalendar>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          center: "dayGridMonth,timeGridWeek,timeGridDay new",
        }}
        initialView="dayGridMonth"
        events={events}
      />
      {/* <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        editable={true}
        initialView="dayGridMonth"
        headerToolbar={{
          center: "dayGridMonth,timeGridWeek,timeGridDay new",
        }}
        customButtons={{
          new: {
            text: "new",
            click: (e) => e.addEvent({id: 2,
              title: "event 2",
              start: "2022-02-02T13:00:00",
              end: "2022-02-07T18:00:00",}) 
          },
        }}
        events={events}
        eventColor="red"
        nowIndicator
        dateClick={(e) => console.log(e.dateStr)}
        eventClick={(e) => console.log(e.event.id)}
      /> */}
    </StyledCalendar>
  );
};
