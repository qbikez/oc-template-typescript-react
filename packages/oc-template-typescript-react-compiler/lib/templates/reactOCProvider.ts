import * as fs from 'fs';

const removeTsExtension = path => path.replace(/\.tsx?$/, "");

const reactOCProviderTemplate = ({ viewPath }) => {
  const template = fs.readFileSync(`${__dirname}/reactOCProvider.template.tsx`).toString();
  return template
    .replace('./reactOCProvider.template.component', removeTsExtension(viewPath))
};

export default reactOCProviderTemplate;
