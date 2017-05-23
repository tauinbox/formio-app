"use strict";
import Promise from "native-promise-only";
import Formio from './formio';
import { FormioComponents } from './components/Components';
import _debounce from 'lodash/debounce';
import _each from 'lodash/each';
import _clone from 'lodash/clone';
import _assign from 'lodash/assign';
import EventEmitter from 'eventemitter2';
let getOptions = function(options) {
  options = options || {};
  if (!options.events) {
    options.events = new EventEmitter({
      wildcard: false,
      maxListeners: 0
    });
  }
  return options;
};

/**
 * Renders a Form.io form within the webpage.
 *
 * @example
 * import FormioForm from 'formiojs/form';
 * let form = new FormioForm(document.getElementById('formio'));
 * form.src = 'https://examples.form.io/example';
 */
export class FormioForm extends FormioComponents {
  /**
   * Creates a new FormioForm instance.
   *
   * @param {Object} element - The DOM element you wish to render this form within.
   * @param {Object} options - The options to create a new form instance.
   * @param {boolean} options.readOnly - Set this form to readOnly
   * @param {boolean} options.noAlerts - Set to true to disable the alerts dialog.
   * @param {boolean} options.i18n - The translation file for this rendering. @see https://github.com/formio/formio.js/blob/master/src/locals/en.js
   * @param {boolean} options.template - Provides a way to inject custom logic into the creation of every element rendered within the form.
   *
   * @example
   * import FormioForm from 'formiojs/form';
   * let form = new FormioForm(document.getElementById('formio'), {
   *   readOnly: true
   * });
   * form.src = 'https://examples.form.io/example';
   *
   */
  constructor(element, options) {
    super(null, getOptions(options));

    /**
     * The type of this element.
     * @type {string}
     */
    this.type = 'form';
    this._src = '';
    this._loading = false;
    this._submission = {};
    this._form = null;

    /**
     * The Formio instance for this form.
     * @type {Formio}
     */
    this.formio = null;

    /**
     * The loader HTML element.
     * @type {HTMLElement}
     */
    this.loader = null;

    /**
     * The alert HTML element
     * @type {HTMLElement}
     */
    this.alert = null;

    /**
     * Promise that is triggered when the submission is done loading.
     * @type {Promise}
     */
    this.onSubmission = null;

    /**
     * Promise that is triggered when the form is done building.
     * @type {Promise}
     */
    this.onFormBuild = null;

    /**
     * Promise that executes when the form is ready and rendered.
     * @type {Promise}
     *
     * @example
     * let form = new FormioForm(document.getElementById('formio'));
     * form.ready.then(() => {
     *   console.log('The form is ready!');
     * });
     * form.src = 'https://examples.form.io/example';
     */
    this.formReady = new Promise((resolve, reject) => {
      /**
       * Called when the formReady state of this form has been resolved.
       *
       * @type {function}
       */
      this.formReadyResolve = resolve;

      /**
       * Called when this form could not load and is rejected.
       *
       * @type {function}
       */
      this.formReadyReject = reject;
    });

    /**
     * Promise that executes when the submission is ready and rendered.
     * @type {Promise}
     *
     * @example
     * let form = new FormioForm(document.getElementById('formio'));
     * form.ready.then(() => {
     *   console.log('The form is ready!');
     * });
     * form.src = 'https://examples.form.io/example';
     */
    this.submissionReady = new Promise((resolve, reject) => {
      /**
       * Called when the formReady state of this form has been resolved.
       *
       * @type {function}
       */
      this.submissionReadyResolve = resolve;

      /**
       * Called when this form could not load and is rejected.
       *
       * @type {function}
       */
      this.submissionReadyReject = reject;
    });

    /**
     * Triggers a new submission change after a certain debounce interval.
     *
     * @type {function} - Call then when you wish to trigger a submission change.
     */
    this.triggerSubmissionChange = _debounce(this.onSubmissionChange.bind(this), 10);

    /**
     * Promise to trigger when the element for this form is established.
     *
     * @type {Promise}
     */
    this.onElement = new Promise((resolve) => {
      /**
       * Called when the element has been resolved.
       *
       * @type {function}
       */
      this.elementResolve = resolve;
      this.setElement(element);
    });
  }

