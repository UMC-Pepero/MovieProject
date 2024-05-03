// localStorage에 데이터 저장하기
const UserNameElement = document.getElementById("name");
const pwdElement = document.getElementById("password");
const commentElement = document.getElementById("text");

const loginButton = document.getElementById("login-btn");
loginButton.addEventListener("click", () => {
  let userInfo = {
    UserName: UserNameElement.value,
    password: pwdElement.value,
    comment: commentElement.value,
  };
  localStorage.setItem("userInfo", JSON.stringify(userInfo));

  //데이터 불러오기
  const localData = localStorage.getItem("userInfo");
  console.log(localData);

  //데이터 삭제
  const DeleteButton = document.getElementById("Del-btn");
  DeleteButton.addEventListener("click", () => {
    let userInfo = {
      UserName: UserNameElement.value,
      password: pwdElement.value,
      comment: commentElement.value,
    };
    localStorage.removeItem("userInfo");
  });
});
