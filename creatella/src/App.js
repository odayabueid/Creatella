import React from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';


const BASE_URL = "http://localhost:3000";

class App extends React.Component {
  state = {
    products:[],
    More: true
  };

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

  render() {
    return (<div>
          {this.state.products.map((product) =>
            <div>
              <div className="card" style={{height:"14rem" ,width: "15rem" ,float:"left",margin:"10px", backgroundColor:"#F8F9F9 "}}>
              <div className="card-img-top">
              <p><span style={{fontWeight:"bold"}}></span><span style={{color:"green"}}>$ {product.price/100}</span></p>
              <h1 style={{textAlign:"center",fontSize:`${product.size}px`}}>{product.face}</h1>
              </div>
              <div className="card-body">
                <p className="card-text"><span style={{fontWeight:"bold"}}>Country:</span>{product.date}</p>
              </div>
              </div>
            </div>)}
            </div>
    )}
}
export default App;
