export interface IApiResponseStruct {
    data: any | any[];
    error: string;
    message: string;
    status: "error" | "success"
}