import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listProviderService = container.resolve(ListProvidersService);

    const providers = await listProviderService.execute({ user_id: id });

    return response.json(providers);
  }
}

export default ProvidersController;
