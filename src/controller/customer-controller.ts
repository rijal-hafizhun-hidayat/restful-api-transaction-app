import type { NextFunction, Request, Response } from "express";
import { CustomerService } from "../service/customer-service";
import type { CustomerRequest } from "../model/customer-model";

export class CustomerController {
  static async getAllCostumer(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const result = await CustomerService.getAllCostumer();
      return res.status(200).json({
        message: "success get customer",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async storeCustomer(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const request: CustomerRequest = req.body as CustomerRequest;
      const result = await CustomerService.storeCustomer(request);
      return res.status(200).json({
        message: "success store customer",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async destroyCustomerByCostumerId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const customerId: number = parseInt(req.params.customerId);
      const result = await CustomerService.destroyCustomerByCustomerId(
        customerId
      );
      return res.status(200).json({
        message: "success delete customer",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateCustomerByCostumerId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const request: CustomerRequest = req.body as CustomerRequest;
      const customerId: number = parseInt(req.params.customerId);
      const result = await CustomerService.updateCustomerByCustomerId(
        request,
        customerId
      );
      return res.status(200).json({
        message: "success update customer",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCustomerByCostumerId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const customerId: number = parseInt(req.params.customerId);
      const result = await CustomerService.getCustomerByCustomerId(customerId);
      return res.status(200).json({
        message: "success get customer",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllCostumerWithTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const result = await CustomerService.getAllCostumerWithTransaction();
      return res.status(200).json({
        message: "success get customer with transaction",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async generateCustomerCode(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const result = await CustomerService.generateCustomerCode();
      return res.status(200).json({
        message: "success get customer code",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
