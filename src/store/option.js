import {observable, action, computed} from 'mobx'
import dataStore from './data'
import { data1 } from './fakeData'

class OptionData {
    @observable
    cancerList = ''
    @observable
    featureList = [
        {name_cn: '化學治療', feature: 'ct', option_cn: ['無', '有']},
        {name_cn: '放腫治療', feature: 'rt', option_cn: ['無', '有']},
        {name_cn: '賀爾蒙治療', feature: 'ht', option_cn: ['無', '有']},
        {name_cn: '標靶藥物 (herceptin)', feature: 'herceptin', option_cn: ['無', '有']},
    ]

    stageT = [
        { label: 'T1', value: 1 },
        { label: 'T2', value: 2 },
        { label: 'T3', value: 3 },
        { label: 'T4', value: 4 }
    ]

    stageN = [
        { label: 'N0', value: 0 },
        { label: 'N1', value: 1 },
        { label: 'N2', value: 2 },
        { label: 'N3', value: 3 }
    ]

    grade = [
        { label: 'G1', value: 1 },
        { label: 'G2', value: 2 },
        { label: 'G3', value: 3 }
    ]

    gene = [
        { label: 'Nagtive (-)', value: 0 },
        { label: 'Positive (+)', value: 1},
    ]

    barPriority = [
        {
            order: {rt: 0, ht: 0, ct: 0, herceptin:0},
            label: '手術'
        },
        {
            order: {rt: 0, ht: 0, ct: 1, herceptin:0},
            label: '化療'
        },
        {
            order: {rt: 1, ht: 0, ct: 1, herceptin:0},
            label: '放療'
        },
        {
            order: {rt: 1, ht: 1, ct: 1, herceptin:0},
            label: '賀爾蒙治療'
        },
        {
            order: {rt: 1, ht: 1, ct: 1, herceptin:1},
            label: ' 標靶藥物 (herceptin)'
        }
    ]

    choiceSuggestion= `對於是否要接受化學治療
    國外著名乳癌預測預後網站 PREDICT，參考附屬於英國劍橋教學醫院 Addenbrooke's Hospital 的乳癌協會 (the Cambridge Breast Unit) 的建議如下：
    如果接受化療對於10年存活機率的絕對益處增加
      <3%: 則不建議使用化療
      介於 3-5%: 可以考量是否要接受化療
      >5%: 建議使用化療
    `

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
        this.cancerList = data1.viewer.cancers
        // this.fetch({query: queryString, variables: variables})
        //     .then((res) => res.json())
        //     .then((backdata) => {
        //         console.log('setCancerList', backdata)
        //         this.cancerList = backdata.data.viewer.cancers
        //     })
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
        // this.fetch({query: queryString, variables: variables})
        //     .then((res) => res.json())
        //     .then((backdata) => {
        //         // this.featureList = backdata.data.viewer.features
        //         // let obj = {}
        //         // _.forEach(backdata, (data)=>obj[data.feature]=0)
        //         // dataStore.initActionFeature(obj)
        //     })
    }

    // fetch(data) {
    //     let url = 'https://prepare.kfsyscc.org/prepare-api'
    //     let headers = new Headers()
    //     headers.append("Content-Type", "application/json")
    //     headers.append("Accept", "application/json")
    //     return (
    //         fetch(
    //             url,
    //             {
    //                 method: 'POST',
    //                 headers: headers,
    //                 credentials: 'include',
    //                 body: JSON.stringify(data),
    //                 mode: 'cors'
    //             }
    //         )
    //     )
    // }
}

var optionData = new OptionData()

export default optionData
