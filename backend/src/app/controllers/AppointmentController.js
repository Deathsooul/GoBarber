import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';
import User from '../models/User';
import Appointment from '../models/Appointment';

class AppointmentController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        provider_id: Yup.number().required(),
        date: Yup.date().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' });
      }

      const { provider_id, date } = req.body;

      /**
       * Check if provider_id is a provider
       */
      const checkIsProvider = await User.findOne({
        where: { id: provider_id, provider: true },
      });

      if (!checkIsProvider) {
        return res
          .status(401)
          .json({ error: 'You can only create appointments with providers' });
      }

      /**
       * Check for past dates
       */

      // Transforma a hora sempre em hora cheia
      const hourStart = startOfHour(parseISO(date));

      if (isBefore(hourStart, new Date())) {
        return res.status(300).json({ error: 'Past date are not permitted' });
      }

      /**
       * Check Date availability
       */

      const checkAvailability = await Appointment.findOne({
        where: {
          provider_id,
          canceled_at: null,
          date: hourStart,
        },
      });

      if (checkAvailability) {
        return res
          .status(400)
          .json({ error: 'Appointment date is not available' });
      }

      // Criando o agendamento
      const appointment = await Appointment.create({
        user_id: req.userId,
        provider_id,
        date,
      });

      return res.json(appointment);
    } catch (e) {
      return res.status(401).json({ error: 'Somethig is wrong' });
    }
  }
}

export default new AppointmentController();
