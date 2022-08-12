import { defineDirective } from "@/directives/index"
const moduleFiles = import.meta.globEager('/src/components/library/*.vue')
const pathList = []
for(const path in moduleFiles) {
  pathList.push(path)
}
export default {
  install (app) {
    pathList.forEach(fileName => {
      const component = moduleFiles[fileName].default
      app.component(component.name,component)
    })
    defineDirective(app)
  }
}
