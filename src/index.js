// import './app.css';
const $todoListContents = document.querySelector(".todo-list-contents");
let clearCount = 0;
let picked = null;
let pickedIndex = null;

const delay = (ms) => {
  setTimeout(() => {
    console.log("딜레이");
  }, ms);
};

// input enter
const createTodo = (e) => {
  const $todoListItems = document.querySelectorAll(".todo-list-item");
  const $todoListCounter = document.querySelector(".todo-list-counter");
  if (e.keyCode === 13 && e.target.value) {
    const temp = document.createElement("li");
    temp.classList.add("todo-list-item");
    temp.setAttribute("data-time", new Date().getTime());
    temp.setAttribute("draggable", "true");
    temp.setAttribute("dropzone", "true");
    temp.innerHTML = `<span class="material-icons">
    drag_handle
  </span><span>${e.target.value}</span>`;
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
    console.log("active실행");
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

// let picked = null;
// let pickedIndex = null;
// let dragging = null;
// let ghost = "";

// // 마우스 클릭
// $todoListContents.addEventListener("mousedown", (e) => {
//   picked = e.target.parentNode;
//   dragging = e.target;
//   pickedIndex = [...picked.parentNode.children].indexOf(picked);
//   picked.style.opacity = 0.6;
// });

// // 마우스 이동
// $todoListContents.addEventListener("mousemove", (e) => {
//   if (dragging) {
//     e.preventDefault();
//   } else {
//     return false;
//   }
// });

// // 마우스 땜
// $todoListContents.addEventListener("mouseup", (e) => {
//   const obj = e.target.parentNode;
//   const index = [...obj.parentNode.children].indexOf(obj);
//   dragging = null;
//   const checkClass = document.getElementsByClassName("todo-list-item");

//   if (!obj.classList.contains("todo-list-item")) {
//     return false;
//   }

//   if (index > pickedIndex) {
//     obj.after(picked);
//   } else {
//     obj.before(picked);
//   }

//   picked.style.opacity = 1;
// });

function listFilter(filterType, event) {
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
}

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

// 테스트코드

function handleMouseDown(e) {
  e.preventDefault();
  picked = e.target.parentNode;
  pickedIndex = [...picked.parentNode.children].indexOf(picked);
  const el = e.target.parentNode;
  el.style.position = "absolute";
  el.style.zIndex = 1000;
  el.classList.add("move");
  console.log(pickedIndex, "픽 인덱스");
  moveAt(e.pageX, e.pageY);
  function moveAt(pageX, pageY) {
    el.style.left = pageX + "px";
    el.style.top = pageY - el.offsetHeight / 2 + "px";
  }
  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  document.addEventListener("mousemove", onMouseMove);
  el.addEventListener("mouseup", function (event) {
    const obj = event.target.parentNode;
    const index = [...obj.parentNode.children].indexOf(obj) - 1;
    document.removeEventListener("mousemove", onMouseMove);
    el.onmouseup = null;
    const dropZone = document.elementFromPoint(event.clientX, event.clientY);
    // dropZone.setAttribute("dropzone", "copy");
    // console.log(dropZone, "드랍존");
    // 이동하는 코드
    if (dropZone && dropZone.hasAttribute("dropzone")) {
      console.log(dropZone, dropZone.hasAttribute("dropzone"));
      dropZone.appendChild(el);
    }

    el.style.position = "";
    el.style.zIndex = "";
    el.style.left = "";
    el.style.top = "";
    el.classList.remove("move");
  });
}
