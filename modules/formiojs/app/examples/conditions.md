---
title: Conditionals
layout: vtabs
section: examples
weight: 200
---
### Conditional Forms
You can use [JSON Logic](http://jsonlogic.com) to create complex conditionals and validation criteria.

<div class="row">
  <div class="col col-sm-7">
<pre>
var form = new FormioForm(document.getElementById('formio'));
form.form = {
  components: [
    {
      "type": "textfield",
      "label": "Type \"Show\"",
      "key": "typeShow",
      "input": true,
      "inputType": "text",
      "validate": {
        "json": {
          "if": [
            {
              "==": [
                {
                  "var": "data.typeShow"
                },
                "Show"
              ]
            },
            true,
            "You must type 'Show'!"
          ]
        }
      }
    },
    {
      "type": "textfield",
      "label": "Type \"Me\"",
      "key": "typeMe",
      "input": true,
      "inputType": "text",
      "validate": {
        "json": {
          "if": [
            {
              "==": [
                {
                  "var": "data.typeMe"
                },
                "Me"
              ]
            },
            true,
            "You must type 'Me'!"
          ]
        }
      },
      "conditional": {
        "json": {
          "===": [
            {
              "var": "data.typeShow"
            },
            "Show"
          ]
        }
      }
    },
    {
      "type": "textfield",
      "label": "Type \"The\"",
      "key": "typeThe",
      "input": true,
      "inputType": "text",
      "validate": {
        "json": {
          "if": [
            {
              "==": [
                {
                  "var": "data.typeThe"
                },
                "The"
              ]
            },
            true,
            "You must type 'The'!"
          ]
        }
      },
      "conditional": {
        "json": {
          "===": [
            {
              "var": "data.typeMe"
            },
            "Me"
          ]
        }
      }
    },
    {
      "type": "textfield",
      "input": true,
      "inputType": "text",
      "label": "Type \"Monkey!\"",
      "key": "typeMonkey",
      "validate": {
        "json": {
          "if": [
            {
              "==": [
                {
                  "var": "data.typeMonkey"
                },
                "Monkey!"
              ]
            },
            true,
            "You must type 'Monkey!'"
          ]
        }
      },
      "conditional": {
        "json": {
          "===": [
            {
              "var": "data.typeThe"
            },
            "The"
          ]
        }
      }
    },
    {
      "key": "monkey",
      "input": false,
      "tag": "img",
      "attrs": [
        {
          "attr": "src",
          "value": "https://ichef.bbci.co.uk/news/660/cpsprodpb/025B/production/_85730600_monkey2.jpg"
        },
        {
          "attr": "style",
          "value": "width: 100%;"
        }
      ],
      "className": "",
      "content": "",
      "type": "htmlelement",
      "conditional": {
        "json": {
          "===": [
            {
              "var": "data.typeMonkey"
            },
            "Monkey!"
          ]
        }
      }
    }
  ]
};
</pre>
  </div>
  <div class="col col-sm-5">
  <h3>Result</h3>
  <div class="well">
  <div id="formio"></div>
  <script type="text/javascript">
  var form = new FormioForm(document.getElementById('formio'));
  form.form = {
    components: [
      {
        "type": "textfield",
        "label": "Type \"Show\"",
        "key": "typeShow",
        "input": true,
        "inputType": "text",
        "validate": {
          "json": {
            "if": [
              {
                "==": [
                  {
                    "var": "data.typeShow"
                  },
                  "Show"
                ]
              },
              true,
              "You must type 'Show'!"
            ]
          }
        }
      },
      {
        "type": "textfield",
        "label": "Type \"Me\"",
        "key": "typeMe",
        "input": true,
        "inputType": "text",
        "validate": {
          "json": {
            "if": [
              {
                "==": [
                  {
                    "var": "data.typeMe"
                  },
                  "Me"
                ]
              },
              true,
              "You must type 'Me'!"
            ]
          }
        },
        "conditional": {
          "json": {
            "===": [
              {
                "var": "data.typeShow"
              },
              "Show"
            ]
          }
        }
      },
      {
        "type": "textfield",
        "label": "Type \"The\"",
        "key": "typeThe",
        "input": true,
        "inputType": "text",
        "validate": {
          "json": {
            "if": [
              {
                "==": [
                  {
                    "var": "data.typeThe"
                  },
                  "The"
                ]
              },
              true,
              "You must type 'The'!"
            ]
          }
        },
        "conditional": {
          "json": {
            "===": [
              {
                "var": "data.typeMe"
              },
              "Me"
            ]
          }
        }
      },
      {
        "type": "textfield",
        "input": true,
        "inputType": "text",
        "label": "Type \"Monkey!\"",
        "key": "typeMonkey",
        "validate": {
          "json": {
            "if": [
              {
                "==": [
                  {
                    "var": "data.typeMonkey"
                  },
                  "Monkey!"
                ]
              },
              true,
              "You must type 'Monkey!'"
            ]
          }
        },
        "conditional": {
          "json": {
            "===": [
              {
                "var": "data.typeThe"
              },
              "The"
            ]
          }
        }
      },
      {
        "key": "monkey",
        "input": false,
        "tag": "img",
        "attrs": [
          {
            "attr": "src",
            "value": "https://ichef.bbci.co.uk/news/660/cpsprodpb/025B/production/_85730600_monkey2.jpg"
          },
          {
            "attr": "style",
            "value": "width: 100%;"
          }
        ],
        "className": "",
        "content": "",
        "type": "htmlelement",
        "conditional": {
          "json": {
            "===": [
              {
                "var": "data.typeMonkey"
              },
              "Monkey!"
            ]
          }
        }
      }
    ]
  };
  </script>
  </div>
  </div>
</div>

