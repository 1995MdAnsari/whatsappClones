import React, { Component }  from "react";
import "./chatStyle.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMicrophone,faSearch,faEllipsisVertical,faPaperclip,faLaptop,faPaperPlane} from "@fortawesome/free-solid-svg-icons";


class ChatRightPanel extends Component{

    state = {
        messageData : {message:''},
        showMsg : '',
    }

    handleChange = (e) =>{
        let s = {...this.state};
        s.messageData[e.currentTarget.name]= e.currentTarget.value;
        console.log(s.messageData)
        this.setState(s);
    }

    submitHandle = (e) =>{
        let s = {...this.state};
        e.preventDefault();
        this.props.onSubmit(this.state.messageData);
        s.messageData.message = '';
        this.setState(s)  
    }


    render() {        
        const {sendMsg,chatUser,sendMsgArr,users} = this.props;
        const {img,names} = chatUser;
        let { messageData} = this.state;
        let {message} = messageData;
        let userData=users.filter((n)=>n.names===chatUser.names)

        const current = new Date();

        const time = current.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        // hour12: false
        });

        return(
            <React.Fragment>
            {sendMsg===0 ?
                <div className="data">
                    <img src={require('../img/welcome.jpeg')} alt="connected" />
                    <p className="para1">Keep your phone connected</p>
                    <p className="para2">WhatsApp connected to your phone to sync message. To reduce data usage, connect your phone to Wi-Fi.</p>
                    <hr />
                    <p className="para3">
                    <FontAwesomeIcon icon={faLaptop} style={{'padding-right':'3px',opacity:'0.7'}}/>
                    Make calls from desktop with WhatsApp for Windows. Get it here.</p>
                </div>
                
            : 
            <div className="chat">
                <div className="chat_header">
                    <img src={img} alt="Image"/>

                    <div className="userNames">
                        <div className="chatUserName">{names}</div>
                        <span className="lastSeen">
                        last seen at {time}</span>
                    </div>
                    <div className="icons">
                        <div className="rightIcons">
                                
                        </div>
                    </div>
                </div>


                <div className="chat_body">
                    <p className="chat_message 
                    ">
                        <span className="chat_name">
                            Taslim
                        </span>
                        This is last message
                        <span className="chat_time">
                            {time}
                        </span>
                    </p>
                    <p className=" 
                    chat_reciever">
                       
                        {userData.map((num)=>(
                            num.msgArr.map((m)=>(
                            <p className="sendMsgArr">{m}
                            <span className="chat_time">
                            {time}
                            </span>
                            </p>
                            ))
                        ))}
                        
                    </p>
                </div>

                <div className="chat_footer">
                    <div className="icon">
                        <img src={require('../img/emoji.png')} 
                        />
                    </div>
                    <div className="icon">
                        <FontAwesomeIcon 
                        style={{opacity:"0.5",cursor: "pointer"}}
                        icon={faPaperclip}
                        />
                    </div>

                    <form onSubmit={this.submitHandle}>
                        <input 
                        type="text"
                        name="message"
                        value={message}
                        placeholder="Type a message"
                        onChange={this.handleChange}
                        />
                                    
                    </form>

                
                    <div className="icon">
                        <FontAwesomeIcon 
                        style={{opacity:"0.5",cursor: "pointer"}}
                        icon={faMicrophone} />
                    </div>
                </div>

            </div>

            }
            </React.Fragment>
        )
    }
}
export default ChatRightPanel;