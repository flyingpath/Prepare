/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type FeatureSelector_viewer = {|
  +features: ?$ReadOnlyArray<?{|
    +value: string;
    +label: string;
    +name_en: string;
    +cancer: string;
  |}>;
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "cancer",
      "type": "String",
      "defaultValue": ""
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "FeatureSelector_viewer",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "cancer",
          "variableName": "cancer",
          "type": "String"
        }
      ],
      "concreteType": "Feature",
      "name": "features",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": "value",
          "args": null,
          "name": "feature",
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": "label",
          "args": null,
          "name": "name_cn",
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "name_en",
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "cancer",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer"
};

module.exports = fragment;
