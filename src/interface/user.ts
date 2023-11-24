 interface ITenantAttributes {
    id: number;
    tenantUuid?: string;
    name?:string;
    dbName?:string;
    dbPort?:number;
    dbUser?:string;
    dbDriver?:string;
    dbPassword?:string
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?:Date
  }

  interface IAuthorAttributes {
    id: number;
    authorName?:string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?:Date
  }

  interface ITenantAuthorAttributes {
    id: number;
    tenantId?:number;
    authorId?:number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?:Date
  }

export {ITenantAttributes,IAuthorAttributes,ITenantAuthorAttributes}