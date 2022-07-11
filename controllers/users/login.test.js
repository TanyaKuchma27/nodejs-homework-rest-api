const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();

const app = require("../../app");
const {User} = require("../../models/user");

const {DB_TEST_HOST, PORT = 3000} = process.env;

describe("test login route", ()=> {
    let server;
    beforeAll(() => { server = app.listen(PORT) });
    afterAll(()=> server.close());

    beforeEach((done)=> {
        mongoose.connect(DB_TEST_HOST).then(()=> done())
    })

    afterEach((done)=> {
        mongoose.connection.db.dropCollection(()=> {
            mongoose.connection.close(()=> done())
        })
    })

    test("test login route", async()=> {
        const newUser = {
            email: "tanya@gmail.com",
            password: "131313",
            avatarURL: "tanya.jpg"
        };

        const user = await User.create(newUser);

        const loginUser = {
            email: "tanya@gmail.com",
            password: "131313",
            avatarURL: "tanya.jpg"
        };

        const response = await request(app).post("/api/users/login").send(loginUser);
        expect(response.statusCode).toBe(200);
        const {body} = response;
        expect(body.token).toByTruthy();
        const {token} = await User.findById(user._id);
        expect(body.token).toBe(token);
        expect(typeof body.email).toBe("string");
        expect(typeof body.subscription).toBe("string");
    })
})