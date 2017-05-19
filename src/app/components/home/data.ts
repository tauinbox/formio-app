export const FORM: any = {
    title: 'Form demo',
    page: 1,
    display: "wizard",
    pageKey: "page2",
    numLabel: false,
    numPages: 2,
    components: [
        {
            form: {},
            type: "panel",
            input: false,
            theme: "default",
            title: "Page 1",
            components: [
                {
                    key: "content1",
                    form: {},
                    html: "<p><b>Content </b><i>demo </i><font color='#3984c6'>lorem</font><i> <span style='font-size: 24px;'>ipsum</span></i><span style='font-size: 24px;'>﻿</span></p>",
                    tags: [],
                    type: "content",
                    input: false,
                    isNew: false,
                    conditional: {
                        eq: "",
                        show: "",
                        when: null
                    },
                    customClass: "Content demo",
                    numericLabel: "1",
                    isNumericLabelEnabled: false
                },
                {
                    key: "radioField1",
                    form: {},
                    tags: [],
                    type: "radio",
                    input: true,
                    label: "Radio button demo",
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
                    numericLabel: "2",
                    isNumericLabelEnabled: false
                },
                {
                    key: "dayField1",
                    form: {},
                    tags: [],
                    type: "day",
                    input: true,
                    label: "Day component demo",
                    fields: {
                        day: {
                            type: "text",
                            required: false,
                            placeholder: ""
                        },
                        year: {
                            type: "text",
                            required: false,
                            placeholder: ""
                        },
                        month: {
                            type: "select",
                            required: false,
                            placeholder: ""
                        }
                    },
                    dayFirst: false,
                    validate: {
                        custom: ""
                    },
                    protected: false,
                    tableView: true,
                    persistent: true,
                    conditional: {
                        eq: "",
                        show: "",
                        when: null
                    },
                    numericLabel: "3",
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
                    form: {},
                    tags: [],
                    type: "select",
                    input: true,
                    label: "Select demo",
                    filter: "",
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
                    numericLabel: "4",
                    valueProperty: "",
                    isNumericLabelEnabled: false
                },
                {
                    key: "textField1",
                    form: {},
                    tags: [],
                    type: "textfield",
                    input: true,
                    label: "Text demo",
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
                    placeholder: "type here something",
                    defaultValue: "",
                    numericLabel: "5",
                    isNumericLabelEnabled: false
                },
                {
                    key: "numberField1",
                    form: {},
                    tags: [],
                    type: "number",
                    input: true,
                    label: "Number demo",
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
                    numericLabel: "6",
                    isNumericLabelEnabled: false
                },
                {
                    key: "passwordField1",
                    form: {},
                    tags: [],
                    type: "password",
                    input: true,
                    label: "Password demo",
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
                    numericLabel: "7",
                    isNumericLabelEnabled: false
                }
            ],
            componentsCount: 0
        },
        {
            key: "page2",
            form: {},
            type: "panel",
            input: false,
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
                    form: {},
                    tags: [],
                    type: "select",
                    input: true,
                    label: "Page 2 Select component",
                    filter: "",
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
                    form: {},
                    tags: [],
                    type: "checkbox",
                    input: true,
                    label: "Checkbox demo",
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
