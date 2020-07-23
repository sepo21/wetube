import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const delBtns = document.querySelectorAll(".jsDelBtn");
let btnDivs = document.querySelectorAll("#jsCommentList div");

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const fakeDelComment = (nth) => {
  const commentContainerToDel = commentList.querySelector(
    `div:nth-child(${btnDivs.length - nth})`
  );
  commentContainerToDel
    .querySelector("i")
    .removeEventListener("click", delComment);
  commentContainerToDel.remove();
  decreaseNumber();
};

const sendDelComment = async (nth) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/delComment`,
    method: "POST",
    data: { nth },
  });
  if (response.status === 200) {
    fakeDelComment(nth);
  }
};

function getElementIndex(element, range) {
  if (range) return [].indexOf.call(element, range);
  return [].indexOf.call(element.parentNode.children, element);
}
const delComment = (event) => {
  const btn = event.target;
  const btnDiv = btn.parentNode;
  btnDivs = document.querySelectorAll("#jsCommentList div");
  const nth = btnDivs.length - 1 - getElementIndex(btnDiv);
  console.log(nth);
  sendDelComment(nth);
};

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const fakeAddComment = (comment) => {
  const div = document.createElement("div");
  const li = document.createElement("li");
  const i = document.createElement("i");
  li.innerHTML = comment;
  i.className = "far fa-trash-alt jsDelBtn";
  div.className = "comment-container";
  div.appendChild(li);
  div.appendChild(i);
  i.addEventListener("click", delComment);
  commentList.prepend(div);
  increaseNumber();
};

const sendAddComment = async (comment) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/addComment`,
    method: "POST",
    data: { comment },
  });
  if (response.status === 200) {
    fakeAddComment(comment);
  }
};

const addComment = (event) => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendAddComment(comment);
  commentInput.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", addComment);
  delBtns.forEach((btn) => {
    btn.addEventListener("click", delComment);
  });
}

if (addCommentForm) {
  init();
}