  /**
   * Sets the the outside wrapper element of the Form.
   *
   * @param {HTMLElement} element - The element to set as the outside wrapper element for this form.
   */
  setElement(element) {
    if (!element) {
      return;
    }

    this.element = element;
    var classNames = this.element.getAttribute('class');
    classNames += ' formio-form';
    this.addClass(this.element, classNames);
    this.loading = true;
    this.ready.then(() => (this.loading = false));
    this.elementResolve(element);
  }

  /**
   * Get the embed source of the form.
   *
   * @returns {string}
   */
  get src() {
    return this._src;
  }

  /**
   * Set the Form source, which is typically the Form.io embed URL.
   *
   * @param {string} value - The value of the form embed url.
   *
   * @example
   * let form = new FormioForm(document.getElementById('formio'));
   * form.formReady.then(() => {
   *   console.log('The form is formReady!');
   * });
   * form.src = 'https://examples.form.io/example';
   */
  set src(value) {
    if (!value || typeof value !== 'string') {
      return;
    }
    this._src = value;
    this.formio = new Formio(value);

    if (this.type === 'form') {
      // Set the options source so this can be passed to other components.
      this.options.src = value;
      this.options.formio = this.formio;
    }

    this.formio.loadForm().then((form) => this.setForm(form));
    if (this.formio.submissionId) {
      this.onSubmission = this.formio.loadSubmission().then((submission) => this.setSubmission(submission));
    }
  }

  /**
   * Called when both the form and submission have been loaded.
   *
   * @returns {Promise} - The promise to trigger when both form and submission have loaded.
   */
  get ready() {
    return this.formReady.then(() => this.submissionReady);
  }

  /**
   * Returns if this form is loading.
   *
   * @returns {boolean} - TRUE means the form is loading, FALSE otherwise.
   */
  get loading() {
    return this._loading;
  }

  /**
   * Set the loading state for this form, and also show the loader spinner.
   *
   * @param {boolean} loading - If this form should be "loading" or not.
   */
  set loading(loading) {
    if (this._loading !== loading) {
      this._loading = loading;
      if (!this.loader && loading) {
        this.loader = this.ce('loaderWrapper', 'div', {
          class: 'loader-wrapper'
        });
        let spinner = this.ce('loader', 'div', {
          class: 'loader text-center'
        });
        this.loader.appendChild(spinner);
      }
      if (this.loader) {
        try {
          if (loading) {
            this.prepend(this.loader);
          }
          else {
            this.removeChild(this.loader);
          }
        }
        catch (err) {}
      }
    }
  }

  /**
   * Sets the JSON schema for the form to be rendered.
   *
   * @example
   * let form = new FormioForm(document.getElementById('formio'));
   * form.setForm({
   *   components: [
   *     {
   *       type: 'textfield',
   *       key: 'firstName',
   *       label: 'First Name',
   *       placeholder: 'Enter your first name.',
   *       input: true
   *     },
   *     {
   *       type: 'textfield',
   *       key: 'lastName',
   *       label: 'Last Name',
   *       placeholder: 'Enter your last name',
   *       input: true
   *     },
   *     {
   *       type: 'button',
   *       action: 'submit',
   *       label: 'Submit',
   *       theme: 'primary'
   *     }
   *   ]
   * });
   *
   * @param {Object} form - The JSON schema of the form @see https://examples.form.io/example for an example JSON schema.
   * @returns {*}
   */
  setForm(form) {
    if (form.display === 'wizard') {
      console.warn('You need to instantiate the FormioWizard class to use this form as a wizard.');
    }

    if (this.onFormBuild) {
      return this.onFormBuild.then(() => this.createForm(form));
    }

    // Set the form object.
    this._form = form;

    // Create the form.
    return this.createForm(form);
  }

  /**
   * Gets the form object.
   *
   * @returns {Object} - The form JSON schema.
   */
  get form() {
    return this._form;
  }

