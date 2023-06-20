import type { FormInstance } from 'element-plus';
import { ref } from 'vue';
const formDataRef = ref<FormInstance>();
type T = typeof formDataRef;
export function useForm(formRef: T) {
  const resetForm = () => {
    if (!formRef.value) return;
    formRef.value.resetFields();
  };

  const verifyForm = () => {
    return new Promise((resolve, reject) => {
      if (!formRef.value) return;
      formRef.value.validate((valid, fields) => {
        if (valid) {
          resolve(valid);
        } else {
          reject(fields);
        }
      });
    });
  };
  return { resetForm, verifyForm };
}
