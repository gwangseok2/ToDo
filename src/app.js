const $todoListContents = document.querySelector('.todo-list-contents');
const $input = document.querySelector('.todo-list-input');
const $buttons = document.querySelectorAll('.todo-list-buttons button');
const $clearButton = document.querySelector('.todo-list-clear > button');
const progressArray = [];
const completeArray = [];
let downTimeStamp = null;
let upTimeStamp = null;
let itemId = 0;
let picked = null;
let pickedIndex = null;

const delay = (ms) => {
  setTimeout(() => {
    console.log('hi');
  }, ms);
};

// createTodo
$input.addEventListener('keypress', (e) => {
  if (e.keyCode === 13 && e.target.value) {
    createTodo(e);
  }
});
// input enter

class TodoItem {
  constructor(
    id,
    description,
    creatDttm,
    key = id,
    status = 'progress',
    completeDttm
  ) {
    this.id = id;
    this.description = description;
    this.creatDttm = creatDttm;
    this.key = key;
    this.status = status;
    this.completeDttm = completeDttm;
  }

  completeItem() {
    this.completeDttm = new Date().getTime();
    this.status = 'complete';
  }

  cancelItem() {
    this.completeDttm = null;
    this.status = 'progress';
  }
}

// 랜더 함수
const render = () => {
  let items;
  const $buttons = document.querySelectorAll('.todo-list-buttons > button');

  // 하던 버튼 정보부 눌렀을 때
  if ($buttons[0].classList.contains('active')) {
    // all 눌려 있을 때
    items = [...progressArray, ...completeArray];
  } else if ($buttons[1].classList.contains('active')) {
    // active 눌렀 있을 때
    items = [...progressArray];
  } else {
    // 컴플리트 눌려 있을 때
    items = [...completeArray];
  }

  items.sort((a, b) => {
    if (a.key < b.key && a.status === 'progress' && b.status === 'progress') {
      return 1;
    }
    if (a.key > b.key && a.status === 'progress' && b.status === 'progress') {
      return -1;
    }
    return 0;
  });

  // 하단 정보부 버튼 카운트 관리
  $clearButton.children[1].innerText = `(${completeArray.length})`;
  document.querySelector('.todo-list-counter').innerHTML = items.length;

  $todoListContents.innerHTML = `
  ${items
      .map(
        (item) => `
  <li class="todo-list-item ${item.status}" id="${item.id}">
    <div class="todo-list-absolute">
      <span class="material-icons" dropzone="true">
        drag_handle
      </span>
      <span>
        ${item.description}
      </span>
    </div>
  </li>`
      )
      .join('')}`;
};
// 랜더 함수 끝

const createTodo = (e) => {
  const $todoListItems = document.querySelectorAll('.todo-list-item');
  const $todoListCounter = document.querySelector('.todo-list-counter');
  const item = new TodoItem(itemId++, e.target.value, new Date().getTime());
  progressArray.length > 0
    ? progressArray.unshift(item)
    : progressArray.push(item);
  e.target.value = '';
  render();

  // 테스트
  // const dragSrcEl = document.querySelector('.material-icons');
  // dragSrcEl.addEventListener('mousedown', handleMouseDown);
};

$todoListContents.addEventListener('mousedown', contentsActiveEvent);

// 투두리스트 눌렀을 때 발생하는 이벤트 mousedown
function contentsActiveEvent(event) {
  downTimeStamp = event.timeStamp;
  if (event.target.tagName !== 'LI') {
    return false;
  }
}

$todoListContents.addEventListener('mouseup', mouseUpTestEvent);

function mouseUpTestEvent(e) {
  console.log(downTimeStamp, 'asdsa', e.timeStamp);
  upTimeStamp = e.timeStamp;
  if (upTimeStamp - downTimeStamp > 800) {
    //2초이상 눌렸을 때 코드 실행
    console.log('0.8초이상');
    // 떳어 들어 올렸어 여기 밑에 요소 인덱스 체크해
  } else {
    console.log('0.8초미만', downTimeStamp);

    const targetId = e.target.id;
    const totalArray = [...progressArray, ...completeArray];

    totalArray.forEach((el, idx) => {
      if (el.id === Number(targetId)) {
        if (el.status === 'progress') {
          el.completeItem();
          console.log(idx, 'index');
          progressArray.splice(idx, 1);
          completeArray.push(el);
          console.log(progressArray, 'asd', completeArray);
        } else {
          el.cancelItem();
          completeArray.splice(idx - progressArray.length, 1);
          progressArray.push(el);
        }
        render();
      }
    });
  }
}

