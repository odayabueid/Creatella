import React from 'react';
import './App.css';
import { BrowserRouter , Router } from "react-router-dom";
import { Route } from 'react-router-dom';
import Home from "./components/Home"



class App extends React.Component {
  constructor(props){
    super(props);
  }


  render() {
   
    return (<div>
        
        <BrowserRouter>
          {/* <div>
            <Route exact path="/SortedPrice" component={SortedPrice} />
          </div>
          <div>
            <Route exact path="/SortedSize" component={SortedSize} />
          </div> */}
          <div>
            <Route exact path ="/" component ={Home}/>
          </div>
        </BrowserRouter>
            </div>
    )}
}
export default App;
