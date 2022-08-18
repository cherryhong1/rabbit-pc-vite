import { createVNode, render } from "vue";
import message from "./message.vue";

const div = document.createElement("div");
div.setAttribute("class", "message-container");
document.body.appendChild(div);

let timer = null;

export default ({ type, text }) => {
  const vNode = createVNode(message, { type, text });
  render(vNode, div);
  clearTimeout(timer);
  timer = setTimeout(() => {
    render(null, div);
  }, 3000);
};
