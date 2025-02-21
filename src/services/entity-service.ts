// import request from 'supertest';
import { expect } from '../core/expect/expect';
import { request } from '../core/http/http-request';

export class EntityService {

    public async getList(baseUrl: string, route: string, statusCode: number, token?: string, content?: any, checkResponseMessage?: string) {
        let req = request(baseUrl).get(route);

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


    public async getById(baseUrl: string, route: string, id: number, statusCode: number, token?: string, content?: any, checkResponseMessage?: string) {
        let req = request(baseUrl).get(`${route}` + `${id}`);

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

    public async create(baseUrl: string, route: string, data: object, statusCode: number, token?: string, content?: any, checkResponseMessage?: string) {

        let req = request(baseUrl)
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

    public async update(baseUrl: string, route: string, data: object, statusCode: number, token?: string, content?: any, checkResponseMessage?: string) {
        let req = request(baseUrl)
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

    public async delete(baseUrl: string, route: string, statusCode: number, token?: string, content?: any, checkResponseMessage?: string) {
        let req = request(baseUrl)
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