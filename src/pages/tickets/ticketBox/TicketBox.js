// ticket box component for ticket page
import React from 'react' 

const TicketBox = ({ setShowTickets, name, tickets, color }) => {
  return (
    <div className="col-md-6 col-lg-3">
      <div
      onClick={() => setShowTickets(tickets)}
        data-testid="ticket-box"
        style={{
          borderColor: `${color}20`,
          color: `${color}`,
          backgroundColor: `${color}20`,
        }}
        className="mb-4 ticketBox card"
      >
        <div
          data-testid="ticket-box-body"
          className="px-5 py-3 rounded text-center"
        >
          <h1 data-testid="ticket-box-number">{tickets?.length}</h1>
          <h6 data-testid="ticket-box-title">{name}</h6>
        </div>
      </div>
    </div>
  );
};

export default TicketBox;
