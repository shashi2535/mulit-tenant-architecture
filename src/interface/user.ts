 interface ITenantAttributes {
    id: number;
    tenant_uuid?: string;
    name?:string;
    db_name?:string;
    db_port?:number;
    db_user?:string;
    db_driver?:string;
    db_password?:string
    created_at?: Date;
    updated_at?: Date;
  }

export {ITenantAttributes}