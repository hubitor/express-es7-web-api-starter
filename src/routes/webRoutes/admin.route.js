import express from 'express';
// import validate from 'express-validation';
// import Joi from 'joi';
import ctrl from '../../controllers/admin.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/admin/memberlist')
  /** GET /- Homepage */
  .get(ctrl.memberlist);

router.route('/admin/memberlist-datatable')
  /** GET /- Homepage */
  .get(ctrl.memberlistDatatable);


export default router;
