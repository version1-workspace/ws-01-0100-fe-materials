export class PageInfo {
  constructor(params) {
    const totalCount = Number(params.totalCount);

    this.page = Number(params.page);
    this.limit = Number(params.limit);
    this.totalCount = Number(params.totalCount);
    this.hasNext = this.page * this.limit < totalCount;
    this.hasPrevious = this.page > 1;
  }

  paginate(list) {
    return list.slice((this.page - 1) * this.limit, this.page * this.limit);
  }
}

export class Pagination {
  static create(params) {
    return new Pagination({
      list: [],
      pageInfo: params || {
        page: 1,
        limit: 0,
        totalCount: 0,
        hasNext: false,
        hasPrevious: false,
      },
    });
  }

  constructor(params) {
    this.list = params.list;
    this.pageInfo = params.pageInfo;
  }

  get page() {
    return this.pageInfo.page;
  }

  get total() {
    return this.pageInfo.totalCount;
  }

  get hasNext() {
    return this.pageInfo.hasNext;
  }

  get hasPrevious() {
    return this.pageInfo.hasPrevious;
  }

  get pageCount() {
    return Math.ceil(this.total / this.pageInfo.limit);
  }

  set(index, data) {
    const list = [...this.list];
    list[index] = data;

    return new Pagination({
      list,
      pageInfo: this.pageInfo,
    });
  }

}
