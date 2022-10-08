import React, {Component} from "react";
import "./App.css";

export default class App extends Component {
  btnStyle = {
    color: "#fff",
    border: "none", // 경계선 없앰.
    padding: "5px 9px",
    borderRadius: "50%", // 값이 높을수록 원형에 가까워짐.
    cursor: "pointer", // 마우스를 올려놓으면 커서모양이 바뀜.
    float: "right" // 위치
  }

  getStyle = () => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted", // list 요소 간 경계선.
      textDeccoration: 'none'
    }
  }

  todoData = [
    {
      id: "1",
      title: "공부하기",
      completed: true
    },
    {
      id: "2",
      title: "청소하기",
      completed: false
    }
  ];

  handleClick = (id) => {
    let newTodoData = this.todoData.filter(data => data.id !== id);
  };

  render() {
    return(
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1>할 일 목록</h1>
          </div>
          
          {this.todoData.map((data) => (
            <div style={this.getStyle()} key={data.id}>
              <input type="checkbox" defaultChecked={false} />
              {data.title}
              <button style={this.btnStyle} onClick={() => this.handleClick(data.id)}>x</button>
            </div>
          ))}
        </div>
      </div>
    )
  }
}