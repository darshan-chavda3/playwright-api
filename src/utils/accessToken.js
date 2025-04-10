import { request, expect } from '@playwright/test';

export class AccessToken {
    async generateAccessToken(userName, password) {
        const apiContext = await request.newContext();
        const response = await apiContext.post('/Account/v1/GenerateToken', {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                userName: userName,
                password: password,
            },
        });

        await expect(response.status()).toBe(200);
        const responseBody = await response.json();
        const access_token = 'Bearer ' + responseBody.token;
        return access_token;
    }
}
