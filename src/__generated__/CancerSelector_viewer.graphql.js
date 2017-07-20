/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type CancerSelector_viewer = {|
  +cancers: ?$ReadOnlyArray<?{|
    +value: string;
    +label: string;
    +name_en: string;
  |}>;
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CancerSelector_viewer",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "args": null,
      "concreteType": "Cancer",
      "name": "cancers",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": "value",
          "args": null,
          "name": "cancer",
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer"
};

module.exports = fragment;
