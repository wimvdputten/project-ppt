import React from 'react';
import {HashRouter as Router, Switch, Route, Link} from 'react-router-dom';
import '../styles/tailwind.css';
import '@zach.codes/react-calendar/dist/calendar-tailwind.css';
import Login from "./Login";
import Protected from "./Protected";
import Shell from "./Shell";
import Employees from "./Employees";
import EmployeeHeader from "./EmployeeHeader";
import AddEmployee from "./AddEmployee";
import Header from "./Header";
import EmployeeDetails from "./EmployeeDetails";
import EmployeeDetailsHeader from "./EmployeeDetailsHeader";
import EmployeeEdit from "./employeeEdit";
import Calender from "./Calender";
import Vacations from "./Vacations";
import VakantieHeader from "./VakantieHeader";
import AddVakantie from "./AddVakantie";

const App = () => {
  return (
    <div>
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <Protected>
                <Shell selectedMenu={"Dashboard"} headerComponent={<Header title={"Dashboard"}/>}>
                  <Calender/>
                </Shell>
              </Protected>
            </Route>

            <Route path="/dashboard">
              <Protected>
                <Shell selectedMenu={"Dashboard"} headerComponent={<Header title={"Dashboard"}/>}>
                  <Calender/>
                </Shell>
              </Protected>
            </Route>

            <Route exact path="/medewerkers">
              <Protected>
                <Shell selectedMenu={"Medewerkers"} headerComponent={<EmployeeHeader/>}>
                  <Employees/>
                </Shell>
              </Protected>
            </Route>
            <Route exact path="/medewerkers/add">
              <Protected>
                <Shell selectedMenu={"Medewerkers"} headerComponent={<Header title={"Medewerker toevoegen"}/>}>
                  <AddEmployee/>
                </Shell>
              </Protected>
            </Route>
            <Route exact path="/medewerkers/details/:id">
              <Protected>
                <Shell selectedMenu={"Medewerkers"} headerComponent={<EmployeeDetailsHeader/>}>
                  <EmployeeDetails/>
                </Shell>
              </Protected>
            </Route>
            <Route exact path="/medewerkers/edit/:id">
              <Protected>
                <Shell selectedMenu={"Medewerkers"} headerComponent={<Header title={"Medewerker wijzigen"}/>}>
                  <EmployeeEdit/>
                </Shell>
              </Protected>
            </Route>

            <Route path="/voertuigen">
              <Protected>
                <Shell selectedMenu={"Voertuigen"} headerComponent={<Header title={"Voertuigen"}/>}/>
              </Protected>
            </Route>

            <Route path="/vakantie">
              <Protected>
                <Shell selectedMenu={"Vakantie"} headerComponent={<VakantieHeader/>}>
                  <Vacations/>
                </Shell>
              </Protected>
            </Route>

            <Route exact path="/vakanties/add">
              <Protected>
                <Shell selectedMenu={"Vakantie"} headerComponent={<Header title={"Vakantie toevoegen"}/>}>
                  <AddVakantie/>
                </Shell>
              </Protected>
            </Route>

            <Route path="/login">
              <div><Login/></div>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
