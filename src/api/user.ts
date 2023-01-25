import request from '../uitl/request'
//登录保存

interface AdminLoginData {
    password: string
    username: string
}

type PromiseRes<T> = Promise<ManageResult<T>>

interface ManageResult<T = {}> {
    code: number;
    data: T;
    // message: string;
}

//登录返回接口
interface AdminLoginResult {
    token: string,
    tokenHead: string,
}
//当前用户信息
interface AdminInfoRes {
    menus: []
}
//返回登录token
export const adminLoginApi = (data: AdminLoginData): PromiseRes<AdminLoginResult> => request.post("/admin/login", data);

//获取当前用户信息
export const amdinInfoApi = (): PromiseRes<AdminInfoRes> => request.get("/admin/info")