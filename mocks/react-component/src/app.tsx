import React, { useState } from "react";

export async function fooAsync() {
    return await barAsync();
  }
  
async function barAsync() {
    return 0;
  }
  
const obj = { 
    a: 'world!'
  };
  
const spread = {
  ...obj
};


export default (props: any) => {
  console.log('rendering component');
  console.dir(props);
  const [ name, setName ] = useState('World');

  function refresh() {
    props.getData({ name: '!' }, (err: any, data: any) => {
      if (err) {
        console.error(err);
      }
      else {
        console.log('data received');
        console.dir(data);
        setName(data.name);
      }
    });
  }

  setTimeout(refresh, 2000);
  //console.log(data);
  return (<div>Hello {name}</div>);
} 
