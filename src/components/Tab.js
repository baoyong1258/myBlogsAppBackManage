import React from 'react';
import './Tab.css';

class Tab extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return (
            <div className="tab">
                <span className="icon-menu" onClick={this.props.toggleSidebar}></span>
            </div>
        )
    }
}

export default Tab;