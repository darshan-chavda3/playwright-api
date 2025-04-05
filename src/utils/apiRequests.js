import { request, expect } from '@playwright/test';
import { Ajv } from 'ajv';

export class APIRequests {
    async getRequest(endpoint, token, params = null) {
        const apiContext = await request.newContext();
        const response = await apiContext.get(endpoint, {
            headers: {
                Cookie: `token=${token}`,
            },
            params: params,
        });
        return response;
    }

    async postRequest(endpoint, token, requestBody) {
        const apiContext = await request.newContext();
        const response = await apiContext.post(endpoint, {
            headers: {
                Cookie: `token=${token}`,
            },
            data: requestBody,
        });
        return response;
    }

    async putRequest(endpoint, token, requestBody) {
        const apiContext = await request.newContext();
        const response = await apiContext.put(endpoint, {
            headers: {
                Cookie: `token=${token}`,
            },
            data: requestBody,
        });
        return response;
    }

    async deleteRequest(endpoint, token, params = null) {
        const apiContext = await request.newContext();
        const response = await apiContext.delete(endpoint, {
            headers: {
                Cookie: `token=${token}`,
            },
            params: params,
        });
        return response;
    }

    async assertSchema(schema, response) {
        const ajv = new Ajv();
        const validateResponse = ajv.compile(schema);
        const assertSchema = validateResponse(response);
        await expect(assertSchema).toBe(true);
    }
}

export { test, expect, request } from '@playwright/test';
