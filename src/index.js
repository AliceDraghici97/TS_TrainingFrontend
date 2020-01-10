import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import repositoryReducer from "./store/reducers/repositoryReducer";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import errorHandlerReducer from "./store/reducers/errorHandlerReducer";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import SubjectList from "./components/subject/SubjectList";
import InternalServer from "./components/errorPages/InternalServer";
import CreateStudent from "./components/student/CreateStudent";
import CreateSubject from "./components/subject/CreateSubject";
import UpdateStudent from "./components/student/UpdateStudent";
import UpdateStudent2 from "./components/student/UpdateStudent2";
import DeleteStudent from "./components/student/DeleteStudent";
import Login from "./components/Login";
import asyncComponent from "./hoc/AsyncComponent";
import { TokenContainer } from "./assets/containers/TokenContainer";
import TokenInterceptorRequest from "./assets/interceptors/TokenInterceptorRequest";
import TokenInterceptorResponse from "./assets/interceptors/TokenInterceptorResponse";

const rootReducers = combineReducers({
  repository: repositoryReducer,
  errorHandler: errorHandlerReducer
});

const store = createStore(rootReducers, applyMiddleware(thunk));

const tokenContainer = new TokenContainer();
TokenInterceptorRequest.setupInterceptor(tokenContainer);
TokenInterceptorResponse.setupInterceptor(tokenContainer);

const AsyncStudList = asyncComponent(() => {
  return import("./components/student/StudentList");
});

const routing = (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Redirect exact from="/" to="login" />
          <Route exact path="/home" component={App} />
          <Route path="/studentlist" component={AsyncStudList} />
          <Route path="/subjectlist" component={SubjectList} />
          <Route path="/500" component={InternalServer} />
          <Route path="/createStudent" component={CreateStudent} />
          <Route path="/createSubject" component={CreateSubject} />
          <Route path="/updateStudent/:id" component={UpdateStudent} />
          <Route path="/updateStudent2/:id" component={UpdateStudent2} />
          <Route path="/deleteStudent/:id" component={DeleteStudent} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(
  routing,

  document.getElementById("root")
);

serviceWorker.unregister();
