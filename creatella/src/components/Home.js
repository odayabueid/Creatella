import React from 'react';
import TextField from '@material-ui/core/TextField';
import Loading from './Loading';
const BASE_URL = "http://localhost:3000";

  class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        products:[],
        date:"",
        search:"",
        tech: "",
        redirect:false,
        loading:true,
        height: window.innerHeight,
        message: 'not at bottom',
        count:15
      };
      this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll() {
      const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      const windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom >= docHeight) {
        this.setState({
          message: 'bottom reached',
          count:this.state.count +15
        });
      }
      if(this.state.count === 525 ){
        alert("~ end of catalogue ~")
        this.setState({
          count:this.state.count -15
        })
      }
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
            if (data.length > 0) {
              this.setState(() => ({ products: data , loading:false}));
            }else {
              this.setState({loading: false });
            }
          });
        }
      })
      .catch((err) => {
        this.setState(() => ({ fetchError: err }));
      });
      window.removeEventListener("scroll", this.handleScroll);
    }

    componentDidMount() {
      window.addEventListener("scroll", this.handleScroll);
      const now = new Date().getTime();
      this.setState({date:now });
    }

    Search(event){
      this.setState({
        search : event.target.value
      })
    }

    handleInputChange=(e)=>{
      var {value} = e.target;
      var sortedProducts = this.state.products.sort((a,b)=>{
        if (a[value] < b[value]) {
          return -1;
        }
        if (a[value] > b[value]) {
          return 1;
        }        
          return 0
      })
      this.setState({
        redirect:true,
        tech:e.target.value,
        products:sortedProducts
      })
    }

    puralize = (name, time) => (time >= 2 ? `${name}s` : name);

    timeConversion = (date) => {
      const posted = new Date(date).getTime();
      const millisec = new Date().getTime() - posted;
      const seconds = (millisec / 1000).toFixed(1);
      const minutes = (millisec / (1000 * 60)).toFixed(1);
      const hours = (millisec / (1000 * 60 * 60)).toFixed(1);
      const days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);
      const hourz = Math.floor((days % 1).toFixed(4) * 24);
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
            "hour",hours
          )} ${minutes} minutes`;
        } else {
          return `${hours} ${this.puralize("hour", hours)}`;
          }
      }
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
      if(this.state.loading){
        return <div><Loading /></div>
      }
      let filtered =this.state.products.filter(
        (fil) =>{
          return fil.id.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        })
      return (<div>
                <select
                  value={this.state.tech}
                  onChange={this.handleInputChange}
                  style={{backgroundColor:"red"}}
                  id="selectFilter">
                    <option value="id">Normal</option>
                    <option value="price">Price</option>
                    <option value="size">Size</option>
                </select>
                <form className="form-inline" style={{display: 'flex',flexWrap: 'wrap',}}>
                  <TextField
                    id="outlined-search"
                    label="Search By ID"
                    type="search"
                    style={{margin :"auto" ,marginBottom:"40px" , marginTop:"20px",marginRight:"theme.spacing(1)",width:"30%"}}
                    margin="normal"
                    variant="outlined"
                    onChange= {this.Search.bind(this)}/>
                </form>
                {filtered.slice(0,this.state.count).map((product) =>
                  <div key={product.id} style={{marginLeft:"12%"}}>
                    <div className="card"  style={{height:"22rem" ,width: "23rem" ,float:"left",margin:"10px",borderRadius:"50%", backgroundColor:"#FFFF00",opacity:"0.9"}}>
                      <div className="card-img-top">
                        <p><span style={{fontWeight:"bold"}}></span><span style={{color:"#008ff8"}}>$ {product.price/100}</span></p>
                        <p style={{textAlign:"center",fontSize:`${product.size}px`}}>{product.face}</p>
                      </div>
                      <div className="card-body" style={{textAlign:"center",marginTop:"140px"}}>
                        <p className="card-text" style={{fontSize:"10px"}}>{this.getTimeDisplay(product.date)}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
    )}
  }
  export default Home;
