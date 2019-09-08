
import React from 'react';
import { BrowserRouter} from "react-router-dom";
import { Route } from 'react-router-dom';
import Home from "./components/Home"
import ScrollUpButton from "react-scroll-up-button"; //Add this line Here


//App Class basicly Parent Class to do rout to the Home Component 
class App extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
 
    return (
      <div>
        <div>
          <ScrollUpButton />
        </div>
        <BrowserRouter>
          <div>
            <Route exact path ="/" component ={Home}/>
          </div>
        </BrowserRouter>
      </div>
    )}
}
export default App;
