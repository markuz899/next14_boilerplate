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
import { isIosDevice } from "@/utils/utils";

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

const typeLabel: any = {
  appointment: "Appuntamento",
  request: "Richiesta",
};

interface AppointmentProps {
  id?: number;
  title?: string;
  allDay?: boolean;
  start: Date;
  end?: Date;
  type?: string;
}

interface CalendarProps {
  appointment?: AppointmentProps[];
  onSelected?: any;
}

const Calendar = ({ appointment, onSelected }: CalendarProps) => {
  const [appoint, setAppoint] = useState(appointment);
  const [selected, setSelected] = useState<any>(null);
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
        title={typeLabel[selected?.type]}
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

  const navigate = () => {
    const uri = {
      google: `https://www.google.com/maps/dir/?api=1&destination=${selected?.position[0]}, ${selected?.position[1]}`,
      maps: `https://maps.apple.com/?daddr=${selected?.position[0]},${selected?.position[1]}`,
    };
    const isApple = isIosDevice();
    window.open(isApple ? uri.maps : uri.google, "_blank");
  };

  const type: any = {
    appointment: (
      <>
        <Button fluid onClick={close} kind="warning">
          CHIUDI
        </Button>
        <Button fluid onClick={close} kind="error">
          ANNULLA
        </Button>
        <Button fluid kind="primary" onClick={navigate}>
          NAVIGA
        </Button>
      </>
    ),
    request: (
      <>
        <Button fluid onClick={close} kind="warning">
          CHIUDI
        </Button>
        <Button fluid onClick={close} kind="error">
          RIFIUTA
        </Button>
        <Button fluid kind="success">
          ACCETTA
        </Button>
      </>
    ),
  };

  return (
    <ModalAppointment>
      <div className="content-info">
        <div className="row">
          <p className="bold">Nome:</p>
          <span>
            {typeLabel[selected?.type]} {selected?.title}
          </span>
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
      <div className="content-action">{type[selected?.type]}</div>
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
