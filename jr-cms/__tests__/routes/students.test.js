const supertest = require('supertest');
const app = require('../../src/app');
const Student = require('../../src/models/student');
const {connectToDB, disconnectDB} = require('../../src/utils/db');

const request = supertest(app);

describe('/students', () => {
    // hooks:
    beforeAll(() => {
        connectToDB();
    });

    afterAll(async () => {
        // deal with "Jest did not exit one second after the test run has completed." warning
        await disconnectDB();
    });

    beforeEach(async () => {
        // will call this in all the below functions
        await Student.deleteMany({});
    });

    afterEach(async () => {
        //await Student.deleteMany({});
    });

    describe('POST', () => {
        // for reuse source code
        const validStudent = {
            firstName:'mason',
            lastName:'xx',
            email:'test@gmail.com'
        };

        const createStudent = async (body) => {
            return request.post('/api/students').send(body);
        };

        // describe: add titles when testing
        // it() = test()
        it('should return 201 if request is valid', async () => {
            const res = await createStudent(validStudent);
            expect(res.statusCode).toBe(201);
        });

        it('should save student to database if request is valid', async () => {
            await createStudent(validStudent);
            const student = await Student.findOne({email:validStudent.email});
            expect(student.firstName).toBe(validStudent.firstName);
            expect(student.lastName).toBe(validStudent.lastName);
        });

        // add more test cases below:
        it('should return 400 if email is missing', async () => {
            const student = {firstName:'maison', lastName:'xx'};
            const res = await createStudent(student);
            expect(res.statusCode).toBe(400);
        });

        // list multiple cases to avoid duplicate code
        it.each`
            field | value
            ${'firstName'} | ${undefined}
            ${'lastName'} | ${undefined}
            ${'email'} | ${undefined}
            ${'firstName'} | ${'a'}
            ${'email'} | ${'@'}
            ${'email'} | ${'a@'}
            ${'email'} | ${'a@b'}
            ${'email'} | ${'a@b.c'}
        `('should return 400 when $field is $value', async ({field, value}) => {
            const student = { ...validStudent };
            student[field] = value;
            const res = await createStudent(student);
            expect(res.statusCode).toBe(400);
        });
    });
});





// test('1+1===2', () => {
//     // looks like human's syntax
//     expect(1+1).toBe(2);
// });
