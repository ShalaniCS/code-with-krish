import { Controller, Get } from '@nestjs/common';
import { EmployeesService } from './employees.service';

@Controller('/employees')
export class EmployeesController {
    constructor(private emloyeeService:EmployeesService){};

    @Get('/hello')
    greeting():String{
        return this.emloyeeService.greeting();
    }
}
