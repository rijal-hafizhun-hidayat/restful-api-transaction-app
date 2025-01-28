import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  toCostumersResponse,
  toCustomerResponse,
  type CustomerResponse,
  type CustomerRequest,
} from "../model/customer-model";
import { CodeUtil } from "../utils/code-util";
import { CustomerValidation } from "../validation/customer-validation";
import { Validation } from "../validation/validation";

export class CustomerService {
  static async getAllCostumer(): Promise<CustomerResponse[]> {
    const result = await prisma.m_customer.findMany({});

    return toCostumersResponse(result);
  }

  static async storeCustomer(
    request: CustomerRequest
  ): Promise<CustomerResponse> {
    const requestBody: CustomerRequest = Validation.validate(
      CustomerValidation.customerSchema,
      request
    );

    const [storeCustomer] = await prisma.$transaction([
      prisma.m_customer.create({
        data: {
          nama: requestBody.name,
          kode: requestBody.kode,
          telp: requestBody.phone_number,
        },
      }),
    ]);

    return toCustomerResponse(storeCustomer);
  }

  static async destroyCustomerByCustomerId(
    customerId: number
  ): Promise<CustomerResponse> {
    const customer = await prisma.m_customer.findUnique({
      where: {
        id: customerId,
      },
    });

    if (!customer) {
      throw new ErrorResponse(404, "customer not found");
    }

    const [destroyCustomer] = await prisma.$transaction([
      prisma.m_customer.delete({
        where: {
          id: customerId,
        },
      }),
    ]);

    return toCustomerResponse(destroyCustomer);
  }

  static async getCustomerByCustomerId(
    customerId: number
  ): Promise<CustomerResponse> {
    const customer = await prisma.m_customer.findUnique({
      where: {
        id: customerId,
      },
    });

    if (!customer) {
      throw new ErrorResponse(404, "customer not found");
    }

    return toCustomerResponse(customer);
  }

  static async getAllCostumerWithTransaction() {
    const result = await prisma.m_customer.findMany({
      include: {
        t_sales: true,
      },
    });

    return result;
  }

  static async updateCustomerByCustomerId(
    request: CustomerRequest,
    customerId: number
  ): Promise<CustomerResponse> {
    const requestBody: CustomerRequest = Validation.validate(
      CustomerValidation.customerSchema,
      request
    );

    const customer = await prisma.m_customer.findUnique({
      where: {
        id: customerId,
      },
    });

    if (!customer) {
      throw new ErrorResponse(404, "customer not found");
    }

    const [updateCustomer] = await prisma.$transaction([
      prisma.m_customer.update({
        where: {
          id: customerId,
        },
        data: {
          nama: requestBody.name,
          kode: requestBody.kode,
          telp: requestBody.phone_number,
        },
      }),
    ]);

    return toCustomerResponse(updateCustomer);
  }

  static async generateCustomerCode(): Promise<string> {
    let customerCode: string;
    let isUnique: boolean = false;

    do {
      customerCode = CodeUtil.generateCustomerCode();
      const isCustomerCodeExist = await prisma.m_customer.findUnique({
        where: {
          kode: customerCode,
        },
      });

      isUnique = !isCustomerCodeExist;
    } while (!isUnique);

    return customerCode;
  }
}
