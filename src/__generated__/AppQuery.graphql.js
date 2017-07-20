/**
 * @flow
 * @relayHash c89ac1b6057f4c2411601b3ecd42861c
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type AppQueryResponse = {|
  +viewer: ?{| |};
|};
*/


/*
query AppQuery(
  $cancer: String
  $feature: String
) {
  viewer {
    ...CancerSelector_viewer
    ...FeatureSelector_viewer_2Yo3Ig
    ...Report_viewer_38FNKu
  }
}

fragment CancerSelector_viewer on Viewer {
  cancers {
    value: cancer
    label: name_cn
    name_en
  }
}

fragment FeatureSelector_viewer_2Yo3Ig on Viewer {
  features(cancer: $cancer) {
    value: feature
    label: name_cn
    name_en
    cancer
  }
}

fragment Report_viewer_38FNKu on Viewer {
  survival(cancer: $cancer, feature: $feature) {
    data {
      item
      survival {
        years
        rate
      }
    }
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "cancer",
        "type": "String",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "feature",
        "type": "String",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AppQuery",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "viewer",
        "args": null,
        "concreteType": "Viewer",
        "name": "__viewer_viewer",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "CancerSelector_viewer",
            "args": null
          },
          {
            "kind": "FragmentSpread",
            "name": "FeatureSelector_viewer",
            "args": [
              {
                "kind": "Variable",
                "name": "cancer",
                "variableName": "cancer",
                "type": null
              }
            ]
          },
          {
            "kind": "FragmentSpread",
            "name": "Report_viewer",
            "args": [
              {
                "kind": "Variable",
                "name": "cancer",
                "variableName": "cancer",
                "type": null
              },
              {
                "kind": "Variable",
                "name": "feature",
                "variableName": "feature",
                "type": null
              }
            ]
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "AppQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "cancer",
        "type": "String",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "feature",
        "type": "String",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "AppQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "name": "viewer",
        "plural": false,
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
          },
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
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "cancer",
                "variableName": "cancer",
                "type": "String"
              },
              {
                "kind": "Variable",
                "name": "feature",
                "variableName": "feature",
                "type": "String"
              }
            ],
            "concreteType": "SurvivalAnalysis",
            "name": "survival",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "Survival",
                "name": "data",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "item",
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "SurvivalItem",
                    "name": "survival",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "years",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "rate",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "kind": "LinkedHandle",
        "alias": null,
        "args": null,
        "handle": "viewer",
        "name": "viewer",
        "key": "",
        "filters": null
      }
    ]
  },
  "text": "query AppQuery(\n  $cancer: String\n  $feature: String\n) {\n  viewer {\n    ...CancerSelector_viewer\n    ...FeatureSelector_viewer_2Yo3Ig\n    ...Report_viewer_38FNKu\n  }\n}\n\nfragment CancerSelector_viewer on Viewer {\n  cancers {\n    value: cancer\n    label: name_cn\n    name_en\n  }\n}\n\nfragment FeatureSelector_viewer_2Yo3Ig on Viewer {\n  features(cancer: $cancer) {\n    value: feature\n    label: name_cn\n    name_en\n    cancer\n  }\n}\n\nfragment Report_viewer_38FNKu on Viewer {\n  survival(cancer: $cancer, feature: $feature) {\n    data {\n      item\n      survival {\n        years\n        rate\n      }\n    }\n  }\n}\n"
};

module.exports = batch;
