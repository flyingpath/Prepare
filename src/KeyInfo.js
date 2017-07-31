import React from 'react' 
import _ from 'lodash' 

import dataStore from './store/data'

class KeyInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
        this.confirm = this.confirm.bind(this);
    }

    confirm() {
        dataStore.changePageTo('featureAndReport')
    }

    render() {
        return (
            <div>
                <div>
                    性別
                    年齡
                </div>
                <div>
                    腫瘤大小
                </div>
                <div>
                    感染淋巴結數量
                </div>
                <div>
                    <button onClick={this.confirm}>
                        確認
                    </button>
                </div>
            </div>
        );
    }
}

export default KeyInfo