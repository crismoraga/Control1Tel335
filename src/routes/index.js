import Router from 'koa-router'
import getHealth from './health/health'
import promociones from './promociones/promociones'

const router = new Router()

//Enpoint 1

router.post('/api/get-promotions', promociones.getpromociones)

export default router
