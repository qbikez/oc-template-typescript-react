import * as fs from 'fs';

const removeTsExtension = path => path.replace(/\.tsx?$/, "");

const reactOCProviderTemplate = ({ viewPath }) => {
  const template = fs.readFileSync(`${__dirname}/reactOCProvider.template.tsx`).toString();
  return template
    .replace('./component.template', removeTsExtension(viewPath))
};

export default reactOCProviderTemplate;
