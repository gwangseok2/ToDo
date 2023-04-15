const $todoListContents = document.querySelector(".todo-list-contents");
const $input = document.querySelector(".todo-list-input");
const $buttons = document.querySelectorAll(".todo-list-buttons button");
const $clearButton = document.querySelector(".todo-list-clear > button");
let clearCount = 0;
let picked = null;
let pickedIndex = null;

const delay = (ms) => {
  setTimeout(() => {
    console.log("딜레이");
  }, ms);
};

// createTodo
$input.addEventListener("keypress", (e) => {
  createTodo(e);
});
// input enter
const createTodo = (e) => {
  const $todoListItems = document.querySelectorAll(".todo-list-item");
  const $todoListCounter = document.querySelector(".todo-list-counter");
  if (e.keyCode === 13 && e.target.value) {
    const temp = document.createElement("li");
    temp.classList.add("todo-list-item");
    temp.setAttribute("data-time", new Date().getTime());
    temp.setAttribute("dropzone", "true");
    temp.innerHTML = `<div class="todo-list-absolute">
    <span class="material-icons" dropzone="true">
    drag_handle
  </span><span>${e.target.value}</span></div>`;
    e.target.value = "";
    $todoListCounter.innerText = $todoListItems.length + 1;

    if ($todoListItems.length > 0) {
      $todoListContents.prepend(temp);
    } else {
      $todoListContents.append(temp);
    }

    // 테스트
    const dragSrcEl = document.querySelector(".material-icons");
    dragSrcEl.addEventListener("mousedown", handleMouseDown);
  }

  // 추가한 요소 이벤트 부착
  const $dragEventTarget = document.querySelectorAll(".todo-list-item");
  for (let i = 0; i < $dragEventTarget.length; i++) {
    $dragEventTarget[i].addEventListener("mousedown", contentsActiveEvent);
  }
};

function contentsActiveEvent(event, length) {
  const timesTarget = document.querySelectorAll(".todo-list-item");
  if (event.target.tagName !== "LI") {
    return false;
  }
  // 클래스 유무 체크
  if (event.target.classList.contains("active")) {
    event.target.classList.remove("active");
    const compare = (a, b) => {
      if (a.getAttribute("data-time") < b.getAttribute("data-time")) {
        return 1;
      }
      if (a.getAttribute("data-time") > b.getAttribute("data-time")) {
        return -1;
      }
      return 0;
    };
    const sortTime = Array.from(timesTarget).sort(compare);
    sortTime.forEach((time) => {
      $todoListContents.appendChild(time);
    });
    clearCount--;
  } else {
    event.target.classList.add("active");
    clearCount++;
    $todoListContents.append(event.target);
  }

  // active-button 활성 중 눌렀을 때 listFilter 함수 실행
  if (document.querySelector(".active-button").classList.contains("active")) {
    listFilter("active");
  } else if (
    document.querySelector(".completed-button").classList.contains("active")
  ) {
    listFilter("");
  }

  // 카운터초기화
  document.querySelector(
    ".todo-list-clear-counter"
  ).innerText = `(${clearCount})`;
}

$buttons.forEach((el) => {
  if (el.classList.contains("all")) {
    el.addEventListener("click", (event) => {
      listFilter("all", event);
    });
  } else if (el.classList.contains("active-button")) {
    el.addEventListener("click", (event) => {
      listFilter("active", event);
    });
  } else {
    el.addEventListener("click", (event) => {
      listFilter("", event);
    });
  }
});

