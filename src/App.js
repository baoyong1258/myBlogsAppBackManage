import React from 'react';
import Siderbar from './components/Sidebar';
import Tab from './components/Tab';
import Table from './components/Table';
import './styles/app.css';

class App extends React.Component {
    constructor(){
        super();
        this.state = {
            showSidebar: true,
        };
        this.toggleSidebar = this.toggleSidebar.bind(this);
    }

    toggleSidebar(){
        this.setState({
            showSidebar: !this.state.showSidebar
        })
    }

    render(){
        return(
            <div className="app">
                <Siderbar className="sidebar" showSidebar={this.state.showSidebar}></Siderbar>
                <div className="container">
                    <Tab className="tab" toggleSidebar={this.toggleSidebar}></Tab>
                    <Table className='table'></Table>
                </div>
            </div>
        )
    }
}

export default App;