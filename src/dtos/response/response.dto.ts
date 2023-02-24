export type ResponseData<T> = {
    exception?:any;
    message:string;
    success:boolean;
    data?:T;
}