const listFilter = (filterType, event) => {
  const $buttons = document.querySelectorAll(".todo-list-buttons button");
  const $todoListItems = document.querySelectorAll(".todo-list-item");

  if (event) {
    $buttons.forEach((el) => {
      el.classList.remove("active");
    });
    event.target.classList.add("active");
  }

  if (filterType === "all") {
    for (let i = 0; i < $todoListItems.length; i++) {
      $todoListItems[i].style.display = "flex";
    }
  } else if (filterType === "active") {
    for (let i = 0; i < $todoListItems.length; i++) {
      if ($todoListItems[i].classList.contains("active")) {
        $todoListItems[i].style.display = "none";
      } else {
        $todoListItems[i].style.display = "flex";
      }
    }
  } else {
    for (let i = 0; i < $todoListItems.length; i++) {
      if (!$todoListItems[i].classList.contains("active")) {
        $todoListItems[i].style.display = "none";
      } else {
        $todoListItems[i].style.display = "flex";
      }
    }
  }
};
$clearButton.addEventListener("click", clearTodo);
function clearTodo() {
  const checkData = confirm("Are you sure you want to clear the todolist?");
  const leftCount = document.querySelector(".todo-list-counter").innerText;
  if (checkData) {
    let count = 0;
    document.querySelectorAll(".todo-list-item").forEach((el) => {
      if (el.classList.contains("active")) {
        $todoListContents.removeChild(el);
        count++;
      }
    });
    document.querySelector(".todo-list-counter").innerText = leftCount - count;
    clearCount = 0;
    document.querySelector(
      ".todo-list-clear-counter"
    ).innerText = `(${clearCount})`;
  }
}

function handleMouseDown(e) {
  e.preventDefault();
  picked = e.target.parentNode;
  pickedIndex = [...picked.parentNode.parentNode.children].indexOf(
    picked.parentNode
  );
  const el = e.target.parentNode;
  el.classList.add("move");
  const $area = document.querySelector(".todo-list-wrapper");
  const pointerWidthArea =
    document.querySelector(".todo-list-wrapper").offsetWidth + 20;
  const pointerHeightArea =
    document.querySelector(".todo-list-wrapper").offsetHeight + 20;

  moveAt(e.pageX, e.pageY);
  function moveAt(pageX, pageY) {
    el.style.left = pageX - el.offsetWidth / 3 + "px";
    el.style.top = pageY - el.offsetHeight / 2 + "px";
  }
  function onMouseMove(event) {
    if (
      parseInt(el.style.left) < (window.innerWidth - pointerWidthArea) / 2 ||
      parseInt(el.style.top) < $area.offsetTop ||
      parseInt(el.style.top) > pointerHeightArea ||
      parseInt(el.style.left) > pointerWidthArea
    ) {
      clearAbsolute(el);
      el.onmouseup = null;
      document.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseup", mouseUpEvent);
      return false;
    }
    moveAt(event.pageX, event.pageY);
  }

  document.addEventListener("mousemove", onMouseMove);
  const mouseUpEvent = function (event) {
    el.style.display = "none";
    const dropZone = document.elementFromPoint(event.clientX, event.clientY);
    el.style.display = "flex";
    const index = [
      ...dropZone.parentNode.parentNode.parentNode.children,
    ].indexOf(dropZone.parentNode.parentNode);
    document.removeEventListener("mousemove", onMouseMove);
    el.onmouseup = null;

    // console.log(index, pickedIndex, dropZone.parentNode.parentNode, dropZone);
    if (!dropZone.parentNode.classList.contains("todo-list-absolute")) {
      clearAbsolute(el);
      return false;
    }

    if (index > pickedIndex) {
      dropZone.parentNode.parentNode.after(picked.parentNode);
    } else {
      dropZone.parentNode.parentNode.before(picked.parentNode);
    }

    clearAbsolute(el);
    console.log(mouseUpEvent);
    el.removeEventListener("mouseup", mouseUpEvent);
  };
  el.addEventListener("mouseup", mouseUpEvent);
  window.onkeydown = (e) => {
    if (e.keyCode === 27) {
      el.removeEventListener("mouseup", mouseUpEvent);
      document.removeEventListener("mousemove", onMouseMove);
      clearAbsolute(el);
    }
  };

  function clearAbsolute(el) {
    el.style.position = "";
    el.style.zIndex = "";
    el.style.left = "";
    el.style.top = "";
    el.classList.remove("move");
  }
}

console.log(createTodo);
