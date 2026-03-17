export enum address_type {
    permanent = 'Permanent',
    corresponding = 'Corresponding',
    office = 'Office',
    others = 'Others'
}
export interface Address{
    address_id?:number;
    u_id?:number;
    type:address_type;
    is_primary:boolean;
    city:string;
    state:string;
    pincode:string;
    street?:string;
    nation:string;
    contact_no:string
} 