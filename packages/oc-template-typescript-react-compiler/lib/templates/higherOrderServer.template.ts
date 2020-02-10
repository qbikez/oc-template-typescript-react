import { data as dataProvider } from './higherOrderServer.template.server';

export const data = (context : any, callback : (error: any, data?: any) => void) => {
  dataProvider(context, (error: any, model: any) => {
    if (error) {
      return callback(error);
    }
    const props = Object.assign({}, model, {
      _staticPath: context.staticPath,
      _baseUrl: context.baseUrl,
      _componentName: "__componentName__",
      _componentVersion: "__componentVersion__"
    });
    const srcPathHasProtocol = context.staticPath.indexOf("http") === 0;
    const srcPath = srcPathHasProtocol ? context.staticPath : ("https:" + context.staticPath);
    return callback(null, Object.assign({}, {
      reactComponent: {
        key: "__bundleHashKey__",
        src: srcPath + "react-component.js",
        props
      }
    }));
  });
}