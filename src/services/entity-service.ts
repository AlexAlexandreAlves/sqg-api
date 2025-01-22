// import request from 'supertest';
import { BASE_URL } from '../constants/constants';
import { espera } from '../core/expect/expect';
import { request } from '../core/http/http-request';

export class EntityService {

    public async getList(route: string, statusCode: number, token?: string, content?: any, checkResponseMessage?: string) {
        let req = request(BASE_URL).get(route);

        if (token) {
            req = req.set('Authorization', `Bearer ${token}`);
        }

        const response = await req.execute();

        espera(response.status).ser(statusCode);

        if (content) {
            espera(response.body).queExista();
            espera(response.body).queContenha(content)
        }

        if (checkResponseMessage) {
            espera(response.body.message).ser(checkResponseMessage);
        }

        return response;
    }


    public async getById(route: string, id: number, statusCode: number, token?: string, content?: any, checkResponseMessage?: string) {
        let req = request(BASE_URL).get(`${route}` + `${id}`);

        if (token) {
            req = req.set('Authorization', `Bearer ${token}`);
        }

        const response = await req.execute();

        espera(response.statusCode).ser(statusCode)

        if (content) {
            espera(response.body).queExista();
            espera(response.body).queContenha(content);
        }

        if (checkResponseMessage) {
            espera(response.body.message).ser(checkResponseMessage);
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

        espera(response.statusCode).ser(statusCode)

        if (content) {
            espera(response.body).queExista();
            espera(response.body).queContenha(content);
        }

        if (checkResponseMessage) {
            espera(response.body.message).ser(checkResponseMessage);
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

        espera(response.statusCode).ser(statusCode)

        if (content) {
            espera(response.body).queExista();
            espera(response.body).queContenha(content);
        }

        if (checkResponseMessage) {
            espera(response.body.message).ser(checkResponseMessage);
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

        espera(response.statusCode).ser(statusCode)

        if (content) {
            espera(response.body).queExista();
            espera(response.body).queContenha(content);
        }

        if (checkResponseMessage) {
            espera(response.body.message).ser(checkResponseMessage);
        }

        return response
    };
};