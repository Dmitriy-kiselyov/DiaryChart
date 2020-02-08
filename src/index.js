import React from 'react';
import ReactDOM from 'react-dom';

import { Root } from './components/Root/Root';

ReactDOM.render(
    React.createElement(Root, {}, null),
    document.querySelector('#app')
);


