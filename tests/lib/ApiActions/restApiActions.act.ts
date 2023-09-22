import { APIRequestContext, expect } from "@playwright/test";

const URL = 'https://reqres.in/api';

export default class ReqresApi {
    readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async getUserList(): Promise<Array<any>> {
        const res = await this.request.get(`${URL}/users?page=2`);

        await expect(res, 'X Response was not 200').toBeOK();
        const body = JSON.parse((await res.body()).toString());
        const usersList = body.data.filter((i: { id: number; }) => i.id % 2==1)
        return usersList;
    }

    async getNotExistingUser(userId: string): Promise<void> {
        const res = await this.request.get(`${URL}/users/${userId}`, {failOnStatusCode: true})
        .catch(e => e).then((response) => response);
     
        expect(res.message, 'Status code is different than "404"').toEqual(expect.stringContaining('404'));     
    }

    async createSingleUser(name: string, job: string): Promise<void> {
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let today: string
        
        const res = await this.request.post(`${URL}/users`, {
            data: {
                name,
                job
            },
        })
        await expect.poll(async () => { res
            return res.status();
          }, {
            message: 'X User cannot be created', 
            timeout: 10000,
          }).toBe(201);

        const body = JSON.parse((await res.body()).toString());
        let createData = body.createdAt;

        if (month < 10){
            today = year + "-0" + month + "-" + day;
        } else {
            today = year + "-" + month + "-" + day;
        }

        expect(createData).toEqual(expect.stringContaining(`${today}`));
    }

    async createUsers(expectedNumberOfUsers: number): Promise<void> {
        const res = await this.request.get(`${URL}/users/2`);
        let users: number[] = []

        for (let i= 0; i<expectedNumberOfUsers; i++) {
            users.push(i)
        }

        const createUser = users.map(async () => {
            await expect.poll(async () => { res
                return res.status();
              }, {
                message: 'X User cannot be updated', 
                timeout: 10000,
              }).toBe(200);
        })
        
        await Promise.all(createUser);
    }


    async updateUser(name: string, job: string): Promise<void> {
        
        const res = await this.request.patch(`${URL}/users/2`, {
            data: {
                name,
                job
            },
        })
        await expect.poll(async () => { res
            return res.status();
          }, {
            message: 'X User cannot be updated', 
            timeout: 10000,
          }).toBe(200);

          const body = JSON.parse((await res.body()).toString());

          expect(name).toEqual(body.name);
          expect(job).toEqual(body.job);
    }

    async getUserListWithDelayedResponse(delay: string): Promise<Array<any>> {
        expect(Number(delay), `Invalid parameter: ${delay}. Expected value in range 0-3`).toBeGreaterThan(-1);
        expect(Number(delay), `Invalid parameter: ${delay}. Expected value in range 0-3`).toBeLessThan(4);

        const date = new Date();
        // const secondsOfCreation = date.getSeconds();
        const res = await this.request.get(`${URL}/users?delay=${delay}`);
        
        await expect.poll(async () => { res
            return res.status();
          }, {
            message: 'X Response was not 200', 
            timeout: 10000,
          }).toBe(200);

        const body = JSON.parse((await res.body()).toString());
        // const createData: string = body.createdAt;
        // const splitData: string = createData.split('.')[0];
        // const createTime: string = splitData.split(':')[2];

        // expect(Number(createTime)+1, 'The response time is longer than `1` second').toBeLessThanOrEqual(secondsOfCreation);
        return body;
    }

    async loginUserWithoutPassword(email: string, expectedErrorMessage: string): Promise<void> {
        const res = await this.request.post(`${URL}/login`, {
            data: {
                email,
                failOnStatusCode: true
            },
        })

        await expect.poll(async () => { res
            return res.status();
        }, {
            message: 'X User can be logged in', 
            timeout: 10000,
        }).toBe(400);

        const body = JSON.parse((await res.body()).toString());
        expect(expectedErrorMessage).toEqual(body.error);  
    }
}