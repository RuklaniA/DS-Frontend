import React, { Component } from "react";
import './App.css';
import { Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sensors: [],
      isLoaded: false
    }
  }

  componentDidMount() {
      fetch('http://localhost:5000/sensors')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          sensors: json,
        })
        console.log(this.state.sensors);
      });
   }

   componentWillMount(){
     setInterval(() => {
      fetch('http://localhost:5000/sensors')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          sensors: json,
        })
        console.log(this.state.sensors);
      });
     }, 40000);
   }

  render() {
    var { sensors, isLoaded } = this.state;

    if (!isLoaded) {
      return <div>Loading....</div>
    }
    else
      return (<div className="main-layout">
        <div className="tableView">
          <Table responsive="sm" striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Sensor Id</th>
                <th>Floor No</th>
                <th>Room No</th>
                <th>CO2 Level</th>
                <th>Smoke Level</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {sensors.map(sensor => (
                <tr>
                  <td>{sensor.sensor_id}</td>
                  <td>{sensor.floor_no}</td>
                  <td>{sensor.room_no}</td>
                  <td>{sensor.co2_level}</td>
                  <td>{sensor.smoke_level}</td>
                  <td>{((sensor.co2_level > 5) ||(sensor.smoke_level>5)) ? <span className="reddot"></span> : <span className="greendot"></span>}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      )
  }
}

export default App;
