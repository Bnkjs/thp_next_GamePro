import dayjs from "dayjs";
import "bootstrap/dist/css/bootstrap.min.css";
import "../sass/style.scss";
import routes from './routes';
import imageOne from "../images/game_1.jpg";
import imageTwo from "../images/game_2.jpg";
import imageThree from "../images/game_3.jpg"
import imageFour from "../images/game_4.jpg"


let pageArgument;

const setRoute = () => {
  let path = window.location.hash.substring(1).split("/");
  pageArgument = path[1] || "";

  var pageContent = document.getElementById("pageContent");
  routes[path[0]](pageArgument);
  return true;
};

window.addEventListener("hashchange", () => setRoute());
window.addEventListener("DOMContentLoaded", () => setRoute());

// const background = [imageOne,imageTwo,imageThree,imageFour];
// const randomBackground = [Math.floor(Math.random() * background.length)];

// const body = document.querySelector('.container');

// window.onload = body.style.background =`url:('${background[randomBackground]}')`;

