const $todoListContents = document.querySelector('.todo-list-contents');
const $input = document.querySelector('.todo-list-input');
const $buttons = document.querySelectorAll('.todo-list-buttons button');
const $clearButton = document.querySelector('.todo-list-clear > button');
const progressArray = [];
const completeArray = [];
let downTimeStamp = null;
let upTimeStamp = null;
let itemId = 0;
let moveTarget = null;
let moveTargetId = null;
let check = true;
let upIndex = null;
let downIndex = null;

// createTodo
$input.addEventListener('keypress', (e) => {
  if (e.keyCode === 13 && e.target.value) {
    createTodo(e);
  }
});

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
const render = (type) => {
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

  if (type === 'change') {
    items.sort((a, b) => {
      if (a.key < b.key && a.status === 'progress' && b.status === 'progress') {
        return 1;
      }
      if (a.key > b.key && a.status === 'progress' && b.status === 'progress') {
        return -1;
      }
      return 0;
    });
  } else {
    items.sort((a, b) => {
      if (a.id < b.id && a.status === 'progress' && b.status === 'progress') {
        return 1;
      }
      if (a.id > b.id && a.status === 'progress' && b.status === 'progress') {
        return -1;
      }
      return 0;
    });
  }

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
  const item = new TodoItem(itemId++, e.target.value, new Date().getTime());
  progressArray.push(item);
  e.target.value = '';
  render();
  return item;
};

$todoListContents.addEventListener('mousedown', mouseDownEvent);
$todoListContents.addEventListener('mouseup', mouseUpEvent);

// 투두리스트 눌렀을 때 발생하는 이벤트 mousedown
function mouseDownEvent(e) {
  downTimeStamp = e.timeStamp;
  if (
    e.target.tagName === 'SPAN' &&
    !e.target.parentNode.parentNode.classList.contains('complete')
  ) {
    $todoListContents.classList.add('hover');
    check = false;
    dragEvent(e);
    $todoListContents.addEventListener('mouseleave', mouseOutTestEvent);
    const clickIndex = Number(e.target.parentNode.parentNode.id);
    downIndex = progressArray.findIndex((x) => x.id === clickIndex);
  }
}

// 이벤트 mouseup
function mouseUpEvent(e) {
  upTimeStamp = e.timeStamp;
  $todoListContents.classList.remove('hover');

  if (upTimeStamp - downTimeStamp < 800 && e.target.tagName === 'LI' && check) {
    const targetId = e.target.id;
    const totalArray = [...progressArray, ...completeArray];

    totalArray.forEach((el, idx) => {
      if (el.id === Number(targetId)) {
        if (el.status === 'progress') {
          el.completeItem();
          progressArray.splice(idx, 1);
          completeArray.push(el);
        } else {
          el.cancelItem();
          completeArray.splice(idx - progressArray.length, 1);
          progressArray.push(el);
        }
        render();
      }
    });
  } else {
    let upId = null;
    if (e.target.tagName === 'SPAN') {
      upId = e.target.parentNode.parentNode.id;
    } else {
      upId = e.target.id;
    }
    upIndex = progressArray.findIndex((x) => x.id === Number(upId));
    const sortArrKey = progressArray[upIndex].key;
    const downArrkey = progressArray[downIndex].key;
    progressArray[upIndex].key = downArrkey;
    progressArray[downIndex].key = sortArrKey;
    render('change');
    clearAbsolute();
  }

  check = true;
}

function dragEvent(e) {
  moveTarget = e.target.parentNode;
  moveTargetId = moveTarget.parentNode.id;
  moveTarget.classList.add('move');

  $todoListContents.addEventListener('mousemove', moveAt);

  function moveAt(e) {
    if (e.target.classList.contains('.todo-list-item')) {
      e.target.classList.add('preview');
    }
    moveTarget.style.left = e.pageX - moveTarget.offsetWidth + 'px';
    moveTarget.style.top = e.pageY - moveTarget.offsetHeight / 2 + 'px';
  }

  // esc 눌렀 을 때 드래그 취소
  window.onkeydown = (e) => {
    if (e.keyCode === 27) {
      $todoListContents.removeEventListener('mousemove', moveAt);
      clearAbsolute();
    }
  };
}

function mouseOutTestEvent() {
  clearAbsolute();
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

function clearAbsolute() {
  moveTarget.style.position = '';
  moveTarget.style.zIndex = '';
  moveTarget.style.left = '';
  moveTarget.style.top = '';
  moveTarget.classList.remove('move');
  $todoListContents.classList.remove('hover');
}
