import React, {Component} from 'react'
import CreateKindergarten from './CreateKindergarten'
import KindergartenList from './KindergartenList'
import Login from './Login'
import Header from './Header'
import {Route, Switch} from 'react-router-dom'

class App extends Component {
    render() {
        return (
            <div className="center w85">
                <Header/>
                <div className="ph3 pv1 background-gray">
                    <Switch>
                        <Route exact path="/" component={KindergartenList}/>
                        <Route exact path="/create" component={CreateKindergarten}/>
                        <Route exact path="/login" component={Login}/>
                    </Switch>
                </div>
            </div>
        )
    }
}

export default App