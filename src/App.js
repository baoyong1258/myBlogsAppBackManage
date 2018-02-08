import React, { Component } from 'react';
import './App.css';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';

import FontIcon from 'material-ui/FontIcon';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';


const styles = {
    title: {
        cursor: 'pointer',
    },
};

const iconStyles = {
    marginRight: 24,
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
      <div className="App">
          <AppBar
              title={<span style={styles.title}>Title</span>}
              iconElementLeft={<IconButton><NavigationClose /></IconButton>}
              iconElementRight={<FontIcon className="muidocs-icon-action-home"/>}
          />
          <FontIcon
              className="muidocs-icon-action-home"
              style={iconStyles}
              color={red500}
              hoverColor={greenA200}
          />
         <div>
          <Drawer open={this.state.open}>
              <List>
                  <Subheader>Nested List Items</Subheader>
                  <ListItem primaryText="Sent mail" leftIcon={<ContentSend />} />
                  <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
                  <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
                  <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
              </List>
          </Drawer>
         </div>
      </div>
    );
  }
}

export default App;
