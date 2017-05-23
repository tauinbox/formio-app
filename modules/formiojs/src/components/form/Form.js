import FormioForm from '../../formio.form';
import FormioUtils from '../../utils';
import _merge from 'lodash/merge';
export class FormComponent extends FormioForm {
  constructor(component, options, data) {
    super(null, options);
    this.type = 'formcomponent';
    this.component = component;
    this.submitted = false;
    this.data = data;

    // Make sure that if reference is provided, the form must submit.
    if (this.component.reference) {
      this.component.submit = true;
    }

    // Build the source based on the root src path.
    if (!component.src && component.path && this.options.formio) {
      let rootSrc = this.options.formio.formUrl;
      let parts = rootSrc.split('/');
      parts.pop();
      component.src = parts.join('/') + '/' + component.path;
    }

    // Add the source to this actual submission if the component is a reference.
    if (data[component.key] && this.component.reference && (component.src.indexOf('/submission/') === -1)) {
      component.src += '/submission/' + data[component.key]._id;
    }

    // Set the src if the property is provided in the JSON.
    if (component.src) {
      this.src = component.src;
    }

    // Directly set the submission if it isn't a reference.
    if (data[component.key] && !this.component.reference) {
      this.setSubmission(data[component.key]);
    }
  }

  /**
   * Submit the form before the next page is triggered.
   */
  beforeNext() {
    // If we wish to submit the form on next page, then do that here.
    if (this.component.submit) {
      this.submitted = true;
      return this.submit(true);
    }
    else {
      return super.beforeNext();
    }
  }

  /**
   * Submit the form before the whole form is triggered.
   */
  beforeSubmit() {
    // Before we submit, we need to filter out the references.
    this.data[this.component.key] = this.component.reference ? {_id: this._submission._id} : this._submission;

    // Ensure we submit the form.
    if (this.component.submit && !this.submitted) {
      return this.submit(true);
    }
    else {
      return super.beforeSubmit();
    }
  }

  build() {
    if (!this.element) {
      this.createElement();
      this.setElement(this.element);
    }

    // Iterate through every component and hide the submit button.
    FormioUtils.eachComponent(this.component.components, (component) => {
      if ((component.type === 'button') && (component.action === 'submit')) {
        component.hidden = true;
      }
    });

    if (!this.data[this.component.key]) {
      this.data[this.component.key] = {data: {}};
    }

    // Add components using the data of the submission.
    this.addComponents(this.element, this.data[this.component.key].data);

    // Set default values.
    let defaultValue = this.defaultValue;
    if (defaultValue) {
      this.setValue(defaultValue);
    }

    // Check conditions for this form.
    this.checkConditions(this.getValue());
  }

  setValue(submission, noUpdate, noValidate) {
    if (!submission) {
      this.data[this.component.key] = this._submission = {data: {}};
      return;
    }

    if (submission.data) {
      this._submission = _merge(this.data[this.component.key], submission);
      return super.setValue(submission, noUpdate, noValidate);
    }
    else if (submission._id) {
      this.formio.submissionId = submission._id;
      this.formio.submissionUrl = this.formio.submissionsUrl + '/' + submission._id;
      return this.formReady.then(() => {
        this._loading = false;
        this.loading = true;
        return this.formio.loadSubmission().then((result) => {
          this.loading = false;
          return this.setValue(result);
        });
      });
    }
  }

  getValue() {
    return this.data[this.component.key];
  }
}
