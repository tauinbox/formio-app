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
