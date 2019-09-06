import React from 'react';
import { Redirect } from 'react-router-dom'

import TextField from '@material-ui/core/TextField';
const BASE_URL = "http://localhost:3000";

class Home extends React.Component {
  constructor(props) {
    super(props);

  this.state = {
    products:[],
    date:"",
    search:"",
    tech: '',
    redirect:false
  };
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
              this.setState(() => ({ products: data }));
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

  Search(event){
    this.setState({
      search : event.target.value
    })
  }

  handleInputChange=(e)=>{
      this.setState({
          redirect:true,
          tech:e.target.value
      })
  }

  renderRedirect=()=>{
      if(this.state.redirect && this.state.tech==="price"){
        return <Redirect to = {{
            pathname:"SortedPrice/",
            state:{productss:this.state.products,
                
                }
        }}/>
      }
      if(this.state.redirect && this.state.tech ==="size"){
        return <Redirect to = {{
            pathname:"SortedSize/"
                
                
        }}/>
      }
  }
  render() {
    let filtered =this.state.products.filter(
      (fil) =>{
        return fil.id.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      })
    return (<div>
        {this. renderRedirect()}
          
                  <select
                    value={this.state.tech}
                    onChange={this.handleInputChange}
                    className="select__input"
                    id="selectFilter"
                  >
                    <option value="normal;">Normal</option>
                    <option value="price">Price</option>
                    <option value="size">Size</option>
                  </select>
                        <form class="form-inline" style={{display: 'flex',flexWrap: 'wrap',}}>
                            <TextField
                              id="outlined-search"
                              label="Search By ID"
                              type="search"
                              style={{margin :"auto" , marginTop:"20px",marginRight:"theme.spacing(1)",width:"30%"}}
                              margin="normal"
                              variant="outlined"
                              onChange= {this.Search.bind(this)}
                            />
                        </form>
                  {filtered.map((product) =>
                    <div>
                      <div className="card"  style={{height:"14rem" ,width: "15rem" ,float:"left",margin:"10px",borderRadius:"50%", backgroundColor:"#FFFF00",opacity:"0.9"}}>
                      <div className="card-img-top">
                      <p><span style={{fontWeight:"bold"}}></span><span style={{color:"#008ff8"}}>$ {product.price/100}</span></p>
                      <h1 style={{textAlign:"center",fontSize:`${product.size}px`}}>{product.face}</h1>
                      </div>
                      <div className="card-body">
                        {/* <p className="card-text"><span style={{fontWeight:"bold"}}>Country:</span>{product.date}</p> */}
                        
                      </div>
                      </div>
                    </div>)}

            </div>
    )}
}
export default Home;
