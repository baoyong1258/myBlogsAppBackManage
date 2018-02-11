import React from 'react';
import './Sidebar.css';

class Sidebar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dataList: ['blogs管理'],
            width: 200,
        }
        this.hide = this.hide.bind(this);
    }

    hide(){
        this.setState({
            width: 0
        })
    }

    render(){
        return (
            <div className="sidebar">
                <ul className="sidebar" style={{width: this.props.showSidebar ? '200px' : '0px'}}>
                    <li className="head">blogs后台管理</li>
                    {
                        this.state.dataList.map((item, index) => <li key={index}>{item}</li>)
                    }
                </ul>
            </div>
        )
    }
}

export default Sidebar;