import './App.css';
import React, { useState } from 'react';
import AddButton from './components/Addbutton';

function App() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [todoList, setTodoList] = useState([
    { id: 1, title: "오감자", content: "맛있게 먹기", complete: false },
    { id: 2, title: "메로나", content: "먹고 싶기", complete: true }
  ]);

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  }
  const contentChangeHandler = (event) => {
    setContent(event.target.value);
  }
  // 추가하기 버튼
  const addButtonClickHandler = () => {
    if (title && content) {
      const newItem = {
        id: Date.now(),
        title,
        content,
        complete: false,
      };
      setTodoList([...todoList, newItem]);
      setTitle('');
      setContent('');
    } else {
      alert("제목이나 내용을 확인해주세요.")
    }
  }
  // 삭제하기 버튼
  const clickDeleteButtonHandler = (id) => {
    const newTodoList = todoList.filter(list => list.id !== id);
    setTodoList(newTodoList);
    // const newTodoList = todoList.filter(function (list) {
    //   return list.id !== id;
    // });
  }
  // 완료 버튼
  const completeButtonHandler = (item) => {
    const newTodoList = todoList.map((currentItem) => {
      // currentItem.id는 현재 map에서 처리중인 배열요소, item은 클릭된 버튼에 전달된 인자이니, 클릭된 항목!
      // 이 둘의 id값은 결국 같을수밖에없지..
      if (currentItem.id === item.id) { // 기존값과 현재기존 객체의 값이 서로 같을때(무조건같겠지;)
        return { ...currentItem, complete: !currentItem.complete }; // boolan값을 반전 시켜줘!
      }
      return currentItem; // 클릭을 하지 않을때를 의미한다. 클릭을 하지않으면 기존값을 유지한다.
    });
    setTodoList(newTodoList);
  }

  return (
    <div className="main-layout">
      <div className="main-header">
        <h1 className="main-header-name">Ted's To Do List</h1>
        <h3 className="main-header-title">React</h3>
      </div>
      <div className="addTodoList">
        제목주세요 &nbsp;<input
          value={title}
          onChange={titleChangeHandler} />&nbsp;
        내용주세요 &nbsp;<input
          value={content}
          onChange={contentChangeHandler} />
        <AddButton onClickHandler={addButtonClickHandler} />
      </div>
      <div><h2>Working now..🚗</h2></div>
      <div className="todoList">
        {todoList
          .filter((currentItem) => currentItem.complete===false) // false인 경우에만 !
          .map((item) => (
            <div key={item.id} className="todoItem">
              <h3>{item.title}</h3>
              <p>{item.content}</p>
              <div>
              <button className="completeButton" onClick={() => completeButtonHandler(item)}>
                  {/* true일 경우 취소, false일 경우 완료, 왜냐면 난 완료일 경우의 기본값을 false로 지정해뒀기때문 */}
                  {item.complete ? "취소" : "완료"}
                </button>&nbsp;
                <button className="deleteButton" onClick={() => clickDeleteButtonHandler(item.id)}>삭제하기</button>
              </div>
            </div>
          ))}
      </div>
      <div>
        <h2>Done..🚀</h2>
        <div className="todoList">
          {todoList
            .filter((currentItem) => currentItem.complete) // true인 경우에만 !
            .map((item) => (
              <div key={item.id} className="todoItem">
                <h3>{item.title}</h3>
                <p>{item.content}</p>
                <div>
                <button className="completeButton" onClick={() => completeButtonHandler(item)}>
                  {/* true일 경우 취소, false일 경우 완료, 왜냐면 난 완료일 경우의 기본값을 false로 지정해뒀기때문*/}
                  {item.complete ? "취소" : "완료"}
                </button>&nbsp;
                  <button className="deleteButton" onClick={() => clickDeleteButtonHandler(item.id)}>삭제하기</button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;

// 앞으로 완료해야할 기능.
// - header 부분은 끝났고,
// - 제목과 내용에 값을 넣고 추가하기 버튼 누르면 추가되는 것 완료..
// - 삭제될 때 보더라인까지 삭제되게하기..// -> css를 map값에 줬어야했다!!
// - 내용이 추가되면 옆에 같은내용으로 추가되기. // -> map값에 css를 따로 추가했어야했다!!
// - 완료버튼 누르면 done 아래로 내용이 이동되게하기.
// - 버튼은 완료버튼에서 취소버튼으로 바뀌고 그 기능도 추가. (삼항연산자)