  /**
   * Sets the form value.
   *
   * @alias setForm
   * @param {Object} form - The form schema object.
   */
  set form(form) {
    this.setForm(form);
  }

  /**
   * Returns the submission object that was set within this form.
   *
   * @returns {Object}
   */
  get submission() {
    return this.getValue();
  }

  /**
   * Sets the submission of a form.
   *
   * @example
   * let form = new FormioForm(document.getElementById('formio'));
   * form.src = 'https://examples.form.io/example';
   * form.submission = {data: {
   *   firstName: 'Joe',
   *   lastName: 'Smith',
   *   email: 'joe@example.com'
   * }};
   *
   * @param {Object} submission - The Form.io submission object.
   */
  set submission(submission) {
    this.setSubmission(submission);
  }

  /**
   * Sets a submission and returns the promise when it is ready.
   * @param submission
   * @return {Promise.<TResult>}
   */
  setSubmission(submission) {
    return this.onSubmission = this.formReady.then(
      () => {
        this.setValue(submission);
        this.submissionReadyResolve();
      },
      (err) => this.submissionReadyReject(err)
    );
  }

  setValue(submission, noUpdate, noValidate) {
    this._submission = submission || {data: {}};
    return super.setValue(this._submission.data, noUpdate, noValidate);
  }

  getValue() {
    if (!this._submission.data) {
      this._submission.data = {};
    }
    this._submission.data = _assign(this.data, super.getValue());
    return this._submission;
  }

  /**
   * Create a new form.
   *
   * @param {Object} form - The form object that is created.
   * @returns {Promise.<TResult>}
   */
  createForm(form) {
    /**
     * {@link BaseComponent.component}
     */
    if (this.component) {
      this.component.components = form.components;
    }
    else {
      this.component = form;
    }
    return this.onFormBuild = this.render().then(() => {
      this.formReadyResolve();
      if (!this.onSubmission) {
        this.submissionReadyResolve();
      }
      this.onFormBuild = null;
    }, (err) => this.formReadyReject(err));
  }

  /**
   * Render the form within the HTML element.
   * @returns {Promise.<TResult>}
   */
  render() {
    return this.onElement.then(() => {
      this.clear();
      return this.localize().then(() => {
        this.build();
        this.on('resetForm', () => this.reset(), true);
        this.on('componentChange', (changed) => this.triggerSubmissionChange(changed), true);
        this.on('refreshData', () => this.updateValue());
        this.emit('render');
      });
    });
  }

  /**
   * Sets a new alert to display in the error dialog of the form.
   *
   * @param {string} type - The type of alert to display. "danger", "success", "warning", etc.
   * @param {string} message - The message to show in the alert.
   */
  setAlert(type, message) {
    if (this.options.noAlerts) {
      if (!message) {
        this.emit('error', false);
      }
      return;
    }
    if (this.alert) {
      try {
        this.removeChild(this.alert);
        this.alert = null;
      }
      catch(err) {}
    }
    if (message) {
      this.alert = this.ce('alert-' + type, 'div', {
        class: 'alert alert-' + type,
        role: 'alert'
      });
      this.alert.innerHTML = message;
    }
    if (!this.alert) {
      return;
    }
    this.prepend(this.alert);
  }

  /**
   * Build the form.
   */
  build() {
    this.on('submitButton', () => this.submit(), true);
    this.addComponents();
    this.checkConditions(this.getValue());
  }

  /**
   * Show the errors of this form within the alert dialog.
   *
   * @param {Object} error - An optional additional error to display along with the component errors.
   * @returns {*}
   */
  showErrors(error) {
    this.loading = false;
    let errors = this.errors;
    if (error) {
      errors.push(error);
    }
    if (!errors.length) {
      this.setAlert(false);
      return;
    }
    let message = '<p>' + this.t('error') + '</p><ul>';
    _each(errors, (err) => {
      if (err) {
        let errorMessage = err.message || err;
        message += '<li><strong>' + errorMessage + '</strong></li>';
      }
    });
    message += '</ul>';
    this.setAlert('danger', message);
    this.emit('error', errors);
    return errors;
  }

