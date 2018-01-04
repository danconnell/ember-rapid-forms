import Component from '@ember/component';
import { observer } from '@ember/object';
import layout from '../templates/components/em-input';
import InputComponentMixin from '../mixins/input-component';

/*
Form Input

Syntax:
{{em-input property="property name"}}
 */
export default Component.extend(InputComponentMixin, {
  layout: layout,
  elementClass: null,
  property: null,
  name: null,
  placeholder: null,
  title: null,
  pattern: null,
  autofocus: null,
  readonly: null,
  autoresize: null,
  disabled: null,
  canShowErrors: false,
  maxlength: null,

  hideValidationsOnFormChange: observer('form', 'form.model', function() {
    this.set('canShowErrors', false);
  }),

  actions: {
    /*
    Listen to the focus out of the form group and display the errors
    Pass this event as emFocusOut
     */
    focusOut() {
      this.sendAction('emFocusOut');
      return this.set('canShowErrors', true);
    },
  },

  /*
  Observes the helpHasErrors of the help control and modify the 'status' property accordingly.
   */
  focusIn() {
    if (this.get('form.showErrorsOnFocusIn')) {
      return this.set('canShowErrors', true);
    }
  },

  /*
  Listen to the keyUp of the form group and display the errors if showOnKeyUp is true.
   */
  keyUp() {
    if (this.get('showOnKeyUp')) {
      return this.set('canShowErrors', true);
    }
  }
});
