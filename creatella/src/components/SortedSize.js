import React from 'react';

import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import { Redirect } from 'react-router-dom'
const BASE_URL = "http://localhost:3000";

class SortedSize extends React.Component {
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
                test = test.sort((a,b)=>a.size - b.size)
                console.log(test)
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
                        
                      <div className="card" style={{height:"14rem" ,width: "15rem" ,float:"left",margin:"10px",borderRadius:"50%", backgroundColor:"#FFFF00",opacity:"0.9"}}>
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
export default SortedSize;