  /**
   * Called when the submission has completed, or if the submission needs to be sent to an external library.
   *
   * @param {Object} submission - The submission object.
   * @param {boolean} saved - Whether or not this submission was saved to the server.
   * @returns {object} - The submission object.
   */
  onSubmit(submission, saved) {
    this.loading = false;
    this.setValue(submission);
    this.setAlert('success', '<p>' + this.t('complete') + '</p>');
    this.emit('submit', submission);
    if (saved) {
      this.emit('submitDone', submission);
    }
    return submission;
  }

  /**
   * Called when an error occurs during the submission.
   *
   * @param {Object} error - The error that occured.
   */
  onSubmissionError(error) {
    if (!error) {
      return;
    }

    // Normalize the error.
    if (typeof error === 'string') {
      error = {message: error};
    }

    this.showErrors(error);
  }

  /**
   * Called when the submission has changed in value.
   *
   * @param {Object} changed - The changed value that triggered this event.
   * @param {Object} changed.component - The component that was changed.
   * @param {*} changed.value - The new value of the changed component.
   * @param {boolean} changed.validate - If the change needs to be validated.
   */
  onSubmissionChange(changed) {
    let value = _clone(this.submission);
    value.changed = changed;
    this.checkData(value.data, !changed.validate);
    this.emit('change', value);
  }

  /**
   * Resets the submission of a form and restores defaults.
   *
   * @example
   * let form = new FormioForm(document.getElementById('formio'));
   * form.src = 'https://examples.form.io/example';
   * form.submission = {data: {
   *   firstName: 'Joe',
   *   lastName: 'Smith',
   *   email: 'joe@example.com'
   * }};
   *
   * // In two seconds, reset the data in the form.
   * setTimeout(() => form.reset(), 2000);
   */
  reset() {
    // Reset the submission data.
    this.setSubmission({data: {}});
  }

  /**
   * Cancels the submission.
   *
   * @alias reset
   */
  cancel() {
    this.reset();
  }

  executeSubmit() {
    let submission = this.submission;
    if (
      submission &&
      submission.data &&
      this.checkValidity(submission.data, true)
    ) {
      this.loading = true;
      if (!this.formio) {
        return this.onSubmit(submission, false);
      }
      return this.formio.saveSubmission(submission)
        .then(
          (result) => this.onSubmit(result, true),
          (err) => this.onSubmissionError(err)
        )
        .catch(
          (err) => this.onSubmissionError(err)
        );
    }
    else {
      this.showErrors();
      return Promise.reject('Invalid Submission');
    }
  }

  /**
   * Submits the form.
   *
   * @example
   * let form = new FormioForm(document.getElementById('formio'));
   * form.src = 'https://examples.form.io/example';
   * form.submission = {data: {
   *   firstName: 'Joe',
   *   lastName: 'Smith',
   *   email: 'joe@example.com'
   * }};
   * form.submit().then((submission) => {
   *   console.log(submission);
   * });
   *
   * @param {boolean} before - If this submission occured from the before handlers.
   *
   * @returns {Promise} - A promise when the form is done submitting.
   */
  submit(before) {
    if (!before) {
      return this.beforeSubmit().then(() => this.executeSubmit());
    }
    else {
      return this.executeSubmit();
    }
  }
}

FormioForm.setBaseUrl = Formio.setBaseUrl;
FormioForm.setApiUrl = Formio.setApiUrl;
FormioForm.setAppUrl = Formio.setAppUrl;

/**
 * Embed this form within the current page.
 * @param embed
 */
FormioForm.embed = function(embed) {
  if (!embed || !embed.src) {
    return null;
  }
  let id = embed.id || 'formio-' + Math.random().toString(36).substring(7);
  let className = embed.class || 'formio-form-wrapper';
  let code = embed.styles ? '<link rel="stylesheet" href="' + embed.styles + '">' : '';
  code += '<div id="' + id + '" class="' + className + '"></div>';
  document.write(code);
  let formElement = document.getElementById(id);
  let form = new FormioForm(formElement);
  form.src = embed.src;
  return form;
};

module.exports = global.FormioForm = FormioForm;
