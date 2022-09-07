import request from "@/utils/request";

export const getNewCartGoods = (skuId) => {
  return request(`/goods/stock/${skuId}`);
};

export const mergeLocalCart = (cartList) => {
  return request("/member/cart/merge", "post", cartList);
};

export const findCartList = () => {
  return request("/member/cart");
};

export const insertCart = ({ skuId, count }) => {
  return request("/member/cart", "post", { skuId, count });
};

export const deleteCart = (ids) => {
  return request("/member/cart", "delete", { ids });
};

export const updateCart = (goods) => {
  return request("/member/cart/" + goods.skuId, "post", goods);
};

export const checkAllCart = ({ selected, ids }) => {
  return request("/member/cart/selected", "put", { selected, ids });
};
