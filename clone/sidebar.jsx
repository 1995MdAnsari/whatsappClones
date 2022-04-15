import React, {Component} from "react";
import "./sidebarStyle.css"
class SideBarCom extends Component{

    render() {
    const  {user,date,curIndex,handleContact} = this.props;
    const {img, names,lastMsg} = user;
    let count = user.msgArr.length;


        return(
            <button className="details"
            onClick={()=>{handleContact(curIndex)}}>
                <div className="contactItem">
                    <div className="profileImg">
                        <img src={img} />
                    </div>
                     <div className="names">
                        <div className="userName">{names}</div><br/>
                        <span className="lastMsg">{lastMsg}</span>    
                    </div> 
                </div>
                <div className="date">{date}
                    <div className="seenMsg"><p>{count}</p></div>
                </div>
            </button>
        )
    }
}
export default SideBarCom;