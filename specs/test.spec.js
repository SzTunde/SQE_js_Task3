const {
    sendRequest
} = require("../helpers/api.helper");

const { TEST_URL } = require("../config/endpoints.js");
const axios = require("axios");
const create_data = require("../config/create_data.json");
const createWithList_data = require("../config/createWithList_data.json");
const newPet_data = require("../config/newPet_data.json");

const pet_id = 777;
const new_petname = "Jules";
const new_status = "not_available";
const user_name = "testUser1";
const password = "123";

describe("API Test Suite", () => {

    it("Create user", async () => {
        const response = await sendRequest("user", create_data, "post");
        expect(response.status).to.equal(200);
    });

    it("Login as a user", async () => {
        const response = await sendRequest(`user/login?username=${user_name}&password=${password}`);
        expect(response.status).to.equal(200);
    });   

    it("Create a list of users", async () => {
        const response = await sendRequest("user/createWithList", createWithList_data, "post");
        expect(response.status).to.equal(200);
    });    

    it("Log out user", async () => {
        const response = await sendRequest("user/logout");
        expect(response.status).to.equal(200);
    });   

    it("Add a new pet", async () => {
        const response = await sendRequest("pet", newPet_data, "post");
        expect(response.status).to.equal(200);
    });

    it("Update a pet's image", async () => {
        const fs = require('fs/promises');
        const FormData = require('form-data');
        const form = new FormData();
        const file = await fs.readFile('./config/Julia.jpg');
        form.append('file', file, 'my-image.jpg');

        const response = await axios.post(`${TEST_URL}/pet/${pet_id}/uploadImage`, form, {   
            headers: {
                ...form.getHeaders(),
            },
        });

        expect(response.status).to.equal(200);
    });

    it("Update a pet's name and status", async () => {
        const response = await sendRequest(`pet/${pet_id}`, `name=${new_petname}&status=${new_status}`, "post");
        expect(response.status).to.equal(200);
    });

    it("Delete a pet", async () => {
        const response = await sendRequest(`pet/${pet_id}`, "delete");
        expect(response.status).to.equal(200);
    });

});