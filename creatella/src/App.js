import React from 'react';
import './App.css';

const BASE_URL = "http://localhost:3000";

class App extends React.Component {
  state = {
   
  };

  // componentWillMount() {
  //   fetch(`${BASE_URL}/api/products?_page=10&_limit=15`, {
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json"
  //     }
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         console.log(response)
  //         response.json().then((json) => {
  //           if (json.length > 0) {
  //             this.setState(() => ({ products: json }));
  //           } else {
  //             this.setState({ hasMore: false });
  //           }
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       this.setState(() => ({ fetchError: err }));
  //     });
  // }
  
  componentWillMount(){
    // fetch(`${BASE_URL}/api/products?_page=10&_limit=15`)
    //   // .then(data => data.json())
    //   .then((data) => {
    //      console.log(data)
    //     //  this.setState({
    //     //     comms:data
    //     //  })
    //    }).catch((err)=>{
    //     console.log(err)
    //    })

    fetch(`${BASE_URL}/products`, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then((response) => {

        if (response.ok) {
          response.json().then((json) => {
            console.log(json)

            if (json.length > 0) {
              this.setState(() => ({ products: json }));
            } else {
              this.setState({ hasMore: false });
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
        oday
    </div>
    )}
}
export default App;
