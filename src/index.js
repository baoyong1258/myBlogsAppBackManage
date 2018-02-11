import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './styles/index.css';
import './styles/common.css';
import './fonts/style.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const Main = () => (
    <MuiThemeProvider>
        <App />
    </MuiThemeProvider>
)

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
