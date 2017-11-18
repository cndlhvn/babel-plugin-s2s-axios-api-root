import { defaultImport, getImportPath, template } from 's2s-utils';
import globby from 'globby'

function trimDotSlash(path) {
  return path.replace('./', '')
}

const builders = {
  root: template(`const api = OBJ`)
}

module.exports = (babel) => {
  var t = babel.types;

  const defaultExport = (source) => t.ExportAllDeclaration( t.stringLiteral(source))

  return {
    name: "s2s-redux-actions-root",
    visitor: {
      Program: {
        exit(path, state) {
	        const { input, output } = state.opts
          if (!input) {
            throw new Error('require input option')
          }

          if (!output) {
            throw new Error('require output option')
          }

          const files = globby.sync(input)
          const index = files.indexOf(output)

          if (index > -1) {
            files.splice(index, 1);
          }

          const imports = files
                .map(f => defaultImport("* as " + trimDotSlash(getImportPath(output, f)), getImportPath(output, f)))

          const props = files
                .map(f => trimDotSlash(getImportPath(output, f)))
                .map(x => t.identifier(x))
                .map(name => t.SpreadProperty(name))

          const exportExpression = t.ExportDefaultDeclaration(
            t.Identifier("api")
          )

          path.node.body = [
            ...imports,
            builders.root({ OBJ: t.objectExpression(props) }),
            exportExpression
          ]
        }
      }
    }
  }
}
