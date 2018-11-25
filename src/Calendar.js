import React from 'react';
import { connect } from 'react-redux';

import ShareButton from './ShareButton';
import TrackModal from './TrackModal';

const DayLabels = () => (
  <div id="day-labels">
    <div class="label">Sun</div>
    <div class="label">Mon</div>
    <div class="label">Tue</div>
    <div class="label">Wed</div>
    <div class="label">Thu</div>
    <div class="label">Fri</div>
    <div class="label">Sat</div>
</div>
);

const dayMap = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
};

const weeks = [
  {
    id: 'one',
    days: [null, null, null, null, null, null, 1],
  },
  {
    id: 'two',
    days: [2, 3, 4, 5, 6, 7, 8],
  },
  {
    id: 'three',
    days: [9, 10, 11, 12, 13, 14, 15],
  },
  {
    id: 'four',
    days: [16, 17, 18, 19, 20, 21, 22],
  },
  {
    id: 'five',
    days: [23, 24, null, null, null, null, null],
  },

];

const currentFakeDay = 6;

class Day extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { date, track, toggleDrawer, mode } = this.props;

    const valid = (track && date <= currentFakeDay) || mode === 'edit';
    const imageUrl = track && track.album.images[0].url;
    const show = valid && imageUrl;
    return (
        <div
          className="day past"
          style={{
            backgroundImage: `url(${show ? imageUrl : 'http://www.designcouch.com/assets/images/christmaspresent11.svg'})`,
            backgroundSize: show ? '100% 100%' : '45%',
          }}
          onClick={mode === 'edit' ? () => toggleDrawer(true, date) : this.handleOpen}
        >
          <span className="date">
            {date}
          </span>
          <TrackModal
            open={this.state.open}
            handleClose={this.handleClose}
          />
        </div>
    );
  }
}

class Calendar extends React.Component {
  render() {
    const toggleDrawer = this.props.toggleDrawer;
   return (
  <div id="calendar_wrapper">
  <h1>Spotify Christmas Calendar</h1>
<section id="calendar" class="collectonme">
  <DayLabels />
  {
    weeks.map((week) => (
    <div id={week.id} className="week">
      {
        week.days.map((day) => {
          if (day === null) return <div className="day noDate"></div>;
          else {
            const currentTrack = this.props.tracks[day - 1];
            return <Day
                      date={day}
                      track={currentTrack}
                      toggleDrawer={toggleDrawer}
                      mode={this.props.mode}
                    />
          }
        })
      }
    </div>
    ))
  }
</section>
<ShareButton />
<div id="bottom" class="collectonme"></div>
</div>
);
  }
}

const mapStateToProps = ({ tracks }) => ({
  tracks,
});

export default connect(mapStateToProps)(Calendar);