// vite

import _ from 'lodash'

const globalComponents = import.meta.globEager('components/~global/*.vue')

export default async ({ app }) => {
  Object.entries(globalComponents).forEach(([path, m]) => {
    const componentName = _.upperFirst(
      _.camelCase(path.split('/').pop().replace(/\.\w+$/, ''))
    )
    app.component(
      `${componentName}`, m.default
    )
  })
}
