// import request from 'supertest';
import { BASE_URL } from '../constants/constants';
import { expect } from '../core/expect/expect';
import { request } from '../core/http/http-request';

export class EntityService {

    public async getList(route: string, statusCode: number, token?: string, content?: any, checkResponseMessage?: string) {
        let req = request(BASE_URL).get(route);

        if (token) {
            req = req.set('Authorization', `Bearer ${token}`);
        }

        const response = await req.execute();

        expect(response.status).toBe(statusCode);

        if (content) {
            expect(response.body).shouldExists();
            expect(response.body).toContain(content)
        }

        if (checkResponseMessage) {
            expect(response.body.message).toBe(checkResponseMessage);
        }

        return response;
    }


    public async getById(route: string, id: number, statusCode: number, token?: string, content?: any, checkResponseMessage?: string) {
        let req = request(BASE_URL).get(`${route}` + `${id}`);

        if (token) {
            req = req.set('Authorization', `Bearer ${token}`);
        }

        const response = await req.execute();

        expect(response.statusCode).toBe(statusCode)

        if (content) {
            expect(response.body).shouldExists();
            expect(response.body).toContain(content);
        }

        if (checkResponseMessage) {
            expect(response.body.message).toBe(checkResponseMessage);
        }

        return response
    };

    public async create(route: string, data: object, statusCode: number, token?: string, content?: any, checkResponseMessage?: string) {

        let req = request(BASE_URL)
            .post(route)
            .send(data)
        if (token) {
            req = req.set('Authorization', `Bearer ${token}`);
        }

        const response = await req.execute();

        expect(response.statusCode).toBe(statusCode)

        if (content) {
            expect(response.body).shouldExists();
            expect(response.body).toContain(content);
        }

        if (checkResponseMessage) {
            expect(response.body.message).toBe(checkResponseMessage);
        }

        return response
    };

    public async update(route: string, data: object, statusCode: number, token?: string, content?: any, checkResponseMessage?: string) {
        let req = request(BASE_URL)
            .put(route)
            .send(data)
        if (token) {
            req = req.set('Authorization', `Bearer ${token}`);
        }

        const response = await req.execute();

        expect(response.statusCode).toBe(statusCode)

        if (content) {
            expect(response.body).shouldExists();
            expect(response.body).toContain(content);
        }

        if (checkResponseMessage) {
            expect(response.body.message).toBe(checkResponseMessage);
        }

        return response
    };

    public async delete(route: string, statusCode: number, token?: string, content?: any, checkResponseMessage?: string) {
        let req = request(BASE_URL)
            .delete(route)

        if (token) {
            req = req.set('Authorization', `Bearer ${token}`);
        }

        const response = await req.execute();

        expect(response.statusCode).toBe(statusCode)

        if (content) {
            expect(response.body).shouldExists();
            expect(response.body).toContain(content);
        }

        if (checkResponseMessage) {
            expect(response.body.message).toBe(checkResponseMessage);
        }

        return response
    };
};