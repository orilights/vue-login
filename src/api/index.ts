import { passwordHash } from "../utils"

const apiUrl = 'http://localhost:3000/user/'

export interface RequestResult {
    code: number,
    msg: string
}


export async function UserLogin(userName: string, userPwd: string): Promise<RequestResult> {
    let result: RequestResult = {
        code: -1,
        msg: ''
    }
    let response: Response
    try {
        response = await fetch(apiUrl + userName, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        })
    } catch (err) {
        result.code = 3
        result.msg = '网络错误'
        return result
    }
    if (!response.ok || response.status != 200) {
        if (response.status == 404) {
            result.code = 3
            result.msg = '用户不存在'
            return result
        }
        result.code = 3
        result.msg = '服务器错误'
        return result
    }
    const json: any = await response.json()
    if (json['password'] == passwordHash(userPwd, userName)) {

        result.code = 0
        result.msg = '登录成功'
    } else {
        result.code = 3
        result.msg = '密码错误'
    }

    return result
}

export async function UserRegister(userName: string, userPwd: string): Promise<RequestResult> {
    let result: RequestResult = {
        code: -1,
        msg: ''
    }
    let response: Response
    try {
        response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
            body: JSON.stringify({ id: userName, name: userName, password: passwordHash(userPwd, userName) })
        })
    } catch (err) {
        result.code = 3
        result.msg = '网络错误'
        return result
    }
    if (!response.ok || response.status != 201) {
        if (response.status == 500) {
            result.code = 3
            result.msg = '用户已存在'
            return result
        }
        result.code = 3
        result.msg = '服务器错误'
    } else {
        result.code = 0
        result.msg = '注册成功'
    }

    return result
}

export async function UserChangePassword(userName: string, userPwd: string, newUserPwd: string): Promise<RequestResult> {
    let result: RequestResult = {
        code: -1,
        msg: ''
    }
    let verifyResult = await UserLogin(userName, userPwd)
    if (verifyResult.code != 0) {
        result.code = verifyResult.code
        result.msg = verifyResult.msg
        return result
    }
    let response: Response
    try {
        response = await fetch(apiUrl + userName, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
            body: JSON.stringify({ id: userName, name: userName, password: passwordHash(newUserPwd, userName) })
        })
    } catch (err) {
        result.code = 3
        result.msg = '网络错误'
        return result
    }
    if (!response.ok || response.status != 200) {
        result.code = 3
        result.msg = '服务器错误'
    } else {
        result.code = 0
        result.msg = '修改成功，请重新登录'
    }
    return result
}
