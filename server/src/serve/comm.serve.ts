import db from './db';
import { FindOptions } from 'sequelize';
export abstract class CommServe<T = any> {
  public Table: ReturnType<typeof db.define>;
  attributes: string[] = [];
  constructor(Table: ReturnType<typeof db.define>) {
    if (this.constructor === CommServe) {
      throw new Error('抽象类不能被实例化');
    }
    this.Table = Table;

    const create = this.Table.create;
    this.Table.create = async (data: Record<any, any>) => {
      data.update_time = db.fn('NOW');
      const result = await create.call(this.Table, data);
      return result;
    };
    this.attributes = Object.keys(this.Table.rawAttributes);
  }

  /**
   * 根据id查找
   * @param id 需要查找的id
   * @returns any
   */
  public async findById(id: (number | string)[] | string | number) {
    const result = await this.Table.findOne({
      where: {
        id,
      },
    });
    return result && (result.dataValues as T);
  }

  public async findAll(options: FindOptions): Promise<{
    rows: T[];
    total: number;
    page: number;
    pageSize: number;
  }>;

  public async findAll(
    page: number,
    pageSize: number,
  ): Promise<{
    rows: T[];
    total: number;
    page: number;
    pageSize: number;
  }>;

  public async findAll(
    page: number,
    pageSize: number,
    options: FindOptions,
  ): Promise<{
    rows: T[];
    total: number;
    page: number;
    pageSize: number;
  }>;

  /**
   * 查询所有
   * @param page 页码
   * @param pageSize 每页条数
   * @param options 其他参数
   * @returns any[]
   */
  public async findAll(
    pageOrOptions: number | FindOptions = 1,
    pageSize = 10,
    options: FindOptions = {},
  ): Promise<{
    rows: T[];
    total: number;
    page: number;
    pageSize: number;
  }> {
    let allOptions: FindOptions;
    if (
      typeof pageOrOptions === 'number' ||
      typeof pageOrOptions === 'string'
    ) {
      allOptions = {
        ...options,
        offset: (pageOrOptions - 1) * pageSize,
        limit: pageSize ? pageSize * 1 : 10,
      };
    } else {
      allOptions = pageOrOptions;
    }
    const result = await this.Table.findAndCountAll(allOptions);
    return {
      rows: result.rows.map(item => (allOptions.raw ? item : item.dataValues)),
      total: result.count,
      page: typeof pageOrOptions === 'number' ? pageOrOptions : undefined,
      pageSize: typeof pageOrOptions === 'number' ? pageSize : undefined,
    };
  }

  /**
   * 根据id删除
   * @param id 需要删除的id
   * @returns  删除的条数
   */
  public async deleteById(id: number | number[] | string | string[]) {
    const result = await this.Table.destroy({
      where: {
        id,
      },
    });
    return result;
  }

  /**
   * 过滤where条件中的无效属性
   * @param where  需要过滤的对象
   * @param filterType 过滤的类型 默认为 [undefined, null, '']
   */
  public filterWhereAttributes(
    where: Record<any, any>,
    filterType: any[] = [undefined, null, ''],
  ) {
    const result: Record<any, any> = {};
    Object.keys(where).forEach(key => {
      if (this.attributes.includes(key) && !filterType.includes(where[key])) {
        result[key] = where[key];
      }
    });
    return result;
  }

  public async bulkCreate(data: T[]) {
    const result = await this.Table.bulkCreate(data as any);
    return result;
  }
}
