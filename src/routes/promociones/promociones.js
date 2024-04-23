import aplicarPromociones from '../../actions/actions'
exports.getpromociones = (ctx) => {
    if (ctx.request.body.cart_id === undefined){
        ctx.status = 500
        ctx.body = {message: 'INTERNAL SERVER ERROR'}
        return ctx.body
    }
    else{ctx.request.body.items.forEach(parametro => {
        console.log(parametro)
        if (parametro === undefined){
            ctx.status = 500
            ctx.body = {status: "NOK", message: 'INTERNAL SERVER ERROR'}
            return ctx.body
        }
        if(parametro.amount <= 0 || parametro.unit_base_price <= 0){
            ctx.status = 400
            ctx.body = {status: "NOK", message: 'AMOUNT OR PRICE SHOULD BE GREATER THAN ZERO'}
            return ctx.body
        }
        if(parametro.promotion !== "Nx$" || parametro.promotion !== "AyA"){
            ctx.status = 400
            ctx.body = {status: "NOK",message: 'RULE DOES NOT EXIST'}
            return ctx.body
        }
    });}
    ctx.status = 200
    ctx.body = aplicarPromociones.aplicarPromociones(ctx)
    return ctx
}