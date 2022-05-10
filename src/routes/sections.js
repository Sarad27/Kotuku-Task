const {Router} = require( 'express');

const {getSection} = require('../controller/sectionController');

const router = Router();

router.get('/:section', getSection);

module.exports = router;