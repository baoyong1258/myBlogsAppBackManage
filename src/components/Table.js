import React from 'react';
import './Table.css';
import { getSidebarDate } from '../apl';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
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
        }
    }

    componentDidMount(){
        getSidebarDate().then(res => {
            console.log(res);
            this.setState({
                sidebarList: res
            })
        })
    }

    render(){
        return (
            <div className="table">
                <div className="btnBox">
                    <RaisedButton label="添加" primary={true} className="addBtn"/>
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
                                        <span className="delete">删除</span>
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
            </div>
        )
    }
}

export default MyTable;