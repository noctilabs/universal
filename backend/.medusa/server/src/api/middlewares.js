"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@medusajs/framework/http");
const middlewares_1 = require("./admin/sync-event/middlewares");
exports.default = (0, http_1.defineMiddlewares)({
    routes: [...middlewares_1.syncEventMiddlewares],
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL21pZGRsZXdhcmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQTREO0FBQzVELGdFQUFxRTtBQUVyRSxrQkFBZSxJQUFBLHdCQUFpQixFQUFDO0lBQy9CLE1BQU0sRUFBRSxDQUFDLEdBQUcsa0NBQW9CLENBQUM7Q0FDbEMsQ0FBQyxDQUFBIn0=