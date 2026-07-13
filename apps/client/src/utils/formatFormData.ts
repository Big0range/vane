import type { Api } from '@form-create/naive-ui';

type FormRule = Record<string, any>;
type FormDataValue = Record<string, any>;

type FormatFormDataPayload = {
  formData: FormDataValue;
  fApi: Api;
  rule: FormRule[];
};

type PackedFieldValue = {
  label: string | string[];
  value: any;
};

const isObject = (value: unknown): value is Record<string, any> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

const isPackedFieldValue = (value: unknown): value is PackedFieldValue => {
  return isObject(value) && 'value' in value && 'label' in value;
};

const findRuleByField = (
  items: FormRule[],
  field: string,
): FormRule | undefined => {
  for (const item of items) {
    if (item?.field === field) {
      return item;
    }

    if (Array.isArray(item?.children)) {
      const matched = findRuleByField(item.children, field);
      if (matched) {
        return matched;
      }
    }

    const controlRules = Array.isArray(item?.control)
      ? item.control.flatMap((control: Record<string, any>) =>
          Array.isArray(control?.rule) ? control.rule : [],
        )
      : [];
    if (controlRules.length) {
      const matched = findRuleByField(controlRules, field);
      if (matched) {
        return matched;
      }
    }
  }

  return undefined;
};

const getFieldRule = (
  field: string,
  fApi: Api | undefined,
  rule: FormRule[],
): FormRule | undefined => {
  return fApi?.getRule(field) || findRuleByField(rule, field);
};

const flattenOptions = (
  options: Array<Record<string, any>>,
  childrenField = 'children',
): Array<Record<string, any>> => {
  return options.flatMap(option => {
    const children = Array.isArray(option?.[childrenField])
      ? flattenOptions(option[childrenField], childrenField)
      : [];
    return [option, ...children];
  });
};

const getRuleOptions = (
  item: FormRule,
  fApi: Api | undefined,
): Array<Record<string, any>> => {
  const propsOptions = Array.isArray(item?.props?.options)
    ? item.props.options
    : [];
  const ruleOptions = Array.isArray(item?.options) ? item.options : [];
  if (propsOptions.length || ruleOptions.length) {
    return propsOptions.length ? propsOptions : ruleOptions;
  }

  const loadData = item?.effect?.loadData;
  if (!loadData) {
    return [];
  }

  const sources = Array.isArray(loadData) ? loadData : [loadData];
  for (const source of sources) {
    const attr = source?.attr;
    const to = source?.to;
    if (attr && (to === 'props.options' || to === 'options' || !to)) {
      const data = fApi?.getData(attr, []);
      if (Array.isArray(data) && data.length) {
        return data;
      }
    }
  }

  return [];
};

const resolveOptionFields = (item: FormRule) => {
  return {
    labelField: item?.props?.labelField || 'label',
    valueField: item?.props?.valueField || item?.props?.keyField || 'value',
    childrenField: item?.props?.childrenField || 'children',
  };
};

const getMatchedOptions = (
  item: FormRule,
  value: unknown,
  fApi: Api | undefined,
): Array<Record<string, any>> => {
  if (value === undefined || value === null || value === '') {
    return [];
  }

  const options = getRuleOptions(item, fApi);
  if (!options.length) {
    return [];
  }

  const { valueField, childrenField } = resolveOptionFields(item);
  const values = Array.isArray(value) ? value : [value];
  const flattened = flattenOptions(options, childrenField);

  return values
    .map(currentValue =>
      flattened.find(
        option => String(option?.[valueField]) === String(currentValue),
      ),
    )
    .filter((option): option is Record<string, any> => !!option);
};

const resolveLabelByValue = (
  item: FormRule,
  value: unknown,
  fApi: Api | undefined,
) => {
  const matchedOptions = getMatchedOptions(item, value, fApi);
  if (!matchedOptions.length) {
    return undefined;
  }

  const { labelField } = resolveOptionFields(item);
  const labels = matchedOptions
    .map(option => option?.[labelField])
    .filter((label): label is string => label !== undefined && label !== null);

  if (!labels.length) {
    return undefined;
  }

  return Array.isArray(value) ? labels : labels[0];
};

const mapFormData = (
  payload: FormatFormDataPayload,
  transformer: (value: any, item: FormRule | undefined) => any,
) => {
  const { formData, fApi, rule } = payload;
  return Object.entries(formData).reduce<FormDataValue>(
    (result, [field, value]) => {
      result[field] = transformer(value, getFieldRule(field, fApi, rule));
      return result;
    },
    {},
  );
};

export function packFormData(payload: FormatFormDataPayload) {
  return mapFormData(payload, (value, currentRule) => {
    if (!currentRule) {
      return value;
    }

    const label = resolveLabelByValue(currentRule, value, payload.fApi);
    if (label === undefined) {
      return value;
    }

    return { label, value };
  });
}

export function unpackFormData(formData: FormDataValue) {
  return Object.entries(formData).reduce<FormDataValue>(
    (result, [field, value]) => {
      if (isPackedFieldValue(value)) {
        result[field] = value.value;
        return result;
      }
      result[field] = value;
      return result;
    },
    {},
  );
}
