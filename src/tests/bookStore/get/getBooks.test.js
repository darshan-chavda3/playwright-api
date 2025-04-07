import { test, expect, request } from '@playwright/test';
import { APIRequests } from '../../../utils/apiRequests';
import { AccessToken } from '../../../utils/accessToken';
import * as getSchema from '../get/schema/getBooks.json';

test.describe('GET list of books from book store', () => {
    let token;

    test.beforeEach(async () => {
        const accessToken = new AccessToken();
        token = await accessToken.generateAccessToken('admin.new', 'Admin@123');
    });

    test('Verify list of books', async () => {
        const apiRequest = new APIRequests();

        // get response
        const getResponse = await apiRequest.getRequest('/BookStore/v1/Books', token);

        // assert response status
        await expect(getResponse.status()).toBe(200);

        // assert api response
        await apiRequest.assertSchema(getSchema, await getResponse.json());
    });
});
