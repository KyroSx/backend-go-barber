import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentService from '@modules/appointments/services/ListProviderAppointmentsService';

class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { day, month, year } = request.body;

    const listProviderAppointmentService = container.resolve(
      ListProviderAppointmentService,
    );

    const appointments = await listProviderAppointmentService.execute({
      user_id: id,
      day,
      month,
      year,
    });

    return response.json(appointments);
  }
}

export default ProviderAppointmentsController;
