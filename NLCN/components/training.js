const dom = document.querySelector('training-manager')
class Message extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hover:false
        }
    }
    render() {
        return(
            <div className="input-group mb-3">
                <input  className="form-control" style={{width:'80%'}} onChange={(e)=>{this.props.inputChange(this.props.i,e.target.value)}} defaultValue={this.props.content}></input>
                <div style={{display:'inline'}}>
                    {
                    <button className="btn btn-primary" onClick={()=>this.props.xoaMsg(this.props.i)}>Xóa</button>
                    }
                </div>
                
            </div>
        )
    }
}
class TrainingManager extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            message_list:[],
            inputing:false
        }
        this.handleInput = this.handleInput.bind(this)
        this.xoaMsg = this.xoaMsg.bind(this)
        this.inputChange = this.inputChange.bind(this)
        this.train = this.train.bind(this)
        console.log(window)

    }
    handleInput() {
        this.setState({
            message_list:[...this.state.message_list,{
                content:'',
            }]
        })
    }
    inputChange(i,content) {
        var array = this.state.message_list
        array[i].content = content
        this.setState({
            message_list:array
        })
    }
    xoaMsg(i) {
        var array=[]
        // this.state.message_list.splice(i+1,1)
        if(i==this.state.message_list.length-1) {
            array=this.state.message_list.slice(0,-1)
        }
        else {
            array = this.state.message_list.slice(i+1,this.state.message_list.length)
        }
        this.setState({
            message_list:array
        })
    }
    train() {
        const list = this.state.message_list
        $.ajax({
     
            xhr: ()=>{
                var xhr = new window.XMLHttpRequest();
                //Upload progress
                xhr.upload.addEventListener("progress", function(evt){
                if (evt.lengthComputable) {
                  var percentComplete = evt.loaded / evt.total;
                  //Do something with upload progress
                    console.log(this)
                  }
                }, false);
              //Download progress
                xhr.addEventListener("progress", function(evt){
                  if (evt.lengthComputable) {
                    var percentComplete = evt.loaded / evt.total;
                  //Do something with download progress
                    console.log(percentComplete);
                  }
                }, false);
                return xhr;
              },
     
            url:'./train.php',
            method:'post',
            data: {
                list:list
            }
        }).done(data=>{
            alert(data)
        })
    }
    shouldComponentUpdate(prop,state) {
        // only update when the message_list length is changed
        if(this.state.message_list.length!=state.message_list.length) {
            return true
        }
        return false
    }
    componentDidUpdate(oldprop,oldstate) {
        if(oldstate.message_list.length!=this.state.message_list.length) {
            this.MessageList=this.state.message_list.map((e,i)=>{
                return(
                    <Message inputChange={this.inputChange} xoaMsg={this.xoaMsg} i={i} key={i+e.content} isBot={i%2==0?true:false} content={e.content}></Message>
                )

            })
            this.forceUpdate()
        }
    }
    render() {
        return(
            <div style={{backgroundColor:"#FAFAD2"}} className="text-center">
                <h4>Tạo hội thoại cho bot</h4>
                <div className='w-100 h-100'>
                <div>
                    {this.MessageList&&this.MessageList}
                </div>
                <div>
                    <button className="btn btn-primary " style={{display:this.state.inputing&&"none"}} onClick={this.handleInput}>
                        Thêm hội thoại
                    </button>
                    <button className="btn btn-primary" onClick={this.train}>
                        gửi 
                    </button>
                </div>
            </div>
            </div>
            
        )
    }
}
ReactDOM.render(<TrainingManager></TrainingManager>,dom)
