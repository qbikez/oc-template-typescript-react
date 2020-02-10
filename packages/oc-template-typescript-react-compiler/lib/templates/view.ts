import * as fs from 'fs';
const viewTemplate = ({
  reactRoot,
  css,
  externals,
  bundleHash,
  bundleName
}) => {
  const scriptTemplate = fs.readFileSync(`${__dirname}/view.template.script.js`).toString();
  const template = fs.readFileSync(`${__dirname}/view.template.jsx`).toString();
  return template
    .replace('const component = ', '')
    .replace('__script__', scriptTemplate)
    .replace('__bundlePath__', '${staticPath} + "__bundleName__.js"')
    .replace(/__reactRoot__/g, reactRoot)
    .replace(/__css__/g, css || '')
    .replace('__externals__', JSON.stringify(externals))
    .replace('__bundleHash__', bundleHash)
    .replace('__bundleName__', bundleName)
    .replace('__props__', '{props}');
}

export default viewTemplate;
