const dom = document.querySelector('chat-window')
export class Message extends React.Component {
    constructor(props) {
        super(props)
        this.content = React.createRef()
        this.style = {
            botStyle:{
                marginLeft:"0",
                width:"200px",
                backgroundColor:'#90EE90',
                borderRadius: "25px",
                textAlight:"left",
                padding:"10px"
                
            },
            normalStyle:{
              
                width:"200px",
                marginLeft:"260px",
                backgroundColor:'cyan',
                borderRadius: "25px",
                textAlight:"right",
                padding:"10px"
               
            },
            chatContent: {
                position:"absolute"
            },
           
        }
    }
    render() {
        return(
            <div style={{backgroundColor:"", width:'100%'}}>
                <div style={this.props.isBot?this.style.botStyle:this.style.normalStyle}>
                <div ref={this.content}>
                    {this.props.content}
                </div>
             </div>
            </div>
            
        )
    }
}
class ChatWindow extends React.Component {
    constructor(props) {
        super(props)
        this.input = React.createRef()
        this.chatBox = React.createRef()
        this.state = {
            message_list:[{
                isBot:true,
                content:'Xin chào, tôi là chatbot hỗ trợ trồng lúa hữu cơ, tôi có thể giúp gì cho bạn?'
            }]
        }
        this.style = {
            boxContain: {
                height: "600px",
                width: "500px",
                padding:"10px",
                borderRadius: "25px",
                border: "2px solid #73AD21",
                overflowX:'auto'
            },
            chatTile: {
                
            },
            inputStyle: {
                width: "500px",
                margin: "auto"
            }


        }
    }
    bin2String(array) {
        var result = "";
        for (var i = 0; i < array.length; i++) {
          result += String.fromCharCode(parseInt(array[i], 2));
        }
        return result;
      }
    handleSubmit() {
        const text = this.input.current.value
        if(text==""||text==null||text==undefined) {
            return
        }
        this.getResponse(text)
        this.addMessage(false,text)
    }
    getResponse(text) {
        $.ajax({
            url:'./api_call.php',
            method:'post',
            scriptCharset: "utf-8" ,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            dataType:'json',
            data:{
                input:text
            }
        }).done(data=>{
            const message = utf8.decode(this.bin2String(data))
            this.addMessage(true,message)
        })
    }
    addMessage(isBot,msg) {
        this.setState({
            message_list:[...this.state.message_list,{ isBot:isBot, content:msg }]
        })
    }
    render() {
        const MessageList = this.state.message_list.map((e,i)=>{
            return(
                <Message key={i} isBot={e.isBot} content={e.content}>
                </Message>
            )
        })
        return(
            <div className="text-center" style={{borderRight:" 5px solid black", backgroundColor:"#FAFAD2"}}>
                <h4 style={this.style.chatTile}>Chat</h4>
                <div className='container' style={this.style.boxContain}>
              
              <div  ref={this.chatBox} id='chat_box' className=' container '>
                  {MessageList}
              </div>
          </div>
          <div className="input-group mb-3" style={this.style.inputStyle}>
                  <input className="form-control" placeholder="Xin mời nhập câu hỏi" ref={this.input}>

                  </input> 
                  <button className="btn btn-primary" sytle={{color:"blue"}} onClick={()=>{this.handleSubmit()}}>
                      Gửi
                  </button>
              </div>
            </div>
            
        )

    }
}
ReactDOM.render(<ChatWindow></ChatWindow>,dom)