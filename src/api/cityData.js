import axios from 'axios'

export const getCityData = () =>{
  return new Promise((resolve, reject) => {
    if(window.cityData){
      resolve(window.cityData)
    }else{
      const url='https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
      axios.get(url).then(res=>{
        window.cityData = res.data
        resolve(window.cityData)
      })
    }
  })
}