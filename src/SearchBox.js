import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FormControl from '@material-ui/core/FormControl';
import Card from '@material-ui/core/Card';
import Input from '@material-ui/core/Input';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import TrackCard from './TrackCard';
import { addTrack } from './redux';
import { getTracks } from './api/api';

const styles = theme => ({
  card: {
    display: 'flex',
    width: '100%',
  },
  content: {
    flex: '1 0 auto',
  },
  search: {
    width: '100%',
  },
  container: {
    display: 'flex',
    width: 'inherit',
  },
  list: {
    width: '100%',
  },
  input: {
    fontSize: '1.3rem',
  }
});

class SearchBox extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      input: '',
      results: [],
    }
  }

  onChange = (e) => {
    e.preventDefault();
    this.setState({ input: e.target.value });
  } 

  onSubmit = (e) => {
    e.preventDefault();
    const { input } = this.state;  
    if (!input) this.setState({ input: 'Queen - Bohemian Rhapsody'});

    getTracks(this.props.token, this.state.input).then((data) => {
      this.setState({ results: data.tracks.items });
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div id="search_box">
        <List className={classes.list}>
        <ListItem>
        <form
          onSubmit={(e) => this.onSubmit(e)}
          autocomplete="off"
          className={classes.container}
        >
          <FormControl
            fullWidth
          >
            <Input
              className={classes.input}
              value={this.state.input}
              onChange={(e) => this.onChange(e)}
              placeholder="Search for a track"
            />
          </FormControl>
          </form>
        </ListItem>
        <ListItem></ListItem>
        {
          this.state.results.map((track) => (
            <ListItem onClick={() => this.props.addTrack(track)}>
              <TrackCard
                track={track}
              />
            </ListItem>
          ))
        }
        </List>
      </div>
    );
  }
}

const mapStateToProps = ({ token }) => {
  return { token };
};

export default connect(mapStateToProps, { addTrack })(withStyles(styles)(SearchBox));