// 하단 정보부 이벤트 리스너
$buttons.forEach((el) => {
  el.addEventListener('click', listFilter);
});

// 하단 정보부 버튼 클릭 시 이벤트 코드
function listFilter(e) {
  $buttons.forEach((el) => {
    el.classList.remove('active');
  });
  e.target.classList.add('active');
  render();
}

// 완료 Todo 삭제
$clearButton.addEventListener('click', clearTodo);
function clearTodo() {
  const checkData = confirm('Are you sure you want to clear the todolist?');
  if (checkData) {
    completeArray.splice(0);
    render();
  }
}

// function handleMouseDown(e) {
//   e.preventDefault();
//   picked = e.target.parentNode;
//   pickedIndex = [...picked.parentNode.parentNode.children].indexOf(
//     picked.parentNode
//   );
//   const el = e.target.parentNode;
//   el.classList.add('move');
//   const $area = document.querySelector('.todo-list-wrapper');
//   const pointerWidthArea =
//     document.querySelector('.todo-list-wrapper').offsetWidth + 20;
//   const pointerHeightArea =
//     document.querySelector('.todo-list-wrapper').offsetHeight + 20;

//   moveAt(e.pageX, e.pageY);
//   function moveAt(pageX, pageY) {
//     el.style.left = pageX - el.offsetWidth / 3 + 'px';
//     el.style.top = pageY - el.offsetHeight / 2 + 'px';
//   }
//   function onMouseMove(event) {
//     if (
//       parseInt(el.style.left) < (window.innerWidth - pointerWidthArea) / 2 ||
//       parseInt(el.style.top) < $area.offsetTop ||
//       parseInt(el.style.top) > pointerHeightArea ||
//       parseInt(el.style.left) > pointerWidthArea
//     ) {
//       clearAbsolute(el);
//       el.onmouseup = null;
//       document.removeEventListener('mousemove', onMouseMove);
//       el.removeEventListener('mouseup', mouseUpEvent);
//       return false;
//     }
//     moveAt(event.pageX, event.pageY);
//   }

//   document.addEventListener('mousemove', onMouseMove);
//   const mouseUpEvent = function (event) {
//     el.style.display = 'none';
//     const dropZone = document.elementFromPoint(event.clientX, event.clientY);
//     el.style.display = 'flex';
//     const index = [
//       ...dropZone.parentNode.parentNode.parentNode.children,
//     ].indexOf(dropZone.parentNode.parentNode);
//     document.removeEventListener('mousemove', onMouseMove);
//     el.onmouseup = null;

//     // console.log(index, pickedIndex, dropZone.parentNode.parentNode, dropZone);
//     if (!dropZone.parentNode.classList.contains('todo-list-absolute')) {
//       clearAbsolute(el);
//       return false;
//     }

//     if (index > pickedIndex) {
//       dropZone.parentNode.parentNode.after(picked.parentNode);
//     } else {
//       dropZone.parentNode.parentNode.before(picked.parentNode);
//     }

//     clearAbsolute(el);
//     console.log(mouseUpEvent);
//     el.removeEventListener('mouseup', mouseUpEvent);
//   };
//   el.addEventListener('mouseup', mouseUpEvent);
//   window.onkeydown = (e) => {
//     if (e.keyCode === 27) {
//       el.removeEventListener('mouseup', mouseUpEvent);
//       document.removeEventListener('mousemove', onMouseMove);
//       clearAbsolute(el);
//     }
//   };

//   function clearAbsolute(el) {
//     el.style.position = '';
//     el.style.zIndex = '';
//     el.style.left = '';
//     el.style.top = '';
//     el.classList.remove('move');
//   }
// }

function clearAbsolute(el) {
  el.style.position = '';
  el.style.zIndex = '';
  el.style.left = '';
  el.style.top = '';
  el.classList.remove('move');
}
