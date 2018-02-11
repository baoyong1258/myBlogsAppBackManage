import React from 'react';
import './Table.css';
import { getSidebarDate,removeSidebarDate } from '../apl';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

class MyTable extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sidebarList: [],
            open: false,
            openAddDialog: true,
        };
        this.showAddDialog = this.showAddDialog.bind(this);
        this.hideAddDialog = this.hideAddDialog.bind(this);
    }

    removeData(title){
        console.log('title = ' + title);
        removeSidebarDate(title).then(res => {
            console.log(res);
        })
    }

    showAddDialog(){
        this.setState({
            openAddDialog: true
        })
    }

    hideAddDialog (){
        this.setState({
            openAddDialog: false
        });
    };

    componentDidMount(){
        getSidebarDate().then(res => {
            console.log(res);
            this.setState({
                sidebarList: res
            })
        })
    }

    render(){
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.hideAddDialog}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.hideAddDialog}
            />,
        ];
        return (
            <div className="table">
                <div className="btnBox">
                    <RaisedButton label="添加" primary={true} className="addBtn" onClick={this.showAddDialog}/>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>序号</TableHeaderColumn>
                            <TableHeaderColumn>标题</TableHeaderColumn>
                            <TableHeaderColumn>子列表数量</TableHeaderColumn>
                            <TableHeaderColumn>操作</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            this.state.sidebarList.map((item, index) => (
                                <TableRow key={index}>
                                    <TableRowColumn>{index + 1}</TableRowColumn>
                                    <TableRowColumn>{item.title}</TableRowColumn>
                                    <TableRowColumn>{item.children.length}</TableRowColumn>
                                    <TableRowColumn className='handle'>
                                        <span className="edit">编辑</span>
                                        <span> | </span>
                                        <span className="delete" onClick={() => {this.removeData(item.title)}}>删除</span>
                                    </TableRowColumn>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                <Dialog
                    title="Dialog With Actions"
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                </Dialog>
                {/* 添加的dialog */}
                <Dialog
                    title="添加列表"
                    actions={actions}
                    modal={false}
                    open={this.state.openAddDialog}
                    onRequestClose={this.handleClose}
                >
                    <div className="father">
                        <span>主标题: </span>
                        <TextField
                            hintText="Hint Text"
                        /><br />
                    </div>
                    <div className="son">
                        <div className="item">
                            <span>子标题: </span>
                            <TextField
                                className='TextField'
                                hintText="Hint Text"
                                style={{width: '70%'}}
                                value="hello"
                            />
                        </div>
                        <div className="item">
                            <span>url: </span>
                            <TextField
                                className='TextField'
                                hintText="Hint Text"
                                style={{width: '70%'}}
                            />
                        </div>
                        <div className="item">
                            <span>as: </span>
                            <TextField
                                className='TextField'
                                hintText="Hint Text"
                                style={{width: '70%'}}
                            />
                        </div>
                    </div>
                </Dialog>
            </div>
        )
    }
}

export default MyTable;