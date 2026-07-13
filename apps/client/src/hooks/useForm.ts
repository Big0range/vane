import { type Ref } from 'vue';
import type { FormInst } from 'naive-ui';
import _ from 'lodash';
type T = Ref<FormInst | undefined>;
export function useForm(formRef: T, options?: Ref<any>) {
  const oldOptions = _.cloneDeep(options ? options.value : {});
  const resetForm = () => {
    if (!formRef.value) return;
    formRef.value.restoreValidation();

    if (options) {
      for (const key in options.value) {
        options.value[key] =
          oldOptions[key] === undefined ? null : oldOptions[key];
      }
    }
  };

  const verifyForm = () => {
    return new Promise((resolve, reject) => {
      if (!formRef.value) return;
      formRef.value.validate(errors => {
        if (!errors) {
          resolve(errors);
        } else {
          console.log(errors);
          reject(errors);
        }
      });
    });
  };
  return { resetForm, verifyForm };
}
