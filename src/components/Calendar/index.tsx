import React, { useEffect, useState } from "react";
import { Calendar as CalendarBig, dateFnsLocalizer } from "react-big-calendar";
import { it } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import styled from "styled-components";
import theme from "@/theme";
import dayjs from "dayjs";
import { Modal, Map, Button } from "..";
import { FORMAT_DATA } from "@/utils/constants";

const locales = {
  it: it,
};

const messages = {
  week: "Settimana",
  work_week: "Settimana lavorativa",
  day: "Giorno",
  month: "Mese",
  previous: "Indietro",
  next: "Avanti",
  today: "Oggi",
  agenda: "Agenda",
  // showMore: (total:any) => `+${total} piu`,
};

interface AppointmentProps {
  id?: number;
  title?: string;
  allDay?: boolean;
  start: Date;
  end?: Date;
}

interface CalendarProps {
  appointment?: AppointmentProps[];
  onSelected?: any;
}

const Calendar = ({ appointment, onSelected }: CalendarProps) => {
  const [appoint, setAppoint] = useState(appointment);
  const [selected, setSelected] = useState(null);
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  useEffect(() => {
    setAppoint(appointment);
  }, [appointment]);

  const handleSelect = (event: any) => {
    setSelected(event);
    onSelected && onSelected(event);
  };

  const handleCloseModal = () => {
    setSelected(null);
  };

  return (
    <ContentCalendar>
      <CalendarBig
        localizer={localizer}
        messages={messages}
        culture="it"
        events={appoint}
        defaultView="month"
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={handleSelect}
      />
      <Modal
        isVisible={selected || false}
        onClickOther
        title="Appointment modal"
        onClose={handleCloseModal}
        render={({ close }) => (
          <RenderModalAppointment
            close={close}
            state={{ selected, setSelected }}
          />
        )}
      />
    </ContentCalendar>
  );
};

export default React.memo(Calendar);

const RenderModalAppointment = ({ close, state }: any) => {
  const { selected } = state;
  return (
    <ModalAppointment>
      <div className="content-info">
        <div className="row">
          <p className="bold">Nome:</p>
          <span>{selected?.title}</span>
        </div>
        <div className="row">
          <p className="bold">Ora di inizio:</p>
          <span>{dayjs(selected?.start).format(FORMAT_DATA)}</span>
        </div>
        <div className="row">
          <p className="bold">Ora di fine:</p>
          <span>{dayjs(selected?.end).format(FORMAT_DATA)}</span>
        </div>
        <div className="content-map">
          <Map
            height={"300px"}
            dinamic
            center={selected.position}
            selection={selected}
            zoom={18}
          />
        </div>
      </div>
      <div className="content-action">
        <Button fluid onClick={close} kind="error">
          CHIUDI
        </Button>
        <Button fluid onClick={close} kind="warning">
          ANNULLA
        </Button>
        <Button fluid kind="primary">
          CONFERMA
        </Button>
      </div>
    </ModalAppointment>
  );
};

const ModalAppointment = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 75px);
  .content-info {
    .row {
      display: flex;
      align-items: center;
      gap: ${theme.spaces.space1};
    }
    .content-map {
      margin: ${theme.spaces.space2} 0;
    }
  }
  .content-action {
    display: flex;
    align-items: center;
    gap: ${theme.spaces.space4};
  }
`;

const ContentCalendar = styled.div`
  .rbc-btn-group {
    .rbc-active {
      background-color: ${theme.colors.primary}!important;
      color: ${theme.colors.white}!important;
    }
    button {
      &:hover {
        background-color: ${theme.colors.primaryLight}!important;
        color: ${theme.colors.white}!important;
      }
    }
  }
  .rbc-event {
    background-color: ${theme.colors.primary};
  }
  .rbc-day-bg {
    &.rbc-today {
      background-color: ${theme.colors.greyIcon};
    }
  }
`;
