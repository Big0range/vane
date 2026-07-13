interface FormTemplate {
  id: number;
  title: string;
  desc: string;
  code: string;
  version?: number;
  rule: any;
  option: any;
  create_time: string;
  update_time: string;
}
interface GetFormTemplateListParams
  extends PageQueryParam, Pick<FormTemplate, 'title' | 'code'> {}
interface GetFormTemplateListResult extends Result {
  data: {
    rows: FormTemplate[];
    total: number;
  };
}

type AddFormTemplateData = Pick<
  FormTemplate,
  'title' | 'desc' | 'code' | 'rule' | 'option'
> & {
  status?: boolean;
};

type GetFormTemplateByCodeResult = Result<FormTemplate>;

type UpdateFormTemplateApiData = Omit<
  FormTemplate,
  'create_time' | 'update_time'
>;

type FormTemplateBase = Pick<FormTemplate, 'title' | 'desc'>;

interface FormCommOptions {
  id: number;
  name: string;
  code: string;
  create_time: string;
  update_time: string;
}

interface FormCommOptionsItem {
  id: number;
  label: string;
  value: string;
  comm_options_code: string;
  create_time: string;
  update_time: string;
}

interface GetFormCommOptionsListParams extends PageQueryParam {
  name?: string;
  code?: string;
}

interface GetFormCommOptionsItemListParams extends PageQueryParam {
  comm_options_code?: string;
}

type FormCommOptionsPayload = Pick<FormCommOptions, 'name' | 'code'> & {
  id?: number;
};

type FormCommOptionsItemPayload = Pick<
  FormCommOptionsItem,
  'label' | 'value' | 'comm_options_code'
> & {
  id?: number;
};

type GetFormCommOptionsListResult = PageResult<FormCommOptions>;

type GetFormCommOptionsItemListResult = PageResult<FormCommOptionsItem>;

type SubmitFormDataPayload = {
  form_code: string;
  version?: number;
  data: Record<string, any>;
};

interface FormDataJson {
  id: number;
  form_code: string;
  version: number;
  user_id: number;
  data: Record<string, any>;
  create_time: string;
  update_time: string;
}

interface GetMySubmitFormDataListParams extends PageQueryParam {
  form_code?: string;
}

type GetMySubmitFormDataListResult = PageResult<FormDataJson>;
