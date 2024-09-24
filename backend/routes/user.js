const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;

// const deleteUser = async (req, res) => {
//     try {
//       const userId = req.params.id;
  
//       // Ensure the user is trying to delete their own account
//       if (req.userId !== userId) {
//         return res.status(403).json({ error: 'You can only delete your own account' });
//       }
  
//       const user = await User.findByPk(userId);
//       if (user) {
//         await user.destroy();
//         return res.status(204).send(); // No content status
//       } else {
//         return res.status(404).json({ error: 'User not found' });
//       }
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ error: 'Server error' });
//     }
//   };

  