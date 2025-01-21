import request from 'supertest';
import { BASE_URL } from '../constants/constants';
import { data } from '../data/general-data';

export class authorizationToken {

    public async getToken(): Promise<string> {
        try {
            const response = await this.login('auth/token/login/', data.loginData);
            if (response.body && response.body.access) {
                return response.body.access;
            } else {
                throw new Error('Token not found in response');
            }
        } catch (error) {
            console.error('Error getting token:', error);
            throw error;
        }
    }

    public async login(route: string, data: object): Promise<request.Response> {
        try {
            const response = await request(BASE_URL)
                .post(route)
                .send(data);

            if (response.status !== 200) {
                throw new Error(`Login failed with status code ${response.status}`);
            }

            return response;
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    }
}