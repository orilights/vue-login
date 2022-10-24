import { passwordHash } from "../utils"

const apiUrl = 'http://localhost:3000/users/'

export interface RequestResult {
    code: number,
    msg: string
}


export async function UserLogin(userId: string, userPwd: string): Promise<RequestResult> {
    let result: RequestResult = {
        code: -1,
        msg: ''
    }
    let response: Response
    try {
        response = await fetch(apiUrl + userId, {
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
    if (json['password'] == passwordHash(userPwd, userId)) {
        result.code = 0
        result.msg = json['name']
    } else {
        result.code = 3
        result.msg = '密码错误'
    }

    return result
}

export async function UserRegister(userId: string, userName: string, userPwd: string): Promise<RequestResult> {
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
            body: JSON.stringify({ id: userId, name: userName, password: passwordHash(userPwd, userId) })
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

export async function UserChangePassword(userId: string, userPwd: string, newUserPwd: string): Promise<RequestResult> {
    let result: RequestResult = {
        code: -1,
        msg: ''
    }
    let verifyResult = await UserLogin(userId, userPwd)
    if (verifyResult.code != 0) {
        result.code = verifyResult.code
        result.msg = verifyResult.msg
        return result
    }
    let response: Response
    try {
        response = await fetch(apiUrl + userId, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
            body: JSON.stringify({ password: passwordHash(newUserPwd, userId) })
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
        result.msg = '密码修改成功'
    }
    return result
}

export async function UserChangeName(userId: string, newUserName: string): Promise<RequestResult> {
    let result: RequestResult = {
        code: -1,
        msg: ''
    }
    let response: Response
    try {
        response = await fetch(apiUrl + userId, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
            body: JSON.stringify({name: newUserName })
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
        result.msg = '昵称修改成功'
    }
    return result
}