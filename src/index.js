import React from 'react';
import ReactDOM from 'react-dom';
import MuiaddApp from './MuiaddApp'
import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';


try{
    injectTapEventPlugin()
}catch(err){
    console.log('使用injectTapEventPlugin出現錯誤(index.js), 錯誤資訊：', err)
}

ReactDOM.render(
  <MuiaddApp />,
  document.getElementById('root')
);
