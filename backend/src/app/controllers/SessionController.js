import jwt from 'jsonwebtoken';
import auth from '../../config/auth';
import authConfig from '../../config/auth';

import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    // Verifica se o usuário existe
    if (!user) return res.status(401).json({ error: 'User not found' });
    // Verifica se as senhas batem
    if (!(await user.checkPassword(password)))
      return res.status(401).json({ error: 'Password does not match' });

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, { expiresIn: auth.expiresIn }),
    });
  }
}
export default new SessionController();
