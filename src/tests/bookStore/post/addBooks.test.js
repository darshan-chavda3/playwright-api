import { test, expect } from '@playwright/test';
import { APIRequests } from '../../../utils/apiRequests';
import { AccessToken } from '../../../utils/accessToken';
import * as requestPayload from '../post/payload/addBooks.json';
import * as postSchema from '../post/schema/addBooks.json';
import * as deleteParam from '../delete/params/deleteBook.json';

test.describe('POST add books from book store', () => {
    let token;

    test.beforeEach(async () => {
        const accessToken = new AccessToken();
        token = await accessToken.generateAccessToken('admin.new', 'Admin@123');
    });

    test('Add list of books', async () => {
        const apiRequest = new APIRequests();

        // post response
        const postResponse = await apiRequest.postRequest('/BookStore/v1/Books', token, requestPayload);

        // assert response status
        await expect(postResponse.status()).toBe(201);

        // assert api response
        await apiRequest.assertSchema(postSchema, await postResponse.json());

        // clean up
        const deleteResponse = await apiRequest.deleteRequest('/BookStore/v1/Book', token, deleteParam);
        await expect(deleteResponse.status()).toBe(204);
    });
});
