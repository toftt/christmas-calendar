import React from 'react';

import TrackModal from './TrackModal';

const now = new Date();
const date = now.getDate();
const month = now.getMonth();

// use this when deploying
const today = month === 11 ? date : 0;

class Day extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false, forceShow: false };
  }

  handleForceShow = () => {
    console.log('hej')
    this.setState({forceShow: true});
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { date, track, toggleDrawer, mode } = this.props;

    const valid = mode === 'edit';
    const imageUrl = track && track.album.images[0].url;
    const show = (valid || this.state.forceShow) && imageUrl;
    
    let onClick = () => {};
    if (mode === 'edit' && !show) onClick = () => toggleDrawer(true, date);
    else if (mode === 'edit' && show) onClick = this.handleOpen;
    else {
      if (show) onClick = this.handleOpen;
      else onClick = this.handleForceShow;
    }

    return (
        <React.Fragment>
        <div
          className="day past"
          style={{
            backgroundImage: `url(${show ? imageUrl : 'http://www.designcouch.com/assets/images/christmaspresent11.svg'})`,
            backgroundSize: show ? '100% 100%' : '45%',
          }}
          onClick={onClick}
        >
          <span className="date">
            {date}
          </span>
        </div>
        <TrackModal
            open={this.state.open}
            date={date}
            mode={this.props.mode}
            track={track}
            handleClose={() => this.handleClose()}
          />
        </React.Fragment>
    );
  }
}

export default Day;
