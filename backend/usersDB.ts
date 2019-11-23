import {User} from "../common/interfaces";

const _users: {[userId: string]: User} = {};

export function doesExist(userId: string) {
    return !!_users[userId];
}

export function setUser(user: User) {
    _users[user.id] = user;
}

export function checkPassword(userId: string, password: string) {
    return _users[userId]?.password == password;
}