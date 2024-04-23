const promotion_rules = [
  {
  rule:"Nx$",
  discount_percentage:20,
  n:4
  },
  {
  rule:"AyA",
  discount_percentage:15,
  n:1
  }
];
exports.aplicarPromociones = (ctx) => {
  const carrito = [];
  let total_monto_carrito = 0;

  ctx.request.body.items.forEach(item => {
      let precio_total = item.amount * item.unit_base_price;
      let promocion_aplicada = false;

      if (item.promotion === "Nx$") {
          const multiplicador_descuento = Math.floor(item.amount / promotion_rules[0].n);
          const monto_descuento = precio_total * (promotion_rules[0].discount_percentage / 100) * multiplicador_descuento;
          precio_total -= monto_descuento;
          promocion_aplicada = item.amount %4
          if(promocion_aplicada === 0){
              promocion_aplicada = true;
          }
          else if(promocion_aplicada > 0){
              promocion_aplicada = false;
          }
      } else if (item.promotion === "AyA") {
          const monto_descuento = precio_total * (promotion_rules[1].discount_percentage / 100);
          precio_total -= monto_descuento;
          promocion_aplicada = true;
      }

      total_monto_carrito += precio_total;
      carrito.push({
          id_producto: item.id_producto,
          cantidad: item.amount,
          precio_total,
          promocion_aplicada
      });
  });

  return {
      estado: "OK",
      id_carrito: ctx.cart_id,
      monto_total_carrito: total_monto_carrito,
      detalles: carrito
  };
};