import React, {Component} from "react";
import "./app.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEllipsisVertical,faMessage} from "@fortawesome/free-solid-svg-icons";
import SideBarCom from "./sidebar";
import ChatRightPanel from "./rightCom"
class MainWhatsApp extends Component{

    state = {
        users : [
            {img:"https://www.pngitem.com/pimgs/m/50-503554_business-girl-png-business-woman-images-png-transparent.png", names:"Anna",msgArr:[],lastMsg:''},

            {img:"https://pngimg.com/uploads/thinking_man/thinking_man_PNG11613.png", 
                 names:"Smith", msgArr:[], lastMsg:''},
            {img:"https://freerangestock.com/sample/127694/indian-man-.jpg", names:"Jack",msgArr:[], lastMsg:''},

            {img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQApNrapgj2zujVlrPz3VS7JcX3JAQXx3pNg79Ft8mKWIzgmbGrULGw2PYbQcvtuEkajPQ&usqp=CAU", 
            names:"Dolly",msgArr:[], lastMsg:''},

            {img:"https://png.pngitem.com/pimgs/s/179-1796406_thinking-man-download-transparent-png-image-man-thinking.png", names:"Bob",msgArr:[], lastMsg:''},

            {img:"https://files.oyebesmartest.com/uploads/large/indian-girl-png-transpak6ktt.png", names:"Ankita",msgArr:[], lastMsg:''},
        ],
        searchUser:{search:''},
        notFound:0,
        
        date : '',
        sendMsg:0,
        curIndex:-1,
        currentUser:'',
        chatUser:{},
        sendMsgArr :[]
    } 

    componentDidMount(){
        let s = {...this.state}
        const currDate= new Date().toLocaleDateString();
        s.date = currDate;
        this.setState(s)
    }
    
    
    handleContact = (index) => {
        let s = {...this.state};
        s.curIndex=index;
        s.chatUser=s.users[index];
        s.sendMsg=1;
        this.setState(s);
    }

    messageHandle = (mess) =>{
        let s = {...this.state};
        
        let data = mess;
        if(data.message.match(/[a-zA-Z!@#$^_=]/g))
        {   
            console.log(data.message);
            s.sendMsgArr.push(data.message);
        }
        else
        {   
            let arr = data.message;
            let results = eval(arr);
            let send = `Give me problem ${results}`
            console.log(send);
            s.sendMsgArr.push(send);
        }

        let findname = s.chatUser.names;
        s.users.find((num)=>
            {   
                if(data.message!==''){
                   
                    if(num.names===findname)
                    {
                        let chatMsg = data.message;
                        let len = data.message.length;
                        console.log(chatMsg)
                        if(data.message.match(/[a-zA-Z!@#$^_=]/g))
                        {
                            num.lastMsg=data.message;
                            num.msgArr.push(data.message);
                        }

                        else
                        {
                            let results = eval(data.message);
                            num.lastMsg=data.message;
                            let send = `Give me another problem. ${data.message}=${results}`;
                            num.msgArr.push(send);

                        }
                    }

                }
                
            });
        this.setState(s);
    }
    
    hendleSearch = (e) =>{
        let s = {...this.state};
        s.searchUser[e.currentTarget.name]= e.currentTarget.value;
        this.setState(s)
    }


    render() {
        let  {users,date,sendMsg,chatUser,sendMsgArr,searchUser} = this.state;
        let {search} = searchUser;
        return(
            <div className="App">
                <div className="app_body">
                    <div className=" leftPanel">
                        <div className="profile">
                            <img src={require('../img/proimg.webp')} alt="Profile" />
                                <span className="newChat">
                                    <FontAwesomeIcon icon={faMessage} 
                                    style={{opacity:'0.6', fontSize:'20px'}}/>
                                    <span className="menuIcon">
                                    <FontAwesomeIcon icon={faEllipsisVertical} 
                                    style={{opacity:'0.6', fontSize:'20px'}}/>
                                    </span>
                                </span>
                        </div>
                        <div className="search">
                            <input type="text" 
                            placeholder="Search or start new chat"
                            name="search" 
                            value="Search"
                            onChange={this.hendleSearch}
                            />
                        </div>
                       
                        {users.map((u,index)=>{
                            return (
                                <React.Fragment>
                                <div className="userList">
                                <SideBarCom user={u} 
                                date={date}
                                curIndex={index}
                                handleContact={this.handleContact}/>
                                </div>
                                </React.Fragment>
                            )
                        })}

                    </div>
                        <ChatRightPanel 
                        sendMsg={sendMsg} 
                        chatUser={chatUser}
                        users = {users}
                        sendMsgArr={sendMsgArr}
                        onSubmit={this.messageHandle}
                        />
                </div>
            </div>
        )
    }
}
export default MainWhatsApp;