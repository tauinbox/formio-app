export const FORM: any = {
  components: [
    {
      type: "panel",
      title: "Page 1",
      isNew: true,
      components: [
        {
          input: true,
          label: "Regular Button",
          tableView: false,
          key: "submit",
          size: "md",
          leftIcon: "",
          rightIcon: "",
          block: false,
          action: "submit",
          disableOnInvalid: false,
          theme: "primary",
          type: "button",
          tags: [],
          conditional: {
            show: "",
            when: null,
            eq: ""
          }
        },
        {
          input: true,
          label: "Custom Button",
          tableView: false,
          key: "submit2",
          size: "md",
          leftIcon: "",
          rightIcon: "",
          block: false,
          action: "submit",
          disableOnInvalid: false,
          theme: "primary",
          type: "customButton",
          tags: [],
          conditional: {
            show: "",
            when: null,
            eq: ""
          }
        },
        {
          key: "divider",
          input: false,
          type: "divider",
          tags: [],
          conditional: {
            show: "",
            when: null,
            eq: ""
          }
        }
      ],
      input: false,
      key: "page1",
      theme: "default"
    },
    {
      type: "panel",
      title: "Page 2",
      isNew: true,
      components: [
        {
          input: true,
          tableView: true,
          inputType: "text",
          inputMask: "",
          label: "Text",
          key: "text",
          placeholder: "",
          prefix: "",
          suffix: "",
          multiple: false,
          defaultValue: "",
          protected: false,
          unique: false,
          persistent: true,
          hidden: false,
          clearOnHide: true,
          validate: {
            required: false,
            minLength: "",
            maxLength: "",
            pattern: "",
            custom: "",
            customPrivate: false
          },
          conditional: {
            show: "",
            when: null,
            eq: ""
          },
          type: "textfield",
          tags: []
        }
      ],
      input: false,
      key: "page2",
      theme: "default"
    }
  ],
  display: "wizard",
  page: 1,
  numPages: 2
};

