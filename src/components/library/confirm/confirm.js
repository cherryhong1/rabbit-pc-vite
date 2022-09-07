import { h, render } from "vue";
import confirm from "./confirm.vue";
const div = document.createElement("div");
div.setAttribute("class", "confirm-container");
document.body.appendChild(div);

export default function Confirm({ title, text }) {
  return new Promise((resolve, reject) => {
    const submitCallback = () => {
      render(null, div);
      resolve();
    };
    const cancelCallback = () => {
      render(null, div);
      reject(new Error("点击取消"));
    };
    const vNode = h(confirm, { title, text, cancelCallback, submitCallback });
    render(vNode, div);
  });
}
