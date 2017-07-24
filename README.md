1. 增加資料欄位(請依萍幫忙):
* Tumor size
* Nuclear Grade

2. 增加鼻咽癌跟甲狀腺癌兩種癌症資料(請依萍幫忙)

3. UI設計flow
* 增加警語提示畫面
* user選擇癌症
* User輸入不可改變的資料 (年齡、期別、性別、腫瘤大小)
* 顯示不同治療方式對五年存活率的影響(手術、化療、電療、賀爾蒙治療，術前化療)


### How to run 
* yarn 
* yarn start

### to update schema.graphql
* change your graphql server in ./scripts/getShema.js
* yarn get-schema

### update relay mordern schema files
* yarn relay

### build production code
* yarn build
