import { request, Response } from '../core/http/http-request';

const BASE_URL = 'https://test-api.k6.io'

export const data = {
    loginData: {
        username: 'usuarioteste02',
        password: '1234hh'
    },
};


export class authorizationToken {
   
    public static async getToken(): Promise<string> {
        try {
            const response = await this.login('/auth/token/login/', data.loginData);
           
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

    public static async login(route: string, data: object): Promise<Response> {
        try {
            let req = request(BASE_URL)
                .post(route)
                .send(data);

            const response = await req.execute();

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