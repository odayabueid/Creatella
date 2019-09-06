import React from 'react';
import Fab from '@material-ui/core/Fab';
import { Redirect } from 'react-router-dom'

import TextField from '@material-ui/core/TextField';

const BASE_URL = "http://localhost:3000";

class SortedPrice extends React.Component {
  constructor(props) {
    super(props);

  this.state = {
    Sortedproducts:[],
    search:"",
    redirect:false
  };
  }

  Search(event){
    this.setState({
      search : event.target.value
    })
  }

  componentWillMount(){
    fetch(`${BASE_URL}/products`, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            console.log(data)
            if (data.length > 0) {
                var test = [...data]
                test = test.sort((a,b)=>a.price - b.price)

              this.setState(() => ({ Sortedproducts: test }))
            } else {
              this.setState({More: false });
            }
          });
        }
      })
      .catch((err) => {
        this.setState(() => ({ fetchError: err }));
      });
  }

  
  handleInputChange=()=>{
    this.setState({
        redirect:true
    })
}


renderRedirect=()=>{
  if(this.state.redirect){
    return <Redirect to = {{
        pathname:"/"

    }}/>
  }
}
puralize = (name, time) => (time >= 2 ? `${name}s` : name);


timeConversion = (date) => {
  const posted = new Date(date).getTime();
  const millisec = new Date().getTime() - posted;
  const seconds = (millisec / 1000).toFixed(1);
  const minutes = (millisec / (1000 * 60)).toFixed(1);
  const hours = (millisec / (1000 * 60 * 60)).toFixed(1);
  const days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);

  if (seconds < 60) {
    return `${seconds} seconds`;
  }

  if (minutes < 60) {
    return `${minutes} minutes`;
  }

  if (hours < 24) {
    const minutes = Math.floor((hours % 1).toFixed(4) * 60);

    if (minutes > 0) {
      const floorHours = Math.floor(hours);
      return `${floorHours} ${this.puralize(
        "hour",
        hours
      )} ${minutes} minutes`;
    } else {
      return `${hours} ${this.puralize("hour", hours)}`;
    }
  }

  const hourz = Math.floor((days % 1).toFixed(4) * 24);
  if (hourz > 0) {
    const floorDays = Math.floor(days);
    return `${floorDays} ${this.puralize("day", days)} ${hourz} hours`;
  } else {
    return `${days} ${days >= 2 ? "days" : "day"}`;
  }
};

getTimeDisplay = (date) => {
  const secondsInWeek = 604800000; // in milleseconed
  const now = new Date().getTime();
  if (now - Date.parse(date) > secondsInWeek) {
    const newDate = new Date(date).toLocaleDateString();
    return newDate;
  } else {
    return `${this.timeConversion(date)} ago`;
  }
};

  render() {
    let filtered =this.state.Sortedproducts.filter(
      (fil) =>{
        return fil.id.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      })
    return (<div>
      {this.renderRedirect()}
              <Fab color="secondary" aria-label="edit" style={{margin:"3px"}} onClick={this.handleInputChange}>
                  <span class="fa fa-arrow-left checked" style={{color:"white"}}></span>
              </Fab>      

                        <h1 style={{margin :"auto" ,color:"#FF0077", marginBottom:"20px",marginTop:"20px",marginRight:"29%",width:"30%"}}>Sorted By Price</h1>
                        <form class="form-inline" style={{display: 'flex',flexWrap: 'wrap',}}>
                            <TextField
                              id="outlined-search"
                              label="Search By ID"
                              type="search"
                              style={{margin :"auto",marginBottom:"40px" , marginTop:"20px",marginRight:"theme.spacing(1)",width:"30%"}}
                              margin="normal"
                              variant="outlined"
                              onChange= {this.Search.bind(this)}
                            />
                        </form>
                  {filtered.map((product) =>
                    <div style={{marginLeft:"7%"}}>
                      <div className="card"  style={{height:"15rem" ,width: "18rem" ,float:"left",margin:"10px",borderRadius:"50%", backgroundColor:"#FFFF00",opacity:"0.9"}}>
                      <div className="card-img-top">
                      <p><span style={{fontWeight:"bold"}}></span><span style={{color:"#008ff8"}}>$ {product.price/100}</span></p>
                      <h1 style={{textAlign:"center",fontSize:`${product.size}px`}}>{product.face}</h1>
                      </div>
                      <div className="card-body" style={{textAlign:"center",marginTop:"70px"}}>
                      {/* <p>{this.getTimeDisplay(product.date)}</p> */}
                      <p className="card-text" style={{fontSize:"10px"}}>{this.getTimeDisplay(product.date)}</p>

                      </div>
                      </div>
                    </div>)}
           
               <div>
                   
                </div>

            </div>
    )}
}
export default SortedPrice;
