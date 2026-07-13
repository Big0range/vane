interface TableTemplate {
  id: number;
  name: string;
  desc: string;
  code: string;
  create_time: string;
  update_time: string;
}
interface GetTableTemplateListParams
  extends PageQueryParam, Pick<TableTemplate, 'name' | 'code'> {}
interface GetTableTemplateListResult extends Result {
  data: {
    rows: TableTemplate[];
    total: number;
  };
}

type AddTableTemplateData = Pick<TableTemplate, 'name' | 'desc' | 'code'>;

interface TableTemplateRow {
  id: number;
  title: string;
  key: string;
  width?: number;
  fixed?: 'left' | 'right';
  align?: 'left' | 'right' | 'center';
  ellipsis?: any;
  sort?: number;
  table_template_code: string;
  visible?: boolean;
  create_time: Date;
  update_time: Date;
}
type GetTableTemplateRowByCodeResult = PageResult<TableTemplateRow>;

type UpdateTableTemplateRowApiData = Omit<
  TableTemplateRow,
  'create_time' | 'update_time'
>;
