import {observable, action, computed} from 'mobx'
import dataStore from './data'
import _ from 'lodash'

class OptionData {
    @observable
    cancerList = ''
    @observable
    featureList = [
        {name_cn: '化學治療', feature: 'ct', option_cn: ['無', '有']},
        {name_cn: '放腫治療', feature: 'rt', option_cn: ['無', '有']},
        {name_cn: '賀爾蒙治療', feature: 'ht', option_cn: ['無', '有']},
        // { name_cn: '黃體激素受體(PR)', feature:'pr', option_cn: ['陰-', '陽+']   }
    ]

    stage = [
        {
            label: '第一期 (T1)',
            value: 1
        },
        {
            label: '第二期 (T2)',
            value: 2
        },
        {
            label: '第三期 (T3)',
            value: 3
        },
        {
            label: '第四期 (T4)',
            value: 4
        }
    ]

    grade = [
        {
            label: 'Grade 1 (G1)',
            value: 1
        },
        {
            label: 'Grade 2 (G2)',
            value: 2
        },
        {
            label: 'Grade 3 (G3)',
            value: 3
        },
        {
            label: 'Grade 4 (G4)',
            value: 4
        }
    ]

    pr = [
        {
            label: 'Nagtive (-)',
            value: 0
        },
        {
            label: 'Positive (+)',
            value: 1
        },
    ]

    barPriority = [
        {
            order: {rt: 0, ht: 0, ct: 1},
            label: '化療'
        },
        {
            order: {rt: 1, ht: 0, ct: 1},
            label: '放療'
        },
        {
            order: {rt: 1, ht: 1, ct: 1},
            label: '賀爾蒙治療'
        }
    ]

    @action
    setCancerList() {
        const queryString = `query{
            viewer{
              cancers{
                value: cancer
                label: name_cn
                name_en
              }
            }
        }`
        const variables = {}
        this.fetch({query: queryString, variables: variables})
            .then((res) => res.json())
            .then((backdata) => {
                this.cancerList = backdata.data.viewer.cancers
            })
    }

    @action
    setFeatureList() {
        const queryString = `query ($cancer: String!){
            viewer{
                features(cancer: $cancer) {
                    cancer
                    feature
                    name_cn
                    name_en
                    isAnalysis
                }
            }
        }`
        const variables = {cancer: dataStore.cancer.value}
        this.fetch({query: queryString, variables: variables})
            .then((res) => res.json())
            .then((backdata) => {
                // this.featureList = backdata.data.viewer.features
                // let obj = {}
                // _.forEach(backdata, (data)=>obj[data.feature]=0)
                // dataStore.initActionFeature(obj)
            })
    }

    fetch(data) {
        let url = 'https://prepare.kfsyscc.org/prepare-api'
        let headers = new Headers()
        headers.append("Content-Type", "application/json")
        headers.append("Accept", "application/json")
        return (
            fetch(
                url,
                {
                    method: 'POST',
                    headers: headers,
                    credentials: 'include',
                    body: JSON.stringify(data),
                    mode: 'cors'
                }
            )
        )
    }
}

var optionData = new OptionData()

export default optionData
