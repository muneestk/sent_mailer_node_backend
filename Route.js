import express from 'express'
import { companyData, mailSenter } from './controller.js'
const route = express()

route.post('/sendMail',mailSenter)
route.get('/mailList',companyData)

export default route