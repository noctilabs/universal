import { defineMiddlewares } from "@medusajs/framework/http"
import { syncEventMiddlewares } from "./admin/sync-event/middlewares"

export default defineMiddlewares({
  routes: [...syncEventMiddlewares],
})
