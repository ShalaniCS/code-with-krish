import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeesService {
    public greeting(): String{
        const message: string = "hello from employee";
        return message;
    }
}
