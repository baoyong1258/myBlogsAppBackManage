import React from 'react';
import './Table.css';
import { getSidebarDate,removeSidebarDate,addSidebarDate,updateSidebarData } from '../apl';
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
            editItem: {
                title: 'child',
                children: [
                    {
                        title: 'index',
                        url:'hhj',
                        as: 'ghgjh',
                    }
                ]
            },
            open: false,
            openAddDialog: false,
            openEditDialog: false,
            value: 'Property Value',
            fatherTitle: '',
            sonItemList: [
                {
                    title: '',
                    url: '',
                    as: '',
                },{
                    title: '',
                    url: '',
                    as: '',
                }
            ]
        };
        this.showAddDialog = this.showAddDialog.bind(this);
        this.hideAddDialog = this.hideAddDialog.bind(this);
        this.hideAddDialog2 = this.hideAddDialog2.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChangeFather = this.handleChangeFather.bind(this);
        this.addSonItem = this.addSonItem.bind(this);
        this.delSonItem = this.delSonItem.bind(this);
        this.submit = this.submit.bind(this);
        this.submit2 = this.submit2.bind(this);
        this.editData = this.editData.bind(this);
    }

    removeData(title){
        console.log('title = ' + title);
        removeSidebarDate(title).then(res => {
            getSidebarDate().then(res => {
                this.setState({
                    sidebarList: res
                })
            })
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

    hideAddDialog2 (){
        this.setState({
            openEditDialog: false
        });
    };

    handleChange(event, index, type){
        let newValue = event.target.value;
        this.setState({
            sonItemList: this.state.sonItemList.map((item, i) => {
                if(i === index){
                    item[type] = newValue;
                    return item;
                }
                return item;
            })
        })
    }

    handleChange2(event, index, type){
        let newValue = event.target.value;
        this.setState({
            editItem: {
                ...this.state.editItem,
                children: this.state.editItem.children.map((item, i) => {
                    if(i === index){
                        item[type] = newValue;
                        return item;
                    }
                    return item;
                })
            }
        })
    }

    handleChangeFather(event){
        this.setState({
            fatherTitle: event.target.value,
        });
    }

    addSonItem(){
        let obj = {
            title: '',
            url: '',
            as: '',
        };
        this.setState({
            sonItemList: [...this.state.sonItemList, obj]
        })
    }

    delSonItem(index){
        this.setState({
            sonItemList: this.state.sonItemList.filter((item, i) => {
                if(index === i){
                    return false;
                }
                return true;
            })
        })
    }

    submit(){
        let obj = Object.assign({}, {title: this.state.fatherTitle}, {children: this.state.sonItemList});
        console.log(obj);
        console.log(JSON.stringify(obj));
        addSidebarDate(JSON.stringify(obj)).then(res => {
            this.setState({
                openAddDialog: false
            });
            getSidebarDate().then(res => {
                this.setState({
                    sidebarList: res
                })
            })
        })
    }

    submit2(){
        console.log(this.state.editItem);
        updateSidebarData(JSON.stringify(this.state.editItem)).then(res => {
            this.setState({
                openEditDialog: false
            });
            getSidebarDate().then(res => {
                this.setState({
                    sidebarList: res
                })
            })
        })
    }

    editData(index){
        this.setState({
            editItem: this.state.sidebarList[index]
        })
        this.setState({
            openEditDialog: true
        });
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
                onClick={this.submit}
            />,
        ];
        const actions2 = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.hideAddDialog2}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.submit2}
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
                                        <span className="edit" onClick={() => this.editData(index)}>编辑</span>
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
                            value={this.state.fatherTitle}
                            onChange={(event) => {this.handleChangeFather(event)}}
                        /><br />
                    </div>

                    {
                        this.state.sonItemList.map((item, index) => (
                            <div className="son" key={index}>
                                <div className="item">
                                    <span>子标题: </span>
                                    <TextField
                                        className='TextField'
                                        hintText="Hint Text"
                                        style={{width: '70%'}}
                                        value={this.state.sonItemList[index].title}
                                        onChange={(event) => {this.handleChange(event, index, 'title')}}
                                    />
                                </div>
                                <div className="item">
                                    <span>url: </span>
                                    <TextField
                                        className='TextField'
                                        hintText="Hint Text"
                                        style={{width: '70%'}}
                                        value={this.state.sonItemList[index].url}
                                        onChange={(event) => {this.handleChange(event, index, 'url')}}
                                    />
                                </div>
                                <div className="item">
                                    <span>as: </span>
                                    <TextField
                                        className='TextField'
                                        hintText="Hint Text"
                                        style={{width: '70%'}}
                                        value={this.state.sonItemList[index].as}
                                        onChange={(event) => {this.handleChange(event, index, 'as')}}
                                    />
                                </div>
                                <div className="delete" onClick={() => {this.delSonItem(index)}}>删除</div>
                            </div>
                        ))
                    }
                    <div className="btnBox">
                        <RaisedButton label="添加" primary={true} className="addBtn" onClick={this.addSonItem}/>
                    </div>
                </Dialog>
                {/* 编辑的dialog */}
                <Dialog
                    title="修改列表"
                    actions={actions2}
                    modal={false}
                    open={this.state.openEditDialog}
                    onRequestClose={this.handleClose}
                >
                    <div className="father">
                        <span>主标题: </span>
                        <TextField
                            hintText="Hint Text"
                            disabled={true}
                            value={this.state.editItem.title}
                        /><br />
                    </div>

                    {
                        this.state.editItem.children.map((item, index) => (
                            <div className="son" key={index}>
                                <div className="item">
                                    <span>子标题: </span>
                                    <TextField
                                        className='TextField'
                                        hintText="Hint Text"
                                        style={{width: '70%'}}
                                        value={item.title}
                                        onChange={(event) => {this.handleChange2(event, index, 'title')}}
                                    />
                                </div>
                                <div className="item">
                                    <span>url: </span>
                                    <TextField
                                        className='TextField'
                                        hintText="Hint Text"
                                        style={{width: '70%'}}
                                        value={item.url}
                                        onChange={(event) => {this.handleChange2(event, index, 'url')}}
                                    />
                                </div>
                                <div className="item">
                                    <span>as: </span>
                                    <TextField
                                        className='TextField'
                                        hintText="Hint Text"
                                        style={{width: '70%'}}
                                        value={item.as}
                                        onChange={(event) => {this.handleChange2(event, index, 'as')}}
                                    />
                                </div>
                                <div className="delete" onClick={() => {this.delSonItem(index)}}>删除</div>
                            </div>
                        ))
                    }
                    <div className="btnBox">
                        <RaisedButton label="添加" primary={true} className="addBtn" onClick={this.addSonItem}/>
                    </div>
                </Dialog>
            </div>
        )
    }
}

export default MyTable;