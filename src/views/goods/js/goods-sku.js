import getPowerSet from "@/vender/power-set";

export const spliter = "★";
export const getSelectedArr = (specs) => {
  const selectedArr = [];
  specs.forEach((spec) => {
    const selectedVal = spec.values.find((val) => val.selected);
    selectedArr.push(selectedVal ? selectedVal.name : undefined);
  });
  return selectedArr;
};

export const updateDisabledStatus = (specs, pathMap) => {
  specs.forEach((spec, i) => {
    const selectedArr = getSelectedArr(specs);
    spec.values.forEach((val) => {
      if (val.name === selectedArr[i]) return false;
      selectedArr[i] = val.name;
      const key = selectedArr.filter((v) => v).join(spliter);
      val.disabled = !pathMap[key];
    });
  });
};

export const getPathMap = (skus) => {
  const pathMap = {};
  skus.forEach((sku) => {
    if (sku.inventory) {
      const specs = sku.specs.map((spec) => spec.valueName);
      const powerSet = getPowerSet(specs);
      powerSet.forEach((set) => {
        const key = set.join(spliter);
        if (pathMap[key]) {
          pathMap[key].push(sku.id);
        } else {
          pathMap[key] = [sku.id];
        }
      });
    }
  });
  return pathMap;
};

export const initSelectedStatus = (goods, skuId) => {
  const sku = goods.skus.find((sku) => sku.id === skuId);
  if (sku) {
    goods.specs.forEach((spec, i) => {
      const value = sku.specs[i].valueName;
      spec.values.forEach((val) => {
        val.selected = val.name === value;
      });
    });
  }
};