export const FORM2: any = {
  page: 0,
  display: "wizard",
  numLabel: false,
  numPages: 2,
  components: [
    {
      form: { },
      type: "panel",
      input: false,
      theme: "default",
      title: "Page 1",
      components: [
        {
          key: "radioField1",
          form: { },
          tags: [ ],
          type: "radio",
          input: true,
          label: "Radio button demo",
          parent: {
            type: "panel",
            index: 0
          },
          values: [
            {
              label: "the button",
              value: "theButton"
            }
          ],
          validate: {
            custom: "",
            required: false,
            customPrivate: false
          },
          inputType: "radio",
          protected: false,
          tableView: true,
          persistent: true,
          conditional: {
            eq: "",
            show: "",
            when: null
          },
          defaultValue: "",
          numericLabel: "1",
          isNumericLabelEnabled: false
        },
        {
          key: "submit1",
          form: { },
          size: "md",
          tags: [ ],
          type: "button",
          block: false,
          input: true,
          isNew: false,
          label: "Submit",
          theme: "primary",
          action: "submit",
          isLink: false,
          parent: {
            type: "panel",
            index: 0
          },
          leftIcon: "",
          rightIcon: "",
          tableView: false,
          conditional: {
            eq: "",
            show: "",
            when: null,
            eqObject: null
          },
          isNumerable: false,
          disableOnInvalid: false,
          isNumericLabelEnabled: false
        },
        {
          key: "submit2",
          form: { },
          size: "md",
          tags: [ ],
          type: "button",
          block: false,
          input: true,
          isNew: false,
          label: "One more Submit",
          theme: "primary",
          action: "submit",
          isLink: false,
          parent: {
            type: "panel",
            index: 0
          },
          leftIcon: "",
          rightIcon: "",
          tableView: false,
          conditional: {
            eq: "",
            show: "",
            when: null,
            eqObject: null
          },
          isNumerable: false,
          disableOnInvalid: false,
          isNumericLabelEnabled: false
        },
        {
          key: "submit3",
          form: { },
          size: "md",
          tags: [ ],
          type: "customButton",
          block: false,
          input: true,
          label: "The last one (custom)",
          theme: "primary",
          action: "submit",
          isLink: false,
          parent: {
            type: "panel",
            index: 0
          },
          leftIcon: "",
          rightIcon: "",
          tableView: false,
          conditional: {
            eq: "",
            show: "",
            when: null,
            eqObject: null
          },
          isNumerable: false,
          disableOnInvalid: false,
          isNumericLabelEnabled: false
        },
        {
          key: "selectField1",
          data: {
            url: "",
            json: "",
            custom: "",
            values: [
              {
                label: "line 1",
                value: "line1"
              },
              {
                label: "line 2",
                value: "line2"
              }
            ],
            resource: ""
          },
          form: { },
          tags: [ ],
          type: "select",
          input: true,
          label: "Select demo",
          filter: "",
          parent: {
            type: "panel",
            index: 0
          },
          unique: false,
          dataSrc: "values",
          multiple: false,
          template: "<span>{{ item.label }}</span>",
          validate: {
            required: false
          },
          protected: false,
          refreshOn: "",
          tableView: true,
          persistent: true,
          conditional: {
            eq: "",
            show: "",
            when: null
          },
          placeholder: "",
          authenticate: false,
          defaultValue: "",
          numericLabel: "5",
          valueProperty: "",
          isNumericLabelEnabled: false
        },
        {
          key: "textField1",
          form: { },
          tags: [ ],
          type: "textfield",
          input: true,
          label: "Text demo",
          parent: {
            type: "panel",
            index: 0
          },
          prefix: "",
          suffix: "",
          unique: false,
          multiple: false,
          validate: {
            custom: "",
            pattern: "",
            required: false,
            maxLength: "",
            minLength: "",
            customPrivate: false
          },
          inputMask: "",
          inputType: "text",
          protected: false,
          tableView: true,
          persistent: true,
          conditional: {
            eq: "",
            show: "",
            when: null
          },
          placeholder: "type something in here",
          defaultValue: "",
          numericLabel: "6",
          isNumericLabelEnabled: false
        },
        {
          key: "numberField1",
          form: { },
          tags: [ ],
          type: "number",
          input: true,
          label: "Number demo",
          parent: {
            type: "panel",
            index: 0
          },
          prefix: "",
          suffix: "",
          validate: {
            max: "",
            min: "",
            step: "any",
            custom: "",
            integer: "",
            multiple: "",
            required: false
          },
          inputType: "number",
          protected: false,
          tableView: true,
          persistent: true,
          conditional: {
            eq: "",
            show: "",
            when: null
          },
          placeholder: "",
          defaultValue: "",
          numericLabel: "7",
          isNumericLabelEnabled: false
        },
        {
          key: "passwordField1",
          form: { },
          tags: [ ],
          type: "password",
          input: true,
          label: "Password demo",
          parent: {
            type: "panel",
            index: 0
          },
          prefix: "",
          suffix: "",
          inputType: "password",
          protected: true,
          tableView: false,
          persistent: true,
          conditional: {
            eq: "",
            show: "",
            when: null
          },
          placeholder: "",
          numericLabel: "8",
          isNumericLabelEnabled: false
        }
      ],
      componentsCount: 0
    },
    {
      key: "page2",
      form: { },
      type: "panel",
      isNew: false,
      theme: "default",
      title: "Page 2",
      components: [
        {
          key: "selectField2",
          data: {
            url: "",
            json: "",
            custom: "",
            values: [
              {
                label: "option 1",
                value: "option1"
              },
              {
                label: "option 2",
                value: "option2"
              }
            ],
            resource: ""
          },
          form: { },
          tags: [ ],
          type: "select",
          label: "Page 2 Select component",
          filter: "",
          parent: {
            key: "page2",
            type: "panel",
            index: 1
          },
          unique: false,
          dataSrc: "values",
          multiple: false,
          template: "<span>{{ item.label }}</span>",
          validate: {
            required: false
          },
          protected: false,
          refreshOn: "",
          tableView: true,
          parentPage: "page2",
          persistent: true,
          conditional: {
            eq: "",
            show: "",
            when: null
          },
          placeholder: "",
          authenticate: false,
          defaultValue: "",
          numericLabel: "1",
          valueProperty: "",
          isNumericLabelEnabled: false
        },
        {
          key: "checkboxField1",
          form: { },
          tags: [ ],
          type: "checkbox",
          label: "Checkbox demo",
          parent: {
            key: "page2",
            type: "panel",
            index: 1
          },
          validate: {
            required: false
          },
          hideLabel: true,
          inputType: "checkbox",
          protected: false,
          tableView: true,
          parentPage: "page2",
          persistent: true,
          conditional: {
            eq: "",
            show: "",
            when: null
          },
          defaultValue: false,
          numericLabel: "2",
          isNumericLabelEnabled: false
        }
      ],
      componentsCount: 0
    }
  ],
  dataVersion: 1
};
